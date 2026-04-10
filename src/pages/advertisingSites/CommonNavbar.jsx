import { FiSearch, FiBell } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link, useLocation } from "react-router-dom";
import UserDropdown from "@/components/layout/UserDropdown";
import { motion } from "framer-motion";

const CommonNavbar = ({ open, setOpen }) => {
  const { pathname } = useLocation();
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
          <FiSearch className="text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search here"
            className="bg-transparent border-none outline-none w-full text-sm text-gray-700 placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Right side: Actions and Profile */}
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Browse Placements Button */}
        <Link
          to="/browse"
          className="hidden sm:flex items-center justify-center px-6 py-2.5 bg-[#3366FF] text-white text-sm font-semibold rounded-xl hover:bg-blue-600 transition-all shadow-md shadow-blue-100"
        >
          Browse Placements
        </Link>

        {/* Notifications */}
        <button className="relative p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-colors">
          <FiBell size={22} />
          <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 bg-blue-500 border-2 border-white rounded-full"></span>
        </button>

        {/* User Profile Dropdown */}
        <div className="border-l border-gray-200 pl-3 sm:pl-6 h-10 flex items-center">
          <UserDropdown />
        </div>
      </div>
    </motion.div>
  );
};

export default CommonNavbar;
