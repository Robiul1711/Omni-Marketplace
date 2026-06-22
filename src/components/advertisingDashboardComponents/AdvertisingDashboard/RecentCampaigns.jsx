import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { Link } from 'react-router-dom';

const RecentCampaigns = () => {
  const campaigns = [];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active':
        return 'bg-[#E7F9F0] text-[#00A361]';
      case 'Delivered':
        return 'bg-[#F2EFFF] text-[#6348F2]';
      case 'Pending':
        return 'bg-[#FFF8E7] text-[#FFB303]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-4 md:p-6 shadow-sm overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
        <h2 className="text-lg md:text-[20px] font-bold text-[#1A1D1F]">Recent Campaigns</h2>
        
        <div className="relative w-full sm:w-auto">
          <button className="w-full sm:w-auto flex items-center justify-between sm:justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-[#1A1D1F] hover:bg-gray-50 transition-colors">
            <span className="flex items-center gap-1">Sort by: <span className="text-gray-500 font-normal">Status</span></span>
            <MdKeyboardArrowDown size={18} className="text-gray-400" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider w-[120px]">Campaign No.</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider">Placement</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider">Host</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#6F767E] uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {campaigns.length === 0 ? (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-[14px] text-[#6F767E] font-medium bg-white">
                  No recent campaigns found
                </td>
              </tr>
            ) : (
              campaigns.map((camp, index) => (
                <tr 
                  key={index} 
                  className="group border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-5 text-[14px] font-bold text-gray-800">{camp.no}</td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#1A1D1F]">{camp.placement}</td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#1A1D1F]">{camp.host}</td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${getStatusStyle(camp.status)}`}>
                      {camp.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-[14px] font-medium text-[#6F767E]">{camp.startDate}</td>
                  <td className="px-6 py-5 text-[14px] font-bold text-[#1A1D1F]">{camp.amount}</td>
                  <td className="px-6 py-5 text-right">
                    <Link 
                      to={`/advertising/dashboard/campaign/${index + 1}`}
                      className="text-[14px] font-bold text-[#3366FF] hover:underline decoration-offset-2"
                    >
                      View Campaign
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentCampaigns;