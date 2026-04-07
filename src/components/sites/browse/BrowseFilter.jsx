import React from "react";
import { Search, MapPin, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

const BrowseFilter = ({ onClose, isMobile = false }) => {
  const promotionTypes = ["Products", "Services", "Awareness", "Media", "Events", "Other"];
  const channelTypes = [
    "Podcast",
    "YouTube Channel",
    "Website / Blog",
    "Nightclub/Bar",
    "Restaurant",
    "Salon",
    "Retail Store",
    "Arcade / Gaming Centres",
    "Shopping Malls",
    "Arenas",
    "Event Venue",
    "Other"
  ];

  return (
    <div className={`flex flex-col h-full bg-white ${!isMobile ? 'border border-gray-100 rounded-[24px] p-6' : 'p-6'}`}>
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-2xl font-bold text-[#171717] font-host-grotesk">Filter Options</h3>
        <div className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
            <Search size={16} />
        </div>
      </div>

      <div className="space-y-8 overflow-y-auto pr-2 custom-scrollbar flex-grow">
        {/* Promotion Type */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk">Promotion Type</h4>
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary" />
          </div>
          <div className="space-y-3">
            {promotionTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-Primary focus:ring-Primary transition-all" />
                <span className="text-[13px] font-medium text-[#525866] group-hover:text-Primary transition-colors font-host-grotesk">{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Channel Type */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk">Channel Type</h4>
            <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary" />
          </div>
          <div className="space-y-3">
            {channelTypes.map((type) => (
              <label key={type} className="flex items-center gap-3 cursor-pointer group">
                <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-Primary focus:ring-Primary transition-all" />
                <span className="text-[13px] font-medium text-[#525866] group-hover:text-Primary transition-colors font-host-grotesk">{type}</span>
              </label>
            ))}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk mb-4">Price Range</h4>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Min"
              className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk"
            />
            <span className="text-gray-300">-</span>
            <input
              type="text"
              placeholder="Max"
              className="w-full h-10 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk"
            />
          </div>
        </section>

        {/* Audience Size */}
        <section>
          <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk mb-4">Audience Size</h4>
          <Select>
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk bg-white text-left shadow-none">
              <SelectValue placeholder="Any Size" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="small">Small (0-10k)</SelectItem>
              <SelectItem value="medium">Medium (10k-50k)</SelectItem>
              <SelectItem value="large">Large (50k+)</SelectItem>
            </SelectContent>
          </Select>
        </section>
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-4 border-t border-gray-100">
        <button className="w-full h-12 bg-gray-50 text-[#171717] rounded-xl font-bold text-sm hover:bg-gray-100 transition-all font-host-grotesk">
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BrowseFilter;