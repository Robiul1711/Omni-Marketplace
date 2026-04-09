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
} from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const LeftDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const images = [Image1, Image2, Image3, Image4, Image1];

  const whatsIncluded = [
    "30-second mid-roll placement",
    "Read by host (authentic endorsement)",
    "Mention in episode show notes",
    "Campaign reporting inside Omni dashboard",
  ];

  const campaignInfo = [
    {
      label: "Campaign Start Date",
      value: "Campaign will start based on host availability.",
    },
    { label: "Campaign Duration", value: "30 Days Continuous Advertising" },
    {
      label: "Display Time",
      value: "Ads run only during host operating hours",
    },
  ];

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
          className="rounded-2xl mb-4 h-[450px] overflow-hidden group shadow-sm"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <img
                src={img}
                alt={`Gallery ${index}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={16}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="thumbnail-swiper"
        >
          {images.slice(0, 4).map((img, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer rounded-xl overflow-hidden border-2 border-transparent swiper-slide-thumb-active:border-blue-600 transition-all"
            >
              <img
                src={img}
                alt={`Thumb ${index}`}
                className="w-full h-28 object-cover rounded-lg"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Header Info */}
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <span className="bg-[#EEF2FF] text-Primary px-3 py-1 rounded-md text-xs font-semibold w-fit">
              Podcast
            </span>
            <h1 className="text-3xl font-bold text-gray-900">
              Mid-Roll Ad – Tech Podcast
            </h1>
          </div>
          <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-lg text-sm font-normal hover:bg-gray-50 transition-colors text-[#525866]">
            <Heart className="w-4 h-4" />
            Save Placement
          </button>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-semibold text-gray-900">
                Tech Talks Daily
              </span>
              <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-500" />
            </div>
            <span className="text-xs text-gray-500">Member since 2024</span>
          </div>
        </div>
      </div>

      <div className="h-[1px] bg-gray-100 w-full my-4" />

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
          <p className="text-gray-600 text-sm leading-relaxed">
            Reach engaged tech professionals through our daily podcast. Mid-roll
            ads are placed at the natural break point in our episodes, ensuring
            maximum listener attention and retention. Our audience consists of
            developers, product managers, and tech entrepreneurs actively
            looking for tools and services to improve their workflow.
          </p>
        </motion.section>

        <div className="h-[1px] bg-gray-100 w-full" />

        {/* What's Included */}
        <motion.section variants={fadeInUp} className="flex flex-col gap-4">
          <h2 className="text-lg font-bold text-gray-900">What's Included</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3">
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
            {campaignInfo.map((info, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="font-bold text-gray-900 text-sm whitespace-nowrap">
                  {info.label}:
                </span>
                <span className="text-gray-600 text-sm">{info.value}</span>
              </div>
            ))}
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
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <span className="text-gray-500 text-xs">
                  March 2026 Availability
                </span>
                <span className="text-gray-900 font-bold">
                  7 of 10 slots remaining
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end">
                <span className="text-gray-500 text-xs">
                  Next Available Campaign Start
                </span>
                <span className="text-gray-900 font-bold">April 7, 2026</span>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-[70%] h-full bg-blue-600 rounded-full" />
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
                <span className="text-gray-500 text-xs ">
                  Estimated Monthly Audience (Host-reported)
                </span>
                <span className="text-gray-900 font-bold">50K Audience</span>
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
                  78% male | 22% female
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
              <span className="text-gray-900 font-semibold">Audio</span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-gray-500 text-xs">Length</span>
              <span className="text-gray-900 font-semibold">30 seconds</span>
            </div>
            <div className="flex flex-col gap-1 col-span-1 md:col-span-2">
              <span className="text-gray-500 text-xs">
                Campaign Launch Time
              </span>
              <span className="text-gray-900 font-semibold leading-relaxed">
                Ad goes live within 24 hours after host approval (depending on
                operating hours)
              </span>
            </div>
          </div>
        </motion.section>
      </motion.div>
    </div>
  );
};

export default LeftDetails;
