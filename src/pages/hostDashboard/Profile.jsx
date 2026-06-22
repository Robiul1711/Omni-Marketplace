import React from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/redux/slices/authSlice';
import {
  AreaChart,
  Area,
  ResponsiveContainer
} from 'recharts';
import { 
  FiMail, 
  FiPlus, 
  FiDollarSign, 
  FiShoppingBag, 
  FiUsers, 
  FiBox,
  FiFacebook,
  FiInstagram,
  FiYoutube
} from 'react-icons/fi';
import { RiLineChartLine, RiWalletLine } from 'react-icons/ri';

// Dynamic continuous wave data for each of the 4 category blocks
const waveData1 = [
  { value: 35 }, { value: 30 }, { value: 25 }, { value: 22 }, 
  { value: 28 }, { value: 32 }, { value: 40 }, { value: 50 }, 
  { value: 48 }, { value: 40 }
];

const waveData2 = [
  { value: 40 }, { value: 38 }, { value: 35 }, { value: 30 }, 
  { value: 24 }, { value: 20 }, { value: 22 }, { value: 26 }, 
  { value: 25 }, { value: 20 }
];

const waveData3 = [
  { value: 20 }, { value: 22 }, { value: 26 }, { value: 25 }, 
  { value: 21 }, { value: 18 }, { value: 22 }, { value: 28 }, 
  { value: 25 }, { value: 22 }
];

const waveData4 = [
  { value: 22 }, { value: 20 }, { value: 18 }, { value: 15 }, 
  { value: 12 }, { value: 10 }, { value: 8 }, { value: 6 }, 
  { value: 5 }, { value: 3 }
];

const Profile = () => {
  const user = useSelector(selectCurrentUser);
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
      title: 'Total Order',
      value: '12',
      growth: '4.2',
      description: 'Last Month:10',
      icon: <FiShoppingBag size={22} />,
      active: false,
    },
    {
      title: 'Total Client',
      value: '1.5k',
      growth: '4.2',
      description: 'Last Month:1.4k',
      icon: <FiUsers size={22} />,
      active: false,
    },
    {
      title: 'Active Placement',
      value: '08',
      description: 'Pending:04',
      icon: <FiBox size={22} />,
      active: false,
    },
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto pb-10">
      {/* Banner & Profile Info Card */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden p-4 relative">
        {/* Office Landscape Banner */}
        <div className="relative h-[220px] sm:h-[280px] w-full rounded-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80" 
            alt="Office Banner" 
            className="w-full h-full object-cover"
          />
          {/* Overlay to soften image */}
          <div className="absolute inset-0 bg-black/5"></div>
        </div>

        {/* Profile Details & Action Buttons Panel */}
        <div className="pt-16 pb-4 px-6 flex flex-col md:flex-row md:items-center justify-between gap-6 relative">
          
          {/* Floating Profile Avatar overlapping the banner */}
          <div className="absolute -top-12 left-8 sm:left-12 w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-[6px] border-white shadow-md bg-white z-10">
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"} 
              alt={user?.name || "User Avatar"} 
              className="w-full h-full object-cover"
            />
          </div>

          {/* Info Details */}
          <div className="space-y-2 mt-2 md:mt-0">
            <h2 className="text-[24px] font-bold text-[#1A1D1F]">{user?.name || "Softech Agency"}</h2>
            <div className="flex items-center gap-2 text-[#6F767E] text-[14px]">
              <FiMail className="text-gray-400" size={18} />
              <span className="font-semibold">{user?.email || "example@gmail.com"}</span>
            </div>
          </div>

          {/* Actions on Right */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Withdraw Button */}
            <button className="flex items-center gap-2 bg-[#335CFF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-100">
              <RiWalletLine size={18} />
              Withdraw
            </button>

            {/* Create Placement Button */}
            <button className="flex items-center gap-2 bg-[#335CFF] hover:bg-blue-600 text-white font-bold text-sm px-5 py-3 rounded-xl transition-all duration-200 shadow-lg shadow-blue-100">
              <FiPlus size={18} />
              Create Placements
            </button>

            {/* Social Media Link Icons */}
            <div className="flex items-center gap-2 pl-2">
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-[#1877F2] text-white flex items-center justify-center hover:bg-blue-600 transition-colors shadow-sm"
              >
                <FiFacebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-[#EAF2FF] text-[#E1306C] border border-[#D9E6FF] flex items-center justify-center hover:bg-blue-50 transition-colors shadow-sm"
              >
                <FiInstagram size={18} />
              </a>
              <a 
                href="#" 
                className="w-11 h-11 rounded-xl bg-[#FFF0F0] text-[#FF0000] border border-[#FFE2E2] flex items-center justify-center hover:bg-red-50 transition-colors shadow-sm"
              >
                <FiYoutube size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Summary Cards Section */}
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

      {/* Bottom Section: All Categories with seamless continuous wavy chart */}
      <div className="bg-white rounded-[24px] border border-gray-100 shadow-sm overflow-hidden pt-8 pb-0">
        <h3 className="text-[20px] font-bold text-[#1A1D1F] px-8 mb-4">All Categories</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-0 w-full relative">
          
          {/* Category 1: Podcast Report */}
          <div className="flex flex-col justify-between h-[300px] hover:bg-gray-50/20 transition-colors">
            <div className="px-8 pt-2 space-y-1.5">
              <p className="text-[13px] font-bold text-[#9A9FA5]">Podcast Report</p>
              <div className="flex items-center gap-2.5">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">$2548</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
            {/* Seamless wave 1 */}
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData1} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Area type="monotone" dataKey="value" stroke="#1b3bb8" strokeWidth={0} fill="#1b3bb8" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category 2: Newsletters Report */}
          <div className="flex flex-col justify-between h-[300px] hover:bg-gray-50/20 transition-colors">
            <div className="px-8 pt-12 space-y-1.5">
              <p className="text-[13px] font-bold text-[#9A9FA5]">Newsletters Report</p>
              <div className="flex items-center gap-2.5">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">$2548</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
            {/* Seamless wave 2 */}
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData2} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Area type="monotone" dataKey="value" stroke="#2449cc" strokeWidth={0} fill="#2449cc" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category 3: YouTube Report */}
          <div className="flex flex-col justify-between h-[300px] hover:bg-gray-50/20 transition-colors">
            <div className="px-8 pt-18 space-y-1.5">
              <p className="text-[13px] font-bold text-[#9A9FA5]">YouTube Report</p>
              <div className="flex items-center gap-2.5">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">$2548</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
            {/* Seamless wave 3 */}
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData3} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Area type="monotone" dataKey="value" stroke="#2d57e0" strokeWidth={0} fill="#2d57e0" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category 4: Blog Report */}
          <div className="flex flex-col justify-between h-[300px] hover:bg-gray-50/20 transition-colors">
            <div className="px-8 pt-22 space-y-1.5">
              <p className="text-[13px] font-bold text-[#9A9FA5]">Blog Report</p>
              <div className="flex items-center gap-2.5">
                <span className="text-[24px] font-extrabold text-[#1A1D1F]">$2548</span>
                <span className="flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-[#335CFF] rounded-lg text-[11px] font-bold">
                  <RiLineChartLine size={12} />
                  4.2
                </span>
              </div>
            </div>
            {/* Seamless wave 4 */}
            <div className="h-[180px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={waveData4} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <Area type="monotone" dataKey="value" stroke="#3665f4" strokeWidth={0} fill="#3665f4" fillOpacity={1} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;