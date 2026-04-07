import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const MarketPlaceworks = () => {
  const [activeTab, setActiveTab] = useState("advertisers");

  const content = {
    advertisers: [
      {
        number: 1,
        title: "Discover Global Advertising Opportunities",
        description:
          "Browse advertising placements from hosts around the world.",
      },
      {
        number: 2,
        title: "View Listing Details",
        description:
          "Review audience reach, pricing packages, and placement details.",
      },
      {
        number: 3,
        title: "Book Placement",
        description: "Select a placement and confirm your campaign",
      },
      {
        number: 4,
        title: "Secure Payment",
        description: "Complete checkout and receive booking confirmation",
      },
    ],
    sellers: [
      {
        number: 1,
        title: "Create Your Profile",
        description: "Sign up and share details about your media channel",
      },
      {
        number: 2,
        title: "List Your Placements",
        description:
          "Create structured listings with pricing and audience data",
      },
      {
        number: 3,
        title: "Receive Bookings",
        description: "Get notified when businesses book your placements",
      },
      {
        number: 4,
        title: "Get Paid",
        description: "Receive secure payments after campaign delivery",
      },
    ],
  };

  return (
    <section className="section-padding-x  bg-[#F9FAFB] py-20">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[32px] md:text-[54px] font-semibold text-[#101828] font-host-grotesk mb-4">
            How Omni Marketplace Works
          </h2>
          <p className="text-[#525866] text-lg md:text-[20px] font-normal font-host-grotesk">
            A structured process designed to protect both advertisers and hosts.
          </p>
        </motion.div>

        {/* Tab Toggle Section */}
        <div className="flex justify-center mb-20 ">
          <div className="bg-[#F9FAFB] p-1 rounded-xl border border-gray-100 inline-flex items-center shadow-sm">
            <button
              onClick={() => setActiveTab("advertisers")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                activeTab === "advertisers"
                  ? "text-white"
                  : "text-[#667085] hover:text-[#101828]"
              }`}
            >
              {activeTab === "advertisers" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-Primary rounded-lg shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">For Advertisers</span>
            </button>
            <button
              onClick={() => setActiveTab("sellers")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 relative ${
                activeTab === "sellers"
                  ? "text-white"
                  : "text-[#667085] hover:text-[#101828]"
              }`}
            >
              {activeTab === "sellers" && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-[#335cff] rounded-lg shadow-md"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">For Sellers</span>
            </button>
          </div>
        </div>

        {/* Steps Grid Section */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            exit="initial"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {content[activeTab].map((step) => (
              <motion.div
                key={step.number}
                variants={fadeInUp}
                className="flex flex-col items-center text-center group"
              >
                {/* Number Box */}
                <div className="w-12 h-12 bg-Primary rounded-lg flex items-center justify-center text-white font-semibold text-lg mb-8 shadow-lg shadow-[#335cff]/20 group-hover:scale-110 transition-transform duration-300">
                  {step.number}
                </div>

                {/* Step Content */}
                <h3 className="text-[18px] font-medium text-[#171717] mb-3 font-host-grotesk px-4">
                  {step.title}
                </h3>
                <p className="text-[#667085] text-[15px] leading-relaxed font-normal font-host-grotesk px-2">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default MarketPlaceworks;
