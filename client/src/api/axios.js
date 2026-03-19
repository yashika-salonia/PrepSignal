// Axios instance shared across the whole app
// Automatically attaches JWT from localStorage to every request.

import axios from "axios";

const api = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("prepsignal_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid — clear local storage and redirect to login
      localStorage.removeItem("prepsignal_token");
      localStorage.removeItem("prepsignal_user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default api;