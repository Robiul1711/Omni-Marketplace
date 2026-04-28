import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Step2Campaign = ({ register, errors, control, Controller }) => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Campaign Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Campaign Duration</label>
          <Input
            {...register('campaignDuration', { required: 'Campaign duration is required' })}
            placeholder="30 Days Continuous Advertising"
            className="h-12 bg-white"
          />
          {errors.campaignDuration && <span className="text-xs text-red-500">{errors.campaignDuration.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Display Time</label>
          <Controller
            name="displayTime"
            control={control}
            rules={{ required: 'Display time is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 bg-white text-left">
                  <SelectValue placeholder="Ads run only during host operating hours" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="operating_hours">Ads run only during host operating hours</SelectItem>
                  <SelectItem value="24_7">24/7 Display</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.displayTime && <span className="text-xs text-red-500">{errors.displayTime.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Promotion Type</label>
          <Controller
            name="promotionType"
            control={control}
            rules={{ required: 'Promotion type is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type1">Type 1</SelectItem>
                  <SelectItem value="type2">Type 2</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.promotionType && <span className="text-xs text-red-500">{errors.promotionType.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Channel Type</label>
          <Controller
            name="channelType"
            control={control}
            rules={{ required: 'Channel type is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="channel1">Channel 1</SelectItem>
                  <SelectItem value="channel2">Channel 2</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.channelType && <span className="text-xs text-red-500">{errors.channelType.message}</span>}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">Monthly Advertising Slots</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Available Campaign Slots Per Month</label>
          <Controller
            name="slotsPerMonth"
            control={control}
            rules={{ required: 'Slots per month is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-12 bg-white">
                  <SelectValue placeholder="1 (Default)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 (Default)</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.slotsPerMonth && <span className="text-xs text-red-500">{errors.slotsPerMonth.message}</span>}
        </div>
      </div>
    </div>
  );
};

export default Step2Campaign;
