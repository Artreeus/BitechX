"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { authApi } from "@/lib/api/auth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageLoader } from "@/components/PageLoader";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Check if already authenticated
    if (isAuthenticated) {
      router.push("/products");
    } else {
      setIsChecking(false);
    }
  }, [isAuthenticated, router]);

  // Show loader while checking authentication
  if (isChecking) {
    return <PageLoader message="Checking authentication..." />;
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authApi.login(email);
      dispatch(setCredentials({ token: response.token, email }));
      router.push("/products");
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
        "Failed to login. Please check your email and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hooker-green via-rich-black to-lion flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4">
            <span className="text-hooker-green font-bold text-4xl">B</span>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">BitechX Products</h1>
          <p className="text-anti-flash-white text-lg">Sign in to continue</p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Input
                type="email"
                label="Email Address"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={error}
                required
                autoFocus
              />
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            <p>Enter your email to receive authentication token</p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-anti-flash-white text-sm">
          <p>© 2025 BitechX. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}

