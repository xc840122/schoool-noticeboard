'use client'

import React from 'react';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

const ErrorPage: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops! Something went wrong.</h1>
        <p className="text-lg text-gray-700 mb-4">{error.message}</p>
        <button
          onClick={() => reset()}
          className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;