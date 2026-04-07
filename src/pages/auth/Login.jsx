import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Login form submitted:", data);
    
    // Simulate role check - if it's a host, we go to onboarding (if not done)
    // For now, go to home
    navigate("/");
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
          Choose how you want to get started
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[500px] bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm mb-10"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk underline flex items-center justify-between mb-2">
              Email
              {errors.email && (
                <span className="text-[11px] text-red-500 font-normal normal-case">
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
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-[#171717] font-host-grotesk underline flex items-center justify-between flex-grow mb-2">
                Password
                {errors.password && (
                  <span className="text-[11px] text-red-500 font-normal normal-case">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
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

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary"
              />
              <span className="text-sm font-medium text-[#525866] font-host-grotesk group-hover:text-[#171717] transition-colors">Remember me</span>
            </label>
            <Link to="/auth/forgot-password" size="sm" className="text-sm font-medium text-Primary font-host-grotesk hover:underline transition-all">
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full h-14 bg-Primary text-white rounded-xl font-bold text-base hover:bg-[#2849cc] transition-all"
          >
            Log in
          </button>
        </form>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-[#525866] text-lg font-normal font-host-grotesk"
      >
         Don&apos;t have an account?{" "}
        <Link to="/auth/choose" className="text-Primary font-medium hover:underline transition-all">
          Sign up
        </Link>
      </motion.div>
    </div>
  );
};

export default Login;