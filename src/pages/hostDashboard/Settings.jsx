import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiCamera, FiAlertCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const AccountSettings = () => {
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
    <div className="space-y-6">
      {/* Profile Settings Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Profile</h2>
        
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
          </div>

          <div className="grid grid-cols-1 gap-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-[#1A1D1F]">Name</label>
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
              <label className="text-sm font-medium text-[#1A1D1F]">Email</label>
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
              <label className="text-sm font-medium text-[#1A1D1F]">Phone</label>
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
            <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50">
              Save Changes
            </button>
            <button type="button" className="w-full sm:w-auto px-10 py-3 bg-white border border-gray-200 text-[#1A1D1F] font-medium text-sm rounded-lg hover:bg-gray-50 transition-all">
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
              <label className="text-sm font-medium text-[#1A1D1F]">Current Password</label>
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
              <label className="text-sm font-medium text-[#1A1D1F]">New Password</label>
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
              <label className="text-sm font-medium text-[#1A1D1F]">Confirm New Password</label>
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

          <button type="submit" className="w-full sm:w-auto px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50">
            Update Password
          </button>
        </form>
      </div>

      {/* Notification Preferences Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Notification Preferences</h2>
        
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-[#6F767E] pr-4">Get notified about order status changes</span>
            <input type="checkbox" defaultChecked className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF] cursor-pointer" />
          </div>
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-[#6F767E] pr-4">System updates</span>
            <input type="checkbox" className="w-5 h-5 rounded border-gray-200 text-[#3366FF] focus:ring-[#3366FF] cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Payment Methods Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Payment Methods</h2>
        
        <div>
          <button className="w-full sm:w-auto px-10 py-3 bg-white border border-gray-200 text-[#1A1D1F] font-medium text-sm rounded-lg hover:bg-gray-50 transition-all shadow-sm active:scale-[0.98]">
            Add your Stripe
          </button>
        </div>
      </div>
    </div>
  );
};

const ChannelSettings = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      establishmentName: 'Urban Beats Podcast',
      channelInfo: '',
      channelType: 'podcast',
      internetAccess: 'Yes',
      operatingHours: 'Mon-Fri [9:00 AM - 10:00 PM]',
      responseTime: 'Within 24 hours'
    }
  });

  const onSubmit = (data) => {
    toast.success('Channel info updated successfully!');
  };

  return (
    <div className="space-y-6 md:space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="md:space-y-6 space-y-4">
        <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
          <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Channel Information</h2>
          
          <div className="space-y-6 max-w-2xl">
            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Establishment Name</label>
              <input 
                {...register('establishmentName', { required: 'Required' })}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium text-[#1A1D1F] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Channel Info</label>
              <input 
                {...register('channelInfo')}
                placeholder="Enter short description about you"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium text-[#1A1D1F] outline-none placeholder:text-gray-400 placeholder:font-normal"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Channel Type</label>
              <Select defaultValue="podcast">
                <SelectTrigger className="w-full px-4 py-6 bg-white border border-gray-200 rounded-xl font-medium text-[#1A1D1F]">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="podcast">podcast</SelectItem>
                  <SelectItem value="digital_billboard">Digital Billboard</SelectItem>
                  <SelectItem value="tv_screen">TV Screen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-2">
               <label className="text-sm font-medium text-[#1A1D1F]">Does your screen/channel have internet access?</label>
               <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="Yes" {...register('internetAccess')} className="w-4 h-4 text-[#3366FF] border-gray-300 focus:ring-[#3366FF]" />
                    <span className="text-sm text-[#1A1D1F]">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" value="No" {...register('internetAccess')} className="w-4 h-4 text-[#3366FF] border-gray-300 focus:ring-[#3366FF]" />
                    <span className="text-sm text-[#1A1D1F]">No</span>
                  </label>
               </div>
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Operating Hours</label>
              <div className="relative">
                <input 
                  {...register('operatingHours')}
                  className="w-full pl-4 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium text-[#1A1D1F] outline-none"
                />
                <FiClock className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Typical Campaign Response Time</label>
              <Select defaultValue="Within 24 hours">
                <SelectTrigger className="w-full px-4 py-6 bg-white border border-gray-200 rounded-xl font-medium text-[#1A1D1F]">
                  <SelectValue placeholder="Select response time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Within 24 hours">Within 24 hours</SelectItem>
                  <SelectItem value="Within 48 hours">Within 48 hours</SelectItem>
                  <SelectItem value="Within 1 week">Within 1 week</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 p-5 shadow-sm flex gap-3">
          <button type="submit" className="px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-sm">
            Save Changes
          </button>
          <button type="button" className="px-10 py-3 bg-white border border-gray-200 text-[#1A1D1F] font-medium text-sm rounded-lg hover:bg-gray-50 transition-all">
            Cancel
          </button>
        </div>
      </form>

      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Verification</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
             <label className="text-sm font-medium text-[#1A1D1F]">Business Registration Document</label>
             <div className="flex items-center gap-3">
               <div className="w-12 h-12 bg-[#4B5563] text-white flex flex-col items-center justify-center rounded-lg shadow-sm">
                 <span className="font-bold text-sm leading-none">PDF</span>
               </div>
               <button className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50">
                  <FiRefreshCw size={18} />
               </button>
             </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end gap-2">
             <span className="text-sm font-medium text-[#1A1D1F]">Status</span>
             <div className="px-6 py-1.5 bg-[#E6FFF5] text-[#00B67A] text-xs font-bold rounded-full">
               Verified
             </div>
          </div>
        </div>

        <div className="mt-8">
           <button className="px-6 py-3 bg-[#3366FF] text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-all">
             Request for verification again
           </button>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  return (
    <div className="space-y-6 md:pb-10 pb-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1D1F] mb-2">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences.</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex gap-8 max-w-xl">
          <button
            className={`pb-3 text-sm font-medium transition-all w-full relative ${activeTab === 'Account' ? 'text-[#1A1D1F]' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('Account')}
          >
            Account
            {activeTab === 'Account' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1D1F]"></div>
            )}
          </button>
          <button
            className={`pb-3 text-sm font-medium transition-all w-full relative ${activeTab === 'Channel' ? 'text-[#1A1D1F]' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('Channel')}
          >
            Channel
            {activeTab === 'Channel' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1D1F]"></div>
            )}
          </button>
        </div>
      </div>

      <div className="pt-2">
        {activeTab === 'Account' ? <AccountSettings /> : <ChannelSettings />}
      </div>
    </div>
  );
};

export default Settings;
