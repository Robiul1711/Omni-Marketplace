import React, { useState } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Link } from "react-router-dom";

const RightDetails = () => {
  const [selectedPackage, setSelectedPackage] = useState("Standard");

  const packages = [
    {
      name: "Basic",
      price: 20,
      features: ["1 Story Frame", "Link Sticker", "24h Visibility"],
    },
    {
      name: "Standard",
      price: 50,
      features: [
        "2 Story Frames",
        "Link Sticker",
        "Swipe-up CTA",
        "Performance Screenshot",
      ],
      recommended: true,
    },
    {
      name: "Premium",
      price: 150,
      features: [
        "3 Story Frames",
        "Priority Posting Time",
        "Swipe-up CTA",
        "Performance Screenshot",
        "Highlight for 7 days",
      ],
    },
  ];

  const currentPrice =
    packages.find((p) => p.name === selectedPackage)?.price || 50;

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold text-gray-900">Package Selector</h2>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex flex-col gap-4"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={fadeInUp}
              onClick={() => setSelectedPackage(pkg.name)}
              className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                selectedPackage === pkg.name
                  ? "border-Primary bg-white shadow-sm"
                  : "border-gray-100 bg-white hover:border-gray-200"
              }`}
            >
              {pkg.recommended && (
                <div className="absolute top-4 right-4 bg-Primary text-white text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                  Recommended
                </div>
              )}
              <div className="flex flex-col gap-1">
                <span className="text-sm font-bold text-gray-900">
                  {pkg.name}
                </span>
                <span className="text-2xl font-bold text-gray-900">
                  ${pkg.price}
                </span>
              </div>
              <ul className="mt-4 flex flex-col gap-2">
                {pkg.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="text-xs text-gray-500 flex items-start gap-2"
                  >
                    <span className="mt-1.5 w-1 h-1 bg-gray-400 rounded-full shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Booking Card */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-6"
      >
        <div className="flex flex-col gap-1">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-gray-900">
              ${currentPrice}
            </span>
            <span className="text-gray-500 text-sm">per placement</span>
          </div>
          <span className="text-gray-500 text-sm italic">30 seconds</span>
        </div>

        <Link
          to={`/booking-process`}
          className="w-full bg-Primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
        >
          Book Placement
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 text-sm">
              Verified host with quality guarantee
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gray-400" />
            <span className="text-gray-600 text-sm">
              Only one placement can be purchased per transaction.
            </span>
          </div>
        </div>
      </motion.div>

      {/* Safe & Secure */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900 text-sm">Safe & Secure</span>
        </div>
        <p className="text-gray-500 text-sm leading-relaxed">
          Your payment is protected. Funds are released to the host only after
          successful campaign delivery.
        </p>
      </motion.div>

      {/* Venue Policy */}
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm flex flex-col gap-3"
      >
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-orange-500" />
          <span className="font-medium text-gray-900 text-sm">
            Venue Policy:
          </span>
        </div>
        <p className="text-gray-900 font-semibold text-sm leading-relaxed">
          Businesses cannot promote direct competitors inside the same venue
        </p>
      </motion.div>
    </div>
  );
};

export default RightDetails;
