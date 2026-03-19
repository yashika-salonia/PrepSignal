// Attempt-related API calls

import api from "./axios";

export const logAttempt = (data) => api.post("/attempts", data);
export const getAttempts = (params) => api.get("/attempts", { params });
