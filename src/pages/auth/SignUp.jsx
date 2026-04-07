import React, { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "business";
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    console.log("Signup form submitted:", data, "Type:", type);
    // Navigate to OTP verification with context
    navigate(`/auth/verify-otp?email=${data.email}&type=${type}&flow=signup`);
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
          Omni Marketplace
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk">
          Create how you want to get started
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[500px] bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm mb-10"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk flex items-center justify-between mb-2">
              Name
              {errors.name && (
                <span className="text-[11px] text-red-500 font-normal">
                  {errors.name.message}
                </span>
              )}
            </label>
            <input
              type="text"
              placeholder="name"
              {...register("name", { required: "Name is required" })}
              className={`w-full h-14 px-5 rounded-xl border ${
                errors.name ? "border-red-500" : "border-gray-200"
              } focus:border-Primary focus:ring-1 focus:ring-Primary outline-none transition-all placeholder:text-gray-400 font-host-grotesk`}
            />
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk flex items-center justify-between mb-2">
              Email
              {errors.email && (
                <span className="text-[11px] text-red-500 font-normal">
                  {errors.email.message}
                </span>
              )}
            </label>
            <input
              type="email"
              placeholder="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className={`w-full h-14 px-5 rounded-xl border ${
                errors.email ? "border-red-500" : "border-gray-200"
              } focus:border-Primary focus:ring-1 focus:ring-Primary outline-none transition-all placeholder:text-gray-400 font-host-grotesk`}
            />
          </div>

          {/* Password */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk flex items-center justify-between mb-2">
              Password
              {errors.password && (
                <span className="text-[11px] text-red-500 font-normal">
                  {errors.password.message}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "At least 6 characters",
                  },
                })}
                className={`w-full h-14 px-5 pr-12 rounded-xl border ${
                  errors.password ? "border-red-500" : "border-gray-200"
                } focus:border-Primary focus:ring-1 focus:ring-Primary outline-none transition-all placeholder:text-gray-400 font-host-grotesk`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Repeat Password */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk flex items-center justify-between mb-2">
              Repeat Password
              {errors.repeatPassword && (
                <span className="text-[11px] text-red-500 font-normal">
                  {errors.repeatPassword.message}
                </span>
              )}
            </label>
            <div className="relative">
              <input
                type={showRepeatPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("repeatPassword", {
                  required: "Confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className={`w-full h-14 px-5 pr-12 rounded-xl border ${
                  errors.repeatPassword ? "border-red-500" : "border-gray-200"
                } focus:border-Primary focus:ring-1 focus:ring-Primary outline-none transition-all placeholder:text-gray-400 font-host-grotesk`}
              />
              <button
                type="button"
                onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showRepeatPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-Primary text-white rounded-xl font-bold text-base hover:bg-[#2849cc] transition-all"
          >
            Create Account
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-[#525866] text-lg font-normal font-host-grotesk"
      >
        Already have an account?{" "}
        <Link to="/auth/login" className="text-Primary font-medium hover:underline">
          Sign in
        </Link>
      </motion.div>
    </div>
  );
};

export default SignUp;