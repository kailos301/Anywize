import React, { useState, useEffect, useRef } from 'react';
import Box from '@material-ui/core/Box';
import orderBy from 'lodash/orderBy';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import ReactMapGL, { Source, Marker, Layer, NavigationControl } from 'react-map-gl';
import MarkerIconBlue from 'assets/markers/marker-icon-blue.png';
import MarkerIconGold from 'assets/markers/marker-icon-gold.png';
import MarkerIconRed from 'assets/markers/marker-icon-red.png';
import mapboxgl from 'mapbox-gl';
import moment from 'moment';

const styles = makeStyles((theme) => ({
  customer: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
}));

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;

export default ({ loading, route, onSubmit }) => {
  const ref = useRef(null);
  const classes = styles();
  const [selected, setSelected] = useState([]);
  const [menu, setMenu] = useState([]);
  const [navigations, setNavigations] = useState([]);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 90px)',
    latitude: 52.51698281177408,
    longitude: 13.391257180999904,
    zoom: 15,
  });
  const [allLocations, setAllLocations] = useState(false);
  const [allNavigations, setAllNavigations] = useState(false);

  useEffect(() => {
    if (route) {
      const navigations = route.RoutesNavigations.map((rn, i) => {
        return {
          type: 'ROUTE_NAVIGATION',
          name: `Proposed navigation #${i + 1} - Customer ID ${rn.customer_id}`,
          ...rn,
          id: rn.navigation.uuid,
        };
      });

      const driver = Object.values(route.DriversLocations.reduce((acc, cur) => {
        if (!acc[cur.created_at]) {
          acc[cur.created_at] = cur;
        }

        return acc;
      }, {})).map((dl, i) => {
        return {
          type: 'DRIVER_LOCATION',
          name: `Driver location ${route.DriversLocations.length - i}`,
          ...dl,
          id: i + 1,
        };
      });

      setMenu(orderBy(navigations.concat(driver), ['created_at'], ['asc']));
    }
  }, [route]);

  useEffect(() => {
    if (!route) {
      return;
    }

    const rn = menu.filter((rn) => {
      return selected.includes(`ROUTE_NAVIGATION_${rn.id}`);
    }).map((rn) => ({
      coordinates: rn.navigation?.routes[0].geometry.coordinates,
      meta: rn.navigation?.meta,
      type: 'ROUTE_NAVIGATION',
    }));

    const loc = menu.filter((l) => {
      return selected.includes(`DRIVER_LOCATION_${l.id}`);
    }).map((l) => ({
      latitude: l.location.coordinates[1],
      longitude: l.location.coordinates[0],
      type: 'DRIVER_LOCATION',
    }));

    setNavigations(rn.concat(loc));
  }, [selected]);

  useEffect(() => {
    if (route) {
      setViewport((v) => ({
        ...v,
        latitude: route.pathway[0].latitude,
        longitude: route.pathway[0].longitude,
      }));
    }
  }, [route]);

  const handleCheckboxChange = (name) => (e) => {
    const { checked } = e.target;

    if (checked) {
      setSelected(selected.concat(name));
    } else {
      setSelected(selected.filter((s) => s !== name));
    }
  };

  const toggleAllLocations = () => {
    const newly = selected.filter((n) => !n.startsWith('DRIVER_LOCATION'));

    if (!allLocations) {
      setSelected(newly.concat(menu.filter((rn) => rn.type === 'DRIVER_LOCATION').map((rn) => `${rn.type}_${rn.id}`)));
    } else {
      setSelected(newly);
    }

    setAllLocations(!allLocations);
  };

  const toggleAllNavigations = () => {
    const newly = selected.filter((n) => !n.startsWith('ROUTE_NAVIGATION'));

    if (!allNavigations) {
      setSelected(newly.concat(menu.filter((rn) => rn.type === 'ROUTE_NAVIGATION').map((rn) => `${rn.type}_${rn.id}`)));
    } else {
      setSelected(newly);
    }

    setAllNavigations(!allNavigations);
  };

  const goToCustomer = (customer) => {
    setViewport((v) => ({
      ...v,
      latitude: customer.latitude,
      longitude: customer.longitude,
    }));
  };

  const layerStyle = {
    id: 'line',
    type: 'line',
    paint: {
      'line-color': ['get', 'color'],
      'line-width': 6,
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
  };

  return (
    <Box bgcolor="white" >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} style={{ maxHeight: 'calc(100vh - 90px)', overflowY: 'scroll' }}>
          {
            loading && (
              <Box textAlign="center" p={2}>
                <CircularProgress color="secondary" />
              </Box>
            )
          }
          {
            !!route && !loading && (
              <Box px={2}>
                <Typography variant="h6">Customers</Typography>
                {
                  route.pathway.map((customer, i) => (
                    <Box key={i} className={classes.customer} onClick={() => goToCustomer(customer)}>
                      <Typography><b>{i + 1})</b> {customer.name} - ID: {customer.id}</Typography>
                    </Box>
                  ))
                }
              </Box>
            )
          }
          {
            !!route && !loading && (
              <>
                <Typography variant="h6">
                  Driver location & navigation timeline
                </Typography>
                <Box my={1} p={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allLocations}
                        onChange={toggleAllLocations}
                        name={'allLocations'}
                        color="primary"
                      />
                    }
                    label="Toggle all driver location"
                  />
                </Box>
                <Box my={1} p={1}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={allNavigations}
                        onChange={toggleAllNavigations}
                        name={'allNavigations'}
                        color="primary"
                      />
                    }
                    label="Toggle all proposed navigations"
                  />
                </Box>
                {
                  menu.map((m, i) => {
                    if (m.type === 'DRIVER_LOCATION') {
                      return (
                        <Box key={i} my={1} boxShadow={2} p={1} style={{ color: 'white !important' }}>
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={selected.includes(`${m.type}_${m.id}`)}
                                onChange={handleCheckboxChange(`${m.type}_${m.id}`)}
                                name={`${m.type}_${m.id}`}
                                color="primary"
                              />
                            }
                            label={(
                              <>
                                {m.name}&nbsp;
                                <Box component="small">
                                  ({moment(m.created_at).format('DD-MM-YYYY HH:mm:ss')})
                                </Box>
                              </>
                            )}
                          />
                          {
                            m.type === 'DRIVER_LOCATION' && (
                              <>
                                <Box>
                                  <Box>
                                    <Typography variant="body2">
                                      Lat: {m.location.coordinates[1]}
                                    </Typography>
                                  </Box>
                                  <Box>
                                    <Typography variant="body2">
                                      Lng: {m.location.coordinates[0]}
                                    </Typography>
                                  </Box>
                                </Box>
                              </>
                            )
                          }
                        </Box>
                      );
                    }

                    return (
                      <Box key={i} my={1} boxShadow={2} p={1}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={selected.includes(`${m.type}_${m.id}`)}
                              onChange={handleCheckboxChange(`${m.type}_${m.id}`)}
                              name={`${m.type}_${m.id}`}
                              color="primary"
                            />
                          }
                          label={(
                            <>
                              {m.name}&nbsp;
                              <Box component="small" display="block">
                                ({moment(m.created_at).format('DD-MM-YYYY HH:mm:ss')})
                              </Box>
                              <Typography variant="body2" component="small" display="block" color="primary">
                                Reason: {m.navigation?.meta?.reason}
                              </Typography>
                            </>
                          )}
                        />
                      </Box>
                    );
                  })
                }
              </>
            )
          }
        </Grid>
        <Grid item xs={12} sm={9}>
          <ReactMapGL
            {...viewport}
            onViewportChange={nextViewport => setViewport(nextViewport)}
            mapStyle={MAPBOX_MAP_STYLE}
            mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
            ref={ref}
          >
            {
              !!route && route.pathway.map((r, i) => (
                <Marker key={i} latitude={r.latitude} longitude={r.longitude}>
                  <span
                    style={{ color: 'white', position: 'absolute', top: '-18px', left: '8px', fontWeight: 'bold' }}
                  >
                    {i + 1}
                  </span>
                  <img alt="icon" src={MarkerIconBlue} />
                </Marker>
              ))
            }
            {
              navigations.filter((n) => n.type === 'DRIVER_LOCATION').map((m, i) => (
                <Marker key={i} latitude={m.latitude} longitude={m.longitude}>
                  <img alt="icon" src={MarkerIconRed} />
                </Marker>
              ))
            }
            {
              navigations.filter((n) => n.type === 'ROUTE_NAVIGATION' && n.meta).map((m, i) => (
                <Marker key={i} latitude={m.meta?.fromPosition[1]} longitude={m.meta?.fromPosition[0]}>
                  <img alt="icon" src={MarkerIconGold} />
                </Marker>
              ))
            }
            <Source
              id="navigation"
              type="geojson"
              data={{
                type: 'FeatureCollection',
                features: navigations.filter((n) => n.type === 'ROUTE_NAVIGATION').map((nav, i) => ({
                  type: 'Feature',
                  id: i,
                  properties: {
                    color: `white`,
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: nav.coordinates,
                  },
                })),
              }}
            >
              <Layer {...layerStyle} />
            </Source>
            <NavigationControl style={{ bottom: 30, right: 20, backgroundColor: 'red' }} />
          </ReactMapGL>
        </Grid>
      </Grid>
    </Box>
  );
};
