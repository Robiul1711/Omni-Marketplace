import React from 'react';

const Practice = ({ data }) => {
  const steps = data && data.length > 0
    ? data.map((step, index) => ({
        id: index + 1,
        content: step.description,
        hasDashedLine: index < data.length - 1,
        highlight: index === 0
      }))
    : [
        {
          id: 1,
          content: "Businesses upload or design their marketing content, select a placement, and schedule a campaign.",
          hasDashedLine: true,
          highlight: true
        },
        {
          id: 2,
          content: "Once live, content is streamed or cast to host devices in real time or scheduled playback formats. Hosts simply keep their devices connected while the system manages delivery automatically.",
          hasDashedLine: true,
          highlight: false
        },
        {
          id: 3,
          content: "After completion, payments held in escrow are released to hosts based on verified campaign execution.",
          hasDashedLine: false,
          highlight: false
        }
      ];

  return (

      <div className=" flex flex-col items-center">
        
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] md:mb-20 mb-10 text-center">
          How It Works in Practice
        </h2>

        {/* Timeline Container */}
        <div className="w-full flex flex-col items-center">
          {steps.map((step, index) => (
            <div key={step.id} className="w-full flex flex-col items-center">
              
              {/* Step Content */}
              <div className="relative w-full max-w-2xl text-center py-4">
                {/* Background Glow for Step 1 */}
                {step.highlight && (
                  <div className="absolute inset-0 flex items-center justify-center -z-10">
                    <div className="w-64 h-32 md:w-96 md:h-48 bg-blue-400/30 blur-[80px] rounded-full"></div>
                  </div>
                )}
                
                <p className={`text-lg md:text-xl leading-relaxed ${
                  step.highlight ? 'text-blue-600 font-medium' : 'text-slate-700'
                }`}>
                  {step.content}
                </p>
              </div>

              {/* Vertical Dashed Line and Dots */}
              {step.hasDashedLine && (
                <div className="flex flex-col items-center">
                  {/* Top Dot */}
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                  
                  {/* Dashed Line */}
                  <div className="h-24 w-[1.5px] border-l-2 border-dashed border-blue-400 my-2"></div>
                  
                  {/* Bottom Dot */}
                  <div className="w-2.5 h-2.5 bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

  );
};

export default Practice;