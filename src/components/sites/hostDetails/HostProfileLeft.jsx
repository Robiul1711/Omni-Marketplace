import React from 'react';
import { Check, Package, Info } from 'lucide-react';

const HostProfileLeft = () => {
  return (
    <div className="bg-white border border-gray-100 rounded-[32px] p-8 shadow-sm flex flex-col items-center w-full">
      {/* Profile Image */}
      <div className="w-32 h-32 rounded-[24px] overflow-hidden bg-gray-100 mb-6">
        <img
          src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070&auto=format&fit=crop"
          alt="Host Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Host Name & Verification */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">Tech Talks Daily</h2>
      <div className="flex items-center gap-1.5 px-4 py-1.5 border border-Primary/30 rounded-full text-Primary bg-Primary/5 mb-2">
        <div className="bg-Primary rounded-full p-0.5">
          <Check className="w-3 h-3 text-white" strokeWidth={4} />
        </div>
        <span className="text-sm font-semibold italic">Verified Business</span>
      </div>
      <p className="text-gray-400 text-sm mb-8">Member Since 2024</p>

      {/* Stats Sections */}
      <div className="w-full space-y-4 mb-8">
        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-500 text-sm mb-1">Estimated Monthly Foot Traffic</p>
          <p className="text-gray-900 font-bold">50k / monthly</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-500 text-sm mb-1">Channel Type</p>
          <p className="text-gray-900 font-bold font-inter">Podcast Audio</p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-4">
          <p className="text-gray-500 text-sm mb-1">Operating Hours</p>
          <p className="text-gray-900 font-bold flex gap-2">
            <span className="text-Primary">Mon – Fri</span> 
            <span className="text-gray-800">[9:00 AM – 10:00 PM]</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="w-full space-y-4">
        <button className="w-full py-4 bg-Primary text-white rounded-2xl font-semibold flex items-center justify-center gap-3 hover:bg-Primary/90 active:scale-[0.98] transition-all shadow-lg shadow-Primary/20">
          <Package className="w-5 h-5" />
          Placements
        </button>
        
        <button className="w-full flex items-center justify-center gap-2 text-gray-500 font-medium hover:text-Primary transition-colors py-2">
          <Info className="w-5 h-5" />
          Channel info
        </button>
      </div>
    </div>
  );
};

export default HostProfileLeft;
