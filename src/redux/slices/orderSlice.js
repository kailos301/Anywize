import { createSlice, createSelector } from "@reduxjs/toolkit";
import { coreApi } from "api/core";
import { setShowMessage } from "redux/slices/uiSlice";

const baseUrl = "/orders";
const initialState = {
  orders: [],
  timestamp: null,
  order: null,
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrder: (state, action) => {
      state.order = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
      state.timestamp = +new Date();
    },
    setOrderLoading: (state) => {
      state.loading = true;
    },
    setOrderReady: (state) => {
      state.loading = false;
    },
    clearOrders: (state) => {
      state.orders = [];
      state.order = null;
      state.timestamp = null;
    }
  },
});

export const {
  setOrder,
  setOrders,
  setOrderLoading,
  setOrderReady,
  clearOrders,
} = orderSlice.actions;
export default orderSlice.reducer;

export const getOrder = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.fetch(url);
    dispatch(setOrder(res));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const getOrders = () => async (dispatch) => {
  dispatch(setOrderLoading());

  try {
    const orders = await coreApi.fetch(`${baseUrl}?assigned_to_route=0`);

    const grouped = orders.reduce((acc, order, i) => {
      const { Tour } = order.Customer;
      const key = `${Tour.id}-${order.departure}`;

      if (!acc[key]) {
        acc[key] = {
          Tour,
          orders: [],
          id: i,
          mainCheck: false,
        };
      }

      acc[key].orders.push(order);

      return acc;
    }, {});

    dispatch(setOrders(Object.values(grouped)));
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const addOrder = (payload) => async (dispatch) => {
  dispatch(setOrderLoading());

  try {
    const order = await coreApi.post(baseUrl, payload);
    dispatch(clearOrders());

    return order;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

export const editOrder = (id, payload) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.put(url, payload);

    dispatch(clearOrders());
    dispatch(
      setShowMessage({
        description: "Order modified successfully",
        type: "success",
      })
    );

    return res;
  } catch (err) {
    console.log(err);
    dispatch(
      setShowMessage({
        description:
          err.message ?? "Failed editing order. Please try again later",
        type: "error",
      })
    );
  } finally {
    dispatch(setOrderReady());
  }
};

export const deleteOrder = (id) => async (dispatch) => {
  const url = baseUrl + `/${id}`;
  dispatch(setOrderLoading());

  try {
    const res = await coreApi.delete(url);

    dispatch(
      setShowMessage({
        description: "Order deleted successfully",
        type: "success",
      })
    );
    dispatch(clearOrders());

    return res;
  } catch (err) {
    console.log(err);
  } finally {
    dispatch(setOrderReady());
  }
};

const orderSelector = ({ orders }) => orders.order;
const ordersSelector = ({ orders }) => orders.orders;
const orderStatusSelector = ({ orders }) => orders.loading;

export const selectOrder = createSelector(orderSelector, (order) => order);
export const selectOrders = createSelector(ordersSelector, (orders) => orders);
export const selectOrderStatus = createSelector(
  orderStatusSelector,
  (loading) => loading
);
export const selectOrdersTimestamp = createSelector(({ orders }) => orders.timestamp, o => o);
