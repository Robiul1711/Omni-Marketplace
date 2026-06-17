import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, CheckCircle2 } from "lucide-react";
import { fadeInUp } from "@/utils/animations";
import { useForm } from "react-hook-form";
import Button from "@/components/ui/Button";
import useMutationClient from "@/hooks/useMutationClient";
import { RESET_PASSWORD } from "@/apiFunctions/apiEndPoints";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const { mutate: resetMutate, isPending } = useMutationClient({
    url: RESET_PASSWORD,
    method: "post",
    successMessage: "Password has been reset successfully.",
  });

  const onSubmit = (data) => {
    resetMutate(
      {
        data: {
          password: data.password,
          password_confirmation: data.confirmPassword,
          token: token,
        },
      },
      {
        onSuccess: () => {
          navigate("/auth/login?status=reset_success");
        },
      }
    );
  };


  const isStrong = password?.length >= 8;

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-6 py-20 pb-40">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center mb-10 w-full max-w-[650px]"
      >
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[#171717] font-host-grotesk mb-4">
          Reset your password
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk max-w-[500px] mx-auto leading-relaxed">
          Enter a new password to continue using your account
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[550px] bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm"
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* New Password */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk mb-2 flex justify-between">
              New Password
              {errors.password && (
                <span className="text-[11px] text-red-500 normal-case">{errors.password.message}</span>
              )}
            </label>
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                placeholder="Enter your password"
                {...register("password", { 
                    required: "Password is required", 
                    minLength: { value: 8, message: "At least 8 characters" } 
                })}
                className={`w-full h-14 px-5 pr-12 rounded-xl border ${
                    errors.password ? "border-red-500" : "border-gray-200"
                } focus:border-Primary outline-none transition-all font-host-grotesk`}
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between mt-[-1rem]">
             <p className="text-[11px] text-gray-400 font-normal font-host-grotesk">Must be at least 8 characters</p>
             {isStrong && (
                <div className="flex items-center gap-1.5 text-green-500">
                    <CheckCircle2 size={13} />
                    <span className="text-[11px] font-bold font-host-grotesk">Strong</span>
                </div>
             )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-1 relative">
            <label className="text-sm font-medium text-[#171717] font-host-grotesk mb-2 flex justify-between">
              Conform Password
              {errors.confirmPassword && (
                <span className="text-[11px] text-red-500 normal-case">{errors.confirmPassword.message}</span>
              )}
            </label>
            <div className="relative">
              <input
                type={showConfirmPass ? "text" : "password"}
                placeholder="Enter your password"
                {...register("confirmPassword", { 
                    required: "Please confirm password",
                    validate: (value) => value === password || "Passwords don't match"
                })}
                className={`w-full h-14 px-5 pr-12 rounded-xl border ${
                    errors.confirmPassword ? "border-red-500" : "border-gray-200"
                } focus:border-Primary outline-none transition-all font-host-grotesk`}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPass(!showConfirmPass)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPass ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isPending}
            className="w-full h-14 rounded-xl font-bold text-base mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Resetting..." : "Continue"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
