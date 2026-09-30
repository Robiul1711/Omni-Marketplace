import React, { useState, useEffect } from "react";
import {
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
  Info,
} from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import { Link } from "react-router-dom";

const defaultPackages = [
  {
    id: 1,
    name: "Basic",
    price: 50,
    feature: ["Standard Story Frame", "Link Sticker", "24h Visibility"],
    is_recommended: false,
  },
  {
    id: 2,
    name: "Standard",
    price: 120,
    feature: [
      "Multiple Ad Slots",
      "High Priority Display",
      "Performance Analytics",
      "Weekly Reporting",
    ],
    is_recommended: true,
  },
  {
    id: 3,
    name: "Premium",
    price: 250,
    feature: [
      "Maximum Visibility",
      "Prime Time Exposure",
      "Dedicated Account Manager",
      "Full Campaign Analytics",
    ],
    is_recommended: false,
  },
];

const RightDetails = ({ placement = {} }) => {
  const apiPackages = Array.isArray(placement?.packages) && placement.packages.length > 0
    ? placement.packages
    : null;

  const packages = apiPackages || defaultPackages;

  // Initialize with recommended package or first package
  const initialPackage = packages.find((p) => p.is_recommended) || packages[0];
  const [selectedPackageId, setSelectedPackageId] = useState(initialPackage?.id || 1);

  useEffect(() => {
    if (packages.length > 0) {
      const rec = packages.find((p) => p.is_recommended) || packages[0];
      setSelectedPackageId(rec?.id);
    }
  }, [placement]);

  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[0];
  const currentPrice = activePackage?.price ?? (placement?.starting_price || 0);

  const durationStr =
    placement?.audience_overview?.ad_length_detail?.name ||
    (placement?.audience_overview?.ad_length ? `${placement.audience_overview.ad_length} seconds` : "30 seconds");

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
          {packages.map((pkg) => {
            const isSelected = selectedPackageId === pkg.id;
            const features = Array.isArray(pkg.feature)
              ? pkg.feature
              : (Array.isArray(pkg.features) ? pkg.features : []);

            return (
              <motion.div
                key={pkg.id || pkg.name}
                variants={fadeInUp}
                onClick={() => setSelectedPackageId(pkg.id)}
                className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? "border-Primary bg-white shadow-md shadow-blue-500/5 ring-2 ring-Primary/10"
                    : "border-gray-100 bg-white hover:border-gray-200"
                }`}
              >
                {pkg.is_recommended && (
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
                {features.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-gray-500 flex items-start gap-2"
                      >
                        <span className="mt-1.5 w-1 h-1 bg-Primary rounded-full shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            );
          })}
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
          <span className="text-gray-500 text-sm italic">{durationStr}</span>
        </div>

        <Link
          to={`/booking-process`}
          state={{ placement, package: activePackage }}
          className="w-full bg-Primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
        >
          Book Placement
          <ArrowRight className="w-5 h-5" />
        </Link>

        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
            <span className="text-gray-600 text-sm">
              Verified host with quality guarantee
            </span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-gray-400 shrink-0" />
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
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
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

