import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { fadeInUp } from "@/utils/animations";

const Step3 = () => {
  return (
    <div className="flex flex-col items-center justify-center py-10">
      <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm flex flex-col items-center max-w-[500px] w-full text-center">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
            <Check className="w-6 h-6 stroke-[3px]" />
          </div>
        </div>

        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Booking Confirmed!
        </h2>
        <p className="text-sm text-gray-500 leading-relaxed mb-10">
          Your booking has been confirmed and soon you will receive an email
          confirmation. The host will reach out within 24 hours to coordinate
          campaign details.
        </p>

        <div className="w-full bg-[#F9FAFB] rounded-xl p-6 flex flex-col gap-4 mb-8">
          <div className="flex justify-between items-center text-sm border-b border-gray-100 pb-4 mb-2">
            <span className="text-gray-900 font-bold">Booking Summary</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium uppercase tracking-wider">
              Booking ID
            </span>
            <span className="text-gray-900 font-bold">#BK-SGFOUQS2X</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium uppercase tracking-wider">
              Placement
            </span>
            <span className="text-gray-900 font-bold">
              Mid-Roll Ad – Tech Podcast
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-500 font-medium uppercase tracking-wider">
              Host
            </span>
            <span className="text-gray-900 font-bold">Tech Talks Daily</span>
          </div>
          <div className="flex justify-between items-center text-sm pt-4 border-t border-gray-100 mt-2">
            <span className="text-gray-900 font-bold">Total Paid</span>
            <span className="text-lg font-bold text-gray-900">$92</span>
          </div>
        </div>

        <div className="w-full flex flex-col gap-3">
          <Link
            to="#"
            className="w-full bg-Primary text-white py-4 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all"
          >
            Go to Dashboard
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            to="/browse-placements"
            className="w-full bg-white text-gray-700 border border-gray-200 py-4 rounded-xl font-medium hover:bg-gray-50 transition-all"
          >
            Browse More Placements
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Step3;
