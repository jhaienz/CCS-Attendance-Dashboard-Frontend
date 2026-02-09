import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Shared logout utility function
export function performLogout() {
  // Clear token from session storage and cookies
  if (typeof window !== "undefined") {
    sessionStorage.removeItem("token");
    localStorage.removeItem("authToken");
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    // Redirect to login
    window.location.href = "/login";
  }
}

// Check if user is authenticated
export function isAuthenticated() {
  if (typeof window === "undefined") return false;
  const token = sessionStorage.getItem("token") || localStorage.getItem("authToken");
  const cookieToken = document.cookie.includes("token=");
  return !!token && cookieToken;
}

// Login handler that shares state across tabs
export function handleLogin(token: string) {
  if (typeof window !== "undefined") {
    // Store token in both sessionStorage and localStorage for cross-tab communication
    sessionStorage.setItem("token", token);
    localStorage.setItem("authToken", token);
    // Set cookie with token for middleware
    document.cookie = `token=${token}; path=/; max-age=${24 * 60 * 60}; SameSite=Strict; Secure`;
  }
}
