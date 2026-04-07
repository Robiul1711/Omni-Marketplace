import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PLACEMENTS_DATA } from "@/utils/AllData";
import { fadeInUp, staggerContainer } from "@/utils/animations";
import Button from "../../ui/Button";
import PlacementCard from "./PlacementCard";

const Explore = () => {
  return (
    <section className="section-padding-x bg-white">
      <div className="max-w-[1400px] mx-auto">
        {/* Header Section */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-[32px] md:text-[48px] font-bold text-[#00226E] font-host-grotesk mb-4">
            Explore Advertising Placements
          </h2>
          <p className="text-[#525866] text-lg font-medium">
            Structured packages from verified media hosts.
          </p>
        </motion.div>

        {/* Grid Section */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {PLACEMENTS_DATA.map((item) => (
            <PlacementCard key={item.id} item={item} />
          ))}
        </motion.div>

        {/* Footer Action */}
        <motion.div
          variants={fadeInUp}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <Button
            variant="secondary"
            className="px-10 py-3.5 border-2 border-[#335cff]/10 hover:border-[#335cff] text-[#292929] font-bold rounded-2xl flex items-center gap-2 bg-white"
          >
            Browse All Placements <ArrowRight size={20} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default Explore;
