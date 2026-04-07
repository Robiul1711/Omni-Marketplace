import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Upload, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { fadeInUp } from "@/utils/animations";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Button from "@/components/ui/Button";

export const OnBoardHost = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const fileInputRef = React.useRef(null);

  const {
    register,
    handleSubmit,
    control,
    trigger,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      establishmentName: "",
      type: "",
      internetAccess: "yes",
      operatingHours: "",
      footTraffic: "",
      responseTime: "",
    },
  });

  const verificationFile = watch("verificationFile");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("verificationFile", file, { shouldValidate: true });
      console.log("File selected:", file.name);
    }
  };

  const handleNext = async () => {
    let fieldsToValidate = [];
    if (step === 1) {
      fieldsToValidate = [
        "establishmentName",
        "type",
        "internetAccess",
        "operatingHours",
        "footTraffic",
        "responseTime",
      ];
    } else {
      fieldsToValidate = ["verificationFile"];
    }

    const isValid = await trigger(fieldsToValidate);
    if (!isValid) return;

    if (step < 2) {
      setStep(step + 1);
    } else {
      handleSubmit(onSubmit)();
    }
  };

  const onSubmit = (data) => {
    console.log("Onboarding complete:", data);
    navigate("/");
  };

  const handleBack = () => {
    if (step === 2) setStep(1);
    else navigate(-1);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-start p-6 py-20 pb-40">
      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="text-center mb-10"
      >
        <h1 className="text-[32px] md:text-[40px] font-semibold text-[#171717] font-host-grotesk mb-2">
          Welcome! Let&apos;s set up your channel
        </h1>
        <p className="text-[#525866] text-lg font-normal font-host-grotesk">
          This helps advertisers understand your placement.
        </p>
      </motion.div>

      <motion.div
        variants={fadeInUp}
        initial="initial"
        animate="animate"
        className="w-full max-w-[550px] bg-white p-8 md:p-10 rounded-[32px] border border-gray-100 shadow-sm relative overflow-hidden"
      >
        {/* Progress Bar Area */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {step === 2 && (
              <button
                onClick={handleBack}
                className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all hover:bg-gray-50"
              >
                <ArrowLeft size={18} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${step >= 1 ? "bg-Primary" : "bg-gray-200"}`} />
            <div className={`h-1.5 w-12 rounded-full transition-all duration-300 ${step >= 2 ? "bg-Primary" : "bg-gray-200"}`} />
          </div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 ? (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6 text-left"
            >
              <h3 className="text-xl font-bold text-[#171717] font-host-grotesk mb-2">
                Channel Information
              </h3>

              <div className="space-y-1">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk flex justify-between mb-2">
                  Establishment Name
                  {errors.establishmentName && (
                    <span className="text-[11px] text-red-500 normal-case">{errors.establishmentName.message}</span>
                  )}
                </label>
                <input
                  type="text"
                  placeholder="Urban Beats Podcast"
                  {...register("establishmentName", { required: "Name is required" })}
                  className={`w-full h-14 px-5 rounded-xl border ${
                    errors.establishmentName ? "border-red-500" : "border-gray-200"
                  } focus:border-Primary outline-none transition-all font-host-grotesk`}
                />
              </div>

              {/* Type Select */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk flex justify-between mb-2">
                  Channel / Establishment Type
                  {errors.type && (
                    <span className="text-[11px] text-red-500 normal-case">{errors.type.message}</span>
                  )}
                </label>
                <Controller
                  name="type"
                  control={control}
                  rules={{ required: "Type is required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={`w-full h-14! px-5 rounded-xl border ${errors.type ? "border-red-500" : "border-gray-200"} focus:border-Primary outline-none transition-all font-host-grotesk bg-white text-left shadow-none`}>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Podcast">Podcast</SelectItem>
                        <SelectItem value="Digital Screen">Digital Screen</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Internet Radio */}
              <div className="space-y-3 pt-2">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk">
                  Does your screen/channel have internet access?
                </label>
                <div className="flex gap-16">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${watch("internetAccess") === "yes" ? "border-Primary" : "border-gray-200"}`}>
                      {watch("internetAccess") === "yes" && <div className="w-2.5 h-2.5 rounded-full bg-Primary" />}
                    </div>
                    <input
                      type="radio"
                      value="yes"
                      {...register("internetAccess", { required: true })}
                      className="hidden"
                    />
                    <span className="text-sm text-[#4A5565] font-medium font-host-grotesk">Yes</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${watch("internetAccess") === "no" ? "border-Primary" : "border-gray-200"}`}>
                      {watch("internetAccess") === "no" && <div className="w-2.5 h-2.5 rounded-full bg-Primary" />}
                    </div>
                    <input
                      type="radio"
                      value="no"
                      {...register("internetAccess", { required: true })}
                      className="hidden"
                    />
                    <span className="text-sm text-[#4A5565] font-medium font-host-grotesk">No</span>
                  </label>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk flex justify-between mb-2">
                  Operating Hours
                  {errors.operatingHours && (
                    <span className="text-[11px] text-red-500 normal-case">{errors.operatingHours.message}</span>
                  )}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Mon–Fri [9:00 AM – 10:00 PM]"
                    {...register("operatingHours", { required: "Hours are required" })}
                    className={`w-full h-14 px-5 pr-12 rounded-xl border ${
                      errors.operatingHours ? "border-red-500" : "border-gray-200"
                    } focus:border-Primary outline-none transition-all font-host-grotesk`}
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Foot Traffic */}
              <div className="space-y-1">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk flex justify-between mb-2 text-left">
                  Estimated Monthly Foot Traffic
                  {errors.footTraffic && (
                    <span className="text-[11px] text-red-500 normal-case">{errors.footTraffic.message}</span>
                  )}
                </label>
                <div className="space-y-2">
                    <input
                    type="text"
                    placeholder="50k visitors / Monthly"
                    {...register("footTraffic", { required: "Traffic estimate required" })}
                    className={`w-full h-14 px-5 rounded-xl border ${
                        errors.footTraffic ? "border-red-500" : "border-gray-200"
                    } focus:border-Primary outline-none transition-all font-host-grotesk`}
                    />
                    <p className="text-[11px] text-gray-400 font-normal font-host-grotesk flex items-start gap-1">
                    <span className="mt-0.5 max-h-[14px]">ⓘ</span> This helps advertisers estimate how many people may see their ad.
                    </p>
                </div>
              </div>

              {/* Campaign Time Select */}
              <div className="space-y-1 ">
                <label className="text-sm font-medium text-[#171717] font-host-grotesk flex justify-between mb-2">
                  Typical Campaign Response Time
                  {errors.responseTime && (
                    <span className="text-[11px] text-red-500 normal-case">{errors.responseTime.message}</span>
                  )}
                </label>
                <Controller
                  name="responseTime"
                  control={control}
                  rules={{ required: "Response time required" }}
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className={`w-full h-14! px-5 rounded-xl border ${errors.responseTime ? "border-red-500" : "border-gray-200"} focus:border-Primary outline-none transition-all font-host-grotesk bg-white text-left shadow-none`}>
                        <SelectValue placeholder="Select response time" />
                      </SelectTrigger>
                      <SelectContent className="bg-white">
                        <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                        <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
                        <SelectItem value="Within 1 week">Within 1 week</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 text-left"
            >
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-[#171717] font-host-grotesk">Verification</h3>
                <p className="text-sm text-gray-500 font-host-grotesk">Business / Channel Registration</p>
              </div>

              <div className="space-y-4">
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed ${
                    errors.verificationFile ? "border-red-500 bg-red-50/10" : "border-gray-200 bg-gray-50/30"
                  } rounded-[20px] p-12 flex flex-col items-center justify-center gap-4 hover:border-Primary/50 transition-all cursor-pointer group`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept=".pdf,.jpg,.png,.doc"
                  />
                  {verificationFile ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center text-green-600 shadow-sm transition-transform">
                        <FileText size={22} />
                      </div>
                      <span className="text-sm font-medium text-green-600 font-host-grotesk">
                        {verificationFile.name}
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-500 shadow-sm group-hover:scale-110 transition-transform">
                        <Upload size={22} />
                      </div>
                      <span className="text-sm font-medium text-gray-500 font-host-grotesk">
                        Upload
                      </span>
                    </>
                  )}
                </div>
                {errors.verificationFile && (
                  <p className="text-[12px] text-red-500 font-medium font-host-grotesk text-center">
                    {errors.verificationFile.message}
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 space-y-6">
          <Button onClick={handleNext} className="w-full h-14 bg-Primary text-white rounded-xl font-bold text-base hover:bg-[#2849cc] transition-all">
            {step === 1 ? "Next" : "Complete"}
          </Button>
          <p className="text-xs text-gray-400 font-normal font-host-grotesk text-center">
            You can change these settings later
          </p>
        </div>
      </motion.div>
    </div>
  );
};
