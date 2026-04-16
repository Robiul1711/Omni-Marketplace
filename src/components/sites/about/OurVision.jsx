import React from 'react';

const OurVision = () => {
  return (
    <section className="relative overflow-hidden bg-white py-10 md:py-24 px-6 rounded-2xl">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-cyan-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-blue-300 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mb-8">
          Our Vision
        </h2>

        {/* Lead Statement */}
        <p className="text-xl md:text-3xl font-semibold text-slate-800 leading-snug mb-8">
          We believe the future of advertising is decentralized, dynamic, <br className="hidden md:block" /> and screen-based.
        </p>

        {/* Detailed Description */}
        <p className="text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl mx-auto">
          Omni Marketplace is building the infrastructure that turns idle screens into 
          <span className="text-indigo-600/80 font-medium"> active digital assets</span>, 
          creating a global network where attention, space, and opportunity 
          are efficiently exchanged.
        </p>
      </div>
    </section>
  );
};

export default OurVision;