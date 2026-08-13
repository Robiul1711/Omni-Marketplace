import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Step3Audience = ({ register, errors, control, Controller, options = {} }) => {
  const formats = options.formats || [
    { id: 1, name: 'Audio' },
    { id: 2, name: 'Video (No Sound)' },
    { id: 3, name: 'Video (With Sound)' },
    { id: 4, name: 'Static Image / Slide' },
  ];

  const adLengths = options.ad_lengths || [
    { id: 5, name: '15 seconds' },
    { id: 6, name: '30 seconds' },
    { id: 7, name: '60 seconds' },
    { id: 8, name: 'Custom Duration' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Audience Overview & Specifications</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Foot Traffic */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Estimated Monthly Foot Traffic</label>
          <Input
            {...register('audience_overview.monthly_foottraffic', { required: 'Foot traffic is required' })}
            placeholder="E.g., 100K traffic"
            className="h-12 bg-white focus-visible:ring-Primary"
          />
          {errors.audience_overview?.monthly_foottraffic && (
            <span className="text-xs text-red-500">{errors.audience_overview.monthly_foottraffic.message}</span>
          )}
        </div>

        {/* Audience Demographics */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Audience Demographics (%)</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="60.50"
                {...register('audience_overview.male_aud', { required: 'Male % is required' })}
                className="h-12 bg-white focus-visible:ring-Primary"
              />
              <span className="text-xs font-semibold text-gray-500">% Male</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                step="0.01"
                min="0"
                max="100"
                placeholder="39.50"
                {...register('audience_overview.female_aud', { required: 'Female % is required' })}
                className="h-12 bg-white focus-visible:ring-Primary"
              />
              <span className="text-xs font-semibold text-gray-500">% Female</span>
            </div>
          </div>
          {(errors.audience_overview?.male_aud || errors.audience_overview?.female_aud) && (
            <span className="text-xs text-red-500">
              {errors.audience_overview?.male_aud?.message || errors.audience_overview?.female_aud?.message}
            </span>
          )}
        </div>

        {/* Format */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Advertisement Format</label>
          <Controller
            name="audience_overview.format"
            control={control}
            rules={{ required: 'Format is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select advertisement format" />
                </SelectTrigger>
                <SelectContent className="bg-white z-30">
                  {formats.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.audience_overview?.format && (
            <span className="text-xs text-red-500">{errors.audience_overview.format.message}</span>
          )}
        </div>

        {/* Ad Length */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Ad Duration / Length</label>
          <Controller
            name="audience_overview.ad_length"
            control={control}
            rules={{ required: 'Ad length is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select Ad Length" />
                </SelectTrigger>
                <SelectContent className="bg-white z-30">
                  {adLengths.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.audience_overview?.ad_length && (
            <span className="text-xs text-red-500">{errors.audience_overview.ad_length.message}</span>
          )}
        </div>

        {/* Launch Time */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Campaign Launch Time</label>
          <Input
            {...register('audience_overview.launch_time', { required: 'Launch time is required' })}
            placeholder="E.g., Launch in 24 hours"
            className="h-12 bg-white border-gray-200 focus-visible:ring-Primary"
          />
          {errors.audience_overview?.launch_time && (
            <span className="text-xs text-red-500">{errors.audience_overview.launch_time.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step3Audience;
