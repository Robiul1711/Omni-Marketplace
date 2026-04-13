import React from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

const PaymentHistory = () => {
  const payments = [
    {
      date: 'March 15, 2025',
      placement: 'Mid-Roll Ad – Tech Podcast',
      amount: '$299.00',
      status: 'Holding',
    },
    {
      date: 'March 15, 2025',
      placement: 'Mid-Roll Ad – Tech Podcast',
      amount: '$299.00',
      status: 'Released',
    },
    {
      date: 'March 15, 2025',
      placement: 'Mid-Roll Ad – Tech Podcast',
      amount: '$299.00',
      status: 'Refunded',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Holding':
        return 'bg-[#FFF8E7] text-[#FFB303]';
      case 'Released':
        return 'bg-[#E7F9F0] text-[#00A361]';
      case 'Refunded':
        return 'bg-[#F2EFFF] text-[#6348F2]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div>
        <h1 className="text-2xl md:text-[28px] font-bold text-[#1A1D1F]">Payment History</h1>
        <p className="text-[#6F767E] text-sm md:text-[15px] mt-2">Track all your campaign payments and escrow transactions.</p>
      </div>

      <div className="bg-white rounded-[24px] border border-gray-100 p-4 md:p-6 shadow-sm overflow-hidden">
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center gap-3 md:gap-4 mb-8 md:mb-10">
          <div className="relative w-full lg:min-w-[180px]">
            <button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-[#1A1D1F] hover:bg-gray-50 transition-colors">
              All Status
              <MdKeyboardArrowDown size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="relative w-full lg:min-w-[220px]">
            <button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-[#1A1D1F] hover:bg-gray-50 transition-colors">
              All Escrow Status
              <MdKeyboardArrowDown size={18} className="text-gray-400" />
            </button>
          </div>
          <div className="relative w-full lg:min-w-[180px]">
            <button className="w-full flex items-center justify-between gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-[14px] font-medium text-[#1A1D1F] hover:bg-gray-50 transition-colors">
              Last 30 Days
              <MdKeyboardArrowDown size={18} className="text-gray-400" />
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-5 md:-mx-8">
          <table className="w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-50">
                <th className="px-5 md:px-8 py-4 text-[13px] md:text-[14px] font-bold text-[#1A1D1F]">Date</th>
                <th className="px-5 md:px-8 py-4 text-[13px] md:text-[14px] font-bold text-[#1A1D1F] text-center">Placements</th>
                <th className="px-5 md:px-8 py-4 text-[13px] md:text-[14px] font-bold text-[#1A1D1F] text-center">Amount</th>
                <th className="px-5 md:px-8 py-4 text-[13px] md:text-[14px] font-bold text-[#1A1D1F] text-right">Status</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment, index) => (
                <tr 
                  key={index} 
                  className="group border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
                >
                  <td className="px-5 md:px-8 py-5 md:py-6 text-[13px] md:text-[14px] font-medium text-[#6F767E] whitespace-nowrap">{payment.date}</td>
                  <td className="px-5 md:px-8 py-5 md:py-6 text-[13px] md:text-[14px] font-medium text-[#1A1D1F] text-center">{payment.placement}</td>
                  <td className="px-5 md:px-8 py-5 md:py-6 text-[15px] md:text-[16px] font-bold text-[#1A1D1F] text-center">{payment.amount}</td>
                  <td className="px-5 md:px-8 py-5 md:py-6 text-right">
                    <span className={`inline-flex items-center justify-center min-w-[90px] md:min-w-[100px] px-3 md:px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-bold ${getStatusStyle(payment.status)}`}>
                      {payment.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PaymentHistory;

