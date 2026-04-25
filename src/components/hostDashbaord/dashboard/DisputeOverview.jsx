import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FiCalendar } from 'react-icons/fi';
import { RiLineChartLine } from "react-icons/ri";

const data = [
  { name: 'Disputed', value: 70 },
  { name: 'Remaining', value: 30 },
];

const COLORS = ['#335CFF', '#EFEFEF'];

const DisputeOverview = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-[20px] font-bold text-[#1A1D1F]">Dispute Over View</h2>
        <button className="p-2.5 bg-white border border-gray-100 rounded-xl text-[#6F767E] hover:bg-gray-50 transition-colors">
          <FiCalendar size={20} />
        </button>
      </div>

      <div className="relative flex-1 flex flex-col items-center justify-center min-h-[250px]">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="80%"
                startAngle={180}
                endAngle={0}
                innerRadius="65%"
                outerRadius="95%"
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        
        {/* Percentage Label */}
        <div className="absolute top-[55%] left-1/2 -translate-x-1/2 flex flex-col items-center">
          <h3 className="text-[42px] font-bold text-[#1A1D1F] leading-tight">70.0%</h3>
          <p className="text-[14px] font-medium text-[#6F767E]">Total Dispute</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
          <p className="text-[13px] font-medium text-[#6F767E]">Number Of Dispute</p>
          <div className="flex items-center justify-between mt-3">
            <h4 className="text-[24px] font-bold text-[#1A1D1F]">102</h4>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
              <RiLineChartLine size={12} />
              4.2
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-50">
          <p className="text-[13px] font-medium text-[#6F767E]">Number Of Amount</p>
          <div className="flex items-center justify-between mt-3">
            <h4 className="text-[24px] font-bold text-[#1A1D1F]">$2016</h4>
            <div className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
              <RiLineChartLine size={12} />
              4.2
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisputeOverview;
