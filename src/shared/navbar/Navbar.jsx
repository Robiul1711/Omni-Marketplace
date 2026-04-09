import React, { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Button from "../../components/ui/Button";
import { ArrowRight, Menu } from "lucide-react";
import MobileOptions from "./MobileOptions";
import Logo from "@/assets/images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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
      title: "BECOME A HOST",
      path: "/auth/onboard-host",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isNotHome = location.pathname !== "/";
  const showSolidBg = scrolled || isNotHome;

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="fixed top-6 left-0 right-0 z-50 px-4 md:px-8 section-padding-x"
      >
        <div
          className="flex items-center justify-between p-2.5 rounded-[16px] backdrop-blur-[16.4px] shadow-2xl shadow-blue-900/10 transition-all duration-300"
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
