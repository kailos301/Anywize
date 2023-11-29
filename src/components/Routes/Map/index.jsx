import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { Source, Marker, Layer, FlyToInterpolator, NavigationControl } from 'react-map-gl';
import GpsIcon from '@material-ui/icons/GpsFixed';
import Box from '@material-ui/core/Box';
import MarkerHouse from 'assets/markers/house.png';
import MarkerTruck from 'assets/markers/truck.png';
import Markers from './Markers';
import mapboxgl from 'mapbox-gl';

// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const MAPBOX_API_ACCESS_TOKEN = process.env.REACT_APP_MAPBOX_API_ACCESS_TOKEN;
const MAPBOX_MAP_STYLE = process.env.REACT_APP_MAPBOX_MAP_STYLE;


export default ({ routes, highlightRoute, highlightedRouteId, openStop, user }) => {
  const ref = useRef(null);
  const [total, setTotal] = useState(0);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: 'calc(100vh - 80px)',
    latitude: -33.6831263,
    longitude: -59.6579517,
    zoom: 15,
  });

  const onMarkerClick = (routeId, customerId) => {
    openStop(routeId, customerId);
  };

  useEffect(() => {
    setViewport((v) => ({
      ...v,
      latitude: user?.Supplier?.coordinates.coordinates[1],
      longitude: user?.Supplier?.coordinates.coordinates[0],
    }));
  }, [user]);

  useEffect(() => {
    if (routes.length && routes.length !== total) {
      let latitude = routes[0].pathway[0].latitude;
      let longitude = routes[0].pathway[0].longitude;

      if (routes[0].DriversLocations.length) {
        const last = routes[0].DriversLocations[routes[0].DriversLocations.length - 1];

        latitude = last.location.coordinates[1];
        longitude = last.location.coordinates[0];
      }

      setViewport({
        ...viewport,
        latitude,
        longitude,
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }

    if (routes.length !== total) {
      setTotal(routes.length);
    }
  }, [routes, total]);

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

  const onHover = (e) => {
    if (e.features.length) {
      const navigation = e.features.find((f) => f.source === 'navigation');

      if (navigation) {
        return highlightRoute(navigation.id);
      }
    }

    highlightRoute(null);
  };

  const centerSupplier = () => {
    if (user && user.Supplier) {
      setViewport({
        ...viewport,
        latitude: user?.Supplier?.coordinates.coordinates[1],
        longitude: user?.Supplier?.coordinates.coordinates[0],
        transitionDuration: 1000,
        transitionInterpolator: new FlyToInterpolator(),
      });
    }
  };

  return (
    <ReactMapGL
      {...viewport}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      mapStyle={MAPBOX_MAP_STYLE}
      mapboxApiAccessToken={MAPBOX_API_ACCESS_TOKEN}
      onHover={onHover}
      ref={ref}
    >
      {
        !!user && !!user.Supplier && (
          <Marker latitude={user?.Supplier?.coordinates.coordinates[1]} longitude={user?.Supplier?.coordinates.coordinates[0]}>
            <img alt="icon" src={MarkerHouse} />
          </Marker>
        )
      }

      {
        routes.map((route, i) => (
          <Markers route={route} onClick={onMarkerClick} key={i} />
        ))
      }
      {
        routes.map((route, i) => {
          if (!route.DriversLocations.length) {
            return null;
          }

          const last = route.DriversLocations[route.DriversLocations.length - 1];

          return (
            <Marker key={i} latitude={last.location.coordinates[1]} longitude={last.location.coordinates[0]}>
              <img alt="icon" src={MarkerTruck} />
            </Marker>
          );
        })
      }
      <Source
        id="navigation"
        type="geojson"
        data={{
          type: 'FeatureCollection',
          features: routes.reduce((acc, route) => {
            const arr = route.RoutesNavigations.map((rn) => {
              return {
                type: 'Feature',
                id: route.id,
                properties: {
                  color: highlightedRouteId === route.id ? '#6F9CEB' : '#cdddf8',
                },
                geometry: {
                  type: 'LineString',
                  coordinates: rn.navigation?.routes[0].geometry.coordinates,
                },
              }
            });

            return acc.concat(arr);
          }, []),
        }}
      >
        <Layer {...layerStyle} />
      </Source>
      <NavigationControl
        style={{ bottom: 30, right: 20, backgroundColor: 'red' }}
        showCompass={false}
      />
      <Box
        position="absolute"
        bottom={85}
        right={20}
        px={0.3}
        pt={0.5}
        style={{ cursor: 'pointer' }}
        bgcolor="white"
        borderRadius={3}
        onClick={centerSupplier}
      >
        <GpsIcon />
      </Box>
    </ReactMapGL>
  );
};
