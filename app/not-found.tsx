"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-br from-rich-black via-hooker-green to-rich-black flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                {/* 404 Animation */}
                <div className="relative mb-8">
                    <h1 className="text-9xl font-bold text-anti-flash-white opacity-10 select-none">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-6xl animate-bounce">🔍</div>
                    </div>
                </div>

                {/* Content */}
                <h2 className="text-4xl font-bold text-anti-flash-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-anti-flash-white opacity-80 mb-8">
                    Oops! The page you're looking for seems to have wandered off.
                    <br />
                    Don't worry, let's get you back on track.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => router.back()}
                        className="px-8 py-3 bg-hooker-green text-anti-flash-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        ← Go Back
                    </button>
                    <Link
                        href="/products"
                        className="px-8 py-3 bg-lion text-anti-flash-white rounded-lg hover:bg-opacity-90 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105"
                    >
                        View Products
                    </Link>
                </div>

                {/* Additional Links */}
                <div className="mt-12 pt-8 border-t border-anti-flash-white border-opacity-20">
                    <p className="text-anti-flash-white opacity-60 mb-4">
                        Looking for something specific?
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <Link
                            href="/"
                            className="text-lion hover:text-anti-flash-white transition-colors"
                        >
                            Home
                        </Link>
                        <span className="text-anti-flash-white opacity-30">•</span>
                        <Link
                            href="/products/new"
                            className="text-lion hover:text-anti-flash-white transition-colors"
                        >
                            Create Product
                        </Link>
                        <span className="text-anti-flash-white opacity-30">•</span>
                        <Link
                            href="/login"
                            className="text-lion hover:text-anti-flash-white transition-colors"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

