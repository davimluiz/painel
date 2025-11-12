import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-lg animate-pulse">
      <div className="h-7 w-3/4 bg-gray-700 rounded-md mb-4"></div>
      <div className="h-4 w-1/2 bg-gray-700 rounded-md mb-2"></div>
      <div className="h-4 w-2/3 bg-gray-700 rounded-md mb-2"></div>
      <div className="h-4 w-5/6 bg-gray-700 rounded-md mb-3"></div>
      <div className="h-4 w-1/3 bg-gray-700 rounded-md"></div>
    </div>
  );
};

export default SkeletonCard;
