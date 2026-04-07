import React, { useState } from "react";
import { SlidersHorizontal, Search, Settings2, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import BrowseFilter from "@/components/sites/browse/BrowseFilter";
import BrowseProduct from "@/components/sites/browse/BrowseProduct";

const BrowsePlacement = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  return (
    <div className="py-10  !pt-[150px]">
      <div className="">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          animate="animate"
          className="mb-10 bg-[#F9FAFB] p-10 section-padding-x"
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="text-[32px] md:text-[40px] font-bold text-[#171717] font-host-grotesk mb-2">
                Browse Placements
              </h1>
              <p className="text-[#525866] text-lg font-normal font-host-grotesk">
                Discover advertising opportunities from verified hosts
              </p>
            </div>

            {/* Desktop Search */}
            <div className="hidden md:block w-full max-w-[400px] relative">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search placements..."
                className="w-full h-14 pl-11 pr-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-sm transition-all bg-white shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-10 items-start section-padding-x ">
          {/* Desktop Fixed Side Filter */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            className="hidden lg:block w-[350px] sticky top-24"
          >
            <BrowseFilter />
          </motion.div>

          {/* Product Feed */}
          <div className="flex-grow w-full">
            {/* Mobile Actions Banner */}
            <div className="lg:hidden flex items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex-grow relative">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Search placements..."
                  className="w-full h-11 pl-11 pr-4 rounded-xl border border-gray-100 focus:border-Primary outline-none text-sm transition-all"
                />
              </div>
              <button
                onClick={() => setIsFilterOpen(true)}
                className="w-11 h-11 rounded-xl bg-Primary text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20"
              >
                <SlidersHorizontal size={20} />
              </button>
            </div>

            <BrowseProduct />
          </div>
        </div>
      </div>

      {/* Mobile Sidebar Filter Drawer */}
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
              className="fixed inset-y-0 left-0 w-[85%] max-w-[350px] bg-white z-[100] shadow-2xl flex flex-col"
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
                <BrowseFilter isMobile onClose={() => setIsFilterOpen(false)} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BrowsePlacement;
