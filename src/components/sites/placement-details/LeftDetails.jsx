import React, { useState } from "react";
import Image1 from "@/assets/images/p1.png";
import Image2 from "@/assets/images/p2.png";
import Image3 from "@/assets/images/p3.png";
import Image4 from "@/assets/images/p4.png";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {
  CheckCircle2,
  Heart,
  ShieldCheck,
  TrendingUp,
  Globe,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Link } from "react-router-dom";

const LeftDetails = ({ placement = {} }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [isSaved, setIsSaved] = useState(Boolean(placement?.is_favorite));

  // Extract media/photos
  const mediaItems = Array.isArray(placement?.media) && placement.media.length > 0
    ? placement.media.map((m) => m.url).filter(Boolean)
    : [];
  
  if (placement?.cover_image && !mediaItems.includes(placement.cover_image)) {
    mediaItems.unshift(placement.cover_image);
  }

  const images = mediaItems.length > 0 ? mediaItems : [Image1, Image2, Image3, Image4];

  // Campaign & Category info
  const ci = placement?.campaign_info || {};
  const ao = placement?.audience_overview || {};
  const user = placement?.user || {};

  const title = ci.pl_bus_name || placement?.title || "Advertising Placement";
  const categoryBadge = ci.channel_type?.name || ci.promotion_type?.name || "Advertising";
  const hostName = user.name || (user.first_name ? `${user.first_name} ${user.last_name || ""}`.trim() : "Verified Host");
  const isVerified = user.onboarding_status === "approved" || user.onboarding_status === "verified";
  const hostAvatar = user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(hostName)}`;

  const whatsIncluded = Array.isArray(ci.pl_feature) && ci.pl_feature.length > 0
    ? ci.pl_feature
    : [
        "Standard ad placement duration",
        "Targeted audience exposure",
        "Performance reporting on Omni dashboard",
        "Verified host placement guarantee",
      ];

  const campaignDuration = placement?.campaign_duration || ci.duration || "30";
  const displayTime = ci.display_time?.name || "Ads run only during host operating hours";

  const totalSlots = placement?.total_slot ?? ci.slot ?? 10;
  const availableSlots = placement?.slot_available ?? totalSlots;
  const slotsUsed = Math.max(0, totalSlots - availableSlots);
  const slotPercentage = totalSlots > 0 ? Math.round((slotsUsed / totalSlots) * 100) : 70;

  const locationStr = placement?.city && placement?.state
    ? `${placement.city}, ${placement.state}${placement?.country ? `, ${placement.country}` : ""}`
    : (placement?.location || "");

  return (
    <div className="flex flex-col gap-6">
      {/* Image Gallery */}
      <div className="w-full">
        <Swiper
          spaceBetween={10}
          navigation={true}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="rounded-2xl mb-4 h-[350px] md:h-[450px] overflow-hidden group shadow-sm bg-gray-100"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Gallery ${index}`}
                onError={(e) => { e.target.src = Image1; }}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {images.length > 1 && (
          <Swiper
            onSwiper={setThumbsSwiper}
            spaceBetween={12}
            slidesPerView={Math.min(4, images.length)}
            freeMode={true}
            watchSlidesProgress={true}
            modules={[FreeMode, Navigation, Thumbs]}
            className="thumbnail-swiper"
          >
            {images.map((img, index) => (
              <SwiperSlide
                key={index}
                className="cursor-pointer rounded-xl overflow-hidden border-2 border-transparent swiper-slide-thumb-active:border-blue-600 transition-all"
              >
                <img
                  src={img}
                  alt={`Thumb ${index}`}
                  onError={(e) => { e.target.src = Image1; }}
                  className="w-full h-20 md:h-24 object-cover rounded-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-4 mt-2">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex flex-col gap-2">
            <span className="bg-[#EEF2FF] text-Primary px-3 py-1 rounded-md text-xs font-semibold w-fit">
              {categoryBadge}
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            {locationStr && (
              <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                <MapPin size={14} className="text-gray-400" />
                <span>{locationStr}</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => setIsSaved(!isSaved)}
            className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors text-[#525866] cursor-pointer"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isSaved ? "text-red-500 fill-red-500" : "text-gray-400"
              }`}
            />
            {isSaved ? "Saved" : "Save Placement"}
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <Link
            to={user.user_id ? `/host/${user.user_id}` : "#"}
            className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 shrink-0 border border-gray-100"
          >
            <img
              src={hostAvatar}
              alt={hostName}
              className="w-full h-full object-cover"
            />
          </Link>
          <div className="flex flex-col">
            <Link
              to={user.user_id ? `/host/${user.user_id}` : "#"}
              className="flex items-center gap-1.5 group"
            >
              <span className="font-semibold text-gray-900 group-hover:text-Primary transition-colors">
                {hostName}
              </span>
              {isVerified && (
                <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500" />
              )}
            </Link>
            <span className="text-xs text-gray-500">
              {user.role || "Host"} • {user.email || "Verified Member"}
            </span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 w-full my-2" />

      {/* Content Sections */}
      <motion.div
        variants={staggerContainer}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="flex flex-col gap-8"
      >
        {/* About */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-gray-900">
            About This Placement
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">
            {ci.pl_bus_description ||
              "Reach engaged audiences through verified host advertising placements. Guaranteed visibility with high audience engagement and detailed reporting."}
          </p>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* What's Included */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
            {whatsIncluded.map((item, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-gray-600 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* Campaign Info */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">
            Campaign Information
          </h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                Campaign Start Date:
              </span>
              <span className="text-gray-600 text-sm">
                {placement?.start_date || "Campaign will start based on host availability."}
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                Campaign Duration:
              </span>
              <span className="text-gray-600 text-sm">
                {campaignDuration} Days Continuous Advertising
              </span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                Display Time:
              </span>
              <span className="text-gray-600 text-sm">{displayTime}</span>
            </div>
          </div>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* Advertising Slots */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-bold text-gray-900">
              Monthly Advertising Slots
            </h2>
            <p className="text-gray-500 text-sm">
              Each host offers a limited number of advertising placements per
              month to maintain content quality and audience trust.
            </p>
          </div>

          <div className="bg-white rounded-xl flex flex-col gap-4">
            <div className="flex justify-between items-end flex-wrap gap-2">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs">Availability</span>
                <span className="text-gray-900 font-bold">
                  {availableSlots} of {totalSlots} slots remaining
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-gray-500 text-xs">
                  Next Available Campaign Start
                </span>
                <span className="text-gray-900 font-bold">
                  {placement?.next_campaign_start_date || "Flexible"}
                </span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, Math.max(5, slotPercentage))}%` }}
              />
            </div>
          </div>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* Audience Overview */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-gray-900">Audience Overview</h2>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">
                  Estimated Monthly Foot Traffic / Audience
                </span>
                <span className="text-gray-900 font-bold">
                  {ao.monthly_foottraffic ? `${ao.monthly_foottraffic} Audience` : "50K+ Monthly Reach"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-orange-50 rounded-lg flex items-center justify-center">
                <Globe className="w-5 h-5 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xs">
                  Audience Demographics
                </span>
                <span className="text-gray-900 font-semibold">
                  {ao.male_aud || "50"}% male | {ao.female_aud || "50"}% female
                </span>
              </div>
            </div>
          </div>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* Specifications */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-6">
          <h2 className="text-lg font-bold text-gray-900">Specifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-xs">Format</span>
              <span className="text-gray-900 font-semibold">
                {ao.format_detail?.name || (ao.format ? String(ao.format) : "Digital / Media")}
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-xs">Length</span>
              <span className="text-gray-900 font-semibold">
                {ao.ad_length_detail?.name || (ao.ad_length ? `${ao.ad_length} seconds` : "30 seconds")}
              </span>
            </div>
            <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
              <span className="text-gray-500 text-xs">
                Campaign Launch Time
              </span>
              <span className="text-gray-900 font-semibold leading-relaxed">
                {ao.launch_time || "Ad goes live within 24 hours after host approval (depending on operating hours)"}
              </span>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default LeftDetails;

