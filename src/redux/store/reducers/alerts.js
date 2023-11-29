import { SHOW_ALERT, HIDE_ALERT } from "../actions/alerts";

const initialState = {
  message: null,
  messageType: null,
};

const alerts = function (state = initialState, action) {
  switch (action.type) {
    case SHOW_ALERT: {
      return {
        ...state,
        message: action.payload.message,
        messageType: action.payload.messageType,
      };
    }
    case HIDE_ALERT: {
      return {
        ...state,
        message: null,
        messageType: null,
      };
    }
    default: {
      return state;
    }
  }
};

export default alerts;
