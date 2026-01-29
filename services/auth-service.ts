import api from "./axios-instance";
import { Auth } from "@/types/auth";

export const AuthService = {
  officerLogin: async (credentials: Auth) => {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  },
};
