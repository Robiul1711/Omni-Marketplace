import React from "react";
import { useFormContext } from "react-hook-form";
import OrderSummary from "./OrderSummary";
import { Info } from "lucide-react";

const Step2 = ({ onNext, onPrev }) => {
  const { register, handleSubmit, watch } = useFormContext();
  const selectedMethod = watch("paymentMethod");

  const onSubmit = (data) => {
    console.log("Step 2 data:", data);
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Form Section */}
      <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-50 shadow-sm flex flex-col h-full">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">
            Payment Information
          </h2>
          <p className="text-sm text-gray-500">Select your payment method</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div
            onClick={() => {}}
            className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col gap-4 ${
              selectedMethod === "stripe"
                ? "border-Primary bg-blue-50/10"
                : "border-gray-100"
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                {/* Stripe Logo Placeholder */}
                <span className="text-2xl font-bold text-gray-900">stripe</span>
              </div>
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedMethod === "stripe" ? "border-Primary" : "border-gray-200"}`}
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${selectedMethod === "stripe" ? "bg-Primary" : "transparent"}`}
                />
              </div>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl flex items-start gap-4 border border-blue-100">
            <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[13px] text-blue-800 leading-relaxed">
              <span className="font-bold">Secure Payment:</span> Your payment
              will be held securely. Funds are released to the host 7 days after
              campaign approval to allow time for dispute resolution.
            </p>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="bg-Primary text-white px-8 py-4 rounded-xl font-medium transition-all transform active:scale-[0.98] hover:bg-blue-700"
            >
              Complete Booking
            </button>
          </div>
        </form>
      </div>

      {/* Summary Section */}
      <div className="w-full lg:w-[400px]">
        <OrderSummary />
      </div>
    </div>
  );
};

export default Step2;
