/**
 * Map redux data to a new array compatible
 * with material-table props.
 * https://stackoverflow.com/questions/65396030/using-material-table-with-redux-state
 * @param data
 */
export const mapTableData = (data) =>
  data.map((item) => Object.assign({}, item));

/**
 * group same data from array
 * @param array
 * @param key
 */
export const groupBy = (array, key) => {
  return array.reduce((result, obj) => {
    (result[obj[key]] = result[obj[key]] || []).push(obj);
    return result;
  }, []);
};

export const delay = (s) => new Promise((r) => {
  setTimeout(() => r(), s * 1000);
});
