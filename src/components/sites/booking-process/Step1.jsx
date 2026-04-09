import React from "react";
import { useFormContext } from "react-hook-form";
import OrderSummary from "./OrderSummary";
import { Upload, ArrowRight } from "lucide-react";

const Step1 = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormContext();

  const onSubmit = (data) => {
    console.log("Step 1 data:", data);
    onNext();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 font-host-grotesk!">
      {/* Form Section */}
      <div className="flex-1 bg-white rounded-2xl p-8 border border-gray-50 shadow-sm text-sm">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900">Campaign Details</h2>
          <p className="text-sm text-[#364153] font-normal mt-3 ">
            Provide information about your advertising campaign
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Campaign Name
            </label>
            <input
              {...register("campaignName", {
                required: "Campaign name is required",
              })}
              type="text"
              placeholder="e.g., Q1 Product Launch"
              className="w-full px-4 py-3 rounded-lg border text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-Primary/20 focus:border-Primary transition-all placeholder:text-gray-300"
            />
            {errors.campaignName && (
              <span className="text-xs text-red-500 mt-1">
                {errors.campaignName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Ad Script or Talking Points
            </label>
            <input
              type="file"
              id="adScript"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  console.log("File selected:", file.name);
                }
              }}
            />
            <label
              htmlFor="adScript"
              className="w-full h-32 border-2 border-dashed border-gray-100 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-Primary/30 transition-all bg-[#F9FAFB]/50 group"
            >
              <Upload className="w-6 h-6 text-gray-400 group-hover:text-Primary transition-colors" />
              <div className="flex flex-col items-center">
                <span className="text-xs font-medium text-gray-600">
                  Provide your ad copy or key talking points
                </span>
                <span className="text-[10px] text-gray-400 mt-1">Click to browse or drag and drop</span>
              </div>
            </label>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Website / Landing Page
            </label>
            <input
              {...register("websiteUrl", {
                required: "Website URL is required",
              })}
              type="text"
              placeholder="https://"
              className="w-full px-4 py-3 rounded-lg border text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-Primary/20 focus:border-Primary transition-all placeholder:text-gray-300"
            />
            {errors.websiteUrl && (
              <span className="text-xs text-red-500 mt-1">
                {errors.websiteUrl.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              QR Code URL (optional)
            </label>
            <input
              {...register("qrCodeUrl")}
              type="text"
              placeholder="Enter QR code..."
              className="w-full px-4 py-3 rounded-lg border text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-Primary/20 focus:border-Primary transition-all placeholder:text-gray-300"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-gray-700">
              Additional Notes (Optional)
            </label>
            <textarea
              {...register("notes")}
              rows={4}
              placeholder="Any special requests or requirements..."
              className="w-full px-4 py-3 rounded-lg border text-sm border-gray-200 focus:outline-none focus:ring-2 focus:ring-Primary/20 focus:border-Primary transition-all placeholder:text-gray-300 resize-none"
            />
          </div>

          <div className=" flex justify-end items-end">
            <button
              type="submit"
              className=" bg-Primary text-white py-4 px-10 rounded-xl font-medium flex items-center justify-center gap-2 hover:bg-blue-700 transition-all transform active:scale-[0.98] mt-4"
            >
              Continue to Payment
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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

export default Step1;
