const methods = {
  get: ["get", "GET"],
  post: ["post", "POST"],
  put: ["put", "PUT"],
  patch: ["patch", "PATCH"],
  delete: ["delete", "DELETE"],
};

export const parseMethod = (method) => {
  for (const [, value] of Object.entries(methods)) {
    let exists = value.some((e) => e.includes(method));
    if (exists) {
      return value[1];
    }
  }
};

export const interceptedMethods = ["post", "put", "patch"];
