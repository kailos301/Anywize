import { createSlice, createSelector } from '@reduxjs/toolkit';
import { coreApi } from 'api/core';

const baseUrl = '/orders';
const initialState = {
  pastDeliveries: [],
  timestamp: null,
  loading: false,
};

const pastDeliveriesSlice = createSlice({
  name: 'pastDeliveries',
  initialState,
  reducers: {
    setpastDeliveries: (state, action) => {
      state.pastDeliveries = action.payload;
      state.timestamp = +new Date();
    },
    setpastDeliveriesLoading: (state) => {
      state.loading = true;
    },
    setsetpastDeliveriesReady: (state) => {
      state.loading = false;
    },
  }
})

export const { setpastDeliveries, setpastDeliveriesLoading, setsetpastDeliveriesReady } = pastDeliveriesSlice.actions

export default pastDeliveriesSlice.reducer

export const getpastDeliveries = ({ from, to }) => async (dispatch) => {

  dispatch(setpastDeliveriesLoading());
  try {
    const data = await coreApi.fetch(`${baseUrl}/delivered/${from}/${to}`);

    dispatch(setpastDeliveries(data));

    return data;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setsetpastDeliveriesReady());
  }
};

// const  pastDeliverySelector = ({  pastDeliveries }) =>  pastDeliveries.pastDelivery;
const pastDeliveriesSelector = ({ pastDeliveries }) => pastDeliveries.pastDeliveries;
const pastDeliveryStatusSelector = ({ pastDeliveries }) => pastDeliveries.loading;

// export const selectTour = createSelector(tourSelector, (tour) => tour);
export const selectpastDeliveries = createSelector(pastDeliveriesSelector, (p) => p);
export const selectpastDeliveriesStatus = createSelector(pastDeliveryStatusSelector, (loading) => loading);
