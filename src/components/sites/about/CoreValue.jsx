import React from 'react';

const CoreValues = () => {
  const values = [
    {
      title: 'Simplicity',
      desc: 'Easy creation and execution of campaigns',
    },
    {
      title: 'Access',
      desc: 'Open opportunities for both advertisers and hosts',
    },
    {
      title: 'Scalability',
      desc: 'A system designed to grow across devices and markets',
    },
    {
      title: 'Fair Exchange',
      desc: 'Transparent pricing, escrow protection, and verified delivery',
    },
  ];

  return (
  
      <div className="">
        
        {/* Main Content Area */}
        <div className="flex gap-8 md:gap-12 mb-20 mx-auto max-w-3xl">
          
          {/* Decorative Vertical Dashed Line */}
          <div className="flex flex-col items-center">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <div className="w-px h-full border-l-2 border-dashed border-blue-400 my-1" />
            <div className="w-2 h-2 rounded-full bg-blue-600" />
          </div>

          {/* List Content */}
          <div className="flex-1">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#111827] mb-10">
              Core Values:
            </h2>

            <div className="space-y-8">
              {values.map((item, index) => (
                <div key={index} className="group">
                  <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                    <span className="font-bold text-gray-900">{item.title}</span>
                    <span className="mx-2">—</span>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Summary Statement */}
        <div className="text-center ">
          <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-5xl mx-auto italic">
            Omni Marketplace transforms everyday screens into a global advertising network, 
            connecting opportunity with execution through a simple and scalable marketplace system.
          </p>
        </div>

      </div>

  );
};

export default CoreValues;