import React from 'react';
import SupportChat from '@/components/hostDashbaord/myPlacement/SupportChat';

const messages = Array(12).fill({
  id: 'Ofu-16-168',
  date: '14 Feb'
});

const Support = () => {
  return (
    <div className="md:pb-10 pb-4">
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm min-h-[70vh]">
        <h1 className="text-xl md:text-[22px] font-bold text-[#1A1D1F] md:mb-8 mb-4">Support Message</h1>
        
        <div className="flex flex-col">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className="flex justify-between items-center py-4 md:py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors px-2 cursor-pointer rounded-lg"
            >
              <span className="text-[#6F767E] font-medium text-sm md:text-base">{msg.id}</span>
              <span className="text-[#6F767E] font-medium text-xs md:text-sm">{msg.date}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* Support Chat Widget */}
      <SupportChat />
    </div>
  );
};

export default Support;
