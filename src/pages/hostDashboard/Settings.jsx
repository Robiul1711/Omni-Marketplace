import React, { useState, useEffect, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { FiCamera, FiAlertCircle, FiClock, FiRefreshCw } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import useClient from '@/hooks/useClient';
import useMutationClient from '@/hooks/useMutationClient';
import { PROFILE, HOST_ONBOARDING, UPDATE_PASSWORD, REQUEST_VERIFICATION, HOST_ONBOARDING_OPTIONS } from '@/apiFunctions/apiEndPoints';

const getFileUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const cleanPath = path.replace(/\\/g, "/");
  const base = import.meta.env.VITE_IMG_URL || "";
  const separator = (base.endsWith("/") || cleanPath.startsWith("/")) ? "" : "/";
  return `${base}${separator}${cleanPath}`;
};

const isImage = (path) => {
  if (!path) return false;
  const ext = path.split('.').pop().toLowerCase();
  return ['jpg', 'jpeg', 'png', 'webp', 'gif'].includes(ext);
};

const SettingsSkeleton = () => {
  return (
    <div className="space-y-6 md:pb-10 pb-4 animate-pulse">
      <div className="mb-8 space-y-3">
        <div className="h-8 bg-gray-200 rounded-lg w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded-lg w-1/3"></div>
      </div>
      <div className="border-b border-gray-200">
        <div className="flex gap-8 max-w-xl pb-3">
          <div className="h-5 bg-gray-200 rounded-lg w-20"></div>
          <div className="h-5 bg-gray-200 rounded-lg w-20"></div>
        </div>
      </div>
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm space-y-8">
        <div className="h-6 bg-gray-200 rounded-lg w-24"></div>
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-200"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-24"></div>
            <div className="h-3 bg-gray-200 rounded-lg w-32"></div>
          </div>
        </div>
        <div className="space-y-5 max-w-2xl">
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-16"></div>
            <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-16"></div>
            <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded-lg w-16"></div>
            <div className="h-12 bg-gray-100 rounded-xl w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AccountSettings = ({ user, refetch }) => {
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(null);
  const avatarInputRef = useRef(null);

  // Profile Form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    setValue: setProfileValue,
    formState: { errors: profileErrors },
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
    }
  });

  // Keep form fields synced if user query returns after initial mount
  useEffect(() => {
    if (user) {
      setProfileValue('name', user.name || '');
      setProfileValue('email', user.email || '');
      setProfileValue('phone', user.phone || '');
    }
  }, [user, setProfileValue]);

  // Security Form
  const {
    register: registerSecurity,
    handleSubmit: handleSecuritySubmit,
    watch,
    formState: { errors: securityErrors },
    reset: resetSecurity,
  } = useForm();

  const newPassword = watch('newPassword');

  const { mutate: updateProfile, isPending: isProfileSaving } = useMutationClient({
    url: PROFILE,
    method: "post",
    isPrivate: true,
    successMessage: "Profile updated successfully!",
  });

  const { mutate: updatePassword, isPending: isPasswordSaving } = useMutationClient({
    url: UPDATE_PASSWORD,
    method: "post",
    isPrivate: true,
    successMessage: "Password updated successfully!",
  });

  const onProfileSave = (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phone', data.phone || '');
    if (avatarFile) {
      formData.append('avatar', avatarFile);
    }

    updateProfile({ data: formData }, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  const onSecuritySave = (data) => {
    updatePassword({
      data: {
        current_password: data.currentPassword,
        password: data.newPassword,
        password_confirmation: data.confirmPassword,
      }
    }, {
      onSuccess: () => {
        resetSecurity();
      }
    });
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatarFile(file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="space-y-6">
      {/* Profile Settings Section */}
      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Profile</h2>
        
        <form onSubmit={handleProfileSubmit(onProfileSave)} className="space-y-6 md:space-y-8 max-w-2xl">
          {/* Avatar Area */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div 
              className="relative w-24 h-24 md:w-32 md:h-32 group cursor-pointer"
              onClick={() => avatarInputRef.current?.click()}
            >
              <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-50 shadow-sm bg-gray-100">
                <img 
                  src={avatarPreview || user?.avatar || "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200&auto=format&fit=crop"} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <FiCamera size={24} className="text-white" />
              </div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none group-hover:hidden">
                 <FiCamera size={20} className="text-white drop-shadow-md opacity-80" />
              </div>
            </div>
            <input 
              type="file" 
              ref={avatarInputRef} 
              onChange={handleAvatarChange} 
              className="hidden" 
              accept="image/*"
            />
            <div className="text-center sm:text-left">
              <p className="text-sm font-bold text-[#1A1D1F]">Profile Picture</p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG max 5MB</p>
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
                {...registerProfile('email')}
                type="email" 
                disabled
                className="w-full px-4 py-3 bg-[#F4F7FE] border-2 border-transparent rounded-xl font-medium text-gray-400 outline-none cursor-not-allowed"
              />
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
            <button 
              type="submit" 
              disabled={isProfileSaving}
              className="w-full sm:w-auto px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50 disabled:opacity-50"
            >
              {isProfileSaving ? 'Saving...' : 'Save Changes'}
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

          <button 
            type="submit" 
            disabled={isPasswordSaving}
            className="w-full sm:w-auto px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-50 disabled:opacity-50"
          >
            {isPasswordSaving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

const ChannelSettings = ({ onboarding, options, refetch }) => {
  const docInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const establishmentTypes = options?.establishment_types || ["Restaurant", "Podcast", "Digital Screen"];
  const responseTimes = options?.response_times || ["Within 24 hours", "Within 48 hours", "Within 1 week"];
  const operatingHoursOptions = options?.operating_hours || ["Mon-Fri [9 AM - 5 PM]", "Sat-Sun [10 AM - 6 PM]", "Mon-Sun [24/7]"];

  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      establishmentName: onboarding?.establishment_name || '',
      channelType: onboarding?.establishment_type || 'Restaurant',
      internetAccess: onboarding?.has_internet_access ? 'Yes' : 'No',
      operatingHours: onboarding?.operating_hours || '',
      estimatedMonthlyFootTraffic: onboarding?.estimated_monthly_foot_traffic || '',
      responseTime: onboarding?.typical_campaign_response_time || 'Within 24 hours'
    }
  });

  useEffect(() => {
    if (onboarding) {
      setValue('establishmentName', onboarding.establishment_name || '');
      setValue('channelType', onboarding.establishment_type || 'Restaurant');
      setValue('internetAccess', onboarding.has_internet_access ? 'Yes' : 'No');
      setValue('operatingHours', onboarding.operating_hours || '');
      setValue('estimatedMonthlyFootTraffic', onboarding.estimated_monthly_foot_traffic || '');
      setValue('responseTime', onboarding.typical_campaign_response_time || 'Within 24 hours');
    }
  }, [onboarding, setValue]);

  const { mutate: updateChannel, isPending: isChannelSaving } = useMutationClient({
    url: HOST_ONBOARDING,
    method: "post",
    isPrivate: true,
    successMessage: "Channel settings updated successfully!",
  });

  const { mutate: requestVerification, isPending: isRequestingVerification } = useMutationClient({
    url: REQUEST_VERIFICATION,
    method: "post",
    isPrivate: true,
    successMessage: "Verification request submitted successfully!",
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append('establishment_name', data.establishmentName);
    formData.append('establishment_type', data.channelType);
    formData.append('has_internet_access', data.internetAccess === 'Yes' ? '1' : '0');
    formData.append('operating_hours', data.operatingHours);
    formData.append('estimated_monthly_foot_traffic', data.estimatedMonthlyFootTraffic);
    formData.append('typical_campaign_response_time', data.responseTime);

    if (selectedFile) {
      formData.append('business_registration_file', selectedFile);
    }

    updateChannel({ data: formData }, {
      onSuccess: () => {
        setSelectedFile(null);
        refetch();
      }
    });
  };

  const handleDocChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleRequestVerification = () => {
    requestVerification({}, {
      onSuccess: () => {
        refetch();
      }
    });
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
              <label className="text-sm font-medium text-[#1A1D1F]">Channel Type</label>
              <Controller
                name="channelType"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full px-4 py-6 bg-white border border-gray-200 rounded-xl font-medium text-[#1A1D1F]">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {establishmentTypes.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
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
              <Controller
                name="operatingHours"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full px-4 py-6 bg-white border border-gray-200 rounded-xl font-medium text-[#1A1D1F]">
                      <SelectValue placeholder="Select operating hours" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {operatingHoursOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Estimated Monthly Foot Traffic</label>
              <input 
                {...register('estimatedMonthlyFootTraffic')}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 transition-all text-sm font-medium text-[#1A1D1F] outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-[#1A1D1F]">Typical Campaign Response Time</label>
              <Controller
                name="responseTime"
                control={control}
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full px-4 py-6 bg-white border border-gray-200 rounded-xl font-medium text-[#1A1D1F]">
                      <SelectValue placeholder="Select response time" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      {responseTimes.map((opt) => (
                        <SelectItem key={opt} value={opt}>{opt}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            <div className="space-y-2 pt-2">
              <div className="flex items-center gap-3">
                <input 
                  type="file" 
                  ref={docInputRef} 
                  onChange={handleDocChange} 
                  className="hidden" 
                  accept=".pdf,.jpg,.png,.doc"
                />
                {selectedFile || onboarding?.business_registration_file ? (
                  <div className="flex items-center gap-3">
                    {selectedFile ? (
                      <div 
                        className="w-12 h-12 rounded-lg bg-[#4B5563] text-white flex flex-col items-center justify-center font-bold text-xs uppercase leading-none shadow-sm cursor-default"
                        title="New local file chosen (Click Save Changes to upload)"
                      >
                        FILE
                      </div>
                    ) : (
                      <a 
                        href={getFileUrl(onboarding.business_registration_file)} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-12 h-12 rounded-lg bg-[#4B5563] hover:bg-gray-700 text-white flex flex-col items-center justify-center font-bold text-xs uppercase leading-none transition-all shadow-sm cursor-pointer"
                        title="Click to view/download document"
                      >
                        FILE
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-100 text-gray-400 flex flex-col items-center justify-center rounded-lg border border-gray-200 shadow-sm font-bold text-xs uppercase leading-none font-host-grotesk">
                    None
                  </div>
                )}

                <button 
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-full hover:bg-gray-50 cursor-pointer"
                  title="Select new file"
                >
                   <FiRefreshCw size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[24px] border border-gray-100 p-5 shadow-sm flex gap-3">
          <button 
            type="submit" 
            disabled={isChannelSaving}
            className="px-10 py-3 bg-[#3366FF] text-white font-medium text-sm rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all shadow-sm disabled:opacity-50"
          >
            {isChannelSaving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
        <h2 className="text-base md:text-[17px] font-bold text-[#1A1D1F] mb-6 md:mb-8">Verification</h2>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 max-w-4xl">
          <div className="space-y-3">
             <div className="flex items-center gap-3">
               {onboarding?.business_registration_file ? (
                 <a 
                   href={getFileUrl(onboarding.business_registration_file)} 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="w-12 h-12 rounded-lg bg-[#4B5563] hover:bg-gray-700 text-white flex flex-col items-center justify-center font-bold text-xs uppercase leading-none transition-all shadow-sm cursor-pointer"
                   title="Click to view/download document"
                 >
                   FILE
                 </a>
               ) : (
                 <div className="w-12 h-12 bg-gray-100 text-gray-400 flex flex-col items-center justify-center rounded-lg border border-gray-200 shadow-sm font-bold text-xs uppercase leading-none font-host-grotesk">
                   None
                 </div>
               )}
             </div>
          </div>
          
          <div className="flex flex-col items-start sm:items-end gap-2">
             <span className="text-sm font-medium text-[#1A1D1F]">Status</span>
             <div className={`px-6 py-1.5 text-xs font-bold rounded-full uppercase ${
               onboarding?.verification_status === 'verified'
                 ? 'bg-[#E6FFF5] text-[#00B67A]'
                 : onboarding?.verification_status === 'pending'
                 ? 'bg-yellow-50 text-yellow-600'
                 : 'bg-red-50 text-red-500'
             }`}>
               {onboarding?.verification_status || 'pending'}
             </div>
          </div>
        </div>

        <div className="mt-8">
           <button 
             onClick={handleRequestVerification}
             disabled={isRequestingVerification}
             className="px-6 py-3 bg-[#3366FF] text-white text-sm font-medium rounded-lg hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 cursor-pointer"
           >
             {isRequestingVerification ? "Requesting..." : "Request for verification again"}
           </button>
        </div>
      </div>
    </div>
  );
};

const Settings = () => {
  const [activeTab, setActiveTab] = useState('Account');

  const { data: profileData, isLoading: isProfileLoading, refetch: refetchProfile } = useClient({
    queryKey: ["userProfile"],
    url: PROFILE,
    isPrivate: true,
  });

  const { data: onboardingData, isLoading: isOnboardingLoading, refetch: refetchOnboarding } = useClient({
    queryKey: ["hostOnboarding"],
    url: HOST_ONBOARDING,
    isPrivate: true,
  });

  const { data: onboardingOptionsData, isLoading: isOptionsLoading } = useClient({
    queryKey: ["hostOnboardingOptions"],
    url: HOST_ONBOARDING_OPTIONS,
    isPrivate: true,
  });

  if (isProfileLoading || isOnboardingLoading || isOptionsLoading) {
    return <SettingsSkeleton />;
  }

  const user = profileData?.data || profileData;
  const onboarding = onboardingData?.data || onboardingData;

  return (
    <div className="space-y-6 md:pb-10 pb-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#1A1D1F] mb-2">Settings</h1>
        <p className="text-sm text-gray-500">Manage your account and preferences.</p>
      </div>

      <div className="border-b border-gray-200">
        <div className="flex gap-8 max-w-xl">
          <button
            className={`pb-3 text-sm font-medium transition-all w-full relative cursor-pointer ${activeTab === 'Account' ? 'text-[#1A1D1F]' : 'text-gray-400 hover:text-gray-600'}`}
            onClick={() => setActiveTab('Account')}
          >
            Account
            {activeTab === 'Account' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#1A1D1F]"></div>
            )}
          </button>
          <button
            className={`pb-3 text-sm font-medium transition-all w-full relative cursor-pointer ${activeTab === 'Channel' ? 'text-[#1A1D1F]' : 'text-gray-400 hover:text-gray-600'}`}
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
        {activeTab === 'Account' ? (
          <AccountSettings user={user} refetch={refetchProfile} />
        ) : (
          <ChannelSettings onboarding={onboarding} options={onboardingOptionsData?.data} refetch={refetchOnboarding} />
        )}
      </div>
    </div>
  );
};

export default Settings;
