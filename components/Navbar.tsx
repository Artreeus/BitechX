"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { logout } from "@/lib/features/auth/authSlice";
import { Button } from "./Button";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { email, isAuthenticated } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  if (!isAuthenticated) return null;

  return (
    <nav className="bg-rich-black text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-hooker-green rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold">BitechX</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              href="/products"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === "/products"
                  ? "bg-hooker-green text-white"
                  : "text-gray-300 hover:bg-white hover:bg-opacity-10"
              }`}
            >
              Products
            </Link>
            <Link
              href="/products/new"
              className={`px-4 py-2 rounded-lg transition-colors ${
                pathname === "/products/new"
                  ? "bg-hooker-green text-white"
                  : "text-gray-300 hover:bg-white hover:bg-opacity-10"
              }`}
            >
              Add Product
            </Link>
          </div>

          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-300 hidden sm:block">
              {email}
            </span>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3 space-x-2">
          <Link
            href="/products"
            className={`inline-block px-3 py-1.5 rounded-lg text-sm transition-colors ${
              pathname === "/products"
                ? "bg-hooker-green text-white"
                : "text-gray-300 hover:bg-white hover:bg-opacity-10"
            }`}
          >
            Products
          </Link>
          <Link
            href="/products/new"
            className={`inline-block px-3 py-1.5 rounded-lg text-sm transition-colors ${
              pathname === "/products/new"
                ? "bg-hooker-green text-white"
                : "text-gray-300 hover:bg-white hover:bg-opacity-10"
            }`}
          >
            Add Product
          </Link>
        </div>
      </div>
    </nav>
  );
};

