import React from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera, FiAlertCircle } from 'react-icons/fi';
import { toast } from 'react-toastify';

const Settings = () => {
  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: 'TechCo',
      email: 'contact@techco.com',
      phone: '+1 (555) 123-4567',
    }
  });

  // Security Form
  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    watch,
    formState: { errors: securityErrors },
    reset: resetSecurity,
  } = useForm();

  const newPassword = watch('newPassword');

  const onProfileSave = (data) => {
    console.log('Profile Data:', data);
    toast.success('Profile updated successfully!');
  };

  const onSecuritySave = (data) => {
    console.log('Security Data:', data);
    toast.success('Password updated successfully!');
    resetSecurity();
  };

  return (
    <div className="space-y-6 pb-10 px-4 md:px-0">
      {/* Profile Settings Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Profile Settings</h2>
        
        <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-6 md:space-y-8 max-w-2xl">
          {/* Avatar Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer">
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-50 shadow-sm bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop" 
                  alt="Profile" 
                  className="w-full h-full object-cover grayscale"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera size={24} className="text-white" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:hidden">
                 <FiCamera size={20} className="text-white drop-shadow-md opacity-80" />
              </div>
            </div>
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#1A1D1F]">Profile Picture</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">Name</label>
              <input 
                {...registerProfile('name', { required: 'Name is required' })}
                type="text" 
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${profileErrors.name ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {profileErrors.name && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {profileErrors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">Email</label>
              <input 
                {...registerProfile('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address"
                  }
                })}
                type="email" 
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${profileErrors.email ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {profileErrors.email && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {profileErrors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">Phone</label>
              <input 
                {...registerProfile('phone', { required: 'Phone number is required' })}
                type="text" 
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${profileErrors.phone ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {profileErrors.phone && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {profileErrors.phone.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
            <button type="submit" className="w-full sm:w-auto px-10 py-3.5 bg-[#3366FF] text-white font-bold rounded-xl hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50">
              Save Changes
            </button>
            <button type="button" className="w-full sm:w-auto px-10 py-3.5 bg-white border border-gray-200 text-[#1A1D1F] font-bold rounded-xl hover:bg-gray-50 transition-all">
              Cancel
            </button>
          </div>
        </form>
      </div>

      {/* Account Security Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Account Security</h2>
        
        <form onSubmit={handleSecuritySubmit(onSecuritySave)} className="space-y-6 md:space-y-8 max-w-2xl">
          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">Current Password</label>
              <input 
                {...registerSecurity('currentPassword', { required: 'Please enter your current password' })}
                type="password" 
                placeholder="********"
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${securityErrors.currentPassword ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {securityErrors.currentPassword && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {securityErrors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">New Password</label>
              <input 
                {...registerSecurity('newPassword', { 
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' }
                })}
                type="password" 
                placeholder="Enter new password"
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${securityErrors.newPassword ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {securityErrors.newPassword && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {securityErrors.newPassword.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-[#1A1D1F]">Confirm New Password</label>
              <input 
                {...registerSecurity('confirmPassword', { 
                  required: 'Please confirm your new password',
                  validate: (val) => val === newPassword || 'Passwords do not match'
                })}
                type="password" 
                placeholder="Re-enter new password"
                className={`w-full px-4 py-3 bg-[#F4F7FE] border-2 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all font-medium text-[#1A1D1F] outline-none ${securityErrors.confirmPassword ? 'border-red-400 focus:ring-red-50' : 'border-transparent focus:border-[#3366FF]'}`}
              />
              {securityErrors.confirmPassword && (
                <p className="text-[12px] text-red-500 font-medium flex items-center gap-1 mt-1">
                  <FiAlertCircle size={14} /> {securityErrors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>

          <button type="submit" className="w-full sm:w-auto px-10 py-3.5 bg-[#3366FF] text-white font-bold rounded-xl hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50">
            Update Password
          </button>
        </form>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Notification Preferences</h2>
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-[#6F767E] pr-4">Get notified about order status changes</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF] cursor-pointer" />
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
            <span className="text-sm font-medium text-[#6F767E] pr-4">System updates</span>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Payment Methods</h2>
        
        <div>
          <button className="w-full sm:w-auto px-10 py-3.5 bg-white border border-gray-200 text-[#1A1D1F] font-bold rounded-xl hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98]">
            Add your Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
