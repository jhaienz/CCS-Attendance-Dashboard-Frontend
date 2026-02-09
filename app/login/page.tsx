"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { handleLogin } from "@/lib/utils";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const validatePassword = (password: string): string | null => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special symbol";
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const passwordValidationError = validatePassword(formData.password);
    if (passwordValidationError) {
      setError(passwordValidationError);
      setLoading(false);
      return;
    }

    try {
      const data = await AuthService.officerLogin(formData);

      // Handle login with cross-tab communication
      handleLogin(data.token);

      router.push("/dashboard");
    } catch (error: any) {
      const status = error.response?.status;
      const errorMessage = error.response?.data?.message;

      //  handle erros
      if (status === 401) {
        setError("Invalid student ID or password");
      }
      if (status === 400) {
        setError(errorMessage || "Invalid credentials");
      }
      if (status === 404) {
        setError("Student ID not found");
      }

      // QUESTION: tano daw pirmi status 500 pag sala credentials na nilaag ko?
      if (status === 500) {
        setError("Server Error. Please try again.");
      } else if (error.message === "Network Error") {
        setError("Network error. Please check your connection.");
      } else {
        console.error("Server error:", error);
        setError("Error, Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className={`w-full max-w-md ${error ? "animate-shake" : ""}`}>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome Back!
          </CardTitle>
          <CardDescription className="text-center">
            Keep up the good work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student ID */}
            <div className="space-y-2">
              <label
                htmlFor="student-id"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Student ID
              </label>
              <Input
                onChange={(e) => {
                  setFormData({ ...formData, studentId: e.target.value });
                  setError("");
                }}
                type="text"
                id="student-id"
                placeholder="Enter student ID"
                name="student-id"
                maxLength={50}
                required
                aria-invalid={!!error}
                className={error ? "border-destructive" : ""}
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  setError("");
                }}
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                maxLength={50}
                required
                aria-invalid={!!error}
                className={error ? "border-destructive" : ""}
              />
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-sm text-destructive text-center">{error}</p>
            )}

            {/* Submit */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
