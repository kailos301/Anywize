import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import io from 'socket.io-client';

//Actions
import {
  selectCurrent,
  selectRouteStatus,
  getCurrentRoutes,
  getRoute,
  skipStop,
} from 'redux/slices/routeSlice';
import { selectUser } from 'redux/slices/userSlice';
import MapSidebar from 'components/Routes/MapSidebar';
import Map from 'components/Routes/Map';
import Stop from 'components/Routes/Stop';
import Navbar from 'components/Navbar';
import DarkLayout from 'components/Shared/DarkLayout';
import { setShowMessage } from 'redux/slices/uiSlice';

const API_URL = process.env.REACT_APP_API.replace('/api/', '');

const useStyles = makeStyles((theme) => ({
  _container: {
    backgroundColor: '#121212',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  _sidebar: {
    maxHeight: '100vh',
    overflow: 'scroll',
    '&::-webkit-scrollbar': {
      display: 'none'
    },
  }
}));

const RoutesMap = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { routeId, customerId } = useParams();
  const routes = useSelector(selectCurrent);
  const loading = useSelector(selectRouteStatus);
  const user = useSelector(selectUser);
  const [selected, _setSelected] = useState([]);
  const [selectedRoutes, setSelectedRoutes] = useState([]);
  const [highlighted, setHighlighted] = useState(null);
  const [selectedStop, setSelectedStop] = useState(null);
  const [initialFetch, setInitialFetch] = useState(false);
  const [socket, setSocket] = useState(null);

  // hack to keep this updated to be used with refreshSelected
  // which is called from a hook
  const selectedRef = useRef(selected);
  const setSelected = (s) => {
    selectedRef.current = s;
    _setSelected(s);
  };

  const refreshSelected = async () => {
    let i = 0;

    const refreshed = [];
    while (i < selectedRef.current.length) {
      const r = await dispatch(getRoute(selectedRef.current[i]));

      refreshed.push(r);
      i += 1;
    }

    setSelectedRoutes(refreshed);
  };

  const fetchFavourites = async () => {
    setInitialFetch(true);

    let routesThatAreFavourite = [];

    if (routeId) {
      routesThatAreFavourite.push(parseInt(routeId, 10));
    } else {
      let favourites = localStorage.getItem('current-tours-favourites');
      favourites = favourites ? favourites.split(',') : [];
      favourites = favourites.map(Number);

      routesThatAreFavourite = routes.filter((r) => favourites.includes(r.id))
        .map((r) => r.id);
    }

    let i = 0;
    const initiallySelected = [];

    while (i < routesThatAreFavourite.length) {
      try {
        const full = await dispatch(getRoute(routesThatAreFavourite[i]));

        if (full) {
          initiallySelected.push(full);
        } else {
          dispatch(
            setShowMessage({
              description: 'You do not have permissions to view the selected route',
              type: 'error',
            })
          );
          routesThatAreFavourite = routesThatAreFavourite.filter((v) => v !== routesThatAreFavourite[i]);
        }
      } catch (err) { }

      i += 1;
    }

    setSelected(routesThatAreFavourite);
    setSelectedRoutes(initiallySelected);
  };

  useEffect(() => {
    if (routes.length && !initialFetch) {
      fetchFavourites();
    }
  }, [routes, initialFetch]);

  useEffect(() => {
    if (!socket) {
      const newSocket = io(API_URL, {
        query: { token: localStorage.getItem('token') },
      });

      setSocket(newSocket);
    }

    return () => socket ? socket.close() : null;
  }, []);

  // socket stuff
  useEffect(() => {
    if (socket) {
      socket.emit('subscribe', { routes: selected });

      socket.on('route-updated', (data) => {
        refreshSelected();
      });
    }
  }, [socket]);

  // more socket stuff
  useEffect(() => {
    if (socket) {
      socket.emit('subscribe', { routes: selected });
    }
  }, [JSON.stringify(selected)]);

  useEffect(() => {
    if (!loading) {
      dispatch(getCurrentRoutes());
    }
  }, []);

  useEffect(() => {
    if (selectedRoutes.length && parseInt(routeId, 10) === selectedRoutes[0].id && parseInt(customerId, 10) && initialFetch) {
      openStop(selectedRoutes[0].id, parseInt(customerId, 10));
    }
  }, [selectedRoutes, initialFetch]);

  const onRouteSelect = async (route, addAsFavourite = true) => {
    const full = await dispatch(getRoute(route.id));

    if (addAsFavourite) {
      let favourites = localStorage.getItem('current-tours-favourites');
      favourites = favourites ? favourites.split(',') : [];
      favourites = favourites.concat([route.id]);
      localStorage.setItem('current-tours-favourites', favourites.join(','));
    }

    setSelected([route.id].concat(selected));
    setSelectedRoutes([full].concat(selectedRoutes));
  };

  const onRouteRemove = async (route) => {
    setSelected(selected.filter((id) => id !== route.id));
    setSelectedRoutes(selectedRoutes.filter((r) => r.id !== route.id));

    let favourites = localStorage.getItem('current-tours-favourites');
    favourites = favourites ? favourites.split(',') : [];
    favourites = favourites.filter((f) => parseInt(f, 10) !== route.id);
    localStorage.setItem('current-tours-favourites', favourites.join(','));
  };

  const onSkipStop = async (id, customerId) => {
    await dispatch(skipStop(id, customerId));

    dispatch(
      setShowMessage({
        description: 'The stop has been skipped',
        type: 'success',
      })
    );
  };

  const highlightRoute = (id) => setHighlighted(id);

  const openStop = (route_id, customer_id) => {
    const route = selectedRoutes.find((r) => r.id === route_id);

    if (!route) {
      return;
    }

    const customer = route.pathway.find((p) => p.id === customer_id);

    if (!customer) {
      return;
    }

    setSelectedStop({ route, customer });
  };

  const closeStop = () => setSelectedStop(null);

  return (
    <>
      <Navbar />
      <DarkLayout pl={2} pr={1} nopadding loading={loading}>
        <Grid container spacing={2}>
          <Grid className={classes._sidebar} item xs={12} sm={3}>
            {
              !!selectedStop && (
                <Stop
                  route={selectedStop.route}
                  customer={selectedStop.customer}
                  onClose={closeStop}
                  onSkipStop={onSkipStop}
                />
              )
            }
            {
              !selectedStop && (
                <MapSidebar
                  routes={routes.filter((r) => !selected.includes(r.id))}
                  selectedRoutes={selectedRoutes}
                  selectedRoutesIds={selected}
                  onSelect={onRouteSelect}
                  onRemove={onRouteRemove}
                  highlightRoute={highlightRoute}
                  highlightedRouteId={highlighted}
                />
              )
            }
          </Grid>
          <Grid item xs={12} sm={9}>
            <div>
              <Map
                routes={selectedRoutes}
                highlightRoute={highlightRoute}
                highlightedRouteId={highlighted}
                openStop={openStop}
                user={user}
              />
            </div>
          </Grid>
        </Grid>
      </DarkLayout>
    </>
  );
}

export default RoutesMap;
