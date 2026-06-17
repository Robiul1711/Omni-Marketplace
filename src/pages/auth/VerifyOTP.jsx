import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeInUp } from "@/utils/animations";
import Button from "@/components/ui/Button";
import { useDispatch } from "react-redux";
import { setToken } from "@/redux/slices/authSlice";
import { setUser as setUiUser } from "@/redux/slices/uiSlice";
import useMutationClient from "@/hooks/useMutationClient";
import { VERIFY_OTP, FORGOT_PASSWORD_VERIFY_OTP } from "@/apiFunctions/apiEndPoints";

const VerifyOTP = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") || "m*******y@gmail.com";
  const flow = searchParams.get("flow") || "signup"; // signup, forgot, invite
  const userType = searchParams.get("type") || "business";
  const dispatch = useDispatch();

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);

  const { mutate: verifyOtpMutate, isPending: isVerifyPending } = useMutationClient({
    url: VERIFY_OTP,
    method: "post",
    successMessage: "Registration successful!",
  });

  const { mutate: verifyForgotOtpMutate, isPending: isForgotPending } = useMutationClient({
    url: FORGOT_PASSWORD_VERIFY_OTP,
    method: "post",
    successMessage: "OTP verified successfully!",
  });

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Focus next
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const pasteData = e.clipboardData.getData("text");
    if (!pasteData || isNaN(Number(pasteData))) return;

    const digits = pasteData.trim().substring(0, 6).split("");
    const newOtp = [...otp];
    for (let i = 0; i < 6; i++) {
      newOtp[i] = digits[i] || "";
    }
    setOtp(newOtp);

    const focusIndex = Math.min(digits.length, 5);
    inputRefs.current[focusIndex]?.focus();
    e.preventDefault();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const joinedOtp = otp.join("");
    const tokenVal = searchParams.get("token");

    if (flow === "forgot") {
      verifyForgotOtpMutate(
        { data: { token: tokenVal, otp: joinedOtp } },
        {
          onSuccess: (res) => {
            const responseData = res?.data || res;
            const resetToken = responseData?.data?.reset_token || responseData?.reset_token;
            navigate(`/auth/reset-password?email=${email}&token=${resetToken}`);
          },
        }
      );
    } else {
      verifyOtpMutate(
        { data: { token: tokenVal, otp: joinedOtp } },
        {
          onSuccess: (res) => {
            const responseData = res?.data || res;
            const bearerToken = responseData?.token;
            const userObj = responseData?.data;

            dispatch(setToken({ token: bearerToken, user: userObj }));
            dispatch(setUiUser({ user: userObj }));

            if (userObj?.role === "Host") {
              navigate("/auth/onboard-host");
            } else {
              navigate("/");
            }
          },
        }
      );
    }
  };


  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-6 py-20 pb-40">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center mb-10 w-full max-w-[650px]"
      >
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[#171717] font-host-grotesk mb-6">
          Verify OTP
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk max-w-[500px] mx-auto leading-relaxed">
          Enter the ETP code that we sent your email <span className="font-semibold">{email}</span>, <br />
          Be careful not to share code with anyone
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[550px] bg-white p-8 md:p-12 rounded-[32px] border border-gray-100 shadow-sm"
      >
        <div className="text-center mb-8">
            <p className="text-[13px] text-gray-400 font-normal font-host-grotesk leading-relaxed">
                We&apos;ve sent a 6-digit verification code to your email. Check your spam <br />
                folder in case you didn&apos;t receive the code.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-12 flex flex-col items-center">
          <div className="flex gap-3 sm:gap-4 justify-center">
            {otp.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength={1}
                value={digit}
                ref={(el) => (inputRefs.current[idx] = el)}
                onChange={(e) => handleChange(e, idx)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                onPaste={handlePaste}
                className="w-12 h-14 sm:w-16 sm:h-20 text-center text-2xl font-bold rounded-2xl border border-gray-200 focus:border-Primary focus:bg-Primary/5 focus:ring-1 focus:ring-Primary transition-all outline-none"
              />
            ))}
          </div>

          <Button 
            type="submit" 
            disabled={isVerifyPending || isForgotPending}
            className="w-full h-14 rounded-xl font-bold text-base max-w-[400px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifyPending || isForgotPending ? "Verifying..." : "Continue"}
          </Button>
        </form>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="mt-10 text-[#525866] text-lg font-normal font-host-grotesk"
      >
        Didn&apos;t receive code?{" "}
        <button className="text-Primary font-medium border-b border-transparent hover:border-Primary transition-all">
          Resend code
        </button>
      </motion.div>
    </div>
  );
};

export default VerifyOTP;
