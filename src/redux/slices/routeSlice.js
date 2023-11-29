import {createSlice, createSelector} from '@reduxjs/toolkit';
import {coreApi} from 'api/core';
import moment from 'moment';

const baseUrl = '/routes';

const initialState = {
  routes: [],
  completed: [],
  current: [],
  archived: [],
  route: null,
  loading: false,
}

const routeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
    },
    setCurrent: (state, action) => {
      state.current = action.payload;
    },
    setCompleted: (state, action) => {
      state.completed = action.payload;
    },
    setArchived: (state, action) => {
      state.archived = action.payload;
    },
    setRoute: (state, action) => {
      state.route = action.payload;
    },
    setRouteLoading: (state) => {
      state.loading = true;
    },
    setRouteReady: (state) => {
      state.loading = false;
    },
  }
})

export const {
  setRoutes,
  setRouteLoading,
  setRouteReady,
  setCompleted,
  setCurrent,
  setArchived,
  setRoute
} = routeSlice.actions;
export default routeSlice.reducer;

export const getRoute = (id, allDriverLocations = false) => async (dispatch) => {
  const url = baseUrl + `/${id}${allDriverLocations ? '?allDriverLocations=1' : ''}`;
  // dispatch(setRouteLoading());
  try {
    const res = await coreApi.fetch(url);
    if (typeof res.pathway === 'string') {
      res.pathway = JSON.parse(res.pathway)
    }
    dispatch(setRoute(res));

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    // dispatch(setRouteReady());
  }
};
export const getRoutes = () => async (dispatch) => {
  dispatch(setRouteLoading());
  try {
    const routes = await coreApi.fetch(baseUrl);
    let update = routes.map((data) => {
      if (typeof data.pathway === 'string') {
        data.pathway = JSON.parse(data.pathway)
      }
      return {
        ...data,
        is_favourite: false,
      }
    })
    dispatch(setRoutes(update));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady())
  }
}
export const getCurrentRoutes = () => async (dispatch) => {
  dispatch(setRouteLoading());
  try {
    const routes = await coreApi.fetch(`${baseUrl}?ended=0`);
    let favourites = localStorage.getItem('current-tours-favourites');
    favourites = favourites ? favourites.split(',') : [];
    favourites = favourites.map(Number);

    const newData = routes.map((data) => {
      if (typeof data.pathway === 'string') {
        data.pathway = JSON.parse(data.pathway)
      }
      return {
        ...data,
        is_favourite: favourites.includes(data.id),
        progress: 'In Progress'
      }
    }).sort((a, b) => b.is_favourite - a.is_favourite);

    dispatch(setCurrent(newData));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady())
  }
};

export const skipStop = (routeId, customerId) => async (dispatch) => {
  dispatch(setRouteLoading());

  try {
    await coreApi.put(`${baseUrl}/skip-stop/${routeId}/${customerId}`, {});
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady());
  }
};

export const getFinisedRoutes = () => async (dispatch) => {
  dispatch(setRouteLoading());
  try {
    const routes = await coreApi.fetch(`${baseUrl}?started=1&ended=1&end_date_from=${moment().utc().subtract(5, 'days').startOf('day').format('YYYY-MM-DD')}`);

    const newData = routes.map((data) => {
      if (typeof data.pathway === 'string') {
        data.pathway = JSON.parse(data.pathway)
      }
      return {
        ...data,
        is_favourite: false,
        progress: 'Complete'
      }
    });
    dispatch(setCompleted(newData));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady())
  }
};

export const getArchivedRoutes = () => async (dispatch) => {
  dispatch(setRouteLoading());
  try {
    const routes = await coreApi.fetch(`${baseUrl}?started=1&ended=1&end_date_to=${moment().utc().subtract(5, 'days').startOf('day').format('YYYY-MM-DD')}`);
    let update = routes.map((data) => {
      if (typeof data.pathway === 'string') {
        data.pathway = JSON.parse(data.pathway)
      }
      return {
        ...data
      }
    })
    let newData = update.map((data) => {
      return {
        ...data,
        is_favourite: false,
        progress: 'Archived'
      }
    })

    dispatch(setArchived(newData));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady())
  }
}
export const createRoute = (payload) => async (dispatch) => {
  dispatch(setRouteLoading());

  try {
    await coreApi.post(baseUrl, payload);
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setRouteReady());
  }
};

const routesSelector = ({routes}) => routes.routes;
const routeSelector = ({routes}) => routes.route
const currentSelector = ({routes}) => routes.current;
const completedSelector = ({routes}) => routes.completed;
const archivedSelector = ({routes}) => routes.archived;
const routeStatusSelector = ({routes}) => routes.loading;


export const selectRoute = createSelector(routeSelector, (route) => route);
export const selectCurrent = createSelector(currentSelector, (current) => current);
export const selectCompleted = createSelector(completedSelector, (completed) => completed);
export const selectArchived = createSelector(archivedSelector, (archived) => archived);
export const selectRoutes = createSelector(routesSelector, (routes) => routes);
export const selectRouteStatus = createSelector(
  routeStatusSelector,
  (loading) => loading
);
