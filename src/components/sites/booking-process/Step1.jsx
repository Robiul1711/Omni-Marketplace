import React from "react";
import { useFormContext } from "react-hook-form";
import OrderSummary from "./OrderSummary";
import { Upload, ArrowRight } from "lucide-react";

const Step1 = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const adScriptFile = watch("adScript");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("adScript", file);
    }
  };

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
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx,.txt"
            />
            {adScriptFile ? (
              <div className="p-4 bg-white border border-gray-100 rounded-xl flex items-center gap-4 shadow-sm animate-in fade-in duration-200">
                <div className="size-16 rounded-lg overflow-hidden border border-gray-100 flex items-center justify-center bg-gray-50 flex-shrink-0">
                  {adScriptFile instanceof File && adScriptFile.type.startsWith("image/") ? (
                    <img
                      src={URL.createObjectURL(adScriptFile)}
                      alt="preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-Primary font-semibold text-xs flex flex-col items-center">
                      <svg className="w-8 h-8 text-Primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {adScriptFile instanceof File ? adScriptFile.name : "Uploaded Document"}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {adScriptFile instanceof File ? (adScriptFile.size / 1024 / 1024).toFixed(2) + " MB" : ""}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setValue("adScript", null)}
                  className="p-2 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ) : (
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
            )}
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
