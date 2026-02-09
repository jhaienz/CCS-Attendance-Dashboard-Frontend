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
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TODO: implementation kapag expired na ang token dapat mag logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      // handle logout logic in here to be implemented soon
      console.log("logging out because of expired token");
    }
    return Promise.reject(error);
  }
);

export default api;
