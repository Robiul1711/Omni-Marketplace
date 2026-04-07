import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Building2, User, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/utils/animations";

const Choose = () => {
  const navigate = useNavigate();

  const handleChoice = (type) => {
    console.log("User chose:", type);
    navigate(`/auth/signup?type=${type}`);
  };

  const choices = [
    {
      type: "business",
      icon: <Building2 size={24} className="text-Primary" />,
      title: "Become Omnipresent",
      description: "Find and book advertising placements from verified hosts to grow your brand.",
      bullets: [
        "Browse verified placements",
        "Secure payments with escrow",
        "Track campaign performance"
      ],
      buttonText: "Continue as Business",
      buttonStyle: "bg-Primary text-white hover:bg-[#2849cc]"
    },
    {
      type: "host",
      icon: <User size={24} className="text-Primary" />,
      title: "Become a Host",
      description: "Monetize your audience by offering advertising placements to businesses.",
      bullets: [
        "List your placements",
        "Get paid securely",
        "Build your reputation"
      ],
      buttonText: "Continue as Host",
      buttonStyle: "bg-Primary text-white hover:bg-[#2849cc]"
    }
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-6 sm:p-12">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center mb-12"
      >
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[#171717] font-host-grotesk mb-2">
          Omni Marketplace
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk">
          Choose how you want to get started
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-[850px] mb-12"
      >
        {choices.map((choice, idx) => (
          <motion.div
            key={idx}
            variants={fadeInUp}
            whileHover={{ y: -5 }}
            className="bg-white p-10 rounded-[20px] border border-gray-100 shadow-sm flex flex-col h-full items-start"
          >
            {/* Icon Banner */}
            <div className="w-12 h-12 bg-[#EFF6FF] rounded-xl flex items-center justify-center mb-8">
              {choice.icon}
            </div>

            <h3 className="text-[22px] font-bold text-[#171717] font-host-grotesk mb-4 text-left">
              {choice.title}
            </h3>
            <p className="text-[#525866] text-[15px] font-normal font-host-grotesk leading-relaxed mb-8 text-left h-12">
              {choice.description}
            </p>

            <ul className="space-y-3 mb-12 flex-grow">
              {choice.bullets.map((bullet, bIdx) => (
                <li key={bIdx} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-Primary" />
                  <span className="text-[#525866] text-sm font-medium font-host-grotesk">{bullet}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => handleChoice(choice.type)}
              className={`w-full py-4 rounded-xl font-bold text-base transition-all ${choice.buttonStyle}`}
            >
              {choice.buttonText}
            </button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-[#525866] text-lg font-normal font-host-grotesk"
      >
        Already have an account?{" "}
        <Link to="/auth/login" className="text-Primary font-medium border-b border-transparent hover:border-Primary transition-all">
          Sign in
        </Link>
      </motion.div>
    </div>
  );
};

export default Choose;