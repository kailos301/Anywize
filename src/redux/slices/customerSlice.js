import { createSlice, createSelector } from '@reduxjs/toolkit';
import { coreApi } from 'api/core';
import { setShowMessage } from 'redux/slices/uiSlice';

const baseUrl = '/customers';
const initialState = {
  customers: [],
  customer: null,
  loading: false,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
    setCustomers: (state, action) => {
      state.customers = action.payload;
    },
    setCustomerLoading: (state) => {
      state.loading = true;
    },
    setCustomerReady: (state) => {
      state.loading = false;
    },
    emptyCustomers: (state) => {
      state.customers = [];
      state.customer = null;
    },
  },
});

export const {
  setCustomer,
  setCustomers,
  setCustomerLoading,
  setCustomerReady,
  emptyCustomers,
} = customerSlice.actions;
export default customerSlice.reducer;

export const getCustomer = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setCustomerLoading());

  try {
    const res = await coreApi.fetch(url);
    dispatch(setCustomer(res));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setCustomerReady());
  }
};

export const getCustomers = () => async (dispatch) => {
  dispatch(setCustomerLoading());

  try {
    const customers = await coreApi.fetch(baseUrl);

    dispatch(setCustomers(customers));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setCustomerReady());
  }
};

export const addCustomer = (payload) => async (dispatch) => {
  dispatch(setCustomerLoading());

  try {
    const customer = await coreApi.post(baseUrl, payload);

    dispatch(emptyCustomers());
    dispatch(
      setShowMessage({
        description: 'Customer created successfully',
        type: 'success',
      })
    );
    return customer;
  } catch (err) {
    console.log(err);
    dispatch(
      setShowMessage({
        description: 'Failed to create customer',
        type: 'error',
      })
    );
  } finally {
    dispatch(setCustomerReady());
  }
};

export const editCustomer = (id, payload) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setCustomerLoading());

  try {
    const res = await coreApi.put(url, payload);

    dispatch(emptyCustomers());

    dispatch(
      setShowMessage({
        description: 'Customer modified successfully',
        type: 'success',
      })
    );

    return res;
  } catch (err) {
    dispatch(
      setShowMessage({
        description: 'Failed editing customer. Please try again',
        type: 'error',
      })
    );
  } finally {
    dispatch(setCustomerReady());
  }
};

export const deleteCustomer = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setCustomerLoading());

  try {
    await coreApi.delete(url);

    dispatch(emptyCustomers());
    dispatch(
      setShowMessage({
        description: 'Customer deleted successfully',
        type: 'success',
      })
    );
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setCustomerReady());
  }
};

const customerSelector = ({ customers }) => customers.customer;
const customersSelector = ({ customers }) => customers.customers;
const customerStatusSelector = ({ customers }) => customers.loading;

export const selectCustomer = createSelector(
  customerSelector,
  (customer) => customer
);
export const selectCustomers = createSelector(customersSelector, (customers) => customers);
export const selectCustomerStatus = createSelector(
  customerStatusSelector,
  (loading) => loading
);
