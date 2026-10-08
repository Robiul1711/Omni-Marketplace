import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const PromoteAnythingSkeleton = () => {
  return (
    <section className="section-padding-x bg-white py-12 animate-pulse">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column Skeleton */}
          <div className="flex flex-col gap-8">
            <div>
              <div className="h-10 md:h-12 bg-gray-200 rounded-xl w-3/4 mb-4" />
              <div className="h-10 md:h-12 bg-gray-200 rounded-xl w-1/2 mb-6" />
              <div className="h-5 bg-gray-200 rounded-md w-4/5 mb-3" />
              <div className="h-5 bg-gray-200 rounded-md w-3/5" />
            </div>

            <div className="h-6 bg-gray-200 rounded-md w-2/3 lg:mt-20 mt-4" />
          </div>

          {/* Right Column Skeleton */}
          <div className="flex flex-col gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-5 rounded-[16px] border border-gray-100 bg-white"
              >
                <div className="w-6 h-6 bg-emerald-100 rounded-full shrink-0" />
                <div className="h-5 bg-gray-200 rounded-md w-3/4" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const fallbackItems = [
  "Products and services",
  "Awareness campaigns (profit or nonprofit)",
  "Music promotions, snippets, or upcoming songs",
  "Local events",
  "Social media accounts",
  "Artificial intelligence (AI) tools & services",
];

const PromoteAnything = ({ data, isLoading }) => {
  if (isLoading) {
    return <PromoteAnythingSkeleton />;
  }

  const title = data?.title || "Promote Anything That Matters To You";
  const subtitle =
    data?.subtitle ||
    "Reach audiences across podcasts, digital screens, websites, newsletters, and more.";
  const description =
    data?.description ||
    "Omni Marketplace connects advertisers with trusted media hosts worldwide.";
  const items =
    Array.isArray(data?.features) && data.features.length > 0
      ? data.features
      : fallbackItems;

  return (
    <section className="section-padding-x  bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 ">
          {/* Left Column */}
          <motion.div
            variants={fadeInUp}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-8"
          >
            <div>
              <h2 className="text-[32px] md:text-[48px] font-medium text-[#171717] font-host-grotesk leading-[1.1] mb-6 whitespace-pre-line">
                {title}
              </h2>
              <p className="text-[#525866] text-lg md:text-[20px] font-normal font-host-grotesk leading-relaxed max-w-[500px]">
                {subtitle}
              </p>
            </div>

            <p
              className="text-[#171717] text-xl md:text-[24px] font-medium 
            font-host-grotesk  max-w-[450px] lg:mt-20 mt-4"
            >
              {description}
            </p>
          </motion.div>

          {/* Right Column */}
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex flex-col gap-4"
          >
            {items.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="flex items-center gap-4 p-5 rounded-[16px] border border-[#D1D1D1] bg-white "
              >
                <div className="flex-shrink-0">
                  <CheckCircle2
                    size={24}
                    className="text-[#10B981]"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[#171717] text-base md:text-lg font-normal font-host-grotesk">
                  {typeof item === "string" ? item : item?.title || item?.name}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PromoteAnything;

