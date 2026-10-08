import React from "react";
import { motion } from "framer-motion";
import BlueImage from "@/assets/images/blueImage.png";
import { fadeInUp } from "@/utils/animations";
import Button from "../../ui/Button";
import { Link } from "react-router-dom";

const ReadyStarted = ({ data }) => {
  const title = data?.title || "Ready to Get Started?";
  const subtitle =
    data?.subtitle ||
    data?.description ||
    "Access advertising opportunities across global media channels. Start connecting with trusted hosts today.";
  const buttonText = data?.button_text || data?.btn_text || "Join Us";

  return (
    <section className="section-padding-x  bg-white">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className=" relative rounded-[16px] overflow-hidden bg-[#335cff]"
      >
        {/* Background Image with Pattern */}
        <div className="absolute inset-0 z-0">
          <img
            src={BlueImage}
            alt="Background"
            className="w-full h-full object-cover opacity-90"
          />
        </div>

        {/* Content */}
        <div className="relative z-10 px-6 py-16 md:py-24 flex flex-col items-center text-center">
          <h2 className="text-[32px] md:text-[48px] font-medium text-white font-host-grotesk mb-6">
            {title}
          </h2>
          <p className="text-[#DBEAFE] text-base md:text-[20px] font-normal font-host-grotesk max-w-[600px] leading-relaxed mb-10">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Link to={"/auth/choose"}>
              <Button className="bg-[#171717] text-white hover:bg-black font-semibold px-10 py-4 min-w-[180px] rounded-xl">
                {buttonText}
              </Button>
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default ReadyStarted;
