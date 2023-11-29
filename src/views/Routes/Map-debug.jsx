import React, { useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
//Actions
import {
  selectRoute,
  selectRouteStatus,
  getRoute,
} from 'redux/slices/routeSlice';
import MapDebug from 'components/Routes/MapDebug';

const RoutesMapDebug = () => {
  const dispatch = useDispatch();
  const { routeId } = useParams();
  const loading = useSelector(selectRouteStatus);
  const route = useSelector(selectRoute);

  const fetch = async (id) => {
    await dispatch(getRoute(id, true));
  };

  useEffect(() => {
    if (routeId && !loading) {
      fetch(routeId);
    }
  }, [routeId]);

  return (
    <Box px={2} py={1}>
      <MapDebug loading={loading} route={route} onSubmit={fetch} />
    </Box>
  );
}

export default RoutesMapDebug;
