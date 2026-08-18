import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Plus } from 'lucide-react';

const Step1About = ({ register, errors, control, Controller }) => {
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
      </div>

      {/* Included Features & Highlights as Input Box */}
      <div className="space-y-4 pt-2 border-t border-gray-100">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Features & Highlights</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Add Features & Highlights</label>
          
          <Controller
            name="campaign_info.pl_feature"
            control={control}
            rules={{ required: "At least one feature is required" }}
            render={({ field }) => {
              const selectedValues = Array.isArray(field.value) ? field.value : [];
              const [inputValue, setInputValue] = useState('');

              const handleAdd = () => {
                if (!inputValue.trim()) return;
                if (!selectedValues.includes(inputValue.trim())) {
                  field.onChange([...selectedValues, inputValue.trim()]);
                }
                setInputValue('');
              };

              const handleRemove = (valToRemove) => {
                field.onChange(selectedValues.filter(val => val !== valToRemove));
              };

              return (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAdd();
                        }
                      }}
                      placeholder="Type a feature and press Enter or click Add (e.g. Indoor Audio)"
                      className="h-11 bg-white focus-visible:ring-Primary flex-1"
                    />
                    <button
                      type="button"
                      onClick={handleAdd}
                      className="px-5 py-2 bg-[#1a1a1a] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors flex items-center gap-1 shrink-0"
                    >
                      <Plus size={16} /> Add Feature
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedValues.map((val) => (
                      <span
                        key={val}
                        className="inline-flex items-center gap-1.5 bg-Primary/10 text-Primary text-xs font-semibold px-3 py-1.5 rounded-lg border border-Primary/20"
                      >
                        {val}
                        <X
                          className="size-3.5 cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleRemove(val)}
                        />
                      </span>
                    ))}
                    {selectedValues.length === 0 && (
                      <span className="text-xs text-gray-400 italic">No features added yet. Type above and click Add Feature.</span>
                    )}
                  </div>
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
