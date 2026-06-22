import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';

const Step1About = ({ register, errors, control, Controller }) => {
  const [isOpen, setIsOpen] = useState(false);

  const options = [
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
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Establishment Name</label>
          <Input
            {...register('title', { required: 'Establishment Name is required' })}
            placeholder="E.g., Tech Talks Daily"
            className="h-[52px] bg-white border-gray-200 focus-visible:ring-Primary"
          />
          {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Placement Description</label>
          <Textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Describe your placement offering..."
            className="min-h-[140px] bg-white border-gray-200 focus-visible:ring-Primary"
          />
          {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
        </div>
      </div>

      <div className="space-y-4 pt-2">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">What's Included</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Included Features</label>
          
          <Controller
            name="whatsIncluded"
            control={control}
            rules={{ required: "At least one inclusion is required" }}
            render={({ field }) => {
              const selectedValues = field.value || [];
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
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full min-h-[52px] bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-between hover:border-gray-300 transition-colors text-left shadow-sm"
                  >
                    {selectedValues.length === 0 ? (
                      <span className="text-gray-400 text-sm">Select what's included...</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedValues.map(val => (
                          <span
                            key={val}
                            className="inline-flex items-center gap-1 bg-Primary/5 text-Primary text-xs font-semibold px-2 py-1 rounded-lg border border-Primary/10"
                          >
                            {val}
                            <X
                              className="size-3 cursor-pointer hover:text-red-500"
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
                      <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl z-20 py-2 max-h-[250px] overflow-y-auto">
                        {options.map(opt => {
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
          {errors.whatsIncluded && <span className="text-xs text-red-500">{errors.whatsIncluded.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step1About;
