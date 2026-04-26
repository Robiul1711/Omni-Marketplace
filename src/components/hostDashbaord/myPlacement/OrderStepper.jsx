import React from "react";
import { HiCheck } from "react-icons/hi";

const steps = [
  { label: "Order Place", date: "12/12/12", status: "completed" },
  { label: "Order Accepted", date: "12/12/12", status: "completed" },
  { label: "Campaign In Progress", date: "12/12/12", status: "completed" },
  { label: "Proof Submitted", date: "12/12/12", status: "completed" },
  { label: "Approved & Submitted", date: "12/12/12", status: "pending" },
];

const OrderStepper = () => {
  return (
    <div className="bg-white p-4 
     rounded-[24px] border border-gray-100 shadow-sm mb-8">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-xl font-bold text-[#1A1D1F] tracking-tight">Order Progress</h2>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-lg uppercase tracking-wider">
          Step 4 of 5
        </span>
      </div>
      
      {/* Desktop Horizontal Stepper */}
      <div className="hidden md:flex items-start justify-between relative">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isLast = index === steps.length - 1;
          const nextIsCompleted = steps[index + 1]?.status === "completed";

          return (
            <div key={index} className={`flex flex-col items-center relative z-10 ${!isLast ? 'flex-1' : ''}`}>
              {/* Connector Line */}
              {!isLast && (
                <div className="absolute top-5 left-[50%] w-full h-[3px] bg-gray-100 -z-10">
                  <div 
                    className={`h-full transition-all duration-500 ${nextIsCompleted ? 'w-full bg-[#3366FF]' : 'w-0'}`}
                  />
                </div>
              )}

              {/* Step Circle */}
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300
                ${isCompleted 
                  ? "bg-[#3366FF] border-[#3366FF] text-white shadow-lg shadow-blue-200" 
                  : "bg-white border-gray-200 text-gray-400"}
              `}>
                {isCompleted ? (
                  <HiCheck className="text-xl stroke-1" />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>

              {/* Text Content */}
              <div className="mt-5 text-center px-2">
                <p className={`text-sm font-bold transition-colors duration-300 ${isCompleted ? "text-[#1A1D1F]" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-[#9A9FA5] text-[11px] font-medium mt-1.5 uppercase tracking-wide">
                  {step.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Vertical Stepper */}
      <div className="md:hidden flex flex-col">
        {steps.map((step, index) => {
          const isCompleted = step.status === "completed";
          const isLast = index === steps.length - 1;

          return (
            <div key={index} className="flex gap-5 group">
              <div className="flex flex-col items-center">
                <div className={`
                  w-9 h-9 rounded-full flex items-center justify-center border-2 shrink-0 transition-all duration-300
                  ${isCompleted 
                    ? "bg-[#3366FF] border-[#3366FF] text-white shadow-md" 
                    : "bg-white border-gray-200 text-gray-400"}
                `}>
                  {isCompleted ? <HiCheck className="text-lg" /> : <span className="text-xs font-bold">{index + 1}</span>}
                </div>
                {!isLast && (
                  <div className={`w-[3px] h-12 my-1 rounded-full ${steps[index + 1].status === "completed" ? "bg-[#3366FF]" : "bg-gray-100"}`} />
                )}
              </div>
              
              <div className="pt-1.5 pb-6">
                <p className={`text-sm font-bold ${isCompleted ? "text-[#1A1D1F]" : "text-gray-400"}`}>
                  {step.label}
                </p>
                <p className="text-[#9A9FA5] text-xs font-medium mt-0.5">{step.date}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderStepper;
