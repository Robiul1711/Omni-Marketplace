import React from 'react';
import { Input } from '@/components/ui/input';
import { useWatch } from 'react-hook-form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Step2Campaign = ({ register, errors, control, Controller }) => {
  const slotsValue = useWatch({ control, name: 'slotsPerMonth' });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Campaign Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Campaign Duration</label>
          <Input
            {...register('campaignDuration', { required: 'Campaign duration is required' })}
            placeholder="30 Days Continuous Advertising"
            className="h-12 bg-white focus-visible:ring-Primary"
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
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Ads run only during host operating hours" />
                </SelectTrigger>
                <SelectContent className="bg-white">
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
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Screen Location Headline">Screen Location Headline</SelectItem>
                  <SelectItem value="Advertising Highlight">Advertising Highlight</SelectItem>
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
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select channel" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="Indoor Screen">Indoor Screen</SelectItem>
                  <SelectItem value="Outdoor Screen">Outdoor Screen</SelectItem>
                  <SelectItem value="LED Billboard">LED Billboard</SelectItem>
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
                <SelectTrigger className="w-full h-12 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="1" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10+">10+</SelectItem>
                  <SelectItem value="Custom">Custom (Write in)</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.slotsPerMonth && <span className="text-xs text-red-500">{errors.slotsPerMonth.message}</span>}
          
          {slotsValue === 'Custom' && (
            <div className="flex flex-col gap-2 mt-4 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="text-sm font-medium text-gray-700">Specify Custom Slots</label>
              <Input
                type="number"
                min="1"
                {...register('customSlots', { required: 'Please specify slot count' })}
                placeholder="Enter number of slots"
                className="h-12 bg-white focus-visible:ring-Primary"
              />
              {errors.customSlots && <span className="text-xs text-red-500">{errors.customSlots.message}</span>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Campaign;
