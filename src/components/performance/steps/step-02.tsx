'use client';

import type { Control } from 'react-hook-form';
import type { PerformanceRegisterForm } from '@/apis/performance';
import { Controller, useFormContext, useFormState } from 'react-hook-form';
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
}

function PerformanceNameField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'performanceName' });

  return (
    <FormInput
      label="공연 이름"
      required
      placeholder="공연 이름을 적어주세요"
      error={errors.performanceName?.message}
      {...register('performanceName')}
    />
  );
}

function PerformanceLocationField() {
  const { control, setValue } = useFormContext<PerformanceRegisterForm>();

  return (
    <Controller
      control={control}
      name="performanceLocation"
      render={({ field, fieldState: { error } }) => (
        <div>
          <div className="mb-2.5 flex items-center justify-between pl-2.5">
            <div className="flex items-center gap-1.25">
              <label className="typo-body-sb-2 text-black">
                <span className="pr-0.5 text-error">*</span>
                공연 장소
              </label>
              <ErrorMessage message={error?.message} />
            </div>
            <SearchModal
              onSelect={loc => setValue('performanceLocation', loc, { shouldValidate: true })}
            />
          </div>
          <Input
            placeholder="공연 장소를 등록해 주세요"
            readOnly
            value={field.value?.name || ''}
            error={error?.message}
          />
        </div>
      )}
    />
  );
}

function PerformanceDateField() {
  const { control } = useFormContext<PerformanceRegisterForm>();

  return (
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
  );
}

function PerformanceDescriptionField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'performanceDescription' });

  return (
    <FormInput
      label="공연 한 줄 설명"
      required
      placeholder="간단한 공연 설명을 적어주세요"
      error={errors.performanceDescription?.message}
      {...register('performanceDescription')}
    />
  );
}

function PerformanceTimeField() {
  const { control } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: ['startTime', 'endTime'] });

  return (
    <div className="w-full space-y-4">
      <Label required error={errors.startTime?.message || errors.endTime?.message}>
        공연 시간
      </Label>
      <div className="flex items-center gap-3">
        <TimeSelect control={control} name="startTime" label="시작" options={TIME_OPTIONS} />
        <TimeSelect control={control} name="endTime" label="종료" options={TIME_OPTIONS} />
      </div>
    </div>
  );
}

function TimeSelect({ control, name, label, options }: TimeSelectProps) {
  const triggerId = `time-select-${name}`;

  return (
    <div className="flex items-center">
      <label htmlFor={triggerId} className="p-5 typo-body-m-3 text-gray-800">
        {label}
      </label>

      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Select value={value} onValueChange={onChange} variant="time">
            <SelectTrigger
              id={triggerId}
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

export function Step02() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-full items-center gap-6">
        <div className="flex-1">
          <PerformanceNameField />
        </div>
        <div className="flex-1">
          <PerformanceLocationField />
        </div>
      </div>

      <div className="flex w-full gap-6">
        <div className="flex-1">
          <PerformanceDateField />
        </div>
        <div className="flex-1">
          <PerformanceDescriptionField />
        </div>
      </div>

      <PerformanceTimeField />
    </div>
  );
}
