import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, UserCheck, TrendingUp } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const ExtraSection = () => {
  const features = [
    {
      icon: <ShieldCheck size={24} className="text-[#335cff]" />,
      title: "Secure Payments",
      description:
        "All transactions are protected with industry standard security and escrow options",
    },
    {
      icon: <UserCheck size={24} className="text-[#335cff]" />,
      title: "Verified Hosts",
      description:
        "Every host is vetted to ensure authentic audiences and quality placements",
    },
    {
      icon: <TrendingUp size={24} className="text-[#335cff]" />,
      title: "Transparent Audience Metrics",
      description:
        "See verified reach, engagement, and campaign exposure before booking.",
    },
  ];

  return (
    <section className="section-padding-x  bg-white">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-[20px] font-semibold text-[#101828] font-host-grotesk mb-3">
                {feature.title}
              </h3>
              <p className="text-[#525866] text-base leading-relaxed font-normal font-host-grotesk max-w-[320px]">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExtraSection;
