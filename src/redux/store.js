import { configureStore } from "@reduxjs/toolkit";
import newUserReducer from "./slices/userSlice";
import authReducer from "./slices/authSlice";
import tourReducer from "./slices/tourSlice";
import customerReducer from "./slices/customerSlice";
import orderReducer from "./slices/orderSlice";
import pastDeliveriesReducer from "./slices/pastDeliveriesSlice";
import routeReducer from "./slices/routeSlice";

import uiReducer from "./slices/uiSlice";

// import { reducer as formReducer } from 'redux-form';

const store = configureStore({
  reducer: {
    newUser: newUserReducer,
    auth: authReducer,
    tours: tourReducer,
    customers: customerReducer,
    orders: orderReducer,
    pastDeliveries: pastDeliveriesReducer,
    routes: routeReducer,
    ui: uiReducer,
  },
});

export default store;
