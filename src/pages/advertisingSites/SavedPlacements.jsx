import React from 'react';
import PlacementCard from '@/components/sites/home/PlacementCard';

const SavedPlacements = () => {
  const savedItems = [
    {
      id: 1,
      title: "Mid-Roll Ad – Tech Podcast",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
    {
      id: 2,
      title: "Pre-Roll Video Ad – YouTube",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "Fully Booked (March)",
      slotsPercentage: 100,
      price: "500",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
    {
      id: 3,
      title: "Pre-Roll Video Ad – YouTube",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
    {
      id: 4,
      title: "Mid-Roll Ad – Tech Podcast",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      image: "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
    {
      id: 5,
      title: "Pre-Roll Video Ad – YouTube",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "Fully Booked (March)",
      slotsPercentage: 100,
      price: "500",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
    {
      id: 6,
      title: "Pre-Roll Video Ad – YouTube",
      category: "Podcast",
      host: "Tech Talks Daily",
      verified: true,
      traffic: "50K Estimated Monthly Foot Traffic.",
      location: "United States",
      duration: "30 days",
      slots: "7 / 10 Slots Available (March)",
      slotsPercentage: 70,
      price: "500",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=800&auto=format&fit=crop",
      isSaved: true,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-[28px] font-bold text-[#1A1D1F]">Saved Placements</h1>
        <p className="text-[#6F767E] text-[15px] mt-2">Find your bookmarked and interested advertising spots here.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {savedItems.map((item) => (
          <PlacementCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default SavedPlacements;

