import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

const Step1About = ({ register, errors, control, Controller }) => {
  const [isOpen, setIsOpen] = useState(false);

  const featureOptions = [
    'Indoor Audio',
    'Indoor Video',
    'High Traffic Location',
    'Premium Audience',
    'LED Display',
    'Audio Enabled',
    '24/7 Visibility'
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">About This Placement</h2>
        
        {/* Business Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Placement / Business Name</label>
          <Input
            {...register('campaign_info.pl_bus_name', { required: 'Business Name is required' })}
            placeholder="E.g., Times Square Cafe Ad"
            className="h-11 bg-white border-gray-200 focus-visible:ring-Primary"
          />
          {errors.campaign_info?.pl_bus_name && (
            <span className="text-xs text-red-500">{errors.campaign_info.pl_bus_name.message}</span>
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Placement Description</label>
          <Textarea
            {...register('campaign_info.pl_bus_description', { required: 'Description is required' })}
            placeholder="Describe your placement offering..."
            className="min-h-[110px] bg-white border-gray-200 focus-visible:ring-Primary"
          />
          {errors.campaign_info?.pl_bus_description && (
            <span className="text-xs text-red-500">{errors.campaign_info.pl_bus_description.message}</span>
          )}
        </div>

        {/* Location Details Grid */}
        <div className="pt-2 border-t border-gray-100">
          <h3 className="text-base font-semibold text-gray-800 mb-3">Location Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2 md:col-span-2">
              <label className="text-sm font-medium text-gray-700">Venue / Location Name</label>
              <Input
                {...register('location', { required: 'Location is required' })}
                placeholder="E.g., Times Square Cafe"
                className="h-11 bg-white focus-visible:ring-Primary"
              />
              {errors.location && <span className="text-xs text-red-500">{errors.location.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">City</label>
              <Input
                {...register('city', { required: 'City is required' })}
                placeholder="E.g., New York"
                className="h-11 bg-white focus-visible:ring-Primary"
              />
              {errors.city && <span className="text-xs text-red-500">{errors.city.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">State</label>
              <Input
                {...register('state', { required: 'State is required' })}
                placeholder="E.g., NY"
                className="h-11 bg-white focus-visible:ring-Primary"
              />
              {errors.state && <span className="text-xs text-red-500">{errors.state.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Country</label>
              <Input
                {...register('country', { required: 'Country is required' })}
                placeholder="E.g., USA"
                className="h-11 bg-white focus-visible:ring-Primary"
              />
              {errors.country && <span className="text-xs text-red-500">{errors.country.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Zip Code</label>
              <Input
                type="number"
                {...register('zip_code', { required: 'Zip code is required' })}
                placeholder="E.g., 10001"
                className="h-11 bg-white focus-visible:ring-Primary"
              />
              {errors.zip_code && <span className="text-xs text-red-500">{errors.zip_code.message}</span>}
            </div>
          </div>
        </div>

        {/* Status selection */}
        <div className="flex flex-col gap-2 pt-2">
          <label className="text-sm font-medium text-gray-700">Placement Status</label>
          <Controller
            name="status"
            control={control}
            defaultValue="draft"
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value || 'draft'}>
                <SelectTrigger className="w-full h-11 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select Status (Draft or Publish)" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="publish">Publish</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
        </div>
      </div>

      {/* Included Features */}
      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Features & Highlights</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Included Features</label>
          
          <Controller
            name="campaign_info.pl_feature"
            control={control}
            rules={{ required: "At least one feature is required" }}
            render={({ field }) => {
              const selectedValues = Array.isArray(field.value) ? field.value : [];
              const toggleOption = (opt) => {
                let newVal;
                if (selectedValues.includes(opt)) {
                  newVal = selectedValues.filter(val => val !== opt);
                } else {
                  newVal = [...selectedValues, opt];
                }
                field.onChange(newVal);
              };

              return (
                <div className="relative z-30">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full min-h-[44px] bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-between hover:border-gray-300 transition-colors text-left shadow-sm"
                  >
                    {selectedValues.length === 0 ? (
                      <span className="text-gray-400 text-sm">Select placement features...</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedValues.map(val => (
                          <span
                            key={val}
                            className="inline-flex items-center gap-1 bg-Primary/5 text-Primary text-xs font-semibold px-2.5 py-0.5 rounded-lg border border-Primary/10"
                          >
                            {val}
                            <X
                              className="size-3.5 cursor-pointer hover:text-red-500"
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleOption(val);
                              }}
                            />
                          </span>
                        ))}
                      </div>
                    )}
                    <span className="text-gray-400 text-xs ml-2">▼</span>
                  </button>

                  {isOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 py-2 max-h-[250px] overflow-y-auto">
                        {featureOptions.map(opt => {
                          const isSelected = selectedValues.includes(opt);
                          return (
                            <div
                              key={opt}
                              onClick={() => toggleOption(opt)}
                              className="px-4 py-2.5 hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
                            >
                              <span className={`text-sm ${isSelected ? 'font-semibold text-Primary' : 'text-gray-700'}`}>
                                {opt}
                              </span>
                              {isSelected && (
                                <span className="text-Primary font-bold text-sm">✓</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              );
            }}
          />
          {errors.campaign_info?.pl_feature && (
            <span className="text-xs text-red-500">{errors.campaign_info.pl_feature.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1About;
