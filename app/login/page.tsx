"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { setCredentials } from "@/lib/features/auth/authSlice";
import { authApi } from "@/lib/api/auth";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { PageLoader } from "@/components/PageLoader";
import { motion } from "framer-motion";

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
    } catch (err: unknown) {
      const errorMessage = err instanceof Error && 'response' in err 
        ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
        : undefined;
      setError(
        errorMessage || "Failed to login. Please check your email and try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hooker-green via-rich-black to-lion flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Logo/Brand */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-xl mb-4"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.span
              className="text-hooker-green font-bold text-4xl"
              animate={{ rotate: [0, -5, 5, -5, 0] }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              B
            </motion.span>
          </motion.div>
          <motion.h1
            className="text-4xl font-bold text-white mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            BitechX Products
          </motion.h1>
          <motion.p
            className="text-anti-flash-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to continue
          </motion.p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
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
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full"
                isLoading={isLoading}
              >
                Sign In
              </Button>
            </motion.div>
          </form>

          <motion.div
            className="mt-6 text-center text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <p>Enter your email to receive authentication token</p>
          </motion.div>
        </motion.div>

        {/* Footer */}
        <motion.div
          className="mt-8 text-center text-anti-flash-white text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <p>© 2025 BitechX. All rights reserved.</p>
        </motion.div>
      </motion.div>
    </div>
  );
}

