import React from "react";
import { motion } from "motion/react";
import { fadeInUp } from "@/utils/animations";

const OrderSummary = () => {
  const summaryItems = [
    { label: "Package (Standard)", value: "$50.00/per" },
    { label: "Campaign Duration", value: "30 Days Continuous" },
    { label: "Runs During", value: "Host Operating Hours" },
    { label: "Host Schedule", value: "Mon – Fri [9:00 AM – 10:00 PM]" },
  ];

  const fees = [
    { label: "Platform Fee (20%)", value: "$30" },
    { label: "Taxes", value: "$12" },
  ];

  return (
    <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col gap-6">
      <div className="flex flex-col gap-1 border-b border-gray-50 pb-6">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        <div className="flex flex-col mt-2">
            <span className="text-sm font-semibold text-gray-900">Mid-Roll Ad – Tech Podcast</span>
            <span className="text-xs text-gray-500">Tech Talks Daily</span>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {summaryItems.map((item, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">{item.label}</span>
            <span className="text-gray-900 font-semibold">{item.value}</span>
          </div>
        ))}
      </div>

      <div className="h-[1px] border-t border-dashed border-gray-200" />

      <div className="flex flex-col gap-4">
        {fees.map((fee, idx) => (
          <div key={idx} className="flex justify-between items-center text-sm">
            <span className="text-gray-500 font-medium">{fee.label}</span>
            <span className="text-gray-900 font-semibold">{fee.value}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-gray-900">$92</span>
      </div>

      {/* What happens next */}
      <div className="mt-4 p-5 bg-[#F9FAFB] rounded-xl flex flex-col gap-3">
        <span className="text-sm font-bold text-gray-900 underline decoration-gray-300 underline-offset-4">What happens next?</span>
        <ul className="flex flex-col gap-2">
          <li className="text-xs text-gray-600 flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            Host reviews your campaign details
          </li>
          <li className="text-xs text-gray-600 flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            Campaign runs for 30 days after activation
          </li>
          <li className="text-xs text-gray-600 flex items-start gap-2">
            <div className="w-1 h-1 rounded-full bg-gray-400 mt-1.5 shrink-0" />
            Host confirms campaign delivery
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OrderSummary;
