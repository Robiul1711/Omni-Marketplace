import React from "react";
import { Link, NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Button from "../../components/ui/Button";

const MobileOptions = ({ isOpen, onClose, navLinks }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[320px] bg-[#1e3a8a] z-[70] shadow-[-10px_0_30px_rgba(0,0,0,0.3)] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <span className="font-host-grotesk font-bold text-xl text-white">
                Menu
              </span>
              <button
                onClick={onClose}
                className="p-2 text-white/60 hover:text-white transition-colors bg-white/5 rounded-lg"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav Links */}
            <nav className="flex-1 overflow-y-auto py-4">
              {navLinks.map((item, index) => (
                <NavLink
                  key={item}
                  to={`/${item.toLowerCase().replace(/ /g, "-")}`}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-6 py-5 border-b border-white/5 font-host-grotesk tracking-wide transition-all ${
                      isActive
                        ? "text-white font-bold bg-white/10"
                        : "text-white/70 font-medium hover:bg-white/5"
                    }`
                  }
                >
                  <span className="text-[17px]">{item}</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${index % 2 === 0 ? "bg-blue-400" : "bg-indigo-400"} opacity-60`}
                  />
                </NavLink>
              ))}
            </nav>

            {/* Actions */}
            <div className="p-6 bg-black/10 border-t border-white/10 gap-4 flex flex-col mt-auto">
              <Link to={`/auth/login`}>
                <Button
                  onClick={onClose}
                  className="bg-white text-black! font-bold py-4 rounded-xl shadow-sm hover:bg-white/90"
                >
                  LOG IN
                </Button>
              </Link>
              <Link to={`/auth/choose`}>
                <Button
                  onClick={onClose}
                  className="bg-[#335cff] text-white font-bold py-4 rounded-xl shadow-lg shadow-black/20"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileOptions;
