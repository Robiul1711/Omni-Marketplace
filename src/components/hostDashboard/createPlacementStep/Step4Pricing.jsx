import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, X } from 'lucide-react';

const PackageCard = ({ index, register, control, errors, setValue, watch, Controller, onRemove, canRemove }) => {
  const [featureInput, setFeatureInput] = useState('');
  const features = watch(`packages.${index}.feature`) || [];
  const isRecommended = watch(`packages.${index}.is_recommended`) || false;

  const addFeature = () => {
    if (!featureInput.trim()) return;
    const currentFeatures = Array.isArray(features) ? features : [];
    setValue(`packages.${index}.feature`, [...currentFeatures, featureInput.trim()]);
    setFeatureInput('');
  };

  const removeFeature = (fIndex) => {
    const currentFeatures = Array.isArray(features) ? features : [];
    setValue(
      `packages.${index}.feature`,
      currentFeatures.filter((_, i) => i !== fIndex)
    );
  };

  return (
    <div className="p-6 rounded-2xl border border-gray-200 bg-white space-y-6 shadow-sm relative">
      <div className="flex justify-between items-center pb-2 border-b border-gray-100">
        <h3 className="text-lg font-bold text-gray-900">
          Package #{index + 1}
        </h3>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-red-500 hover:text-red-700 text-sm font-semibold flex items-center gap-1"
          >
            <Trash2 size={16} /> Remove Package
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Package Name */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Package Name</label>
          <Input
            {...register(`packages.${index}.name`, { required: 'Package name is required' })}
            placeholder="E.g., Basic Package, Premium Package"
            className="h-11 focus-visible:ring-Primary"
          />
          {errors.packages?.[index]?.name && (
            <span className="text-xs text-red-500">{errors.packages[index].name.message}</span>
          )}
        </div>

        {/* Package Price */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Price ($)</label>
          <Input
            type="number"
            step="0.01"
            min="0"
            {...register(`packages.${index}.price`, { required: 'Price is required', min: 0 })}
            placeholder="E.g., 150"
            className="h-11 focus-visible:ring-Primary"
          />
          {errors.packages?.[index]?.price && (
            <span className="text-xs text-red-500">{errors.packages[index].price.message}</span>
          )}
        </div>
      </div>

      {/* Recommended Toggle */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          id={`is_recommended_${index}`}
          {...register(`packages.${index}.is_recommended`)}
          className="size-4 text-Primary rounded border-gray-300 focus:ring-Primary"
        />
        <label htmlFor={`is_recommended_${index}`} className="text-sm font-medium text-gray-700 cursor-pointer select-none">
          Mark as Recommended Package
        </label>
      </div>

      {/* Package Features list */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">Package Features</label>
        
        {/* Input box to add feature */}
        <div className="flex gap-2">
          <Input
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                addFeature();
              }
            }}
            placeholder="E.g., 1 ad play per hour"
            className="h-11 bg-gray-50 focus-visible:ring-Primary flex-1"
          />
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-[#1a1a1a] text-white rounded-xl text-sm font-medium hover:bg-black transition-colors"
          >
            Add Feature
          </button>
        </div>

        {/* Feature badges list */}
        <div className="flex flex-wrap gap-2 pt-1">
          {Array.isArray(features) && features.map((feat, fIndex) => (
            <span
              key={fIndex}
              className="inline-flex items-center gap-1.5 bg-Primary/10 text-Primary text-xs font-semibold px-3 py-1.5 rounded-lg"
            >
              {feat}
              <X
                size={14}
                className="cursor-pointer hover:text-red-500 transition-colors"
                onClick={() => removeFeature(fIndex)}
              />
            </span>
          ))}
          {(!features || features.length === 0) && (
            <span className="text-xs text-gray-400 italic">No features added yet. Add features above.</span>
          )}
        </div>
      </div>
    </div>
  );
};

const Step4Pricing = ({ register, errors, control, Controller, watch, setValue }) => {
  const packages = watch('packages') || [];

  const addPackage = () => {
    setValue('packages', [
      ...packages,
      { name: '', price: '', is_recommended: false, feature: [] }
    ]);
  };

  const removePackage = (index) => {
    setValue(
      'packages',
      packages.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-[#1a1a1a]">Pricing Packages</h2>
          <p className="text-sm text-gray-500 mt-1">Configure pricing tiers and feature details for advertisers.</p>
        </div>
        <button
          type="button"
          onClick={addPackage}
          className="bg-Primary/10 text-Primary px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2 hover:bg-Primary/20 transition-colors"
        >
          <Plus size={16} /> Add Package Tier
        </button>
      </div>

      <div className="space-y-6">
        {packages.map((pkg, index) => (
          <PackageCard
            key={index}
            index={index}
            register={register}
            control={control}
            errors={errors}
            setValue={setValue}
            watch={watch}
            Controller={Controller}
            onRemove={() => removePackage(index)}
            canRemove={packages.length > 1}
          />
        ))}
      </div>
    </div>
  );
};

export default Step4Pricing;
