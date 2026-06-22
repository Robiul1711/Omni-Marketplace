import React from "react";
import { HiCreditCard, HiOutlineExclamationCircle } from "react-icons/hi";

const HostComment = () => {
  return (
    <div className="flex flex-col gap-8">
      <div className="bg-white p-4 md:p-8 rounded-2xl border border-[#F4F4F4] shadow-sm">
        <label className="block text-[#1A1D1F] font-bold text-sm mb-4">Host Comment:</label>
        <textarea
          className="w-full h-32 p-4 bg-white border border-[#EFEFEF] rounded-2xl text-xs md:text-sm text-[#1A1D1F] placeholder:text-[#6F767E] focus:outline-none focus:border-[#3366FF] transition-colors resize-none"
          placeholder="Type your comment here..."
        ></textarea>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4">
        <button className="w-full sm:flex-1 bg-[#3366FF] text-white px-4 md:px-6 py-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-[#254EDB] transition-colors shadow-lg shadow-blue-100">
          <HiCreditCard className="text-lg md:text-xl" />
          Request for Release Payment
        </button>
        <button className="w-full sm:flex-1 bg-white border border-red-500 text-red-500 px-4 md:px-6 py-4 rounded-xl font-bold text-xs md:text-sm flex items-center justify-center gap-2 hover:bg-red-50 transition-colors">
          <HiOutlineExclamationCircle className="text-lg md:text-xl" />
          Request For Cancelation
        </button>
      </div>
    </div>
  );
};

export default HostComment;
