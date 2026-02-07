'use client';

import type { PerformanceRegisterRequestDto } from '@/apis/performance';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import Image from 'next/image';
import { Controller, useFormContext } from 'react-hook-form';
import { CHECKLIST_ITEMS } from '@/constants/performance';
import { cn } from '@/utils';

export function Step04() {
  const { control, formState: { errors } } = useFormContext<PerformanceRegisterRequestDto>();

  return (
    <>
      <div className={`
        flex h-full flex-col items-center justify-center rounded-lg bg-gray-100
        py-12.5
      `}
      >
        <Controller
          control={control}
          name="checklist"
          render={({ field }) => (
            <RadioGroupPrimitive.RadioGroup
              value={field.value}
              onValueChange={field.onChange}
              className="flex flex-col gap-7.5"
            >
              {CHECKLIST_ITEMS.map(item => (
                <div key={item.id} className="flex items-center gap-2.5">
                  <RadioGroupPrimitive.Item
                    value={item.id}
                    id={item.id}
                    className={`
                      flex h-8 w-8 items-center justify-center rounded-full
                      outline-none
                      focus-visible:ring-2 focus-visible:ring-primary
                    `}
                  >
                    <Image
                      src={
                        field.value === item.id
                          ? '/icons/checkCircle-selected-orange.svg'
                          : '/icons/checkCircle-gray.svg'
                      }
                      width={32}
                      height={32}
                      alt="check"
                    />
                  </RadioGroupPrimitive.Item>

                  <label
                    htmlFor={item.id}
                    className={cn(
                      'cursor-pointer typo-body-m-1 transition-colors',
                      field.value === item.id
                        ? 'text-gray-700'
                        : `text-gray-550`,
                    )}
                  >
                    {item.text}
                  </label>
                </div>
              ))}
            </RadioGroupPrimitive.RadioGroup>
          )}
        />
      </div>

      {errors.checklist && (
        <p className="pt-5.25 text-center typo-caption-r-1 text-error">
          {errors.checklist.message}
        </p>
      )}
    </>
  );
}
