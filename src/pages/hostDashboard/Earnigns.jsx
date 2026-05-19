import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  FiDollarSign, 
  FiClock, 
  FiXCircle, 
  FiCalendar, 
  FiChevronDown 
} from 'react-icons/fi';
import { RiLineChartLine } from 'react-icons/ri';
import { GoArrowUpRight, GoArrowDownRight } from 'react-icons/go';

// Data for double curve area chart
const chartData = [
  { name: 'Jan', revenues: 15, orders: 15 },
  { name: 'Feb', revenues: 28, orders: 25 },
  { name: 'Mar', revenues: 20, orders: 18 },
  { name: 'Apr', revenues: 42, orders: 38 },
  { name: 'May', revenues: 70, orders: 30 },
  { name: 'Jun', revenues: 50, orders: 28 },
  { name: 'July', revenues: 38, orders: 24 },
  { name: 'Aug', revenues: 50, orders: 16 },
  { name: 'Sep', revenues: 38, orders: 22 },
  { name: 'Oct', revenues: 22, orders: 30 },
  { name: 'Nov', revenues: 12, orders: 12 },
];

// 20 segments for the semi-circle dispute overview
// 14 segments are blue (70%), 6 segments are gray (30%)
const disputeSegments = Array.from({ length: 20 }, (_, i) => ({
  value: 1,
  color: i < 14 ? '#335CFF' : '#EAEAEB'
}));

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 shadow-xl border border-gray-100 rounded-2xl min-w-[150px] animate-in fade-in zoom-in-95 duration-150">
        <p className="text-[14px] font-bold text-[#1A1D1F] mb-3">{label} 2026</p>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#335CFF]"></div>
            <span className="text-[13px] text-[#6F767E]">Total Revenues</span>
            <span className="text-[13px] font-bold text-[#1A1D1F] ml-auto">${payload[0]?.value ? payload[0].value * 10 : 420}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-[#EAEAEB]"></div>
            <span className="text-[13px] text-[#6F767E]">Total Order</span>
            <span className="text-[13px] font-bold text-[#1A1D1F] ml-auto">{payload[1]?.value ? Math.round(payload[1].value / 3) : 12}</span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const Earnigns = () => {
  const [selectedDropdown, setSelectedDropdown] = useState('Pending');

  const stats = [
    {
      title: 'Total Earning',
      value: '2026',
      growth: '4.2',
      description: 'Last Month:2000',
      icon: <FiDollarSign size={22} />,
      active: true,
    },
    {
      title: 'In Escrow',
      value: '1.5k',
      description: '3 active campaigns',
      icon: <FiDollarSign size={22} />,
      active: false,
    },
    {
      title: 'Total Pending',
      value: '1.5k',
      description: 'Panding:04',
      icon: <FiClock size={22} />,
      active: false,
    },
    {
      title: 'Total Dispute',
      value: '1.5k',
      growth: '4.2',
      growthRed: true,
      description: 'Last Month:1.4k',
      icon: <FiXCircle size={22} />,
      active: false,
    },
  ];

  const transactions = [
    { id: 'ORD-001', business: 'Gamegoer pro', date: '12/01/2026', amount: '$570', status: 'Pending' },
    { id: 'ORD-001', business: 'Gamegoer pro', date: '12/01/2026', amount: '$570', status: 'Escrow' },
    { id: 'ORD-001', business: 'Gamegoer pro', date: '12/01/2026', amount: '$570', status: 'Escrow' },
    { id: 'ORD-001', business: 'Gamegoer pro', date: '12/01/2026', amount: '$570', status: 'Pending' },
    { id: 'ORD-001', business: 'Gamegoer pro', date: '12/01/2026', amount: '$570', status: 'Escrow' },
  ];

  const recentPayments = [
    { title: 'Payment for ORD-001', date: 'Feb 20, 2026', amount: '$499', type: 'incoming' },
    { title: 'Payment for ORD-001', date: 'Feb 20, 2026', amount: '$499', type: 'incoming' },
    { title: 'Payment for ORD-001', date: 'Feb 20, 2026', amount: '$499', type: 'incoming' },
    { title: 'Payment for ORD-001', date: 'Feb 20, 2026', amount: '$499', type: 'outgoing' },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* 4 Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-[24px] relative overflow-hidden transition-all duration-300 ${
              stat.active
                ? 'bg-gradient-to-br from-[#335CFF] to-[#6080FF] text-white shadow-xl shadow-blue-200/50'
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
                    <h2 className="text-[36px] font-bold tracking-tight leading-none">{stat.value}</h2>
                    {stat.growth && (
                      <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-[12px] font-bold ${
                        stat.active 
                          ? 'bg-white/20 text-white' 
                          : stat.growthRed 
                            ? 'bg-[#FDF2F2] text-[#F04438]' 
                            : 'bg-blue-50 text-[#335CFF]'
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
              <p className={`text-[13px] mt-5 font-semibold ${stat.active ? 'text-blue-100' : 'text-[#6F767E]'}`}>
                {stat.description}
              </p>
            </div>
            
            {stat.active && (
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            )}
          </div>
        ))}
      </div>

      {/* Middle Section: Financial Overview & Dispute Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Overview */}
        <div className="lg:col-span-2 bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-[20px] font-bold text-[#1A1D1F]">Financial Overview</h2>
              <p className="text-[14px] text-[#6F767E] mt-1">View your income in a certain period of time</p>
            </div>
            {/* Custom Legend */}
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#335CFF] rounded-[4px]"></div>
                <span className="text-[13px] font-semibold text-[#6F767E]">Revenues</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-[#EAEAEB] rounded-[4px]"></div>
                <span className="text-[13px] font-semibold text-[#6F767E]">Order</span>
              </div>
            </div>
          </div>

          <div className="h-[340px] w-full mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorRevenues" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#335CFF" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#335CFF" stopOpacity={0.0}/>
                  </linearGradient>
                  <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFB303" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FFB303" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  vertical={false} 
                  stroke="#F5F5F5" 
                  strokeDasharray="4 4"
                />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9A9FA5', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#9A9FA5', fontSize: 12, fontWeight: 600 }}
                  tickFormatter={(val) => `${val}K`}
                  domain={[0, 90]}
                  ticks={[10, 20, 30, 40, 50, 60, 70, 80, 90]}
                />
                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ stroke: '#1A1D1F', strokeWidth: 1, strokeDasharray: '0' }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="revenues" 
                  stroke="#335CFF" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorRevenues)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#335CFF' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="orders" 
                  stroke="#FFA726" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorOrders)" 
                  activeDot={{ r: 6, strokeWidth: 0, fill: '#FFA726' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dispute Overview */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-[20px] font-bold text-[#1A1D1F]">Dispute Over View</h2>
            <button className="p-2.5 bg-white border border-gray-150 rounded-xl text-[#1A1D1F] hover:bg-gray-50 transition-colors">
              <FiCalendar size={20} />
            </button>
          </div>

          {/* Segmented radial gauge */}
          <div className="relative flex-1 flex items-center justify-center min-h-[220px]">
            <div className="w-full h-full absolute">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={disputeSegments}
                    dataKey="value"
                    cx="50%"
                    cy="80%"
                    startAngle={180}
                    endAngle={0}
                    innerRadius="70%"
                    outerRadius="95%"
                    paddingAngle={3}
                    stroke="none"
                  >
                    {disputeSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            {/* Center labels */}
            <div className="absolute top-[60%] flex flex-col items-center">
              <span className="text-[42px] font-extrabold text-[#1A1D1F] tracking-tight leading-none">70.0%</span>
              <span className="text-[13px] font-bold text-[#6F767E] mt-3">Total Dispute</span>
            </div>
          </div>

          {/* Two small cards at bottom */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[13px] font-bold text-[#6F767E]">Number Of Dispute</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">102</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
            
            <div className="bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
              <p className="text-[13px] font-bold text-[#6F767E]">Number Of Amount</p>
              <div className="flex items-center justify-between mt-3">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">$2016</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Transaction Information & Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Transaction Information */}
        <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-[20px] font-bold text-[#1A1D1F]">Transection Information</h2>
            
            {/* Yellow status selector dropdown button */}
            <div className="relative">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#FFF8E7] hover:bg-[#FFF2D4] text-[#D48C00] font-bold text-xs rounded-xl transition-colors">
                {selectedDropdown}
                <FiChevronDown size={14} />
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="pb-4 w-12">
                    <input 
                      type="checkbox" 
                      className="w-4 h-4 rounded border-gray-300 text-[#335CFF] focus:ring-[#335CFF]" 
                    />
                  </th>
                  <th className="pb-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Order Id</th>
                  <th className="pb-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Business</th>
                  <th className="pb-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Delivery Date</th>
                  <th className="pb-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Amount</th>
                  <th className="pb-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {transactions.map((tx, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="py-4">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 rounded border-gray-300 text-[#335CFF] focus:ring-[#335CFF]" 
                      />
                    </td>
                    <td className="py-4 text-[14px] font-semibold text-[#6F767E]">{tx.id}</td>
                    <td className="py-4 text-[14px] font-bold text-[#1A1D1F]">{tx.business}</td>
                    <td className="py-4 text-[14px] font-semibold text-[#6F767E]">{tx.date}</td>
                    <td className="py-4 text-[14px] font-bold text-[#1A1D1F]">{tx.amount}</td>
                    <td className="py-4 text-center">
                      <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold ${
                        tx.status === 'Pending' 
                          ? 'bg-[#FFF8E7] text-[#FFB303]' 
                          : 'bg-[#EAF5F2] text-[#00B087]'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Transactions List */}
        <div className="bg-white p-6 rounded-[24px] border border-gray-100 shadow-sm flex flex-col justify-between">
          <h2 className="text-[20px] font-bold text-[#1A1D1F] mb-6">Recent Transaction</h2>
          
          <div className="space-y-5 flex-1 flex flex-col justify-between">
            {recentPayments.map((payment, idx) => (
              <div key={idx} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  {/* Circular icon indicator */}
                  <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                    payment.type === 'incoming' 
                      ? 'bg-[#E7F9F0] text-[#00A361]' 
                      : 'bg-[#FFF0F0] text-[#FF4D4D]'
                  }`}>
                    {payment.type === 'incoming' ? (
                      <GoArrowUpRight size={18} />
                    ) : (
                      <GoArrowDownRight size={18} />
                    )}
                  </div>
                  
                  <div>
                    <h4 className="text-[14px] font-bold text-[#1A1D1F]">{payment.title}</h4>
                    <p className="text-[12px] font-medium text-[#9A9FA5] mt-1">{payment.date}</p>
                  </div>
                </div>
                
                <span className={`text-[15px] font-bold ${
                  payment.type === 'incoming' ? 'text-[#1A1D1F]' : 'text-[#FF4D4D]'
                }`}>
                  {payment.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Earnigns;