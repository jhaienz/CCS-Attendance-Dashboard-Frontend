"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function Login() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("ok")
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back!</CardTitle>
          <CardDescription className="text-center">
            Keep up the good work!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Student ID */}
            <div className="space-y-2">
              <label htmlFor="student-id" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Student ID
              </label>
              <Input
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
              <label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Password
              </label>
              <Input
                type="password"
                id="password"
                placeholder="Enter password"
                name="password"
                maxLength={50}
                required
              />
            </div>

            {/* Submit */}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}


