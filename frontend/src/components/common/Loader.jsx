import React from 'react';

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full gap-4">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-l-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 rounded-full blur-sm opacity-40 bg-blue-500"></div>
      </div>
      <p className="text-blue-400 text-lg animate-pulse">Loading, please wait...</p>
    </div>
  );
};

export default Loader;
