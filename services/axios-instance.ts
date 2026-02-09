import { performLogout } from "@/lib/utils";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 20000, // 20 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use((config) => {
  let token = null;
  if (typeof window !== "undefined") {
    token = sessionStorage.getItem("token") || localStorage.getItem("authToken");
    // If token is found in localStorage but not in sessionStorage, sync it
    if (token && !sessionStorage.getItem("token")) {
      sessionStorage.setItem("token", token);
    }
  }

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 Unauthorized errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      performLogout();
    }
    return Promise.reject(error);
  }
);

export default api;
