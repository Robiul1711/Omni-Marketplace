import React from 'react';

// --- Sub-Component for the Checkmark List ---
const CheckItem = ({ text }) => (
  <li className="flex items-start mb-4">
    <div className="mt-1 mr-3 flex-shrink-0">
      <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <span className="text-slate-600 text-sm md:text-base">{text}</span>
  </li>
);

const WhatWeDo = () => {
  const platformFeatures = [
    "Placement discovery and booking",
    "Campaign scheduling",
    "Content delivery to host screens",
    "Payment processing through escrow",
    "Verification of campaign completion"
  ];

  return (

      <div className="">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Side: Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mb-6">
                What We Do
              </h2>
              <p className="text-lg md:text-xl text-slate-500 font-medium">
                Omni Marketplace operates as a two-sided system:
              </p>
            </div>

            <div className="space-y-10">
              {/* Point 1 */}
              <div className="flex gap-6">
                <span className="text-5xl md:text-6xl font-bold text-blue-100 leading-none">1</span>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed pt-2">
                  Advertisers can create, schedule, and launch advertising 
                  campaigns using simple tools and third-party design 
                  platforms such as Canva.
                </p>
              </div>

              {/* Point 2 */}
              <div className="flex gap-6">
                <span className="text-5xl md:text-6xl font-bold text-blue-100 leading-none">2</span>
                <p className="text-slate-600 text-sm md:text-base leading-relaxed pt-2">
                  Hosts provide access to screens (TVs, monitors, tablets, 
                  or connected devices) that display or stream these 
                  campaigns during booked time slots.
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Platform Handles Card */}
          <div className="relative">
            {/* Soft decorative background shape */}
            <div className="absolute inset-0 bg-slate-50/50 rounded-[40px] transform translate-x-4 translate-y-4 -z-10"></div>
            
            <div className="bg-slate-50/30 border border-white backdrop-blur-sm rounded-[40px] p-8 md:p-12 shadow-sm">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-700 mb-8">
                The platform handles:
              </h3>
              <ul className="space-y-2">
                {platformFeatures.map((feature, index) => (
                  <CheckItem key={index} text={feature} />
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>

  );
};

export default WhatWeDo;