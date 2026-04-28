import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Plus, X } from 'lucide-react';

const PackageSection = ({ title, register, control, errors, prefix }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: `${prefix}.features`,
  });

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
            className="h-12"
          />
          {errors?.[prefix]?.price && <span className="text-xs text-red-500">{errors[prefix].price.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Features</label>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  <Input
                    {...register(`${prefix}.features.${index}.value`, { required: 'Feature is required' })}
                    placeholder="Feature description"
                    className="h-12 flex-1"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="size-12 flex items-center justify-center rounded-lg border border-gray-100 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
                    >
                      <X className="size-4" />
                    </button>
                  )}
                </div>
                {errors?.[prefix]?.features?.[index]?.value && (
                  <span className="text-xs text-red-500">{errors[prefix].features[index].value.message}</span>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className="flex items-center gap-1 text-sm font-medium text-Primary hover:opacity-80 transition-opacity mt-1"
          >
            <Plus className="size-4" />
            Add Feature
          </button>
        </div>
      </div>
    </div>
  );
};

const Step4Pricing = ({ register, errors, control }) => {
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
        />
        <PackageSection
          title="Standard Package"
          prefix="standardPackage"
          register={register}
          control={control}
          errors={errors}
        />
        <PackageSection
          title="Premium Package"
          prefix="premiumPackage"
          register={register}
          control={control}
          errors={errors}
        />
      </div>
    </div>
  );
};

export default Step4Pricing;
