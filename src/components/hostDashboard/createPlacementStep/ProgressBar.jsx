import React from 'react';

const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  return (
    <div className="flex gap-2 items-center">
      {Array.from({ length: totalSteps }).map((_, index) => (
        <div
          key={index}
          className={`h-1 w-10 rounded-full transition-all duration-300 ${
            index < currentStep ? 'bg-Primary' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
};

export default ProgressBar;
