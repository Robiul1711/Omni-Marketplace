import React from 'react';
import { FiDollarSign, FiShoppingBag, FiBox, FiUsers } from 'react-icons/fi';
import { BsArrowUpRight } from 'react-icons/bs';
import { RiLineChartLine } from "react-icons/ri";

const StatsCards = () => {
  const stats = [
    {
      title: 'Total Earning',
      value: '$0',
      growth: '0',
      description: 'Last Month: $0',
      icon: <FiDollarSign size={24} />,
      active: true,
    },
    {
      title: 'Total Order',
      value: '0',
      growth: '0',
      description: 'Last Month: 0',
      icon: <FiShoppingBag size={24} />,
      active: false,
    },
    {
      title: 'Active Placement',
      value: '0',
      description: 'Pending: 0',
      icon: <FiBox size={24} />,
      active: false,
    },
    {
      title: 'Total Client',
      value: '0',
      growth: '0',
      description: 'Last Month: 0',
      icon: <FiUsers size={24} />,
      active: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className={`p-6 rounded-[24px] relative overflow-hidden transition-all duration-300 ${
            stat.active
              ? 'bg-gradient-to-br from-[#335CFF] to-[#6080FF] text-white shadow-xl shadow-blue-200'
              : 'bg-white border border-gray-100 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex flex-col h-full justify-between relative z-10">
            <div className="flex items-start justify-between">
              <div>
                <p className={`text-[14px] font-medium ${stat.active ? 'text-blue-100' : 'text-[#6F767E]'}`}>
                  {stat.title}
                </p>
                <div className="flex items-baseline gap-3 mt-3">
                  <h2 className="text-[36px] font-bold tracking-tight">{stat.value}</h2>
                  {stat.growth && (
                    <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[12px] font-bold ${
                      stat.active ? 'bg-white/20 text-white' : 'bg-blue-50 text-[#335CFF]'
                    }`}>
                      <RiLineChartLine size={14} />
                      {stat.growth}
                    </div>
                  )}
                </div>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                stat.active ? 'bg-white text-[#335CFF]' : 'bg-[#1A1D1F] text-white'
              }`}>
                {stat.icon}
              </div>
            </div>
            <p className={`text-[13px] mt-4 font-medium ${stat.active ? 'text-blue-100' : 'text-[#6F767E]'}`}>
              {stat.description}
            </p>
          </div>
          
          {/* Decorative element for active card */}
          {stat.active && (
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
