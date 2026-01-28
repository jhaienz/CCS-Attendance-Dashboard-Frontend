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
import { useState, useEffect } from "react";
import { AuthService } from "@/services/auth-service";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    studentId: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = await AuthService.officerLogin(formData);
      localStorage.setItem("token", data.token);
      router.push("/dashboard");
    } catch (error: any) {
      // TO ARJAY: LAGANAN MO INI LIKE GARO MA POP UP NA WRONG PASSWORD OR STUDENT ID, TIG IMPLEMENT KO LANG KAYA SI AUTHORIZATION, IKAW NA BAHALA SA UI
      setError(error.response?.data?.message || "Invalid Account");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
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
                onChange={(e) =>
                  setFormData({ ...formData, studentId: e.target.value })
                }
                type="text"
                id="student-id"
                placeholder="Enter student ID"
                name="student-id"
                maxLength={50}
                required
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
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                maxLength={50}
                required
              />
            </div>

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
