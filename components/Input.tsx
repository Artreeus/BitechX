"use client";

import React from "react";
import { motion, AnimatePresence, type HTMLMotionProps } from "framer-motion";

interface InputProps extends Omit<HTMLMotionProps<"input">, "label"> {
    label?: string;
    error?: string;
    helperText?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    helperText,
    className = "",
    ...props
}) => {
    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {label && (
                <motion.label
                    className="block text-sm font-medium text-rich-black mb-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    {label}
                    {props.required && <span className="text-chestnut ml-1">*</span>}
                </motion.label>
            )}
            <motion.input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hooker-green focus:border-transparent transition-all duration-200 ${error
                    ? "border-chestnut focus:ring-chestnut"
                    : "border-gray-300"
                    } ${className}`}
                whileFocus={{ scale: 1.01 }}
                {...props}
            />
            <AnimatePresence mode="wait">
                {error && (
                    <motion.p
                        className="mt-1 text-sm text-chestnut"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {error}
                    </motion.p>
                )}
                {helperText && !error && (
                    <motion.p
                        className="mt-1 text-sm text-gray-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {helperText}
                    </motion.p>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
