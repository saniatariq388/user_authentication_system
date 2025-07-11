"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SignIn() {
  const [formData, setFormData] = useState({ email: " ", password: " " });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // useEffect(() => {
  //     setFormData({ email: "", password: "" });

  //     console.log("localStorage cleared")

  //     const timer = setTimeout(() => {
  //     const emailInput = document.getElementById("email") as HTMLInputElement
  //     const passwordInput = document.getElementById("password") as HTMLInputElement

  //     if (emailInput) emailInput.value = ""
  //     if (passwordInput) passwordInput.value = ""
  //   }, 100)

  //   return () => clearTimeout(timer)
  // }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/shop");
      } else {
        if (data.error === "Invalid credentials") {
          setError("User not found. Please sign up.");

          setFormData({ email: " ", password: " " });

          setTimeout(() => {
            router.push("/auth/signup");
          }, 3000);
        } else {
          setError(data.error || "Error logging in. Please try again.");
        }
      }
    } catch (error) {
      setError("Error logging in. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md border border-gray-800 shadow-md rounded-lg bg-white p-4">
          <h1 className="text-center text-2xl font-bold">Sign In</h1>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                placeholder="Enter your email"
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                placeholder="Enter your password"
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{" "}
            <Link href="/auth/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </div>

          <div className="mt-2 text-center text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-blue-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
