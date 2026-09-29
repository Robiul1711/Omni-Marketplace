import React from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "@/utils/animations";
import { Loader2 } from "lucide-react";
import LeftDetails from "@/components/sites/placement-details/LeftDetails";
import RightDetails from "@/components/sites/placement-details/RightDetails";
import useClient from "@/hooks/useClient";
import { PLACEMENTS } from "@/apiFunctions/apiEndPoints";

const PlacementDetails = () => {
  const { id, slug } = useParams();
  const placementKey = slug || id;

  const { data: response, isLoading, isError } = useClient({
    queryKey: ["placementDetails", placementKey],
    url: `${PLACEMENTS}/${placementKey}`,
    enabled: Boolean(placementKey),
  });

  const placement = response?.data;
  const placementTitle =
    placement?.campaign_info?.pl_bus_name ||
    placement?.title ||
    "Placement Details";

  if (isLoading) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col justify-center items-center py-20 !pt-[150px]">
        <Loader2 className="animate-spin text-Primary" size={40} />
        <p className="mt-4 text-sm text-[#525866] font-medium">
          Loading placement details...
        </p>
      </div>
    );
  }

  if (isError && !placement) {
    return (
      <div className="w-full section-padding-x py-20 !pt-[150px] text-center">
        <div className="max-w-md mx-auto bg-gray-50 border border-gray-100 rounded-2xl p-8">
          <h2 className="text-xl font-bold text-gray-900 mb-2">
            Placement Not Found
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            The requested placement could not be loaded or may no longer exist.
          </p>
          <Link
            to="/browse-placements"
            className="inline-block bg-Primary text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-md"
          >
            Back to Placements
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      {...fadeIn}
      className="w-full section-padding-x py-10 !pt-[150px] font-host-grotesk"
    >
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-6 flex-wrap">
        <Link to="/" className="hover:text-Primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link
          to="/browse-placements"
          className="hover:text-Primary transition-colors"
        >
          Marketplace
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate max-w-[300px]">
          {placementTitle}
        </span>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">
        <div className="w-full lg:w-[65%]">
          <LeftDetails placement={placement} />
        </div>
        <div className="w-full lg:w-[35%] sticky top-28">
          <RightDetails placement={placement} />
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementDetails;

