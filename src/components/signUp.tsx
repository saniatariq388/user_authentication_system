"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Alert, AlertDescription } from "./ui/alert";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";

export default function SignUpPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: " ",
    password: " ",
    confirmedPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("signupFormData", JSON.stringify(formData));
    setIsLoading(true);
    setError("");

    if (formData.password !== formData.confirmedPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        router.push("/auth/signin?message=Account created successfully");
      } else {
        setError(data.error || "Error signing up. Please try again.");
      }
    } catch (error) {
      setError("Error signing up. Please try again.");
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-md boder border-gray-800 shadow-md rounded-lg bg-white p-4">
          <h1 className="text-center text-2xl font-bold"> Sign Up</h1>
          {error && (
            <Alert variant="destructive" className="my-2">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="create a password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <div className="space-y-2">
              <Label htmlFor="name"> Confirmed Password</Label>
              <Input
                id="confirmedPassword"
                name="confirmedPassword"
                type="password"
                placeholder="confirm your password"
                value={formData.confirmedPassword}
                onChange={handleChange}
                autoComplete="off"
                required
              ></Input>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Creating Account..." : "Create Account"}
            </Button>

            <div className="mt-4 text-enter text-sm">
              Already have an account?{" "}
              <Link
                href="/auth/signin"
                className="text-blue-600 hover:underline"
              >
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
