// Axios instance shared across the whole app

import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
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
    const status = error.response?.status;
    const url = error.config?.url || "";

    // Auth endpoints (login/register) should NEVER trigger a redirect —
    // let the page component handle and display the error itself.
    const isAuthEndpoint =
      url.includes("/auth/login") || url.includes("/auth/register");

    if (status === 401 && !isAuthEndpoint) {
      // Token expired or invalid on a protected route → clear and redirect
      localStorage.removeItem("prepsignal_token");
      localStorage.removeItem("prepsignal_user");
      window.location.href = "/login";
    }

    // Always reject so the calling component can catch and show the error
    return Promise.reject(error);
  },
);

export default api;
