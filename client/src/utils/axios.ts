import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.PROD
    ? ""
    : `http://localhost:${import.meta.env.VITE_PORT}`,
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

axiosInstance.interceptors.response.use(
  function (res) {
    return res;
  },
  function (err) {
    if (err.response.data === "jwt expired") {
      window.location.reload();
    }
  }
);
