import React from "react";
import { Link } from "react-router-dom";
import FooterLogo from "@/assets/images/logoNew.png";

const AuthHeader = () => {
  return (
    <header className="py-6 px-8 border-b border-gray-50 flex items-center bg-white sticky top-0 z-50">
      <Link to="/" className="flex items-center">
        <img src={FooterLogo} alt="Omni Logo" className="h-12 md:h-14 w-auto object-contain max-w-[200px]" />
      </Link>
    </header>
  );
};

export default AuthHeader;