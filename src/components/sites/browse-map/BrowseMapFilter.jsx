import React, { useState } from "react";
import { Search, Map, List, Settings2, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { PLACEMENTS_DATA } from "@/utils/AllData";
import PlacementCard from "../home/PlacementCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BrowseMapFilter = () => {
  const [radius, setRadius] = useState(5);
  const [priceRange, setPriceRange] = useState(50000);
  const [visibleCount, setVisibleCount] = useState(2);

  const loadMore = () => {
    setVisibleCount(prev => prev + 2);
  };

  // Logic to calculate progress bar width accounting for thumb offset
  const getProgressWidth = (value, max) => {
    const percentage = (value / max) * 100;
    return percentage;
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
        <h3 className="text-xl font-bold text-[#171717] font-host-grotesk">Filter Options</h3>
        <button className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-Primary hover:bg-Primary hover:text-white transition-all">
            <Map size={20} />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-8 pb-32">
        {/* Location Select */}
        <section className="space-y-3">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk">Location</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-[#F9FAFB] text-[13px] font-host-grotesk shadow-none outline-none">
              <SelectValue placeholder="All Location" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Location</SelectItem>
              <SelectItem value="ny">New York, USA</SelectItem>
              <SelectItem value="ldn">London, UK</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* Radius Slider with Fixed Alignment */}
        <section className="space-y-4">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk flex justify-between">
            Radius: <span className="text-[#525866] font-medium">{radius} miles</span>
          </label>
          <div className="relative h-6 flex items-center group">
             {/* Background Rail */}
             <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
             {/* Progress Fill */}
             <div 
                className="absolute h-1.5 bg-Primary rounded-full transition-all duration-150" 
                style={{ width: `${getProgressWidth(radius, 50)}%` }} 
             />
             {/* Actual Range Input (Invisible thumb but active) */}
             <input 
                type="range" 
                min="0" max="50" 
                value={radius} 
                onChange={(e) => setRadius(e.target.value)}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
             />
             {/* Custom Thumb - Perfectly Positioned */}
             <div 
                className="absolute w-4 h-4 bg-white border-2 border-Primary rounded-full shadow-md pointer-events-none transition-all duration-150 z-20"
                style={{ left: `calc(${getProgressWidth(radius, 50)}% - 8px)` }}
             />
          </div>
        </section>

        {/* Promotion Type */}
        <section className="space-y-3">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk">Promotion Type</label>
          <Select defaultValue="all">
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-[#F9FAFB] text-[13px] font-host-grotesk shadow-none outline-none">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="podcast">Podcast</SelectItem>
            </SelectContent>
          </Select>
        </section>

        {/* Price Range Slider with Fixed Alignment */}
        <section className="space-y-4">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk flex justify-between">
            Price Range: <span className="text-[#525866] font-medium">$0 - ${priceRange.toLocaleString()}</span>
          </label>
          <div className="relative h-6 flex items-center">
             <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
             <div 
                className="absolute h-1.5 bg-black rounded-full transition-all duration-150" 
                style={{ width: `${getProgressWidth(priceRange, 50000)}%` }} 
             />
             <input 
                type="range" 
                min="0" max="50000" 
                step="500"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
             />
             <div 
                className="absolute w-4 h-4 bg-white border-2 border-black rounded-full shadow-md pointer-events-none transition-all duration-150 z-20"
                style={{ left: `calc(${getProgressWidth(priceRange, 50000)}% - 8px)` }}
             />
          </div>
        </section>

        {/* Results List */}
        <div className="space-y-6 pt-6 flex flex-col items-center">
            <motion.div 
               variants={staggerContainer}
               initial="initial"
               animate="animate"
               className="space-y-6 w-full"
            >
                <AnimatePresence mode="popLayout">
                    {PLACEMENTS_DATA.slice(0, visibleCount).map((item) => (
                        <motion.div 
                            key={item.id} 
                            variants={fadeInUp}
                            layout
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                        >
                            <PlacementCard item={item} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            {visibleCount < PLACEMENTS_DATA.length && (
                <button 
                    onClick={loadMore}
                    className="w-full py-4 rounded-xl border border-gray-100 text-[#171717] font-bold text-sm hover:bg-gray-50 transition-all font-host-grotesk mt-8 shadow-sm bg-white"
                >
                    Load More
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default BrowseMapFilter;
