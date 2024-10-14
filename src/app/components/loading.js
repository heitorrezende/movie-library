import React from 'react';

const Loading = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-red-600">
      <div className="spinner border-t-4 border-red-600 rounded-full w-16 h-16 mb-4"></div>
      <p className="text-xl">Loading...</p>
    </div>
  );
};

export default Loading;