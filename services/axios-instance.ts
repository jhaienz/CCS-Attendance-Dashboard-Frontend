import axios from "axios";

const api = axios.create({
  // pang server side lang baga ang API_BASE_URL
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000",
  timeout: 20000, // 20 seconds nalang
  headers: {
    "Content-Type": "application/json",
  },
});
// dapat every request kang naka login gagamiton ni
api.interceptors.request.use((config) => {
  const token =
    typeof window != "undefined" ? localStorage.getItem("token") : null;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// TODO: i cocode ko pa ni implementation kapag expired na ang token dapat mag logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status == 401) {
      // handle logout logic in here to be implemented soon
      console.log("logging out because of expired token");
    }
    return Promise.reject(error);
  },
);

export default api;
