import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import FooterLogo from "@/assets/images/logo.png";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const Footer = () => {
  const footerLinks = [
    {
      title: "For Advertisers",
      links: [
        { name: "Browse Placements", path: "/browse-placements" },
        { name: "Sign Up", path: "/auth/signup" },
      ],
    },
    {
      title: "For Hosts",
      links: [
        { name: "Become a Host", path: "/auth/choose" },
        { name: "Host Dashboard", path: "/host/dashboard" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", path: "/about-us" },
        { name: "How It Works", path: "/how-it-works" },
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Contact Us", path: "/contact-us" },
      ],
    },
  ];

  return (
    <footer className="section-padding-x mt-20 py-12 bg-[#F9FAFB] border-t border-[#F9FAFB]">
      <div className="max-w-[1400px] mx-auto">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 "
        >
          {/* Logo & Info Column */}
          <motion.div
            variants={fadeInUp}
            className="col-span-2 lg:col-span-2 max-w-sm flex flex-col items-start"
          >
            <Link to="/" className="flex items-center gap-3 mb-8">
              <img
                src={FooterLogo}
                alt="Omni Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-[#171717] font-bold text-xl font-host-grotesk tracking-tight">
                Omni Marketplace
              </span>
            </Link>
            <p className="text-[#525866] text-base font-normal font-host-grotesk leading-relaxed">
              The structured advertising <br className="hidden lg:block" />{" "}
              placement marketplace.
            </p>
          </motion.div>

          {/* Nav Columns */}
          {footerLinks.map((section, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="flex flex-col mb-8"
            >
              <h4 className="text-[#171717] font-bold text-lg font-host-grotesk mb-8">
                {section.title}
              </h4>
              <ul className="flex flex-col gap-5">
                {section.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-[#4A5565] hover:text-Primary transition-colors text-base font-normal font-host-grotesk"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="pt-5 border-t border-[#E5E7EB] flex flex-col items-center"
        >
          <p className="text-[#525866] text-sm font-normal font-host-grotesk text-center">
            © 2026 Omni Marketplace. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
