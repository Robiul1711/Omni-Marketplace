import React from "react";
import About from "@/assets/images/about.png";

const AboutOmni = ({ data }) => {
  const title = data?.title || "About Omni Marketplace";
  const image = data?.image || About;
  const description = data?.description;

  return (
    <div className=" flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      {/* Left Side: Visual Container */}
      <div>
        <img
          src={image}
          alt={title}
          className="w-full h-auto object-contain z-10"
        />
      </div>

      {/* Right Side: Text Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mb-8 tracking-tight">
          {title}
        </h2>

        {description ? (
          <div
            dangerouslySetInnerHTML={{ __html: description }}
            className="space-y-6 text-lg md:text-xl text-[#4B5563] leading-relaxed [&_p]:mb-4"
          />
        ) : (
          <div className="space-y-6 text-lg md:text-xl text-[#4B5563] leading-relaxed">
            <p>
              Omni Marketplace is a digital advertising marketplace that connects
              businesses with real-time marketing placement opportunities across a
              distributed network of screens and digital display devices.
            </p>

            <p>
              The platform allows advertisers to book and manage campaigns, while
              enabling hosts to monetize their unused screen time by turning
              everyday devices into income-generating advertising spaces.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AboutOmni;
