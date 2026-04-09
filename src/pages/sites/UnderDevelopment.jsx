import React from "react";
import { Hammer } from "lucide-react";
import { motion } from "motion/react";
import { fadeInUp, fadeIn } from "@/utils/animations";
import { Link } from "react-router-dom";

const UnderDevelopment = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 font-inter text-center">
      <motion.div
        {...fadeInUp}
        className="bg-white rounded-3xl p-12 shadow-sm border border-gray-50 flex flex-col items-center max-w-[600px] w-full"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mb-8">
          <Hammer className="w-10 h-10 text-Primary animate-pulse" />
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold text-gray-900 mb-4"
        >
          Page Under Development
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-500 text-lg mb-10 leading-relaxed"
        >
          We're working hard to bring you something amazing. This feature is currently under construction and will be available soon.
        </motion.p>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4 }}
           className="w-full flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/"
            className="px-10 py-4 bg-Primary text-white rounded-xl font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all transform active:scale-[0.98]"
          >
            Go Back Home
          </Link>
          <Link
            to="/browse-placements"
            className="px-10 py-4 bg-white text-gray-700 border border-gray-100 rounded-xl font-bold hover:bg-gray-50 transition-all"
          >
            Browse Placements
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        {...fadeIn}
        transition={{ delay: 0.6 }}
        className="mt-12 text-gray-400 text-sm italic"
      >
        Estimated launch: Coming Soon 2026
      </motion.div>
    </div>
  );
};

export default UnderDevelopment;
