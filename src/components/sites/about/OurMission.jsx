import React from 'react';
import { CheckCircle } from 'lucide-react'; // Optional: Install lucide-react for icons

const OurMission = () => {
  const objectives = [
    "Make advertising more accessible to businesses of all sizes",
    "Enable hosts to generate passive income from everyday devices",
    "Build a scalable infrastructure for real-time digital placement distribution",
  ];

  return (
 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Content: The Mission Text */}
        <div className="flex-1 text-left">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mb-8">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl">
            Our mission is to simplify and modernize digital advertising by removing 
            unnecessary complexity and creating a direct, structured connection 
            between advertising demand and available screen-based supply.
          </p>
        </div>

        {/* Right Content: The Aim Card */}
        <div className="flex-1 w-full ">
          <div className="bg-slate-50/50 border border-slate-100 rounded-3xl p-8 md:p-12 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-8">
              We aim to:
            </h3>
            <ul className="space-y-6">
              {objectives.map((text, index) => (
                <li key={index} className="flex items-start gap-4">
                  <CheckCircle className="w-6 h-6 text-emerald-500 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-600 leading-snug">
                    {text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

      </div>

  );
};

export default OurMission;