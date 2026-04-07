import React, { useState } from "react";
import { SlidersHorizontal, Settings2, X, Map as MapIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import BrowseMapFilter from "@/components/sites/browse-map/BrowseMapFilter";
import BrowseMap from "@/components/sites/browse-map/BrowseMap";

const BrowsePlacementMap = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="h-screen flex flex-col pt-[110px] overflow-hidden bg-white">
      {/* Header Banner */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="shrink-0 bg-[#F9FAFB] border-b border-gray-100 p-6 md:p-8"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 section-padding-x">
          <div>
            <h1 className="text-[32px] md:text-[40px] font-bold text-[#171717] font-host-grotesk mb-2">
              Browse Placements
            </h1>
            <p className="text-[#525866] text-lg font-normal font-host-grotesk">
              Discover advertising opportunities from verified hosts
            </p>
          </div>
          
          <button
              onClick={() => setIsFilterOpen(true)}
              className="lg:hidden w-12 h-12 bg-Primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
          >
              <SlidersHorizontal size={22} />
          </button>
        </div>
      </motion.div>

      {/* Main Split Layout - Full Height within H-SCREEN container */}
      <div className="flex-grow flex overflow-hidden section-padding-x lg:gap-8">
        {/* Left Sidebar Filter */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="hidden lg:block w-[450px] shrink-0 h-full border-r border-gray-100 bg-white"
        >
          <BrowseMapFilter />
        </motion.div>

        {/* Right Map Canvas */}
        <div className="flex-grow h-full bg-[#FAFBFF] relative z-0">
           <BrowseMap />
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[99]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-[90%] max-w-[450px] bg-white z-[100] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-50 flex items-center justify-between">
                <div className="flex items-center gap-2 text-Primary font-bold">
                  <Settings2 size={20} />
                  <span className="text-lg">Filters</span>
                </div>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="p-2 bg-gray-50 rounded-lg text-gray-500 hover:text-gray-900 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="flex-grow overflow-hidden">
                <BrowseMapFilter />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrowsePlacementMap;
