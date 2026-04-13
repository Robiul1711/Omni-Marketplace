import React from 'react';

const AboutToTheChanel = () => {
  return (
    <section className="section-padding-x">
      <div className="w-full bg-white border border-gray-100 rounded-[24px] overflow-hidden shadow-sm">
        {/* Header Section with Light Blue Background */}
        <div className="bg-[#EFF6FF] px-6 md:px-12 py-6 md:py-7">
          <h2 className="text-xl md:text-[22px] font-bold text-gray-900 font-inter!">About the Channel</h2>
        </div>

        {/* Content Section with Light Gray Background */}
        <div className="bg-gray-50/50 px-6 md:px-12 py-8 md:py-12 space-y-6 md:space-y-8">
          <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium">
            Tech Talks Daily is a technology-focused media channel that publishes podcasts, videos, and written content for developers, product managers, and technology professionals. Our audience includes startup founders, engineers, and tech decision-makers who actively follow industry trends and new digital tools.
          </p>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg font-medium">
            We partner with brands that want to reach a highly engaged technology audience through authentic placements and sponsored content.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutToTheChanel;
