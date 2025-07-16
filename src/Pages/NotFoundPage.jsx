import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-indigo-100 px-4">
      <div className="flex flex-col items-center">
        <svg className="w-32 h-32 text-indigo-400 mb-6" fill="none" stroke="currentColor" viewBox="0 0 48 48">
          <circle cx="24" cy="24" r="22" strokeWidth="4" className="text-indigo-200" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M16 20c0-2.21 3.582-4 8-4s8 1.79 8 4m-8 8v.01" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M20 32h8" />
        </svg>
        <h1 className="text-4xl font-extrabold text-gray-800 mb-2">404 - Not Found</h1>
        <p className="text-lg text-gray-600 mb-8 text-center max-w-md">Sorry, the page you are looking for does not exist or has been moved.</p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors shadow-md hover:shadow-lg"
        >
          Go to Homepage
        </button>
      </div>
    </div>
  );
}

export default NotFoundPage; 