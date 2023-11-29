import { createSlice, createSelector } from "@reduxjs/toolkit";
import { storage } from "util/storage";
import { coreApi } from "api/core";

const baseUrl = "/auth";

const initialState = {
  authenticated: !!storage.get("token"),
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthenticated: (state) => {
      state.authenticated = true;
    },
    setUnauthenticated: (state) => {
      state.authenticated = false;
    },
    setAuthLoading: (state) => {
      state.loading = true;
    },
    setAuthReady: (state) => {
      state.loading = false;
    },
  },
});

export const {
  setAuthenticated,
  setUnauthenticated,
  setAuthLoading,
  setAuthReady,
} = authSlice.actions;
export default authSlice.reducer;

export const loginWithRedirect = (creds, callback) => async (dispatch) => {
  dispatch(setAuthLoading());
  const url = baseUrl + "/login";

  try {
    const { token } = await coreApi.post(url, creds);
    if (token) {
      await storage.set("token", token);
      await dispatch(setAuthenticated());

      callback();
    }
  } catch (err) {
    dispatch(setUnauthenticated());
    throw err;
  } finally {
    dispatch(setAuthReady());
  }
};

const authenticatedSelector = ({ auth }) => auth.authenticated;
const authLoadingSelector = ({ auth }) => auth.loading;

export const selectAuthenticated = createSelector(
  authenticatedSelector,
  (authenticated) => authenticated
);
export const selectAuthLoading = createSelector(
  authLoadingSelector,
  (loading) => loading
);
