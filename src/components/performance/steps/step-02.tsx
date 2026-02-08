'use client';

import type { Control } from 'react-hook-form';
import type { PerformanceRegisterForm } from '@/apis/performance';
import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@/components/common/date-picker/date-picker';
import { ErrorMessage, FormInput, Input, Label } from '@/components/common/input';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/common/select';
import { SearchModal } from '@/components/performance/search-modal';
import { TIME_OPTIONS } from '@/constants/performance';
import { cn } from '@/utils';

interface TimeSelectProps {
  control: Control<PerformanceRegisterForm>;
  name: 'startTime' | 'endTime';
  label: string;
  options: string[];
  error?: boolean;
}

export function Step02() {
  const { control, setValue, register, formState: { errors } } = useFormContext<PerformanceRegisterForm>();

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center gap-6">
        <div className="flex-1">
          <FormInput
            label="공연 이름"
            required
            placeholder="공연 이름을 적어주세요"
            error={errors.performanceName?.message}
            {...register('performanceName')}
          />
        </div>

        <div className="flex-1">
          <div className="mb-2.5 flex items-center justify-between pl-2.5">
            <div className="flex items-center gap-1.25">
              <label className="typo-body-sb-2 text-black">
                <span className="pr-0.5 text-error">*</span>
                공연 장소
              </label>
              <ErrorMessage message={errors.performanceLocation?.message} />
            </div>
            <SearchModal
              onSelect={loc => setValue('performanceLocation', loc, { shouldValidate: true })}
            />
          </div>
          <Controller
            control={control}
            name="performanceLocation"
            render={({ field }) => (
              <Input
                placeholder="공연 장소를 등록해 주세요"
                readOnly
                value={field.value?.name || ''}
                error={errors.performanceLocation?.message}
              />
            )}
          />
        </div>
      </div>

      <div className="flex w-full gap-6">
        <div className="flex-1">
          <Controller
            control={control}
            name="performanceDate"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <DatePicker
                label="공연 날짜"
                required
                placeholder="날짜 선택"
                value={value}
                onChange={onChange}
                error={!!error}
                errorMessage={error?.message}
              />
            )}
          />
        </div>

        <div className="flex-1">
          <FormInput
            label="공연 한 줄 설명"
            required
            placeholder="간단한 공연 설명을 적어주세요"
            error={errors.performanceDescription?.message}
            {...register('performanceDescription')}
          />
        </div>
      </div>

      <div className="w-full space-y-4">
        <Label required error={errors.startTime?.message || errors.endTime?.message}>
          공연 시간
        </Label>
        <div className="flex items-center gap-3">
          <TimeSelect
            control={control}
            name="startTime"
            label="시작"
            options={TIME_OPTIONS}
            error={!!errors.startTime}
          />
          <TimeSelect
            control={control}
            name="endTime"
            label="종료"
            options={TIME_OPTIONS}
            error={!!errors.endTime}
          />
        </div>
      </div>
    </div>
  );
}

function TimeSelect({ control, name, label, options, error }: TimeSelectProps) {
  return (
    <div className="flex items-center">
      <label
        htmlFor="select-time"
        className="p-5 typo-body-m-3 text-gray-800"
      >
        {label}
      </label>
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <Select value={value} onValueChange={onChange} variant="time">
            <SelectTrigger
              className={cn('w-27.5 cursor-pointer', error && 'border-error')}
              showIcon={false}
            >
              <SelectValue placeholder="선택" />
            </SelectTrigger>
            <SelectContent
              showIcon={false}
              className="max-h-50"
              position="popper"
              align="center"
            >
              <SelectGroup>
                {options.map(time => (
                  <SelectItem showIcon={false} key={time} value={time}>
                    {time}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        )}
      />
    </div>
  );
}
