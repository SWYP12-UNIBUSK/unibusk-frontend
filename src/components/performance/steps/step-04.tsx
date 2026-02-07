'use client';

import type { PerformanceRegisterRequestDto } from '@/apis/performance';
import * as CheckboxPrimitive from '@radix-ui/react-checkbox';
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
            <div className="flex flex-col gap-7.5">
              {CHECKLIST_ITEMS.map((item) => {
                const isChecked = Array.isArray(field.value) && field.value.includes(item.id);

                return (
                  <div key={item.id} className="flex items-center gap-2.5">
                    <CheckboxPrimitive.Root
                      id={item.id}
                      checked={isChecked}
                      onCheckedChange={(checked) => {
                        const currentValue = Array.isArray(field.value) ? field.value : [];
                        if (checked) {
                          field.onChange([...currentValue, item.id]);
                        }
                        else {
                          field.onChange(currentValue.filter(id => id !== item.id));
                        }
                      }}
                      className={`
                        flex h-8 w-8 cursor-pointer items-center justify-center
                        rounded-full outline-none
                        focus-visible:ring-2 focus-visible:ring-primary
                      `}
                    >
                      <Image
                        src={
                          isChecked
                            ? '/icons/checkCircle-selected-orange.svg'
                            : '/icons/checkCircle-gray.svg'
                        }
                        width={32}
                        height={32}
                        alt="check"
                      />
                    </CheckboxPrimitive.Root>

                    <label
                      htmlFor={item.id}
                      className={cn(
                        'cursor-pointer typo-body-m-1 transition-colors',
                        isChecked
                          ? 'text-gray-700'
                          : 'text-gray-550',
                      )}
                    >
                      {item.text}
                    </label>
                  </div>
                );
              })}
            </div>
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
