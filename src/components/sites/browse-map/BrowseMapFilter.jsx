import React, { useState, useEffect } from "react";
import { Search, Map, List, Settings2, X, ChevronDown, Loader2 } from "lucide-react";
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
import useClient from "@/hooks/useClient";
import { PLACEMENTS_OPTIONS, PLACEMENTS } from "@/apiFunctions/apiEndPoints";
import { useSearchParams } from "react-router-dom";

const BrowseMapFilter = () => {
  const [searchParams] = useSearchParams();
  const urlLocation = searchParams.get("location") || "all";
  const urlPromotion = searchParams.get("promotion_type") || "all";
  const urlChannel = searchParams.get("channel_type") || "all";
  const urlSearch = searchParams.get("search") || "";

  // Radius state kept for future use (Radius is commented out as requested)
  const [radius, setRadius] = useState(5);
  const [priceRange, setPriceRange] = useState(50000);
  const [visibleCount, setVisibleCount] = useState(6);
  const [selectedLocation, setSelectedLocation] = useState(urlLocation);
  const [selectedPromotion, setSelectedPromotion] = useState(urlPromotion);
  const [selectedChannel, setSelectedChannel] = useState(urlChannel);

  useEffect(() => {
    if (searchParams.get("location")) setSelectedLocation(searchParams.get("location"));
    if (searchParams.get("promotion_type")) setSelectedPromotion(searchParams.get("promotion_type"));
    if (searchParams.get("channel_type")) setSelectedChannel(searchParams.get("channel_type"));
  }, [searchParams]);

  const { data: optionsResponse } = useClient({
    queryKey: ["placementOptions"],
    url: PLACEMENTS_OPTIONS,
  });

  const optionsData = optionsResponse?.data || {};
  const promotionTypes = optionsData.promotion_types || [];
  const channelTypes = optionsData.channel_types || [];
  const locations = optionsData.locations || [];
  const maxPriceLimit = optionsData.price_range?.max || 50000;

  // Dynamic Placements query
  const queryParams = {
    page: 1,
    per_page: 20,
    ...(urlSearch.trim() ? { search: urlSearch.trim() } : {}),
    ...(selectedLocation !== "all" ? { location: selectedLocation } : {}),
    ...(selectedPromotion !== "all" ? { "promotion_type[]": [selectedPromotion] } : {}),
    ...(selectedChannel !== "all" ? { "channel_type[]": [selectedChannel] } : {}),
    ...(priceRange < maxPriceLimit ? { max_price: priceRange } : {}),
  };

  const { data: placementsResponse, isLoading } = useClient({
    queryKey: ["mapPlacements", queryParams],
    url: PLACEMENTS,
    params: queryParams,
  });

  const apiPlacements = placementsResponse?.data;
  const isApiArray = Array.isArray(apiPlacements);
  const placements = isApiArray && apiPlacements.length > 0
    ? apiPlacements
    : (isApiArray ? [] : (isLoading ? [] : PLACEMENTS_DATA));

  const loadMore = () => {
    setVisibleCount(prev => prev + 4);
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
        <div className="w-10 h-10 bg-[#EFF6FF] rounded-lg flex items-center justify-center text-Primary">
            <Map size={20} />
        </div>
      </div>

      <div className="flex-grow overflow-y-auto custom-scrollbar p-6 space-y-8 pb-32">
        {/* Location Select */}
        <section className="space-y-3">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk">Location</label>
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-[#F9FAFB] text-[13px] font-host-grotesk shadow-none outline-none">
              <SelectValue placeholder="All Locations" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Locations</SelectItem>
              {locations.map((loc, idx) => (
                <SelectItem key={idx} value={loc.name}>
                  {loc.name} {loc.count ? `(${loc.count})` : ""}
                </SelectItem>
              ))}
              {locations.length === 0 && (
                <>
                  <SelectItem value="ny">New York, USA</SelectItem>
                  <SelectItem value="ldn">London, UK</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </section>

        {/* Radius Slider with Fixed Alignment (Temporarily commented out as requested) */}
        {/* 
        <section className="space-y-4">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk flex justify-between">
            Radius: <span className="text-[#525866] font-medium">{radius} miles</span>
          </label>
          <div className="relative h-6 flex items-center group">
             <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
             <div 
                className="absolute h-1.5 bg-Primary rounded-full transition-all duration-150" 
                style={{ width: `${getProgressWidth(radius, 50)}%` }} 
             />
             <input 
                type="range" 
                min="0" max="50" 
                value={radius} 
                onChange={(e) => setRadius(e.target.value)}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
             />
             <div 
                className="absolute w-4 h-4 bg-white border-2 border-Primary rounded-full shadow-md pointer-events-none transition-all duration-150 z-20"
                style={{ left: `calc(${getProgressWidth(radius, 50)}% - 8px)` }}
             />
          </div>
        </section>
        */}

        {/* Promotion Type */}
        <section className="space-y-3">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk">Promotion Type</label>
          <Select value={selectedPromotion} onValueChange={setSelectedPromotion}>
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-[#F9FAFB] text-[13px] font-host-grotesk shadow-none outline-none">
              <SelectValue placeholder="All Promotion Types" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">All Promotion Types</SelectItem>
              {promotionTypes.map((t) => (
                <SelectItem key={t.id} value={String(t.id)}>
                  {t.name}
                </SelectItem>
              ))}
              {promotionTypes.length === 0 && (
                <>
                  <SelectItem value="1">Product Promotion</SelectItem>
                  <SelectItem value="2">Event Promotion</SelectItem>
                  <SelectItem value="3">Brand Awareness</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>
        </section>

        {/* Channel Type */}
        {channelTypes.length > 0 && (
          <section className="space-y-3">
            <label className="text-sm font-semibold text-[#171717] font-host-grotesk">Channel Type</label>
            <Select value={selectedChannel} onValueChange={setSelectedChannel}>
              <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-100 bg-[#F9FAFB] text-[13px] font-host-grotesk shadow-none outline-none">
                <SelectValue placeholder="All Channel Types" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Channel Types</SelectItem>
                {channelTypes.map((c) => (
                  <SelectItem key={c.id} value={String(c.id)}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}

        {/* Price Range Slider with Fixed Alignment */}
        <section className="space-y-4">
          <label className="text-sm font-semibold text-[#171717] font-host-grotesk flex justify-between">
            Price Range: <span className="text-[#525866] font-medium">$0 - ${priceRange.toLocaleString()}</span>
          </label>
          <div className="relative h-6 flex items-center">
             <div className="absolute w-full h-1.5 bg-gray-100 rounded-full" />
             <div 
                className="absolute h-1.5 bg-black rounded-full transition-all duration-150" 
                style={{ width: `${getProgressWidth(priceRange, maxPriceLimit)}%` }} 
             />
             <input 
                type="range" 
                min="0" max={maxPriceLimit} 
                step="50"
                value={priceRange} 
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="absolute w-full h-1.5 opacity-0 cursor-pointer z-10"
             />
             <div 
                className="absolute w-4 h-4 bg-white border-2 border-black rounded-full shadow-md pointer-events-none transition-all duration-150 z-20"
                style={{ left: `calc(${getProgressWidth(priceRange, maxPriceLimit)}% - 8px)` }}
             />
          </div>
        </section>

        {/* Results List */}
        <div className="space-y-6 pt-6 flex flex-col items-center">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <Loader2 className="animate-spin text-Primary" size={32} />
              </div>
            ) : placements.length === 0 ? (
              <div className="text-center py-10 text-gray-500 font-medium">
                No placements found.
              </div>
            ) : (
              <motion.div 
                 variants={staggerContainer}
                 initial="initial"
                 animate="animate"
                 className="space-y-6 w-full"
              >
                  <AnimatePresence mode="popLayout">
                      {placements.slice(0, visibleCount).map((item) => (
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
            )}
            
            {!isLoading && visibleCount < placements.length && (
                <button 
                    onClick={loadMore}
                    className="w-full py-4 rounded-xl border border-gray-100 text-[#171717] font-bold text-sm hover:bg-gray-50 transition-all font-host-grotesk mt-8 shadow-sm bg-white cursor-pointer"
                >
                    Load More ({placements.length - visibleCount} remaining)
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default BrowseMapFilter;

