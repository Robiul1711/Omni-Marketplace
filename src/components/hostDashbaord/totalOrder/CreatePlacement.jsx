import React from 'react';
import { Plus } from 'lucide-react'; // Optional: Use an icon library for the + sign

const CreatePlacement = () => {
  return (
    <div className="w-full">
      <div className="bg-white rounded-[24px] p-2 md:p-4 lg:p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        {/* Left Side: Header and Subtitle */}
        <div className="space-y-2">
          <h1 className="text-[#111827] text-2xl md:text-3xl font-semibold tracking-tight">
            My Placements
          </h1>
          <p className="text-[#6B7280] text-sm md:text-base font-normal">
            Manage and track all your campaign orders.
          </p>
        </div>

        {/* Right Side: Action Button */}
        <button className="flex items-center justify-center gap-2 bg-[#3B82F6] hover:bg-blue-600 transition-colors text-white px-6 py-3 rounded-xl font-medium text-sm md:text-base shadow-sm active:scale-95 duration-150">
          <Plus size={20} strokeWidth={2.5} />
          <span>Create Placements</span>
        </button>
        
      </div>
    </div>
  );
};

export default CreatePlacement;