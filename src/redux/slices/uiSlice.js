import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  showMessage: false,
  message: {
    description: "",
    type: "",
  },
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setShowMessage: (state, action) => {
      state.showMessage = true;
      state.message = action.payload;
    },
    setHideMessage: (state) => {
      state.showMessage = false;
      state.message = initialState.message;
    },
    setUiLoading: (state) => {
      state.loading = true;
    },
    setUiReady: (state) => {
      state.loading = false;
    },
  },
});

export const { setShowMessage, setHideMessage, setUiLoading, setUiReady } =
  uiSlice.actions;
export default uiSlice.reducer;

const uiLoadingSelector = ({ ui }) => ui.loading;
const showMessageSelector = ({ ui }) => ui.showMessage;
const messageSelector = ({ ui }) => ui.message;

export const selectUiLoading = createSelector(
  uiLoadingSelector,
  (loading) => loading
);
export const selectShowMessage = createSelector(
  showMessageSelector,
  (showMessage) => showMessage
);
export const selectMessage = createSelector(
  messageSelector,
  (message) => message
);
