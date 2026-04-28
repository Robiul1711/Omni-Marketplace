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
            className="h-12 bg-white"
          />
          {errors.footTraffic && <span className="text-xs text-red-500">{errors.footTraffic.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Audience Demographics</label>
          <div className="flex items-center gap-2 h-12 bg-white border border-input rounded-md px-3">
             <Controller
                name="malePercentage"
                control={control}
                defaultValue="78"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="border-none shadow-none focus-visible:ring-0 w-24 p-0 h-auto">
                      <SelectValue placeholder="78% male" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="78">78% male</SelectItem>
                      <SelectItem value="50">50% male</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="w-px h-6 bg-gray-200 mx-2" />
              <Controller
                name="femalePercentage"
                control={control}
                defaultValue="22"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger className="border-none shadow-none focus-visible:ring-0 w-28 p-0 h-auto">
                      <SelectValue placeholder="22% female" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="22">22% female</SelectItem>
                      <SelectItem value="50">50% female</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
          </div>
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
                  <SelectTrigger className="w-full h-12 bg-white">
                    <SelectValue placeholder="Audio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
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
                    <SelectTrigger className="w-full h-12 bg-white">
                      <SelectValue placeholder="60 seconds" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 seconds</SelectItem>
                      <SelectItem value="60">60 seconds</SelectItem>
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
                className="h-12 bg-white border-gray-200"
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
