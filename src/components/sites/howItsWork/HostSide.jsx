import React from 'react';

const HOST_FEATURES = [
  {
    id: 1,
    title: "Connecting their personal or business screens",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
    hasBorder: true,
  },
  {
    id: 2,
    title: "Renting unused screen time",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 21h6l-.75-4M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    hasBorder: false,
  },
  {
    id: 3,
    title: "Setting their own pricing",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    hasBorder: false,
  },
];

const HostSide = () => {
  return (
    <section className="section-padding-y">
      {/* Header */}
      <div className="text-center mb-8 md:mb-12 mt-10 sm:mt-0">
        <h2 className="md:text-4xl text-2xl font-bold text-slate-900 mb-2">Host Side</h2>
        <p className="text-slate-500 md:text-lg text-base">Hosts earn income by</p>
      </div>

      {/* Cards Container */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {HOST_FEATURES.map((feature) => (
          <div
            key={feature.id}
            className={`flex flex-col items-center justify-center p-10 rounded-3xl transition-all duration-300 min-h-[280px] text-center bg-white border border-slate-200 hover:border-blue-500 shadow-sm`}
          >
            {/* Icon Container */}
            <div className="w-14 h-14 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-md">
              {feature.icon}
            </div>

            {/* Title */}
            <h3 className="text-slate-800 text-lg font-medium leading-snug max-w-[200px]">
              {feature.title}
            </h3>
          </div>
        ))}
      </div>

      {/* Footer Text */}
      <div className="text-center mt-12">
        <p className="text-slate-500 text-lg md:text-xl ">
          Their screen becomes part of a distributed advertising network.
        </p>
      </div>
    </section>
  );
};

export default HostSide;