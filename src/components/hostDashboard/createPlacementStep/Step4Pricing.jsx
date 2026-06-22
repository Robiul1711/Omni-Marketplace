import React from 'react';
import { Input } from '@/components/ui/input';
import { X } from 'lucide-react';

const PackageSection = ({ title, register, control, errors, prefix, Controller }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  const options = [
    'Prime Time Display',
    'Reporting Dashboard',
    'Priority Support',
    'Analytics Access'
  ];

  return (
    <div className="p-6 rounded-xl border border-gray-100 bg-white space-y-6">
      <h3 className="text-lg font-medium text-gray-900">{title}</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price ($)</label>
          <Input
            type="number"
            {...register(`${prefix}.price`, { required: 'Price is required' })}
            placeholder="0"
            className="h-12 focus-visible:ring-Primary"
          />
          {errors?.[prefix]?.price && <span className="text-xs text-red-500">{errors[prefix].price.message}</span>}
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Features</label>
          <Controller
            name={`${prefix}.features`}
            control={control}
            rules={{ required: 'At least one feature is required' }}
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
                    className="w-full min-h-[48px] bg-white border border-gray-200 rounded-xl px-4 py-2 flex items-center justify-between hover:border-gray-300 transition-colors text-left shadow-sm animate-in fade-in duration-200"
                  >
                    {selectedValues.length === 0 ? (
                      <span className="text-gray-400 text-sm">Select features...</span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {selectedValues.map(val => (
                          <span
                            key={val}
                            className="inline-flex items-center gap-1 bg-Primary/5 text-Primary text-xs font-semibold px-2 py-0.5 rounded-lg border border-Primary/10"
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
                      <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-150 rounded-xl shadow-xl z-20 py-2 max-h-[200px] overflow-y-auto">
                        {options.map(opt => {
                          const isSelected = selectedValues.includes(opt);
                          return (
                            <div
                              key={opt}
                              onClick={() => toggleOption(opt)}
                              className="px-4 py-2 hover:bg-gray-50 flex items-center justify-between cursor-pointer transition-colors"
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
          {errors?.[prefix]?.features && (
            <span className="text-xs text-red-500">{errors[prefix].features.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Step4Pricing = ({ register, errors, control, Controller }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Pricing Packages</h2>
      <div className="space-y-6">
        <PackageSection
          title="Basic Package"
          prefix="basicPackage"
          register={register}
          control={control}
          errors={errors}
          Controller={Controller}
        />
        <PackageSection
          title="Standard Package"
          prefix="standardPackage"
          register={register}
          control={control}
          errors={errors}
          Controller={Controller}
        />
        <PackageSection
          title="Premium Package"
          prefix="premiumPackage"
          register={register}
          control={control}
          errors={errors}
          Controller={Controller}
        />
      </div>
    </div>
  );
};

export default Step4Pricing;
