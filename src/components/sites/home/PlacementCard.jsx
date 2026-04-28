import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp } from "@/utils/animations";

const PlacementCard = ({ item }) => {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group"
    >
      {/* Card Image Area */}
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Badges */}
        <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
          <button className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white/30 transition-all border border-white/20 flex items-center justify-center">
            <Heart
              size={16}
              fill={item.isSaved ? "#FF4D4F" : "transparent"}
              className={`cursor-pointer transition-colors ${item.isSaved ? "text-[#FF4D4F]" : "text-white hover:text-red-500"}`}
            />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-1">
          <h3 className="text-base font-bold text-[#101828] leading-tight line-clamp-1">
            {item.title}
          </h3>
          <div className="bg-[#EFF6FF] px-2 py-0.5 rounded text-[10px] font-bold text-Primary uppercase shrink-0">
            {item.category}
          </div>
        </div>

        <Link to={`/host/${item.id}`} className="flex items-center gap-1.5 mb-4">
          <span className="text-[#667085] text-[13px] font-semibold">
            {item.host}
          </span>
          {item.verified && (
            <div className="bg-[#10B981] rounded-full p-0.5">
              <CheckCircle2 size={10} className="text-white" />
            </div>
          )}
        </Link>

        <div className="space-y-2 mb-5">
          <div className="flex items-center gap-2 text-[#475467]">
            <TrendingUp size={16} className="text-[#98A2B3] shrink-0" />
            <span className="text-[13px] font-medium">{item.traffic}</span>
          </div>
          <div className="flex items-center gap-2 text-[#475467]">
            <MapPin size={16} className="text-[#98A2B3] shrink-0" />
            <span className="text-[13px] font-medium">{item.location}</span>
          </div>
          <div className="flex items-center gap-2 text-[#475467]">
            <div className="w-4 shrink-0" />
            <span className="text-[13px] font-medium">
              Campaign Duration : <span className="text-[#344054] font-bold ml-0.5">{item.duration}</span>
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-[#F2F4F7]">
          <div className="mb-2">
            <span className="text-[13px] font-bold text-[#101828]">
              {item.slots}
            </span>
          </div>

          {/* Progress Bar Area */}
          <div className="w-full h-1.5 bg-[#F2F4F7] rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-Primary rounded-full transition-all duration-500"
              style={{
                width: `${item.available ? item.slotsPercentage : 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[#667085] text-[11px] font-medium">
                Starting at
              </span>
              <span className="text-[18px] font-bold text-[#101828]">
                ${item.price}
              </span>
            </div>
            <Link
              to={`/placement/${item.id}`}
              className="flex items-center gap-1 text-Primary font-bold text-[13px] hover:translate-x-1 transition-transform"
            >
              View Placement <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementCard;
