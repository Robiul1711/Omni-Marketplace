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
    <div className=" pb-10">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-[#1A1D1F] font-semibold mb-8 hover:text-blue-600 transition-colors"
      >
        <FiArrowLeft size={20} />
        Back
      </button>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-[#1A1D1F]">Campaign Details</h1>
              <span className="bg-[#E7F9F0] text-[#00A361] px-4 py-1.5 rounded-full text-xs font-bold">Active</span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Main Image */}
              <div className="w-full md:w-[320px] h-[220px] rounded-[20px] overflow-hidden shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop" 
                  alt="Campaign" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Right: Info Area */}
              <div className="flex-1">
                <span className="bg-[#EFF6FF] text-[#3366FF] px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">Podcast</span>
                <h2 className="text-[28px] font-bold text-[#1A1D1F] mt-4 mb-6 leading-tight">Mid-Roll Ad – Tech Podcast</h2>
                
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                    <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop" alt="Avatar" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-[#1A1D1F]">Tech Talks Daily</span>
                      <FiCheckCircle className="text-blue-500" fill="#EBF3FF" />
                    </div>
                    <span className="text-sm text-gray-400 font-medium">Member since 2024</span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                  {[
                    "https://images.unsplash.com/photo-1590602847861-f357a9332bbc",
                    "https://images.unsplash.com/photo-1589903308904-1010c2294adc",
                    "https://images.unsplash.com/photo-1559523161-0fc0d8b38a7a",
                    "https://images.unsplash.com/photo-1478737270239-2fccd27ee8fb"
                  ].map((url, i) => (
                    <div key={i} className="w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm hover:border-blue-400 transition-colors cursor-pointer capitalize">
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
            <div className="mt-12">
              <div className="bg-[#F4F7FF] px-6 py-4 rounded-xl mb-8">
                <h3 className="text-[17px] font-bold text-[#1A1D1F]">Overview</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-y-10 px-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Placement</p>
                  <p className="font-bold text-[#1A1D1F]">Mid-Roll Ad – Tech Podcast</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Channel</p>
                  <p className="font-bold text-[#1A1D1F]">Tech Talks Daily</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Total Paid</p>
                  <p className="text-xl font-bold text-[#1A1D1F]">$92</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Campaign Duration</p>
                  <p className="font-bold text-[#1A1D1F]">30 Days</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">Start Date</p>
                  <p className="font-bold text-[#1A1D1F]">05/12/25</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-400">End Date</p>
                  <p className="font-bold text-[#1A1D1F]">05/01/26</p>
                </div>
              </div>
            </div>

            {/* Ad Script Section */}
            <div className="mt-12">
              <div className="bg-[#F4F7FF] px-6 py-4 rounded-xl mb-8">
                <h3 className="text-[17px] font-bold text-[#1A1D1F]">Ad Script</h3>
              </div>

              <div className="px-6 space-y-8">
                <p className="text-[#6F767E] leading-relaxed">
                  Discover how our product helps developers streamline their workflow and improve productivity.
                </p>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1A1D1F]">Website/Landing Page</p>
                  <a href="#" className="text-sm text-blue-500 hover:underline">https://landing-page.com</a>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-bold text-[#1A1D1F]">QR Code link</p>
                  <a href="#" className="text-sm text-blue-500 hover:underline">qr.com</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar: Recent Order */}
        <div className="w-full lg:w-[380px]">
          <div className="bg-white rounded-[24px] border border-gray-100 p-8 shadow-sm h-full">
            <h2 className="text-xl font-bold text-[#1A1D1F] mb-10">Recent Order</h2>

            <div className="space-y-0 relative">
              {timelineSteps.map((step, index) => (
                <div key={index} className="flex gap-4 min-h-[100px] relative">
                  {/* Vertical Line */}
                  {index !== timelineSteps.length - 1 && (
                    <div className={`absolute left-[13px] top-[30px] w-[2px] h-[calc(100%-30px)] ${step.completed ? 'bg-blue-500' : 'bg-gray-100'}`}></div>
                  )}

                  {/* Icon */}
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                    step.completed ? 'bg-blue-500 text-white shadow-lg shadow-blue-100' : 'bg-white border-2 border-gray-100 text-gray-300'
                  }`}>
                    <FiCheckCircle size={16} />
                  </div>

                  {/* Text Content */}
                  <div className="space-y-1.5 pb-8">
                    <h3 className={`text-[15px] font-bold ${step.completed ? 'text-[#1A1D1F]' : 'text-gray-400'}`}>
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-gray-500 leading-relaxed">
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
