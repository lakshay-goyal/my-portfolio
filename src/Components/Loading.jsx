import React from 'react';

function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[40vh] w-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-500 mb-4"></div>
      <span className="text-indigo-700 text-lg font-semibold tracking-wide">Loading...</span>
    </div>
  );
}

export default Loading; 