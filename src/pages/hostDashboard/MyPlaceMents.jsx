import React from 'react';
import { Plus } from 'lucide-react';
import PlacementCard from '@/components/sites/home/PlacementCard';
import Image1 from "@/assets/images/i1.png";
import Image2 from "@/assets/images/i2.png";
import Image3 from "@/assets/images/i3.png";
import Image4 from "@/assets/images/i4.png";
import Image5 from "@/assets/images/i5.png";
import Image6 from "@/assets/images/i6.png";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Link } from 'react-router-dom';

const MyPlaceMents = () => {
    // Dummy data matching the image
    const placements = [
        {
            id: 1,
            title: "Mid-Roll Ad – Tech Podcast",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image1,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        },
        {
            id: 2,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image2,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "Fully Booked (March)",
            slotsPercentage: 100,
            available: false,
            price: "500",
            isSaved: false
        },
        {
            id: 3,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image3,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        },
        {
            id: 4,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image4,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        },
        {
            id: 5,
            title: "Mid-Roll Ad – Tech Podcast",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image5,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        },
        {
            id: 6,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image6,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "Fully Booked (March)",
            slotsPercentage: 100,
            available: false,
            price: "500",
            isSaved: false
        },
        {
            id: 7,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image1,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        },
        {
            id: 8,
            title: "Pre-Roll Video Ad – YouTube",
            category: "Podcast",
            host: "Tech Talks Daily",
            verified: true,
            image: Image2,
            traffic: "50K Estimated Monthly Foot Traffic.",
            location: "United States",
            duration: "30 days",
            slots: "7 / 10 Slots Available (March)",
            slotsPercentage: 70,
            available: true,
            price: "500",
            isSaved: false
        }
    ];

    return (
        <div className="min-h-screen bg-[#F9FAFB] p-6 md:p-8 space-y-8">
            <div className="max-w-[1600px] mx-auto space-y-8">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 py-6 rounded-lg bg-white px-10">
                    <div>
                        <h1 className="text-2xl md:text-[28px] font-bold text-[#101828]">My Placements</h1>
                        <p className="text-[#667085] mt-1 text-sm md:text-base">Manage and track all your campaign orders.</p>
                    </div>
                    <Link to="/host/dashboard/create-placement" className="bg-Primary hover:bg-Primary/90 text-white px-5 py-2.5 rounded-[10px] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm w-full md:w-auto">
                        <Plus size={20} strokeWidth={2.5} />
                        <span>Create Placements</span>
                    </Link>
                </div>

                {/* Content Section */}
                <div className="bg-white rounded-[24px]  overflow-hidden">
                    {/* Filter Bar */}
                    <div className="px-6 py-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <h2 className="text-lg font-bold text-[#101828]">
                            Total Placements :<span className="ml-1.5 text-[#667085] font-semibold">12</span>
                        </h2>
                        <div className="relative">
                            <Select defaultValue="channel">
                                <SelectTrigger className="w-[220px] font-semibold text-[#344054] border-[#D0D5DD] rounded-lg h-10">
                                    <SelectValue placeholder="Sort by: Channel Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="channel">Sort by: Channel Type</SelectItem>
                                    <SelectItem value="date">Sort by: Date</SelectItem>
                                    <SelectItem value="price">Sort by: Price</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Grid Section */}
                    <div className="p-6">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
                            {placements.map((item) => (
                                <PlacementCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPlaceMents;