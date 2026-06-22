import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Step3Audience = ({ register, errors, control, Controller }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Audience Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Estimated Monthly FootTraffic</label>
          <Input
            {...register('footTraffic', { required: 'Foot traffic is required' })}
            placeholder="50K Audience"
            className="h-12 bg-white focus-visible:ring-Primary"
          />
          {errors.footTraffic && <span className="text-xs text-red-500">{errors.footTraffic.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Audience Demographics</label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Male %"
                {...register('malePercentage', { 
                  required: 'Required',
                  min: { value: 0, message: 'Min 0%' },
                  max: { value: 100, message: 'Max 100%' }
                })}
                className="h-12 bg-white focus-visible:ring-Primary"
              />
              <span className="text-xs font-semibold text-gray-500">% Male</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <Input
                type="number"
                min="0"
                max="100"
                placeholder="Female %"
                {...register('femalePercentage', { 
                  required: 'Required',
                  min: { value: 0, message: 'Min 0%' },
                  max: { value: 100, message: 'Max 100%' }
                })}
                className="h-12 bg-white focus-visible:ring-Primary"
              />
              <span className="text-xs font-semibold text-gray-500">% Female</span>
            </div>
          </div>
          {(errors.malePercentage || errors.femalePercentage) && (
            <span className="text-xs text-red-500">
              {errors.malePercentage?.message || errors.femalePercentage?.message}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Specifications</h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-gray-700">Format</label>
            <Controller
              name="format"
              control={control}
              rules={{ required: 'Format is required' }}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                    <SelectValue placeholder="Select advertisement format" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    <SelectItem value="Digital Display">Digital Display</SelectItem>
                    <SelectItem value="Video Advertisement">Video Advertisement</SelectItem>
                    <SelectItem value="Banner Advertisement">Banner Advertisement</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.format && <span className="text-xs text-red-500">{errors.format.message}</span>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Ad Length</label>
              <Controller
                name="adLength"
                control={control}
                rules={{ required: 'Ad length is required' }}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                      <SelectValue placeholder="15 seconds" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectItem value="15">15 sec</SelectItem>
                      <SelectItem value="30">30 sec</SelectItem>
                      <SelectItem value="45">45 sec</SelectItem>
                      <SelectItem value="60">60 sec</SelectItem>
                      <SelectItem value="90">90 sec</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.adLength && <span className="text-xs text-red-500">{errors.adLength.message}</span>}
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-700">Campaign Launch Time</label>
              <Input
                {...register('launchTime', { required: 'Launch time is required' })}
                placeholder="E.g., Within 24 hours after host approval"
                className="h-12 bg-white border-gray-200 focus-visible:ring-Primary"
              />
              {errors.launchTime && <span className="text-xs text-red-500">{errors.launchTime.message}</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Audience;
