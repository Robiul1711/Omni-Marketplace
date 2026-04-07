import React from "react";
import { motion } from "framer-motion";
import { Megaphone, DollarSign, CheckCircle2 } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const ChooseOmni = () => {
  const sections = [
    {
      badge: "For Advertisers",
      badgeIcon: <Megaphone size={14} className="text-Primary" />,
      title: "Built for Brands That Want Real Visibility",
      items: [
        "Browse verified real-world advertising placements",
        "See actual placement previews before booking",
        "Secure escrow-protected transactions",
        "Structured pricing with transparent campaign flow",
      ],
    },
    {
      badge: "For Hosts",
      badgeIcon: <DollarSign size={14} className="text-Primary" />,
      title: "Turn Your Audience Into Scalable Revenue",
      items: [
        "Monetize podcasts, newsletters, screens, and digital channels",
        "Earn consistent monthly income through structured campaigns",
        "Receive secure 80% earnings per placement",
        "Manage bookings, delivery, and payments in one place",
      ],
    },
  ];

  return (
    <section className="section-padding-x py-20 bg-[#EFF6FF]">
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className=" mb-16 text-center"
        >
          <h2 className="text-[32px] md:text-[48px]  font-medium text-[#171717] font-host-grotesk">
            Why Advertisers and Hosts Choose Omni
          </h2>
        </motion.div>

        {/* Grid Content */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={fadeInUp}
              className="bg-white p-4 md:p-12 rounded-[32px] shadow-sm flex flex-col "
            >
              {/* Badge */}
              <div className=" flex justify-center items-center w-full">
                <div className="flex justify-center items-center gap-2 bg-[#F0F7FF] px-4 py-1.5 rounded-full mb-8">
                  {section.badgeIcon}
                  <span className="text-Primary text-sm font-medium font-host-grotesk">
                    {section.badge}
                  </span>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-[24px] md:text-[28px] font-semibold text-[#171717] font-host-grotesk mb-8  leading-tight">
                {section.title}
              </h3>

              {/* List Items */}
              <ul className="space-y-4 w-full ">
                {section.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M12 21C13.1819 21 14.3522 20.7672 15.4442 20.3149C16.5361 19.8626 17.5282 19.1997 18.364 18.364C19.1997 17.5282 19.8626 16.5361 20.3149 15.4442C20.7672 14.3522 21 13.1819 21 12C21 10.8181 20.7672 9.64778 20.3149 8.55585C19.8626 7.46392 19.1997 6.47177 18.364 5.63604C17.5282 4.80031 16.5361 4.13738 15.4442 3.68508C14.3522 3.23279 13.1819 3 12 3C9.61305 3 7.32387 3.94821 5.63604 5.63604C3.94821 7.32387 3 9.61305 3 12C3 14.3869 3.94821 16.6761 5.63604 18.364C7.32387 20.0518 9.61305 21 12 21ZM11.768 15.64L16.768 9.64L15.232 8.36L10.932 13.519L8.707 11.293L7.293 12.707L10.293 15.707L11.067 16.481L11.768 15.64Z"
                        fill="#1FC16B"
                      />
                    </svg>
                    <span className="text-[#525866] text-base md:text-[17px] font-normal font-host-grotesk leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Text */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-[#525866] text-lg md:text-[20px] italic font-normal font-host-grotesk">
            Ever wanted to see your brand featured nationally?{" "}
            <span className="font-medium text-[#171717]">
              Omni makes it possible.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseOmni;
