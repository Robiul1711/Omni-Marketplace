import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, CheckCircle2 } from "lucide-react";
import Button from "../../ui/Button";
import BackgroundImage from "@/assets/images/heroBg.png";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { fadeInUp, staggerContainer } from "../../../utils/animations";
import { useNavigate } from "react-router-dom";
import useClient from "@/hooks/useClient";
import { PLACEMENTS_OPTIONS } from "@/apiFunctions/apiEndPoints";

const HeroBannerSkeleton = () => {
  return (
    <section className="relative min-h-[95vh] pt-40 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>

      <div className="max-w-[1400px] w-full mx-auto px-4 flex flex-col items-center text-center z-10 animate-pulse">
        {/* Title Skeleton */}
        <div className="h-10 sm:h-14 md:h-20 bg-gray-300/60 rounded-2xl w-11/12 max-w-4xl mb-4" />
        <div className="h-8 sm:h-12 md:h-16 bg-gray-300/60 rounded-2xl w-3/4 max-w-2xl mb-8" />

        {/* Subtitle Skeleton */}
        <div className="h-6 bg-gray-300/60 rounded-lg w-4/5 max-w-xl mb-16" />

        {/* Search Bar Container Skeleton */}
        <div className="bg-white/80 backdrop-blur-xl p-4 rounded-[24px] shadow-sm border border-white/60 w-full max-w-6xl h-24 mb-16" />

        {/* Features Badges Skeleton */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-16">
          <div className="h-6 bg-white/40 rounded-full w-40" />
          <div className="h-6 bg-white/40 rounded-full w-36" />
          <div className="h-6 bg-white/40 rounded-full w-44" />
        </div>
      </div>
    </section>
  );
};

const HeroBanner = ({ data, verifiedHosts, isLoading }) => {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [category, setCategory] = useState("all");
  const [establishmentType, setEstablishmentType] = useState("all");

  const { data: optionsResponse } = useClient({
    queryKey: ["placementOptions"],
    url: PLACEMENTS_OPTIONS,
  });

  const optionsData = optionsResponse?.data || {};
  const promotionTypes = optionsData.promotion_types || [];
  const channelTypes = optionsData.channel_types || [];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchValue.trim()) params.set("search", searchValue.trim());
    if (category && category !== "all") params.set("promotion_type", category);
    if (establishmentType && establishmentType !== "all") params.set("channel_type", establishmentType);
    const queryString = params.toString();
    navigate(queryString ? `/browse-placements?${queryString}` : `/browse-placements`);
  };

  const handleMapClick = () => {
    const params = new URLSearchParams();
    if (searchValue.trim()) params.set("search", searchValue.trim());
    if (category && category !== "all") params.set("promotion_type", category);
    if (establishmentType && establishmentType !== "all") params.set("channel_type", establishmentType);
    const queryString = params.toString();
    navigate(queryString ? `/browse-placements-map?${queryString}` : `/browse-placements-map`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  if (isLoading) {
    return <HeroBannerSkeleton />;
  }

  const defaultAvatars = [
    "https://i.pravatar.cc/100?img=12",
    "https://i.pravatar.cc/100?img=32",
    "https://i.pravatar.cc/100?img=44",
  ];

  const hostAvatars =
    Array.isArray(verifiedHosts) && verifiedHosts.length > 0
      ? verifiedHosts.slice(0, 3).map((h, idx) => {
          if (typeof h === "string") return h;
          return (
            h?.avatar ||
            h?.profile_photo ||
            h?.image ||
            h?.avatar_url ||
            defaultAvatars[idx % defaultAvatars.length]
          );
        })
      : defaultAvatars;

  const title = data?.title || "Secure Advertising Deals with Verified Hosts";
  const description =
    data?.description ||
    "A secure marketplace where brands connect with verified advertising hosts.";
  const features =
    Array.isArray(data?.features) && data.features.length > 0
      ? data.features
      : ["Escrow Protected", "Verified Hosts", "Structured Pricing"];

  const renderTitle = () => {
    if (title.toLowerCase().includes("verified hosts")) {
      const matchIndex = title.toLowerCase().indexOf("verified hosts");
      const before = title.slice(0, matchIndex);
      const after = title.slice(matchIndex + "verified hosts".length);

      return (
        <>
          {before}
          <span className="inline-flex items-center gap-2 md:gap-4 flex-wrap justify-center">
            Verified
            <span className="inline-flex items-center -space-x-4 mx-2">
              {hostAvatars.map((src, idx) => (
                <img
                  key={idx}
                  src={src}
                  className="w-10 h-10 md:w-16 md:h-16 rounded-full border-4 border-white shadow-sm object-cover"
                  alt={`Host ${idx + 1}`}
                />
              ))}
            </span>
            Hosts
          </span>
          {after}
        </>
      );
    }

    return (
      <span className="inline-flex items-center gap-2 md:gap-4 flex-wrap justify-center">
        {title}
        <span className="inline-flex items-center -space-x-4 mx-2">
          {hostAvatars.map((src, idx) => (
            <img
              key={idx}
              src={src}
              className="w-10 h-10 md:w-16 md:h-16 rounded-full border-4 border-white shadow-sm object-cover"
              alt={`Host ${idx + 1}`}
            />
          ))}
        </span>
      </span>
    );
  };

  return (
    <section className="relative min-h-[95vh] pt-40 pb-20 flex flex-col items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <img
          src={BackgroundImage}
          alt="Background"
          className="w-full h-full object-cover"
        />
        {/* Optional overlay if the image is too dark/bright for the text */}
        <div className="absolute inset-0 bg-white/10 backdrop-blur-[2px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="max-w-[1400px] mx-auto px-4 text-center z-10"
      >
        {/* Title */}
        <motion.div
          variants={fadeInUp}
          className="mb-6 flex flex-col items-center"
        >
          <h1
            className="text-[36px] md:text-[54px] lg:text-[88px] font-semibold leading-[1.05] md:leading-[92px] tracking-[1.76px] font-host-grotesk text-center"
            style={{
              background:
                "linear-gradient(92deg, #00226E 22.48%, #002D8F 79.24%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {renderTitle()}
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          className="text-[#465E92] text-lg md:text-[24px] font-host-grotesk  mx-auto mb-16"
        >
          {description}
        </motion.p>

        {/* Search Bar Container */}
        <motion.div
          variants={fadeInUp}
          className="bg-white backdrop-blur-xl p-2 md:p-3 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-white flex flex-col lg:flex-row justify-between sm:items-center gap-2 w-full max-w-6xl mb-16"
        >
          {/* Input Group */}
          <div className="flex items-center gap-3 px-4 py-3  w-full lg:max-w-[500px] border-b lg:border-b-0 lg:border-r border-gray-100">
            <Search className="text-gray-400 shrink-0" size={22} />
            <input
              type="text"
              placeholder="Search placements..."
              className="bg-transparent border-none outline-none font-host-grotesk text-[rgba(10,10,10,0.80)] w-full placeholder:text-gray-400 text-sm"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          {/* Select Category */}
          <div className=" flex  justify-center items-center sm:flex-row flex-col gap-5">
            <div className="w-full!  px-2 border-b lg:border-b-0 lg:border-r border-gray-100/50">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger
                  className="border-none shadow-none font-host-grotesk text-[#525866] h-12! rounded-xl transition-colors cursor-pointer"
                  style={{ background: "rgba(71, 108, 255, 0.10)" }}
                >
                  <SelectValue placeholder="Promotion Category" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Promotion Categories</SelectItem>
                  {promotionTypes.map((prom) => (
                    <SelectItem key={prom.id} value={String(prom.id)}>
                      {prom.name}
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
            </div>

            {/* Select Type */}
            <div className="w-full!  px-2 border-b lg:border-b-0 lg:border-r border-gray-100/50">
              <Select value={establishmentType} onValueChange={setEstablishmentType}>
                <SelectTrigger
                  className="border-none shadow-none font-host-grotesk text-[#525866] h-12!  rounded-xl transition-colors cursor-pointer"
                  style={{ background: "rgba(71, 108, 255, 0.10)" }}
                >
                  <SelectValue placeholder="Channel / Establishment Type" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="all">All Channel Types</SelectItem>
                  {channelTypes.map((chan) => (
                    <SelectItem key={chan.id} value={String(chan.id)}>
                      {chan.name}
                    </SelectItem>
                  ))}
                  {channelTypes.length === 0 && (
                    <>
                      <SelectItem value="4">In-Store Audio Network</SelectItem>
                      <SelectItem value="5">Digital Billboard</SelectItem>
                      <SelectItem value="6">Interactive Kiosk</SelectItem>
                    </>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Map Icon Box */}
            <button
              type="button"
              onClick={handleMapClick}
              title="Browse on Map"
              className="p-4 bg-[rgba(71,108,255,0.10)] hover:bg-[rgba(71,108,255,0.20)] rounded-xl h-12! transition-all cursor-pointer border border-transparent shrink-0 hidden md:flex justify-center items-center"
            >
              <MapPin size={24} className="text-[#335cff]" />
            </button>
          </div>

          {/* Search Button */}
          <Button
            onClick={handleSearch}
            className="w-full md:w-auto bg-[#335cff] hover:bg-[#2849cc] gap-2 px-6 md:px-10 py-3 rounded-xl md:rounded-2xl text-base md:text-lg shadow-lg shadow-[#335cff]/20 cursor-pointer"
          >
            <Search size={22} className="shrink-0" />{" "}
            <span className="md:inline">Search</span>
          </Button>
        </motion.div>


        {/* Features/Badges */}
        <motion.div
          variants={fadeInUp}
          className="flex flex-wrap justify-center gap-4 md:gap-16"
        >
          {features.map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 text-[#EBF1FF] font-host-grotesk font-medium text-lg"
            >
              <CheckCircle2 size={24} className="text-[#EBF1FF]" />
              {typeof item === "string" ? item : item?.text || item?.title}
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroBanner;

