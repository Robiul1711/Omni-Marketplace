import React from 'react';
import { FiArrowLeft, FiCheckCircle } from 'react-icons/fi';
import { Link, useNavigate, useParams } from 'react-router-dom';

const CampaignDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const timelineSteps = [
    {
      title: 'Booking Confirmed',
      description: 'Your placement booking has been successfully submitted.',
      completed: true,
    },
    {
      title: 'Host Approval',
      description: 'The host reviews and confirms the campaign details.',
      completed: true,
    },
    {
      title: 'Campaign Active',
      description: 'Your campaign runs for 30 days.',
      completed: true,
    },
    {
      title: 'Campaign Completed',
      description: 'Campaign delivery is confirmed.',
      completed: false,
    },
    {
      title: 'Escrow Release',
      description: 'Payment is released to the host 7 days after campaign approval.',
      completed: false,
    },
  ];

  return (
    <div className="">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#1A1D1F] font-semibold mb-6 md:mb-8 hover:text-blue-600 transition-colors px-2 md:px-0"
      >
        <FiArrowLeft size={20} />
        <span className="text-sm md:text-base">Back</span>
      </button>

      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-6 md:space-y-8">
          <div className="bg-white rounded-[24px] border border-gray-100 p-5 md:p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6 md:mb-8">
              <h1 className="text-xl md:text-2xl font-bold text-[#1A1D1F]">Campaign Details</h1>
              <span className="bg-[#E7F9F0] text-[#00A361] px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-wide">Active</span>
            </div>

            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
              {/* Left: Main Image */}
              <div className="w-full md:w-[320px] aspect-video md:h-[220px] rounded-[20px] overflow-hidden shadow-md bg-gray-50">
                <img 
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop" 
                  alt="Campaign" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Info Area */}
              <div className="flex-1">
                <span className="bg-[#EFF6FF] text-[#3366FF] px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider">Podcast</span>
                <h2 className="text-2xl md:text-[28px] font-bold text-[#1A1D1F] mt-3 mb-5 leading-tight">Mid-Roll Ad – Tech Podcast</h2>
                
                <div className="flex items-center gap-3 mb-6 md:mb-8">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#1A1D1F] text-sm md:text-base">Tech Talks Daily</span>
                      <FiCheckCircle className="text-blue-500" fill="#EBF3FF" />
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 font-medium">Member since 2024</span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                  {[
                    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
                    "https://images.unsplash.com/photo-1589903308904-1010c2294adc",
                    "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a",
                    "https://images.unsplash.com/photo-1478737270239-2fccd27ee8fb"
                  ].map((url, i) => (
                    <div key={i} className="w-20 md:w-24 h-14 md:h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm hover:border-blue-400 transition-colors cursor-pointer capitalize bg-gray-50">
                      <img 
                        src={`${url}?q=80&w=400&auto=format&fit=crop`} 
                        className="w-full h-full object-cover"
                        alt={`Thumbnail ${i + 1}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Overview Section */}
            <div className="mt-10 md:mt-12">
              <div className="bg-[#F4F7FF] px-5 md:px-6 py-4 rounded-xl mb-6 md:mb-8">
                <h3 className="text-base md:text-[17px] font-bold text-[#1A1D1F]">Overview</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-6 md:gap-y-10 px-2 md:px-6">
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">Placement</p>
                  <p className="font-bold text-[#1A1D1F] text-sm md:text-base">Mid-Roll Ad – Tech Podcast</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">Channel</p>
                  <p className="font-bold text-[#1A1D1F] text-sm md:text-base">Tech Talks Daily</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">Total Paid</p>
                  <p className="text-lg md:text-xl font-bold text-[#1A1D1F]">$92</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">Campaign Duration</p>
                  <p className="font-bold text-[#1A1D1F] text-sm md:text-base">30 Days</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">Start Date</p>
                  <p className="font-bold text-[#1A1D1F] text-sm md:text-base">05/12/25</p>
                </div>
                <div className="space-y-1.5">
                  <p className="text-xs md:text-sm font-medium text-gray-400">End Date</p>
                  <p className="font-bold text-[#1A1D1F] text-sm md:text-base">05/01/26</p>
                </div>
              </div>
            </div>

            {/* Ad Script Section */}
            <div className="mt-10 md:mt-12">
              <div className="bg-[#F4F7FF] px-5 md:px-6 py-4 rounded-xl mb-6 md:mb-8">
                <h3 className="text-base md:text-[17px] font-bold text-[#1A1D1F]">Ad Script</h3>
              </div>

              <div className="px-2 md:px-6 space-y-6 md:space-y-8">
                <p className="text-[#6F767E] leading-relaxed text-sm md:text-base">
                  Discover how our product helps developers streamline their workflow and improve productivity.
                </p>

                <div className="space-y-1.5">
                  <p className="text-[13px] md:text-sm font-bold text-[#1A1D1F]">Website/Landing Page</p>
                  <a href="#" className="text-sm text-blue-500 hover:underline break-all">https://landing-page.com</a>
                </div>

                <div className="space-y-1.5">
                  <p className="text-[13px] md:text-sm font-bold text-[#1A1D1F]">QR Code link</p>
                  <a href="#" className="text-sm text-blue-500 hover:underline break-all">qr.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Order */}
        <div className="w-full lg:w-[320px] xl:w-[380px]">
          <div className="bg-white rounded-[24px] border border-gray-100 p-6 md:p-8 shadow-sm">
            <h2 className="text-lg md:text-xl font-bold text-[#1A1D1F] mb-8 md:mb-10">Recent Order</h2>

            <div className="space-y-0 relative">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex gap-4 min-h-[80px] md:min-h-[100px] relative">
                  {/* Vertical Line */}
                  {index !== timelineSteps.length - 1 && (
                    <div className={`absolute left-[13px] top-[30px] w-[2px] h-[calc(100%-30px)] ${step.completed ? 'bg-blue-500' : 'bg-gray-100'}`}></div>
                  )}

                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    step.completed ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' : 'bg-white border-2 border-gray-100 text-gray-300'
                  }`}>
                    <FiCheckCircle size={15} />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1 pb-6 md:pb-8">
                    <h3 className={`text-[14px] md:text-[15px] font-bold ${step.completed ? 'text-[#1A1D1F]' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                    <p className="text-[13px] md:text-[14px] text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
