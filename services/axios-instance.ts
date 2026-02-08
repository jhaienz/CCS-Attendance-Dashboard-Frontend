import axios from "axios";
import { AuthService } from "./auth-service";

const api = axios.create({
  baseURL: process.env.API_BASE_URL,
  timeout: 20000, // 20 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add authentication token
api.interceptors.request.use((config) => {
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle token refresh and 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh token
        const response = await AuthService.refreshToken();
        const newToken = response.token;

        // Update token in session storage
        if (typeof window !== "undefined") {
          sessionStorage.setItem("token", newToken);
        }

        // Update request with new token
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        // Retry original request
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);

        // If refresh fails, logout user
        if (typeof window !== "undefined") {
          sessionStorage.removeItem("token");
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(error);
  },
);

export default api;
