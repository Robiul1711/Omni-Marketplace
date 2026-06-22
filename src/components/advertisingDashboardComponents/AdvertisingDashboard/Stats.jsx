import React from 'react';
import { FiBox, FiClock, FiCheckCircle, FiDollarSign } from 'react-icons/fi';

const Stats = () => {
  const statsData = [
    {
      label: 'Active Campaigns',
      value: '0',
      description: 'Campaigns currently running.',
      icon: <FiBox size={24} />,
      active: true,
    },
    {
      label: 'Pending Approval',
      value: '0',
      description: 'Awaiting host confirmation.',
      icon: <FiClock size={24} />,
      active: false,
    },
    {
      label: 'Completed Campaigns',
      value: '0',
      description: 'Campaigns successfully delivered.',
      icon: <FiCheckCircle size={24} />,
      active: false,
    },
    {
      label: 'Total Spend',
      value: '$0',
      description: 'Total amount spent on placements.',
      icon: <FiDollarSign size={24} />,
      active: false,
    },
  ];

  return (
    <div className="space-y-6 md:space-y-8 mb-10">
      <div>
        <h1 className="text-2xl md:text-[28px] font-bold text-[#1A1D1F]">Welcome Back</h1>
        <p className="text-[#6F767E] text-sm md:text-[15px] mt-2">Manage your advertising campaigns and bookings from your dashboard.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className={`relative p-6 rounded-[24px] overflow-hidden ${
              stat.active
                ? 'bg-gradient-to-br from-[#3366FF] to-[#80A0FF] text-white shadow-xl shadow-blue-100'
                : 'bg-white border border-gray-100 shadow-sm'
            }`}
          >
            <div className="flex flex-col h-full justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-[13px] font-medium ${stat.active ? 'text-blue-50' : 'text-[#6F767E]'}`}>
                    {stat.label}
                  </p>
                  <h2 className="text-[32px] font-bold mt-2 tracking-tight">{stat.value}</h2>
                </div>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                  stat.active ? 'bg-white text-[#3366FF]' : 'bg-[#1A1D1F] text-white'
                }`}>
                  {stat.icon}
                </div>
              </div>
              <p className={`text-[13px] mt-4 ${stat.active ? 'text-blue-50' : 'text-[#6F767E]'}`}>
                {stat.description}
              </p>
            </div>
            
            {/* Subtle background decoration if active */}
            {stat.active && (
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stats;