"use client";

import React, { useState } from "react";

interface SafeImageProps {
    src: string;
    alt: string;
    fill?: boolean;
    width?: number;
    height?: number;
    className?: string;
    sizes?: string;
    priority?: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({
    src,
    alt,
    fill,
    width,
    height,
    className = "",
}) => {
    const [imgSrc, setImgSrc] = useState(src);
    const [hasError, setHasError] = useState(false);
    const [useUnoptimized, setUseUnoptimized] = useState(false);

    const handleError = () => {
        if (!hasError) {
            setHasError(true);
            if (!useUnoptimized) {
                // First try: use unoptimized mode
                setUseUnoptimized(true);
            } else {
                // Second try failed: show placeholder
                setImgSrc("/placeholder.png");
            }
        }
    };

    // If we're showing placeholder and it also failed, show colored placeholder
    if (hasError && imgSrc === "/placeholder.png" && useUnoptimized) {
        return (
            <div
                className={`bg-gradient-to-br from-hooker-green to-lion flex items-center justify-center ${className}`}
                style={fill ? { position: "absolute", inset: 0 } : { width, height }}
            >
                <svg
                    className="w-12 h-12 text-anti-flash-white opacity-50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>
        );
    }

    // Use regular img tag with unoptimized for ANY external URL to avoid hostname errors
    // This bypasses Next.js image optimization completely
    if (fill) {
        return (
            // eslint-disable-next-line @next/next/no-img-element
            <img
                src={imgSrc}
                alt={alt}
                className={className}
                onError={handleError}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                }}
            />
        );
    }

    return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            className={className}
            onError={handleError}
            style={{
                width: width ? `${width}px` : "100%",
                height: height ? `${height}px` : "100%",
                objectFit: "cover",
            }}
        />
    );
};

