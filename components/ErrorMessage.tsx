import React from "react";

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onRetry,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <div className="bg-chestnut bg-opacity-10 border border-chestnut rounded-lg p-6 max-w-md w-full">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-6 w-6 text-chestnut"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="ml-3 flex-1">
            <h3 className="text-sm font-medium text-chestnut">Error</h3>
            <p className="mt-2 text-sm text-gray-700">{message}</p>
            {onRetry && (
              <button
                onClick={onRetry}
                className="mt-4 text-sm font-medium text-hooker-green hover:text-hooker-green-dark transition-colors"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

