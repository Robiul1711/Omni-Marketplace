import React from "react";

export const PlacementCardSkeleton = () => {
  return (
    <div className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.03)] flex flex-col justify-between animate-pulse">
      <div>
        {/* Card Image Area Skeleton */}
        <div className="relative h-[180px] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />

        {/* Card Body Skeleton */}
        <div className="p-5 space-y-4">
          <div className="flex justify-between items-center gap-2">
            <div className="h-5 bg-gray-200 rounded-lg w-3/5" />
            <div className="h-4 bg-gray-200 rounded-md w-16" />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-4 bg-gray-200 rounded-md w-28" />
            <div className="w-3.5 h-3.5 bg-gray-200 rounded-full" />
          </div>

          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3.5 bg-gray-200 rounded w-2/3" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3.5 bg-gray-200 rounded w-3/4" />
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded" />
              <div className="h-3.5 bg-gray-200 rounded w-1/2" />
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer Skeleton */}
      <div className="p-5 pt-0 space-y-3">
        <div className="pt-4 border-t border-[#F2F4F7] space-y-2">
          <div className="flex justify-between">
            <div className="h-3.5 bg-gray-200 rounded w-32" />
          </div>
          <div className="w-full h-1.5 bg-gray-200 rounded-full" />
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="space-y-1">
            <div className="h-3 bg-gray-200 rounded w-14" />
            <div className="h-5 bg-gray-200 rounded w-16" />
          </div>
          <div className="flex gap-2">
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
            <div className="w-8 h-8 bg-gray-200 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacementCardSkeleton;
