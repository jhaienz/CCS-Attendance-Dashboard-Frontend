import api from "./axios-instance";
import { Auth } from "@/types/auth";

export const AuthService = {
  officerLogin: async (credentails: Auth) => {
    const response = await api.post("/auth/login", credentails);
    return response.data;
  },
};
