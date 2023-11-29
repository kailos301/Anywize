import { createSlice, createSelector } from '@reduxjs/toolkit';
import { coreApi } from 'api/core';

export const APP_NAMESPACE = 'mkrn-starter';
const userPrefix = `${APP_NAMESPACE}/user`;
const usersPrefix = `${APP_NAMESPACE}/users`;
const authUserPrefix = `${APP_NAMESPACE}/auth`;

const initialState = {
  messages: {
    [userPrefix]: "",
    [usersPrefix]: "",
  },
  errors: {
    [userPrefix]: [],
    [usersPrefix]: [],
    [authUserPrefix]: [],
  },
  loading: {
    [userPrefix]: false,
    [usersPrefix]: false,
    [authUserPrefix]: false,
  },
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, setUserSettings } = userSlice.actions;
export default userSlice.reducer;

export const fetchUserInfo = () => async (dispatch) => {
  try {
    const user = await coreApi.fetch('/users/me');
    if (typeof user.permissions === 'string') {
      user.permissions = JSON.parse(user.permissions)
    }
    dispatch(setUser(user));
  } catch (err) {
  }
};

export const logout = () => async (dispatch) => {
  dispatch(setUser(null));
  localStorage.removeItem('token');

  return window.location.href = '/login';
};

const userSelector = (state) => state.newUser.user;

export const selectUser = createSelector(userSelector, (user) => user);
