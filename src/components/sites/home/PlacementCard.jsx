import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  Edit,
  Trash2,
  Send,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { fadeInUp } from "@/utils/animations";
import DefaultImage from "@/assets/images/i1.png";

const PlacementCard = ({
  item,
  isHostView = false,
  onEdit,
  onDelete,
  onPublish,
  isPublishing = false,
}) => {
  // Extract values from API response structure or fallback mock object
  const id = item.id;
  const title = item.campaign_info?.pl_bus_name || item.title || "Placement Ad";
  const category = item.campaign_info?.channel_type?.name || item.category || "Audio/Display";
  const hostName = item.user?.name || item.host || "Host";
  const isVerified = item.user?.onboarding_status === "approved" || item.verified || false;
  
  const coverImage = item.cover_image || item.image || DefaultImage;
  const traffic = item.audience_overview?.monthly_foottraffic || item.traffic || "N/A Traffic";
  
  const locationStr = item.city && item.state 
    ? `${item.city}, ${item.state}, ${item.country || ''}`
    : (item.location || "Location N/A");

  const durationStr = item.campaign_duration || item.campaign_info?.duration || item.duration || "30 days";
  const price = item.starting_price ?? item.price ?? 0;

  const totalSlots = item.campaign_info?.slot || 10;
  const availableSlots = item.slot_available ?? totalSlots;
  const slotsPercentage = Math.round(((totalSlots - availableSlots) / totalSlots) * 100);

  const rawStatus = (item.status || "draft").toLowerCase();

  const getStatusBadge = (s) => {
    if (s === 'approved' || s === 'publish' || s === 'active' || s === 'published') {
      return { label: 'Published', style: 'bg-emerald-600 text-white' };
    }
    if (s === 'pending') {
      return { label: 'Pending', style: 'bg-amber-500 text-white' };
    }
    if (s === 'reject' || s === 'rejected') {
      return { label: 'Rejected', style: 'bg-rose-600 text-white' };
    }
    if (s === 'draft') {
      return { label: 'Draft', style: 'bg-gray-600 text-white' };
    }
    return { label: s.charAt(0).toUpperCase() + s.slice(1), style: 'bg-gray-600 text-white' };
  };

  const badgeInfo = getStatusBadge(rawStatus);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-white rounded-[24px] border border-gray-100 overflow-hidden shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col justify-between"
    >
      <div>
        {/* Card Image Area */}
        <div className="relative h-[180px] overflow-hidden bg-gray-100">
          <img
            src={coverImage}
            alt={title}
            onError={(e) => { e.target.src = DefaultImage; }}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Overlay Badges */}
          <div className="absolute top-3.5 right-3.5 flex items-center gap-2">
            {isHostView ? (
              <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase backdrop-blur-md shadow-sm ${badgeInfo.style}`}>
                {badgeInfo.label}
              </span>
            ) : (
              <button className="bg-white/20 backdrop-blur-md p-1.5 rounded-full text-white hover:bg-white/30 transition-all border border-white/20 flex items-center justify-center">
                <Heart
                  size={16}
                  fill={item.isSaved ? "#FF4D4F" : "transparent"}
                  className={`cursor-pointer transition-colors ${item.isSaved ? "text-[#FF4D4F]" : "text-white hover:text-red-500"}`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex justify-between items-start mb-1 gap-2">
            <h3 className="text-base font-bold text-[#101828] leading-tight line-clamp-1">
              {title}
            </h3>
            <div className="bg-[#EFF6FF] px-2 py-0.5 rounded text-[10px] font-bold text-Primary uppercase shrink-0">
              {category}
            </div>
          </div>

          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-[#667085] text-[13px] font-semibold">
              {hostName}
            </span>
            {isVerified && (
              <div className="bg-[#10B981] rounded-full p-0.5">
                <CheckCircle2 size={10} className="text-white" />
              </div>
            )}
          </div>

          <div className="space-y-2 mb-5">
            <div className="flex items-center gap-2 text-[#475467]">
              <TrendingUp size={16} className="text-[#98A2B3] shrink-0" />
              <span className="text-[13px] font-medium truncate">{traffic}</span>
            </div>
            <div className="flex items-center gap-2 text-[#475467]">
              <MapPin size={16} className="text-[#98A2B3] shrink-0" />
              <span className="text-[13px] font-medium truncate">{locationStr}</span>
            </div>
            <div className="flex items-center gap-2 text-[#475467]">
              <div className="w-4 shrink-0" />
              <span className="text-[13px] font-medium">
                Duration : <span className="text-[#344054] font-bold ml-0.5">{durationStr}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-5 pt-0">
        <div className="pt-4 border-t border-[#F2F4F7]">
          <div className="mb-2 flex justify-between text-[13px] font-bold text-[#101828]">
            <span>{availableSlots} / {totalSlots} Slots Available</span>
          </div>

          {/* Progress Bar Area */}
          <div className="w-full h-1.5 bg-[#F2F4F7] rounded-full mb-5 overflow-hidden">
            <div
              className="h-full bg-Primary rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, Math.max(10, slotsPercentage))}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-[#667085] text-[11px] font-medium">
                Starting at
              </span>
              <span className="text-[18px] font-bold text-[#101828]">
                ${price}
              </span>
            </div>

            {isHostView ? (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onEdit && onEdit(item)}
                  className="p-2 text-gray-600 hover:text-Primary bg-gray-50 hover:bg-Primary/10 rounded-lg transition-colors"
                  title="Edit Placement"
                >
                  <Edit size={16} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete && onDelete(item)}
                  className="p-2 text-gray-600 hover:text-red-600 bg-gray-50 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete Placement"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <Link
                to={`/placement/${id}`}
                className="flex items-center gap-1 text-Primary font-bold text-[13px] hover:translate-x-1 transition-transform"
              >
                View Placement <ArrowRight size={14} />
              </Link>
            )}
          </div>

          {/* Big Full-Width Submit Button for Draft or Rejected Placements */}
          {isHostView && (rawStatus === 'draft' || rawStatus === 'reject' || rawStatus === 'rejected') && (
            <div className="mt-3.5 pt-3 border-t border-gray-100">
              <button
                type="button"
                disabled={isPublishing}
                onClick={() => onPublish && onPublish(item)}
                className="w-full h-10 bg-Primary hover:bg-Primary/90 active:scale-[0.99] text-white rounded-xl text-sm font-semibold flex items-center justify-center gap-2 shadow-md shadow-Primary/20 transition-all disabled:opacity-50 cursor-pointer"
                title={rawStatus === 'draft' ? "Submit for Approval" : "Resubmit for Approval"}
              >
                {isPublishing ? (
                  <>
                    <Loader2 className="animate-spin size-4" />
                    <span>Submitting Placement...</span>
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    <span>{rawStatus === 'draft' ? 'Submit Placement' : 'Resubmit Placement'}</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default PlacementCard;
