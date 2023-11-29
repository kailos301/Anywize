import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'react-i18next';
import MapIcon from '@material-ui/icons/Map';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';

const styles = makeStyles((theme) => ({
  _box: {
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    padding: '10px 15px',
    border: '1px solid transparent',
    cursor: 'pointer',

    '&:hover': {
      borderColor: '#6F9CEB',
    },
  },
  blueBorder: {
    borderColor: '#6F9CEB',
  },
  textWhite: {
    color: '#FFF',
  },
  _6F9CEB: {
    color: '#6F9CEB'
  },
  padding: {
    padding: '0px 15px'
  }
}));

export default ({
  routes,
  selectedRoutes,
  selectedRoutesIds,
  onSelect,
  onRemove,
  highlightRoute,
  highlightedRouteId,
}) => {
  const classes = styles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState([]);

  useEffect(() => {
    setLoading((l) => l.filter((i) => !selectedRoutesIds.includes(i)));
  }, [selectedRoutesIds]);

  const handleOnSelect = (route) => {
    setLoading(loading.concat(route.id));

    return onSelect(route);
  };

  return (
    <Box>
      <Box my={4}>
        <Typography className={clsx(classes.textWhite, classes.padding)} variant="h6">
          {t('On map')}
        </Typography>
      </Box>
      {
        selectedRoutes.map((route, i) => {
          return (
            <Box
              className={clsx(classes._box, {
                [classes.blueBorder]: highlightedRouteId === route.id,
              })}
              style={{ background: i % 2 === 0 ? ' #1F1F1F ' : '#525252', }}
              key={i}
              onClick={() => onRemove(route)}
              onMouseEnter={() => highlightRoute(route.id)}
              onMouseLeave={() => highlightRoute(null)}
            >
              <MapIcon className={classes._6F9CEB} />
              <Typography className={classes.textWhite} variant="body2">
                <Box component="span" mx={3}><b>T{route.uuid}</b></Box> {route.Tour.name}
              </Typography>
            </Box>
          );
        })
      }
      <Box my={4}>
        <Typography className={clsx(classes.textWhite, classes.padding)} variant="h6">
          {t('All tours')}
        </Typography>
      </Box>
      {
        routes.map((route, i) => {
          return (
            <Box
              className={classes._box}
              style={{ background: i % 2 === 0 ? ' #1F1F1F ' : '#525252', }}
              key={i}
              onClick={() => handleOnSelect(route)}
            >
              <MapIcon />
              <Typography className={classes.textWhite} variant="body2" component="div">
                <Box component="span" mx={3}><b>T{route.uuid}</b></Box> {route.Tour.name}
                {
                  loading.includes(route.id) && (
                    <Box component="span" ml={3} textAlign="right">
                      <CircularProgress size={20} color="secondary" />
                    </Box>
                  )
                }
              </Typography>
            </Box>
          );
        })
      }
    </Box>
  )
};
