/**
 * getEnvironment - Returns the current environment, or development by default
 * @returns {String}
 */
export const getEnvironment = () =>
  process.env.NODE_ENV ? process.env.NODE_ENV : "development";

/**
 * getApiUrl  - Returns the URL for the api, given the current environment
 * @returns {String}
 */
export const getApiUrl = () => {
  switch (getEnvironment()) {
    case "production":
      return window.location.origin;
    case "development":
      return "http://localhost:3000";
    default:
      return "http://localhost:3000";
  }
};
