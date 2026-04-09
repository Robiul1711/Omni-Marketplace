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
      className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
    >
      {/* Card Image Area */}
      <div className="relative h-[240px] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay Badges */}
        <div className="absolute top-4 right-4 flex items-center gap-2 px-1">
          <button className="bg-[rgba(255,255,255,0.30)] backdrop-blur-md p-2 rounded-full text-white  hover:text-red-500 transition-all border border-white/30 flex items-center justify-center">
            <Heart
              size={16}
              fill="currentColor"
              fillOpacity={0}
              className="cursor-pointer text-white"
            />
          </button>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6">
        <div className="flex w-full gap-2 justify-between items-center">
          <h3 className="text-xl font-bold text-[#101828] font-inter! mb-2 truncate">
            {item.title}
          </h3>
          <div className="bg-[#EFF6FF] backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm">
            <span className="text-Primary text-xs font-bold uppercase tracking-wider">
              {item.category}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 mb-6">
          <span className="text-[#525866] text-sm font-semibold">
            {item.host}
          </span>
          {item.verified && (
            <CheckCircle2 size={16} className="text-[#10B981]" fill="#D1FAE5" />
          )}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center gap-2.5 text-[#4A5565]">
            <TrendingUp size={18} className="text-gray-400" />
            <span className="text-sm font-medium">{item.traffic}</span>
          </div>
          <div className="flex items-center gap-2.5 text-[#4A5565]">
            <MapPin size={18} className="text-gray-400" />
            <span className="text-sm font-medium">{item.location}</span>
          </div>
          <div className="text-sm text-[#4A5565] font-medium pl-7">
            Campaign Duration :{" "}
            <span className="font-bold">{item.duration}</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between items-center mb-3">
            <span
              className={`text-base font-medium ${item.available ? "text-[#525866]" : "text-black"}`}
            >
              {item.slots}
            </span>
          </div>

          {/* Progress Bar Area */}
          <div className="w-full h-2 bg-gray-50 rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-Primary rounded-full transition-all duration-500"
              style={{
                width: `${item.available ? item.slotsPercentage : 100}%`,
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[#525866] text-sm font-medium">
                Starting at
              </span>
              <span className="text-xl font-bold text-[#00226E]">
                ${item.price}
              </span>
            </div>
            <Link
              to={`/placement/${item.id}`}
              className="flex items-center gap-1.5 text-Primary font-medium text-base hover:translate-x-1 transition-transform"
            >
              View Placement <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementCard;
