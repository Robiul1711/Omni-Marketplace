import React, { useState } from "react";
import { motion } from "framer-motion";
import { staggerContainer, fadeInUp } from "@/utils/animations";
import { PLACEMENTS_DATA } from "@/utils/AllData";
import PlacementCard from "../home/PlacementCard";
import ReactPaginate from "react-paginate";
import { Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useClient from "@/hooks/useClient";
import { PLACEMENTS } from "@/apiFunctions/apiEndPoints";

const BrowseProduct = ({ searchTerm = "", filters = {} }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const itemsPerPage = 6;

  // Reset page to 0 when searchTerm or filters change
  React.useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm, filters, sortBy]);

  const queryParams = {
    page: currentPage + 1,
    per_page: itemsPerPage,
    ...(searchTerm.trim() ? { search: searchTerm.trim() } : {}),
    ...(filters?.promotion_types?.length ? { "promotion_type[]": filters.promotion_types } : {}),
    ...(filters?.channel_types?.length ? { "channel_type[]": filters.channel_types } : {}),
    ...(filters?.min_price ? { min_price: filters.min_price } : {}),
    ...(filters?.max_price ? { max_price: filters.max_price } : {}),
    ...(filters?.location && filters.location !== "all" ? { location: filters.location } : {}),
    ...(filters?.audience_size && filters.audience_size !== "all" ? { audience_size: filters.audience_size } : {}),
    ...(sortBy && sortBy !== "recommended" ? { sort: sortBy } : {}),
  };

  const { data: placementsResponse, isLoading } = useClient({
    queryKey: ["browsePlacements", queryParams],
    url: PLACEMENTS,
    params: queryParams,
  });



  const apiPlacements = placementsResponse?.data;
  const isApiArray = Array.isArray(apiPlacements);
  const placements = isApiArray && apiPlacements.length > 0
    ? apiPlacements
    : (isApiArray ? [] : (isLoading ? [] : PLACEMENTS_DATA));

  const totalItems = placementsResponse?.pagination?.total ?? (isApiArray ? apiPlacements.length : PLACEMENTS_DATA.length);
  const pageCount = (placementsResponse?.pagination?.last_page ?? Math.ceil(totalItems / itemsPerPage)) || 1;

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  return (
    <div className="w-full flex flex-col gap-8 pb-20">
      {/* Search Result Actions */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-[#525866] font-host-grotesk italic">
          {totalItems} Placements Found
        </h3>
        <div className="flex items-center gap-3">
          <Select value={sortBy} onValueChange={setSortBy}>
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
      {isLoading ? (
        <div className="flex justify-center items-center py-24">
          <Loader2 className="animate-spin text-Primary" size={36} />
        </div>
      ) : placements.length === 0 ? (
        <div className="text-center py-20 bg-gray-50/50 rounded-2xl border border-gray-100 p-8">
          <p className="text-gray-500 font-medium">No placements found.</p>
        </div>
      ) : (
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6"
        >
          {placements.map((placement) => (
            <motion.div key={placement.id} variants={fadeInUp}>
              <PlacementCard item={placement} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Pagination */}
      {pageCount > 1 && (
        <div className="mt-16 flex justify-center">
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            pageCount={pageCount}
            forcePage={currentPage}
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
      )}
    </div>
  );
};

export default BrowseProduct;