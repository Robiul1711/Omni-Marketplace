import LeftDetails from "@/components/sites/placement-details/LeftDetails";
import RightDetails from "@/components/sites/placement-details/RightDetails";
import React from "react";
import { motion } from "motion/react";
import { fadeIn } from "@/utils/animations";

const PlacementDetails = () => {
  return (
    <motion.div
      {...fadeIn}
      className="w-full section-padding-x py-10  !pt-[150px] font-host-grotesk!"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
        <span>Marketplace</span>
        <span>/</span>
        <span className="text-gray-900 font-medium">
          Mid-Roll Ad – Tech Podcast
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[65%]">
          <LeftDetails />
        </div>
        <div className="w-full lg:w-[35%]">
          <RightDetails />
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementDetails;
