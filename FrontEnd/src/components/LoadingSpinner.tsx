import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="anime-card text-center py-12">
      <div className="relative w-20 h-20 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-spin-slow opacity-20"></div>
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-spin opacity-40"></div>
        <div className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-400 to-pink-400 animate-spin-slow"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-2xl animate-bounce">✨</div>
        </div>
      </div>
      
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        AI-chan is analyzing your code...
      </h3>
      <p className="text-gray-500">
        Please wait while we work our magic! ✨
      </p>
      
      <div className="mt-4 flex justify-center gap-1">
        <div className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"></div>
        <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
      </div>
    </div>
  );
};

export default LoadingSpinner;