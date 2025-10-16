"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { initializeAuth } from "@/lib/features/auth/authSlice";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(initializeAuth());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-anti-flash-white">
      {/* Navigation */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-hooker-green to-lion rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="ml-3 text-2xl font-bold text-rich-black">BitechX</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {isAuthenticated ? (
                <Link
                  href="/products"
                  className="px-6 py-2 bg-hooker-green text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-semibold"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-6 py-2 text-hooker-green hover:text-opacity-80 transition-colors font-semibold"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    className="px-6 py-2 bg-hooker-green text-white rounded-lg hover:bg-opacity-90 transition-all duration-200 font-semibold"
                  >
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-rich-black via-hooker-green to-rich-black text-white py-20 lg:py-32">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(173, 138, 100, 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(78, 110, 93, 0.4) 0%, transparent 50%)',
          }}></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
              Manage Products
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-lion to-anti-flash-white mt-2">
                With Excellence
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-anti-flash-white opacity-90 mb-8 max-w-3xl mx-auto">
              A modern, powerful platform for managing your product catalog.
              Create, edit, and organize products with ease.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/login"
                className="px-8 py-4 bg-lion text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                Start Managing Now
              </Link>
              <button
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-sm text-white rounded-lg hover:bg-opacity-20 transition-all duration-300 font-semibold text-lg border-2 border-white border-opacity-30"
              >
                Learn More
              </button>
            </div>
            <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-lion">10K+</div>
                <div className="text-sm text-anti-flash-white opacity-80 mt-1">Products</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-lion">50+</div>
                <div className="text-sm text-anti-flash-white opacity-80 mt-1">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-lion">99.9%</div>
                <div className="text-sm text-anti-flash-white opacity-80 mt-1">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 lg:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rich-black mb-4">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to manage your products efficiently
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-hooker-green to-lion rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Easy Product Creation</h3>
              <p className="text-gray-600">
                Add products quickly with our intuitive interface. Upload images, set prices, and categorize with ease.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-lion to-chestnut rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Smart Search</h3>
              <p className="text-gray-600">
                Find any product instantly with our powerful search functionality. Filter by category and search by name.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-hooker-green to-rich-black rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Category Management</h3>
              <p className="text-gray-600">
                Organize products into categories for better structure. Filter and browse by category effortlessly.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-lion to-hooker-green rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Quick Edit</h3>
              <p className="text-gray-600">
                Update product details on the fly. Edit prices, descriptions, and images with just a few clicks.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-chestnut to-lion rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Image Gallery</h3>
              <p className="text-gray-600">
                Showcase products with multiple images. Support for various image formats and CDN integration.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-anti-flash-white to-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-rich-black to-hooker-green rounded-xl flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is protected with JWT authentication and secure API endpoints. Always available when you need it.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-anti-flash-white to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-rich-black mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in three simple steps
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-24 h-24 bg-gradient-to-br from-hooker-green to-lion rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">1</span>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-4">Sign In</h3>
              <p className="text-gray-600 text-lg">
                Enter your email to receive authentication token and access your dashboard instantly.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-lion to-hooker-green opacity-30"></div>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-24 h-24 bg-gradient-to-br from-lion to-chestnut rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">2</span>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-4">Add Products</h3>
              <p className="text-gray-600 text-lg">
                Create products with names, descriptions, prices, categories, and beautiful images.
              </p>
              {/* Connector Line */}
              <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-chestnut to-hooker-green opacity-30"></div>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-chestnut to-rich-black rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl">
                <span className="text-4xl font-bold text-white">3</span>
              </div>
              <h3 className="text-2xl font-bold text-rich-black mb-4">Manage & Grow</h3>
              <p className="text-gray-600 text-lg">
                Edit, delete, search, and organize your products. Watch your catalog grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-rich-black via-hooker-green to-rich-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Trusted by Product Managers
            </h2>
            <p className="text-xl text-anti-flash-white opacity-90 max-w-2xl mx-auto">
              Join thousands of users managing their products efficiently
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-5xl font-bold text-lion mb-2">10,000+</div>
              <div className="text-anti-flash-white opacity-80">Products Managed</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-5xl font-bold text-lion mb-2">1,200+</div>
              <div className="text-anti-flash-white opacity-80">Active Users</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-5xl font-bold text-lion mb-2">50+</div>
              <div className="text-anti-flash-white opacity-80">Categories</div>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white bg-opacity-10 backdrop-blur-sm border border-white border-opacity-20">
              <div className="text-5xl font-bold text-lion mb-2">24/7</div>
              <div className="text-anti-flash-white opacity-80">Support</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-rich-black mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join BitechX today and experience the easiest way to manage your product catalog.
            No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/login"
              className="px-10 py-4 bg-gradient-to-r from-hooker-green to-lion text-white rounded-lg hover:shadow-2xl transition-all duration-300 font-semibold text-lg shadow-xl hover:scale-105 transform"
            >
              Start Free Today
            </Link>
            {isAuthenticated && (
              <Link
                href="/products"
                className="px-10 py-4 bg-rich-black text-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold text-lg"
              >
                Go to Dashboard →
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-rich-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-hooker-green to-lion rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">B</span>
                </div>
                <span className="ml-3 text-xl font-bold">BitechX</span>
              </div>
              <p className="text-anti-flash-white opacity-70">
                Modern product management made simple.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2 text-anti-flash-white opacity-70">
                <li><Link href="/products" className="hover:text-lion transition-colors">Products</Link></li>
                <li><Link href="/products/new" className="hover:text-lion transition-colors">Create Product</Link></li>
                <li><a href="#features" className="hover:text-lion transition-colors">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-anti-flash-white opacity-70">
                <li><a href="#" className="hover:text-lion transition-colors">About</a></li>
                <li><a href="#" className="hover:text-lion transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-lion transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-anti-flash-white opacity-70">
                <li><a href="#" className="hover:text-lion transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-lion transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-lion transition-colors">Security</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white border-opacity-10 pt-8 text-center text-anti-flash-white opacity-70">
            <p>© 2025 BitechX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
