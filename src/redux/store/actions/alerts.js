export const SHOW_ALERT = "[ALERTS] SHOW ALERT";
export const HIDE_ALERT = "[ALERTS] HIDE ALERT";

export function showMessage(message) {
  return {
    type: SHOW_ALERT,
    payload: message,
  };
}

export function hideMessage() {
  return {
    type: HIDE_ALERT,
  };
}
