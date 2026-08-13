import React from 'react';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const Step2Campaign = ({ register, errors, control, Controller, options = {} }) => {
  const promotionTypes = options.promotion_types || [
    { id: 1, name: 'Product Promotion' },
    { id: 2, name: 'Event Promotion' },
    { id: 3, name: 'Brand Awareness' },
  ];

  const channelTypes = options.channel_types || [
    { id: 4, name: 'In-Store Audio Network' },
    { id: 5, name: 'Digital Billboard' },
    { id: 6, name: 'Interactive Kiosk' },
  ];

  const displayTimes = options.display_times || [
    { id: 9, name: 'Ads run only during host operating hours' },
    { id: 10, name: '24/7 Continuous Display' },
    { id: 11, name: 'Peak Traffic Hours Only' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pt-8 border-t border-gray-100">
      <h2 className="text-xl font-semibold text-[#1a1a1a]">Campaign & Schedule Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Campaign Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Campaign Duration (Top Level)</label>
          <Input
            {...register('campaign_duration', { required: 'Campaign duration is required' })}
            placeholder="E.g., 30 days"
            className="h-11 bg-white focus-visible:ring-Primary"
          />
          {errors.campaign_duration && <span className="text-xs text-red-500">{errors.campaign_duration.message}</span>}
        </div>

        {/* Campaign Info Duration */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Campaign Info Duration</label>
          <Input
            {...register('campaign_info.duration', { required: 'Info duration is required' })}
            placeholder="E.g., 30 Days continuous"
            className="h-11 bg-white focus-visible:ring-Primary"
          />
          {errors.campaign_info?.duration && (
            <span className="text-xs text-red-500">{errors.campaign_info.duration.message}</span>
          )}
        </div>

        {/* Start Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Start Date</label>
          <Input
            type="date"
            {...register('start_date', { required: 'Start date is required' })}
            className="h-11 bg-white focus-visible:ring-Primary"
          />
          {errors.start_date && <span className="text-xs text-red-500">{errors.start_date.message}</span>}
        </div>

        {/* End Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">End Date</label>
          <Input
            type="date"
            {...register('end_date', { required: 'End date is required' })}
            className="h-11 bg-white focus-visible:ring-Primary"
          />
          {errors.end_date && <span className="text-xs text-red-500">{errors.end_date.message}</span>}
        </div>

        {/* Next Campaign Start Date */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Next Campaign Start Date (Optional)</label>
          <Input
            type="date"
            {...register('next_campaign_start_date')}
            className="h-11 bg-white focus-visible:ring-Primary"
          />
        </div>

        {/* Available Slots */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Available Slots Count</label>
          <Input
            type="number"
            min="1"
            {...register('campaign_info.slot', { required: 'Slot count is required', min: 1 })}
            placeholder="E.g., 10"
            className="h-11 bg-white focus-visible:ring-Primary"
          />
          {errors.campaign_info?.slot && (
            <span className="text-xs text-red-500">{errors.campaign_info.slot.message}</span>
          )}
        </div>

        {/* Promotion Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Promotion Type</label>
          <Controller
            name="campaign_info.prom_id"
            control={control}
            rules={{ required: 'Promotion type is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                <SelectTrigger className="w-full h-11 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select Promotion Type" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {promotionTypes.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.campaign_info?.prom_id && (
            <span className="text-xs text-red-500">{errors.campaign_info.prom_id.message}</span>
          )}
        </div>

        {/* Channel Type */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">Channel Type</label>
          <Controller
            name="campaign_info.channel_id"
            control={control}
            rules={{ required: 'Channel type is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                <SelectTrigger className="w-full h-11 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select Channel Type" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {channelTypes.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.campaign_info?.channel_id && (
            <span className="text-xs text-red-500">{errors.campaign_info.channel_id.message}</span>
          )}
        </div>

        {/* Display Time */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <label className="text-sm font-medium text-gray-700">Display Time Schedule</label>
          <Controller
            name="campaign_info.display_time"
            control={control}
            rules={{ required: 'Display time is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value ? String(field.value) : ''}>
                <SelectTrigger className="w-full h-11 bg-white text-left focus:ring-Primary">
                  <SelectValue placeholder="Select Display Time Schedule" />
                </SelectTrigger>
                <SelectContent className="bg-white z-50">
                  {displayTimes.map((item) => (
                    <SelectItem key={item.id} value={String(item.id)}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.campaign_info?.display_time && (
            <span className="text-xs text-red-500">{errors.campaign_info.display_time.message}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Campaign;
