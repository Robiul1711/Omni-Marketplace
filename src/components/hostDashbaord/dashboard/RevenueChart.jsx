import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 45, orders: 15 },
  { name: 'Feb', revenue: 72, orders: 18 },
  { name: 'Mar', revenue: 32, orders: 14 },
  { name: 'Apr', revenue: 55, orders: 20 },
  { name: 'May', revenue: 42, orders: 16 },
  { name: 'Jun', revenue: 78, orders: 22 },
  { name: 'July', revenue: 48, orders: 12 },
  { name: 'Aug', revenue: 38, orders: 14 },
  { name: 'Sep', revenue: 52, orders: 18 },
  { name: 'Oct', revenue: 88, orders: 25 },
  { name: 'Nov', revenue: 65, orders: 20 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl border border-gray-100 rounded-2xl">
        <p className="text-[14px] font-bold text-[#1A1D1F] mb-2">{label} 2026</p>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#335CFF]"></div>
            <p className="text-[13px] text-[#6F767E]">Total Revenges</p>
            <p className="text-[13px] font-bold text-[#1A1D1F] ml-auto">${payload[0].value}0</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EFEFEF]"></div>
            <p className="text-[13px] text-[#6F767E]">Total Order</p>
            <p className="text-[13px] font-bold text-[#1A1D1F] ml-auto">{payload[1].value}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RevenueChart = () => {
  return (
    <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm h-full">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-[20px] font-bold text-[#1A1D1F]">Revenges and Order</h2>
          <p className="text-[14px] text-[#6F767E] mt-1">View your income in a certain period of time</p>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#335CFF] rounded-[4px]"></div>
            <span className="text-[13px] font-medium text-[#6F767E]">Revenges</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#EFEFEF] rounded-[4px]"></div>
            <span className="text-[13px] font-medium text-[#6F767E]">Order</span>
          </div>
        </div>
      </div>

      <div className="h-[350px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 0, right: 0, left: -20, bottom: 0 }}
            barSize={32}
          >
            <CartesianGrid vertical={false} stroke="#F5F5F5" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9A9FA5', fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#9A9FA5', fontSize: 12, fontWeight: 500 }}
              tickFormatter={(value) => `${value}K`}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
            <Bar 
              dataKey="revenue" 
              stackId="a" 
              fill="#335CFF" 
              radius={[0, 0, 0, 0]} 
            />
            <Bar 
              dataKey="orders" 
              stackId="a" 
              fill="#EFEFEF" 
              radius={[8, 8, 0, 0]} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;
