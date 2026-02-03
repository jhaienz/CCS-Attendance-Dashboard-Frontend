import { Auth } from "@/types/auth";
import api from "./axios-instance";

export const AuthService = {
  officerLogin: async (credentials: Auth) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },

  officerLogout: async () => {
    const response = await api.post("/auth/logout");
    return response.data;
  },

  getCurrentUser: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },

  refreshToken: async () => {
    const response = await api.post("/auth/refresh");
    return response.data;
  },
};
