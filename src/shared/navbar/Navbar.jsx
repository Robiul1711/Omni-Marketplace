import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";
import { ArrowRight, Menu } from "lucide-react";
import MobileOptions from "./MobileOptions";
import Logo from "@/assets/images/logo.png";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "@/redux/slices/authSlice";
import UserDropdown from "@/components/layout/UserDropdown";

const Navbar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();

  const navLinks = [
    {
      id: 1,
      title: "BROWSE PLACEMENTS",
      path: "/browse-placements",
    },
    {
      id: 2,
      title: "HOW IT WORKS",
      path: "/how-it-works",
    },
    {
      id: 3,
      title: "ABOUT US",
      path: "/about-us",
    },
    {
      id: 4,
      title: "BECOME A HOST",
      path: "/auth/choose",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update solid background state
      setScrolled(currentScrollY > 50);

      // Handle navbar visibility (hide on scroll down, show on scroll up)
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

  const isNotHome = location.pathname !== "/";
  const showSolidBg = scrolled || isNotHome;

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -120, // Move it off-screen when not visible
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 section-padding-x lg:top-6"
      >
        <div
          className="flex items-center justify-between p-2.5 rounded-[16px] backdrop-blur-[16.4px] shadow-2xl shadow-blue-900/10 transition-all duration-300 "
          style={{
            borderRadius: "16px",
            background: showSolidBg ? "#304AAF" : "rgba(48, 74, 175, 0.32)",
            backgroundBlendMode: showSolidBg ? "normal" : "color-burn",
            backdropFilter: "blur(16.399999618530273px)",
          }}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 px-4">
            <img src={Logo} alt="Logo" className="w-10 h-10" />
            <span className="text-white font-host-grotesk font-semibold text-xl tracking-tight hidden md:block">
              Omni Marketplace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xlg:flex items-center gap-8">
            {navLinks.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                className={({ isActive }) =>
                  `text-white hover:text-white font-host-grotesk xl:text-base text-sm tracking-wider transition-all duration-300 hover:scale-105 ${
                    isActive
                      ? "font-bold underline underline-offset-4"
                      : "font-normal"
                  }`
                }
              >
                {item.title}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="flex items-center gap-2 md:gap-4 ">
            {isAuthenticated ? (
              <div className="bg-white/95 px-3 py-1.5 rounded-2xl shadow-sm">
                <UserDropdown />
              </div>
            ) : (
              <>
                <Link to={`/auth/login`} className="hidden sm:flex">
                  <Button className=" bg-white text-black! rounded-xl! hover:bg-gray-100 border-none px-6 md:px-8 py-3 font-medium text-sm md:text-base">
                    LOG IN
                  </Button>
                </Link>
                <Link to="/auth/choose">
                  <Button className="bg-[#335cff] text-white hover:bg-[#2849cc] gap-2 px-6 md:px-8 py-3 rounded-xl! font-bold shadow-lg shadow-blue-500/20 text-sm md:text-base">
                    Get Started <ArrowRight size={18} className="hidden xs:block" />
                  </Button>
                </Link>
              </>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="xlg:hidden p-2 text-white/90 hover:text-white transition-colors"
            >
              <Menu size={28} />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileOptions
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
};

export default Navbar;
