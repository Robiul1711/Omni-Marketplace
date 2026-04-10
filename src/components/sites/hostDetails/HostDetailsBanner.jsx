import React from "react";
import { Link } from "react-router-dom";

const HostDetailsBanner = () => {
  return (
    <section className="w-full section-padding-x ">
      {/* Breadcrumb Navigation */}
      <nav className="flex items-center gap-2 text-sm md:text-base text-gray-400 mb-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <Link to="/" className="hover:text-gray-900 transition-colors">
          Marketplace
        </Link>
        <span className="text-gray-300">/</span>
        <Link
          to="/mid-roll-ad"
          className="hover:text-gray-900 transition-colors"
        >
          Mid-Roll Ad – Tech Podcast
        </Link>
        <span className="text-gray-300">/</span>
        <span className="text-gray-900 font-semibold">Tech-talks-daily</span>
      </nav>

      {/* Banner Image Container */}
      <div className="relative w-full aspect-[21/9] md:aspect-[24/10] lg:aspect-[4/1] rounded-[24px] overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[1.01] bg-gray-100">
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
          alt="Tech Host Banner"
          className="w-full h-full object-cover brightness-95"
          loading="lazy"
        />
        {/* Subtle Overlay to match the darkish feel of the reference image */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>
      </div>
    </section>
  );
};

export default HostDetailsBanner;
