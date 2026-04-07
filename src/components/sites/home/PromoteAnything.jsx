import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const PromoteAnything = () => {
  const items = [
    "Products and services",
    "Awareness campaigns (profit or nonprofit)",
    "Music promotions, snippets, or upcoming songs",
    "Local events",
    "Social media accounts",
    "Artificial intelligence (AI) tools & services",
  ];

  return (
    <section className="section-padding-x  bg-white">
      <div className="">
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
              <h2 className="text-[32px] md:text-[48px] font-medium text-[#171717] font-host-grotesk leading-[1.1] mb-6">
                Promote Anything That <br className="hidden md:block" /> Matters
                To You
              </h2>
              <p className="text-[#525866] text-lg md:text-[20px] font-normal font-host-grotesk leading-relaxed max-w-[500px]">
                Reach audiences across podcasts, digital screens, websites,
                newsletters, and more.
              </p>
            </div>

            <p
              className="text-[#171717] text-xl md:text-[24px] font-medium 
            font-host-grotesk  max-w-[450px] lg:mt-20 mt-4"
            >
              Omni Marketplace connects advertisers with trusted media hosts
              worldwide.
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
                className="flex items-center gap-4 p-5 rounded-[16px] border border-[#D1D1D1)] bg-white "
              >
                <div className="flex-shrink-0">
                  <CheckCircle2
                    size={24}
                    className="text-[#10B981]"
                    strokeWidth={1.5}
                  />
                </div>
                <span className="text-[#171717] text-base md:text-lg font-normal font-host-grotesk">
                  {item}
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
