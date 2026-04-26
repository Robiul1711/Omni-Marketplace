import React from "react";
import { HiArrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";

const OrderHeader = () => {
  return (
    <div className="flex flex-col gap-6 mb-8">
      <Link
        to="/host/dashboard/total-order"
        className="flex items-center gap-2 text-[#6F767E] hover:text-[#1A1D1F] transition-colors font-medium w-fit"
      >
        <HiArrowLeft className="text-xl" />
        <span>Back to My placement</span>
      </Link>

      <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F4F4F4] flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div className="flex flex-col gap-1">
          <h1 className="text-xl md:text-2xl font-bold text-[#1A1D1F]">Order - ord - 001</h1>
          <p className="text-[#6F767E] text-xs md:text-sm">Instagram Story Feature - Tech Niche</p>
        </div>
        <button className="flex items-center justify-center md:justify-start gap-2 px-4 py-2 bg-[#F0F5FF] text-[#3366FF] rounded-lg font-semibold text-sm hover:bg-[#E0EAFF] transition-colors w-full md:w-auto">
          In Progress
          <IoIosArrowDown className="text-lg" />
        </button>
      </div>
    </div>
  );
};

export default OrderHeader;
