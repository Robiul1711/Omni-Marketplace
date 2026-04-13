import React from 'react';
import PlacementCard from '@/components/sites/home/PlacementCard';
import { ChevronDown } from 'lucide-react';

const PlacementsFromThisHost = () => {
  // Mock data for demonstration, matching the reference image layout
  const placements = [
    {
      id: 1,
      title: "Mid-Roll Ad – Tech Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop",
      available: true
    },
    {
      id: 2,
      title: "Pre-Roll Video Ad – YouTube",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "Fully Booked (March)",
      slotsPercentage: 100,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      available: false
    },
    {
      id: 3,
      title: "Pre-Roll Video Ad – YouTube",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      available: true
    },
    {
      id: 4,
      title: "Mid-Roll Ad – Tech Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1974&auto=format&fit=crop",
      available: true
    },
    {
      id: 5,
      title: "Pre-Roll Video Ad – YouTube",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "Fully Booked (March)",
      slotsPercentage: 100,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
      available: false
    },
    {
      id: 6,
      title: "Pre-Roll Video Ad – YouTube",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50k Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      category: "Podcast",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
      available: true
    }
  ];

  return (
    <div className="w-full border border-gray-100 rounded-[32px] p-5 md:p-8 shadow-sm ">
      {/* Header with Sorting */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h3 className="text-gray-500 font-medium text-sm md:text-base">Placements from this Host</h3>
        
        <div className="relative group min-w-[200px]">
          <button className="w-full flex items-center justify-between gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-Primary transition-colors">
            <span>Sort by: Channel Type</span>
            <ChevronDown className="w-4 h-4 text-gray-400 group-hover:text-Primary transition-colors" />
          </button>
        </div>
      </div>

      {/* Placements Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-12">
        {placements.map((item) => (
          <PlacementCard key={item.id} item={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2 pb-10">
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-Primary transition-colors">Previous</button>
        <button className="w-10 h-10 rounded-lg bg-Primary text-white font-bold flex items-center justify-center">1</button>
        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-600 font-medium flex items-center justify-center transition-colors">2</button>
        <button className="w-10 h-10 rounded-lg hover:bg-gray-100 text-gray-600 font-medium flex items-center justify-center transition-colors">3</button>
        <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-Primary transition-colors">Next</button>
      </div>
    </div>
  );
};

export default PlacementsFromThisHost;
