import axios from "axios";

const apiBaseUrl =
  import.meta.env.VITE_API_URL ||
  "https://fraganciasuy-backend.onrender.com/api/v1";

const api = axios.create({
  baseURL: apiBaseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
