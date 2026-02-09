import { Auth } from "@/types/auth";
import api from "./axios-instance";

export const AuthService = {
  officerLogin: async (credentials: Auth) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
};
