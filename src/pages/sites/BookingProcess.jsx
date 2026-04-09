import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import Step1 from "@/components/sites/booking-process/Step1";
import Step2 from "@/components/sites/booking-process/Step2";
import Step3 from "@/components/sites/booking-process/Step3";
import { motion, AnimatePresence } from "motion/react";
import { fadeIn, fadeInUp } from "@/utils/animations";
import { MoveLeft, Check } from "lucide-react";
import { Link, ScrollRestoration, useNavigate } from "react-router-dom";

const BookingProcess = () => {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const methods = useForm({
    defaultValues: {
      campaignName: "",
      adScript: null,
      websiteUrl: "",
      qrCodeUrl: "",
      notes: "",
      paymentMethod: "stripe",
    },
  });

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  const steps = [
    { id: 1, name: "Details" },
    { id: 2, name: "Payment" },
    { id: 3, name: "Confirmation" },
  ];

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center py-20 px-4 font-inter">
      <ScrollRestoration />
      <div className="w-full max-w-[1100px]">
        {/* Header */}
        <AnimatePresence mode="wait">
          {step < 3 && (
            <motion.div key="header" {...fadeIn} className="mb-10">
              <Link
                to="/placement/1"
                className="flex items-center gap-2 text-gray-500 text-sm mb-4 hover:text-gray-900 transition-colors"
              >
                <MoveLeft className="w-4 h-4" />
                Back to listing
              </Link>
              <h1 className="text-3xl font-bold text-gray-900">
                Complete Your Booking
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-16 relative">
          <div className="flex items-center gap-4 relative z-10 bg-transparent">
            {steps.map((s, index) => (
              <React.Fragment key={s.id}>
                <div className="flex flex-col items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                      step >= s.id
                        ? "bg-Primary text-white shadow-lg shadow-blue-100"
                        : "bg-white text-gray-400 border border-gray-100"
                    }`}
                  >
                    {step > s.id ? <Check className="w-5 h-5" /> : s.id}
                  </div>
                  <span
                    className={`text-xs font-medium ${step >= s.id ? "text-gray-900" : "text-gray-400"}`}
                  >
                    {s.name}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="w-20 h-[1px] bg-gray-200 mb-6" />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Content */}
        <FormProvider {...methods}>
          <div className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="step1" {...fadeInUp}>
                  <Step1 onNext={nextStep} />
                </motion.div>
              )}
              {step === 2 && (
                <motion.div key="step2" {...fadeInUp}>
                  <Step2 onNext={nextStep} onPrev={prevStep} />
                </motion.div>
              )}
              {step === 3 && (
                <motion.div key="step3" {...fadeInUp}>
                  <Step3 />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </FormProvider>
      </div>
    </div>
  );
};

export default BookingProcess;
