import React from "react";

const HowOmniWork = ({ title, description }) => {
  const mainTitle = title || "How Omni Marketplace Works";
  const desc = description || "A marketplace for screen-based advertising that connects advertisers with real screens worldwide, allowing hosts to monetize unused screen time through a secure, automated streaming system.";

  return (
    <section className="px-4 section-padding-y w-full flex justify-center mt-24 md:mt-10">

      <div className="relative w-full overflow-hidden rounded-[30px] md:rounded-[40px] bg-gradient-to-br md:bg-gradient-to-r from-[#4A8DFF] via-[#BDCFFF] to-[#E8EBFD] p-8 sm:p-12 md:p-20 shadow-lg">
        
        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center">
 
          <h2 className="mb-4 text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight text-[#111827] leading-tight">
            {mainTitle}
          </h2>


          <p className="max-w-4xl text-base sm:text-lg md:text-xl leading-relaxed text-[#4B5563] opacity-90">
            {desc}
          </p>
        </div>


        <div className="absolute inset-0 bg-white/5 pointer-events-none"></div>
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none"></div>
      </div>
    </section>
  );
};

export default HowOmniWork;