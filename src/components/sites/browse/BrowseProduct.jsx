import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { PLACEMENTS_DATA } from "@/utils/AllData";
import PlacementCard from "../home/PlacementCard";
import ReactPaginate from "react-paginate";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const BrowseProduct = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;
  const pageCount = Math.ceil(PLACEMENTS_DATA.length / itemsPerPage);

  const displayItems = PLACEMENTS_DATA.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-20">
      {/* Search Result Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#525866] font-host-grotesk italic">
          {PLACEMENTS_DATA.length} Placements Found
        </h3>
        <div className="flex items-center gap-3">
          <Select defaultValue="recommended">
            <SelectTrigger className="w-[200px] h-10 px-4 rounded-full border border-gray-200 focus:border-Primary text-[13px] font-host-grotesk bg-white shadow-sm overflow-hidden flex items-center">
              <div className="flex items-center gap-1.5 whitespace-nowrap overflow-hidden">
                <span className="text-gray-400">Sort by:</span>
                <SelectValue placeholder="Recommended" className="font-semibold text-black overflow-hidden truncate" />
              </div>
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price_low">Price: Low to High</SelectItem>
              <SelectItem value="price_high">Price: High to Low</SelectItem>
              <SelectItem value="popular">Popularity</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
      >
        {displayItems.map((placement, idx) => (
          <motion.div key={placement.id} variants={fadeInUp}>
            <PlacementCard item={placement} />
          </motion.div>
        ))}
      </motion.div>

      {/* Pagination */}
      <div className="mt-16 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={handlePageClick}
          containerClassName={"flex items-center gap-2 sm:gap-3"}
          pageClassName={"page-item"}
          pageLinkClassName={"w-10 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-sm font-medium text-[#525866] hover:bg-gray-50 transition-all font-host-grotesk"}
          activeLinkClassName={"!bg-Primary !text-white !border-Primary"}
          previousClassName={"previous-item"}
          previousLinkClassName={"px-6 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-sm font-medium text-[#525866] hover:bg-gray-50 transition-all font-host-grotesk mr-2"}
          nextClassName={"next-item"}
          nextLinkClassName={"px-6 h-10 flex items-center justify-center rounded-xl border border-gray-100 text-sm font-medium text-[#525866] hover:bg-gray-50 transition-all font-host-grotesk ml-2"}
          disabledLinkClassName={"opacity-50 cursor-not-allowed hover:bg-transparent"}
        />
      </div>
    </div>
  );
};

export default BrowseProduct;