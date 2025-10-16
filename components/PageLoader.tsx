"use client";

import React from "react";

interface PageLoaderProps {
    message?: string;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-rich-black via-hooker-green to-rich-black flex items-center justify-center">
            <div className="text-center">
                {/* Animated Loader */}
                <div className="relative w-32 h-32 mx-auto mb-8">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 border-4 border-anti-flash-white border-opacity-20 rounded-full"></div>

                    {/* Spinning Ring */}
                    <div className="absolute inset-0 border-4 border-transparent border-t-lion border-r-lion rounded-full animate-spin"></div>

                    {/* Inner Pulse */}
                    <div className="absolute inset-4 bg-hooker-green rounded-full animate-pulse opacity-50"></div>

                    {/* Center Icon */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            className="w-12 h-12 text-anti-flash-white animate-pulse"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </div>
                </div>

                {/* Loading Text */}
                <div className="space-y-3">
                    <h2 className="text-2xl font-bold text-anti-flash-white animate-pulse">
                        {message}
                    </h2>
                    <div className="flex justify-center gap-2">
                        <span className="w-2 h-2 bg-lion rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></span>
                        <span className="w-2 h-2 bg-lion rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></span>
                        <span className="w-2 h-2 bg-lion rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

