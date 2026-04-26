import React from "react";
import { HiCreditCard, HiOutlineInformationCircle } from "react-icons/hi";

const OrderSidebarInfo = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* Alert Banner */}
      <div className="bg-[#FFF4ED] p-4 md:p-6 rounded-2xl border border-[#FFE7D6]">
        <div className="flex items-start gap-3 mb-2">
          <HiCreditCard className="text-[#FD853A] text-xl md:text-2xl mt-0.5" />
          <h3 className="text-[#8B441B] font-bold text-sm md:text-base">Request for Release Payment</h3>
        </div>
        <p className="text-[#8B441B] text-[10px] md:text-xs leading-relaxed opacity-80">
          Your payment is held securely until you approve the campaign completion.
        </p>
      </div>

      {/* Order Info Card */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F4F4F4] shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-[#1A1D1F] mb-6">Order Info</h3>
        
        <div className="flex flex-col gap-4 md:gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Campaign Name</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F]">Instagram Story Feature - Tech Niche</p>
          </div>

          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-2">Ad script</p>
            <div className="w-10 h-12 md:w-12 md:h-14 bg-[#F8F9FC] rounded-lg border border-[#EFEFEF] flex flex-col items-center justify-center gap-1">
              <span className="text-[10px] font-black text-[#1A1D1F]">PDF</span>
            </div>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Website link</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F] truncate">https://</p>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">QR Code Link</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F] truncate">https://</p>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Additional Note</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F]">-</p>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Amount</p>
            <p className="text-base md:text-lg font-bold text-[#1A1D1F]">$499</p>
          </div>
        </div>
      </div>

      {/* Second Info Card (Order Details) */}
      <div className="bg-white p-4 md:p-6 rounded-2xl border border-[#F4F4F4] shadow-sm">
        <h3 className="text-base md:text-lg font-bold text-[#1A1D1F] mb-6">Order Progress</h3>
        
        <div className="flex flex-col gap-4 md:gap-5">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Placement</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F]">Instagram Story Feature - Tech Niche</p>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Client</p>
            <div className="flex items-center gap-2 mt-1">
              <img src="https://ui-avatars.com/api/?name=Sabi+Kabi+Muni&background=random" alt="Client" className="w-5 h-5 md:w-6 md:h-6 rounded-full" />
              <p className="text-xs md:text-sm font-semibold text-[#1A1D1F]">Sabi Kabi Muni</p>
            </div>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Order Date</p>
            <p className="text-xs md:text-sm font-semibold text-[#1A1D1F]">20/02/2026</p>
          </div>

          <div className="border-t border-[#F4F4F4] pt-4">
            <p className="text-[10px] uppercase tracking-wider text-[#6F767E] font-bold mb-1">Amount</p>
            <p className="text-base md:text-lg font-bold text-[#1A1D1F]">$499</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSidebarInfo;
