import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Forgot Password - Email submitted:", data.email);
    // Navigate to OTP page with context
    navigate(`/auth/verify-otp?email=${data.email}&flow=forgot`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-6 py-20">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center mb-10"
      >
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[#171717] font-host-grotesk mb-2">
          Forgot Password
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk">
          Enter your email to receive a verification code
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[500px] bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm mb-10"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk mb-2 flex justify-between">
              Email Address
              {errors.email && (
                <span className="text-[11px] text-red-500 normal-case">{errors.email.message}</span>
              )}
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full h-14 px-5 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } focus:border-Primary outline-none transition-all font-host-grotesk`}
            />
          </div>

          <Button type="submit" className="w-full h-14 rounded-xl font-bold text-base">
            Continue
          </Button>
        </form>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-[#525866] text-lg font-normal font-host-grotesk"
      >
        Wait, I remember my password!{" "}
        <Link to="/auth/login" className="text-Primary font-medium hover:underline">
          Sign in
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
