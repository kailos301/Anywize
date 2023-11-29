export const storage = {
  get: (key) => localStorage.getItem(key),
  set: (key, value) => localStorage.setItem(key, value),
  clear: () => localStorage.clear(),
};

export const isAuthenticated = () => !!storage.get("token");
