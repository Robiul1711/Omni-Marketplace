import React from 'react';
import { useFieldArray } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Plus, X } from 'lucide-react';

const Step1About = ({ register, errors, control, Controller }) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'whatsIncluded',
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">About This Placement</h2>
        
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Placement Title</label>
          <Controller
            name="title"
            control={control}
            rules={{ required: 'Title is required' }}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger className="w-full h-[52px] bg-white border-gray-200 text-gray-500">
                  <SelectValue placeholder="select your title" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title1">Title 1</SelectItem>
                  <SelectItem value="title2">Title 2</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.title && <span className="text-xs text-red-500">{errors.title.message}</span>}
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Placement Description</label>
          <Textarea
            {...register('description', { required: 'Description is required' })}
            placeholder="Describe your placement offering..."
            className="min-h-[140px] bg-white border-gray-200"
          />
          {errors.description && <span className="text-xs text-red-500">{errors.description.message}</span>}
        </div>
      </div>

      <div className="space-y-6 pt-2">
        <h2 className="text-xl font-semibold text-[#1a1a1a]">What's Included</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-500">Included</label>
          <div className="space-y-4">
            {fields.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <Input
                    {...register(`whatsIncluded.${index}.value`, { required: 'This field is required' })}
                    placeholder="E.g., 30-second mid-roll placement"
                    className="h-[52px] bg-white border-gray-200 flex-1"
                  />
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="size-[52px] flex items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition-all shadow-sm"
                    >
                      <X className="size-5" />
                    </button>
                  )}
                </div>
                {errors.whatsIncluded?.[index]?.value && (
                  <span className="text-xs text-red-500">{errors.whatsIncluded[index].value.message}</span>
                )}
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={() => append({ value: '' })}
            className="flex items-center gap-1 text-sm font-medium text-Primary hover:opacity-80 transition-opacity mt-2"
          >
            <Plus className="size-4" />
            Add Item
          </button>
        </div>
      </div>
    </div>
  );
};

export default Step1About;
