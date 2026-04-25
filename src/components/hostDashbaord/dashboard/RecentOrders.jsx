import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const RecentOrders = () => {
  const orders = [
    {
      id: '#12304',
      business: 'Gamegoer pro',
      status: 'Delivered',
      startDate: '12/12/12',
      endDate: '05/12/20',
      amount: '$450',
    },
    {
      id: '#12304',
      business: 'Gamegoer pro',
      status: 'In Progress',
      startDate: '12/12/12',
      endDate: '05/12/20',
      amount: '$450',
    },
    {
      id: '#12304',
      business: 'Gamegoer pro',
      status: 'Pending',
      startDate: '12/12/12',
      endDate: '05/12/20',
      amount: '$450',
    },
    {
      id: '#12304',
      business: 'Gamegoer pro',
      status: 'In Progress',
      startDate: '12/12/12',
      endDate: '05/12/20',
      amount: '$450',
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered':
        return 'bg-[#F2EFFF] text-[#6348F2]';
      case 'In Progress':
        return 'bg-[#E7F9F0] text-[#00A361]';
      case 'Pending':
        return 'bg-[#FFF8E7] text-[#FFB303]';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-[20px] font-bold text-[#1A1D1F]">Recent Order</h2>
        <Link 
          to="/host/dashboard/orders" 
          className="flex items-center gap-2 text-[14px] font-bold text-[#1A1D1F] hover:text-[#335CFF] transition-colors group"
        >
          View All
          <FiArrowRight className="transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="overflow-x-auto -mx-6">
        <table className="w-full text-left border-collapse min-w-[900px]">
          <thead>
            <tr className="border-b border-gray-50">
              <th className="px-6 py-4">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#335CFF] focus:ring-[#335CFF]" />
              </th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Order Id</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Business</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Start Date</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">End Date</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider">Amount</th>
              <th className="px-6 py-4 text-[13px] font-bold text-[#9A9FA5] uppercase tracking-wider text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr 
                key={index} 
                className="group border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-5">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#335CFF] focus:ring-[#335CFF]" />
                </td>
                <td className="px-6 py-5 text-[14px] font-medium text-[#6F767E]">{order.id}</td>
                <td className="px-6 py-5 text-[14px] font-bold text-[#1A1D1F]">{order.business}</td>
                <td className="px-6 py-5">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[12px] font-bold ${getStatusStyle(order.status)}`}>
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-[14px] font-medium text-[#6F767E]">{order.startDate}</td>
                <td className="px-6 py-5 text-[14px] font-medium text-[#6F767E]">{order.endDate}</td>
                <td className="px-6 py-5 text-[14px] font-bold text-[#1A1D1F]">{order.amount}</td>
                <td className="px-6 py-5 text-right">
                  <Link 
                    to={`/host/dashboard/order-details`}
                    className="text-[14px] font-bold text-[#335CFF] hover:underline"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;
