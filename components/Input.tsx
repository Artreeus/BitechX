import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
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
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-rich-black mb-1">
                    {label}
                    {props.required && <span className="text-chestnut ml-1">*</span>}
                </label>
            )}
            <input
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-hooker-green focus:border-transparent transition-all duration-200 ${error
                        ? "border-chestnut focus:ring-chestnut"
                        : "border-gray-300"
                    } ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-chestnut">{error}</p>}
            {helperText && !error && (
                <p className="mt-1 text-sm text-gray-500">{helperText}</p>
            )}
        </div>
    );
};

