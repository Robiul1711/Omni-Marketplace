import { FiSearch, FiBell } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import UserDropdown from "@/components/layout/UserDropdown";
import { motion } from "framer-motion";

const HostNavbar = ({ open, setOpen }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY && isVisible) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY && !isVisible) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isVisible]);

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: isVisible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="sticky top-0 z-[100] flex items-center justify-between w-full p-4 md:p-6 bg-white/80 backdrop-blur-md border-b border-gray-100"
    >
      {/* Left side: Mobile menu toggle and Search */}
      <div className="flex items-center gap-6 flex-1">
        <span
          onClick={() => setOpen(!open)}
          className="xlg:hidden block cursor-pointer text-gray-600 hover:text-gray-900 transition-colors"
        >
          <GiHamburgerMenu size={24} />
        </span>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-3 px-4 py-2.5 bg-gray-50/50 border border-gray-100 rounded-xl w-full max-w-md shadow-sm focus-within:border-blue-300 focus-within:bg-white transition-all">
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
          <FiSearch className="text-gray-400" size={20} />
        </div>
      </div>

      {/* Right side: Actions and Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Notifications */}
        <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors border border-gray-100">
          <FiBell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="pl-3 sm:pl-6 h-10 flex items-center border-gray-200">
          <UserDropdown />
        </div>
      </div>
    </motion.div>
  );
};

export default HostNavbar;