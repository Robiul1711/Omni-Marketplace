import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useClient from "@/hooks/useClient";
import { PLACEMENTS_OPTIONS } from "@/apiFunctions/apiEndPoints";

const defaultPromotionTypes = [
  { id: 1, name: "Product Promotion" },
  { id: 2, name: "Event Promotion" },
  { id: 3, name: "Brand Awareness" },
];

const defaultChannelTypes = [
  { id: 4, name: "In-Store Audio Network" },
  { id: 5, name: "Digital Billboard" },
  { id: 6, name: "Interactive Kiosk" },
];

const BrowseFilter = ({
  filters = {},
  onFilterChange,
  onReset,
  onClose,
  isMobile = false,
}) => {
  // Fetch dynamic placement options
  const { data: optionsResponse } = useClient({
    queryKey: ["placementOptions"],
    url: PLACEMENTS_OPTIONS,
  });

  const optionsData = optionsResponse?.data || {};
  const promotionTypes = optionsData.promotion_types?.length
    ? optionsData.promotion_types
    : defaultPromotionTypes;
  const channelTypes = optionsData.channel_types?.length
    ? optionsData.channel_types
    : defaultChannelTypes;
  const locations = optionsData.locations || [];
  const priceRange = optionsData.price_range || { min: 0, max: 1000 };

  const selectedPromTypes = filters.promotion_types || [];
  const selectedChanTypes = filters.channel_types || [];
  const minPrice = filters.min_price ?? "";
  const maxPrice = filters.max_price ?? "";
  const selectedAudience = filters.audience_size || "all";
  const selectedLocation = filters.location || "all";

  // Toggle promotion type checkbox
  const handlePromotionToggle = (id) => {
    if (!onFilterChange) return;
    const exists = selectedPromTypes.includes(id);
    const updated = exists
      ? selectedPromTypes.filter((item) => item !== id)
      : [...selectedPromTypes, id];
    onFilterChange({ ...filters, promotion_types: updated });
  };

  // Toggle select-all for promotion types
  const handleSelectAllPromotion = () => {
    if (!onFilterChange) return;
    const allIds = promotionTypes.map((t) => t.id);
    const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedPromTypes.includes(id));
    onFilterChange({
      ...filters,
      promotion_types: isAllSelected ? [] : allIds,
    });
  };

  // Toggle channel type checkbox
  const handleChannelToggle = (id) => {
    if (!onFilterChange) return;
    const exists = selectedChanTypes.includes(id);
    const updated = exists
      ? selectedChanTypes.filter((item) => item !== id)
      : [...selectedChanTypes, id];
    onFilterChange({ ...filters, channel_types: updated });
  };

  // Toggle select-all for channel types
  const handleSelectAllChannel = () => {
    if (!onFilterChange) return;
    const allIds = channelTypes.map((t) => t.id);
    const isAllSelected = allIds.length > 0 && allIds.every((id) => selectedChanTypes.includes(id));
    onFilterChange({
      ...filters,
      channel_types: isAllSelected ? [] : allIds,
    });
  };

  const handlePriceChange = (field, value) => {
    if (!onFilterChange) return;
    onFilterChange({ ...filters, [field]: value });
  };

  const handleAudienceChange = (value) => {
    if (!onFilterChange) return;
    onFilterChange({ ...filters, audience_size: value });
  };

  const handleLocationChange = (value) => {
    if (!onFilterChange) return;
    onFilterChange({ ...filters, location: value });
  };

  const isAllPromSelected =
    promotionTypes.length > 0 &&
    promotionTypes.every((t) => selectedPromTypes.includes(t.id));
  const isAllChanSelected =
    channelTypes.length > 0 &&
    channelTypes.every((t) => selectedChanTypes.includes(t.id));

  return (
    <div
      className={`flex flex-col h-full bg-white ${
        !isMobile ? "border border-gray-100 rounded-[24px] p-6 shadow-sm" : "p-6"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[#171717] font-host-grotesk">
          Filter Options
        </h3>
      </div>

      <div className="space-y-7 overflow-y-auto pr-2 custom-scrollbar flex-grow">

        {/* Promotion Type */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk">
              Promotion Type
            </h4>
            <input
              type="checkbox"
              checked={isAllPromSelected}
              onChange={handleSelectAllPromotion}
              title="Select / Deselect all"
              className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary cursor-pointer accent-Primary"
            />
          </div>
          <div className="space-y-2.5">
            {promotionTypes.map((type) => {
              const isChecked = selectedPromTypes.includes(type.id);
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handlePromotionToggle(type.id)}
                    className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary transition-all cursor-pointer accent-Primary"
                  />
                  <span
                    className={`text-[13px] font-medium font-host-grotesk transition-colors ${
                      isChecked
                        ? "text-[#171717] font-semibold"
                        : "text-[#525866] group-hover:text-Primary"
                    }`}
                  >
                    {type.name}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Channel Type */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk">
              Channel Type
            </h4>
            <input
              type="checkbox"
              checked={isAllChanSelected}
              onChange={handleSelectAllChannel}
              title="Select / Deselect all"
              className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary cursor-pointer accent-Primary"
            />
          </div>
          <div className="space-y-2.5">
            {channelTypes.map((type) => {
              const isChecked = selectedChanTypes.includes(type.id);
              return (
                <label
                  key={type.id}
                  className="flex items-center gap-3 cursor-pointer group select-none"
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleChannelToggle(type.id)}
                    className="w-4 h-4 rounded border-gray-300 text-Primary focus:ring-Primary transition-all cursor-pointer accent-Primary"
                  />
                  <span
                    className={`text-[13px] font-medium font-host-grotesk transition-colors ${
                      isChecked
                        ? "text-[#171717] font-semibold"
                        : "text-[#525866] group-hover:text-Primary"
                    }`}
                  >
                    {type.name}
                  </span>
                </label>
              );
            })}
          </div>
        </section>

        {/* Price Range */}
        <section>
          <div className="flex items-center justify-between mb-3.5">
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk">
              Price Range
            </h4>
            {priceRange.min !== undefined && priceRange.max !== undefined && (
              <span className="text-xs text-gray-400 font-host-grotesk">
                ${priceRange.min} - ${priceRange.max}
              </span>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">
                $
              </span>
              <input
                type="number"
                value={minPrice}
                onChange={(e) => handlePriceChange("min_price", e.target.value)}
                placeholder={priceRange.min ? String(priceRange.min) : "Min"}
                className="w-full h-10 pl-6 pr-3 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk bg-white"
              />
            </div>
            <span className="text-gray-300 font-bold">-</span>
            <div className="relative flex-1">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-semibold">
                $
              </span>
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => handlePriceChange("max_price", e.target.value)}
                placeholder={priceRange.max ? String(priceRange.max) : "Max"}
                className="w-full h-10 pl-6 pr-3 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk bg-white"
              />
            </div>
          </div>
        </section>

        {/* Audience Size */}
        <section>
          <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk mb-3.5">
            Audience Size
          </h4>
          <Select value={selectedAudience} onValueChange={handleAudienceChange}>
            <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk bg-white text-left shadow-none">
              <SelectValue placeholder="Any Size" />
            </SelectTrigger>
            <SelectContent className="bg-white">
              <SelectItem value="all">Any Size</SelectItem>
              <SelectItem value="0-10k">0-10k</SelectItem>
              <SelectItem value="10-50k">10-50k</SelectItem>
              <SelectItem value="50k+">50k+</SelectItem>
            </SelectContent>
          </Select>
        </section>


        {/* Location (if locations provided by backend) */}
        {locations.length > 0 && (
          <section>
            <h4 className="text-sm font-semibold text-[#171717] font-host-grotesk mb-3.5">
              Location
            </h4>
            <Select value={selectedLocation} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-full h-11 px-4 rounded-xl border border-gray-200 focus:border-Primary outline-none text-[13px] font-host-grotesk bg-white text-left shadow-none">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc, idx) => (
                  <SelectItem key={idx} value={loc.name}>
                    {loc.name} {loc.count ? `(${loc.count})` : ""}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </section>
        )}
      </div>

      {/* Action Footer */}
      <div className="mt-6 pt-4 border-t border-gray-100 flex gap-2">
        <button
          type="button"
          onClick={() => {
            if (onReset) onReset();
            if (isMobile && onClose) onClose();
          }}
          className="w-full h-12 bg-gray-50 hover:bg-gray-100 text-[#171717] rounded-xl font-bold text-sm transition-all font-host-grotesk active:scale-[0.99]"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
};

export default BrowseFilter;