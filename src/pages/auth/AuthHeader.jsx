import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "@/assets/images/logo.png";

const AuthHeader = () => {
  return (
    <header className="py-6 px-8 border-b border-gray-50 flex items-center bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center gap-3">
        <img src={FooterLogo} alt="Omni Logo" className="w-8 h-8 object-contain" />
        <span className="text-[#171717] font-bold text-lg font-host-grotesk tracking-tight">
          Omni Marketplace
        </span>
      </Link>
    </header>
  );
};

export default AuthHeader;