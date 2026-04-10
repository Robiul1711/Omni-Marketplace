import React from 'react';
import { FiCamera } from 'react-icons/fi';

const Settings = () => {
  return (
    <div className="space-y-6 pb-10">
      {/* Profile Settings Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#1A1D1F] mb-8">Profile Settings</h2>
        
        <div className="space-y-8 max-w-2xl">
          {/* Avatar Area */}
          <div className="relative w-32 h-32 group cursor-pointer">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-50 shadow-sm">
              <img 
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" 
                alt="Profile" 
                className="w-full h-full object-cover grayscale"
              />
            </div>
            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <FiCamera size={24} className="text-white" />
            </div>
            {/* Small Camera Badge Alternative (as seen in mockup) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
               <FiCamera size={24} className="text-white drop-shadow-md" />
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">Name</label>
              <input 
                type="text" 
                defaultValue="TechCo"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">Email</label>
              <input 
                type="email" 
                defaultValue="contact@techco.com"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">Phone</label>
              <input 
                type="text" 
                defaultValue="+1 (555) 123-4567"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-8 py-3 bg-[#3366FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-50">
              Save Changes
            </button>
            <button className="px-8 py-3 bg-white border border-gray-200 text-[#1A1D1F] font-bold rounded-xl hover:bg-gray-50 transition-all">
              Cancel
            </button>
          </div>
        </div>
      </div>

      {/* Account Security Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#1A1D1F] mb-8">Account Security</h2>
        
        <div className="space-y-8 max-w-2xl">
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">Current Password</label>
              <input 
                type="password" 
                defaultValue="********"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">New Password</label>
              <input 
                type="password" 
                placeholder="Enter new password"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-[#1A1D1F]">Confirm New Password</label>
              <input 
                type="password" 
                placeholder="Re-enter new password"
                className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F]"
              />
            </div>
          </div>

          <button className="px-8 py-3 bg-[#3366FF] text-white font-bold rounded-xl hover:bg-blue-600 transition-all shadow-lg shadow-blue-50">
            Update Password
          </button>
        </div>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#1A1D1F] mb-8">Notification Preferences</h2>
        
        <div className="space-y-6">
          <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-[#6F767E]">Get notified about order status changes</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF]" />
          </div>
          <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-[#6F767E]">System updates</span>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF]" />
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
        <h2 className="text-[17px] font-bold text-[#1A1D1F] mb-8">Payment Methods</h2>
        
        <div>
          <button className="px-8 py-3 bg-white border border-gray-200 text-[#1A1D1F] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm">
            Add your Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
