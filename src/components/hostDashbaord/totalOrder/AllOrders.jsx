import React from 'react';
import { FiSearch, FiCalendar } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { DatePicker } from 'antd';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AllOrders = () => {
  const orders = [
    { id: '12304', business: 'Gamegoer pro', status: 'Delivered', startDate: '12/12/12', endDate: '05/12/20', amount: '$450' },
    { id: '12304', business: 'Gamegoer pro', status: 'In Progress', startDate: '12/12/12', endDate: '05/12/20', amount: '$450' },
    { id: '12304', business: 'Gamegoer pro', status: 'Pending', startDate: '12/12/12', endDate: '05/12/20', amount: '$450' },
    { id: '12304', business: 'Gamegoer pro', status: 'In Progress', startDate: '12/12/12', endDate: '05/12/20', amount: '$450' },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-[#F2EFFF] text-[#6348F2]';
      case 'In Progress': return 'bg-[#E7F9F0] text-[#00A361]';
      case 'Pending': return 'bg-[#FFF8E7] text-[#FFB303]';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-[24px] border border-gray-100 p-6 shadow-sm overflow-hidden">
      {/* Title */}
      <div className="mb-6">
        <h2 className="text-[20px] font-bold text-[#1A1D1F]">Total Order</h2>
      </div>

      {/* Filters Bar - Matching the Image */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3 flex-1">
          {/* Search Input */}
          <div className="relative w-full max-w-[320px]">
            <input
              type="text"
              placeholder="Search here"
              className="w-full pl-4 pr-10 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
            <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
          </div>

          {/* Date Picker Trigger */}
          <div className="relative date-picker-custom">
            <DatePicker 
              suffixIcon={<FiCalendar size={18} className="text-gray-400" />}
              placeholder=""
              className="h-[42px] w-[52px] bg-white border border-gray-200 rounded-xl hover:border-blue-400 focus:border-blue-400 transition-all flex items-center justify-center cursor-pointer"
              variant="borderless"
            />
          </div>
        </div>

        {/* Status Dropdown */}
        <Select defaultValue="in-progress">
          <SelectTrigger className="px-4 py-2.5 bg-[#EEF2FF] text-[#335CFF] rounded-xl font-semibold text-sm min-w-[140px] border-none shadow-none focus-visible:ring-0">
            <SelectValue placeholder="In Progress" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Table Section */}
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
              <tr key={index} className="group border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
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
                  <Link to={`/host/dashboard/order/${order.id}`} className="text-[14px] font-bold text-[#335CFF] hover:underline">
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

export default AllOrders;