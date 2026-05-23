'use client';

import type { PerformanceRegisterForm } from '@/apis/performance';
import { Controller, useFormContext, useFormState, useWatch } from 'react-hook-form';
import { ImageUpload } from '@/components/common/image-upload/image-upload';
import { Label } from '@/components/common/input';
import { cn } from '@/utils';

function PosterImageField() {
  const { control } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'posterImage' });

  return (
    <div className="w-57.5 space-y-2">
      <Label>공연 포스터</Label>
      <Controller
        control={control}
        name="posterImage"
        render={({ field: { onChange, value } }) => (
          <ImageUpload
            onFileChange={onChange}
            defaultImageUrl={value instanceof File ? URL.createObjectURL(value) : undefined}
            className={cn('h-70 w-55', errors.posterImage && `
              rounded-xl border border-error
            `)}
          />
        )}
      />
      <div className="typo-caption-r-2 whitespace-pre-wrap text-gray-500">
        <span className="block">이미지 권장 사이즈는 1080 × 1440 px입니다.</span>
        <span className="block">또한 형식은 JPG, JPEG, PNG</span>
        <span className="block">용량은 10MB 미만의 이미지만 가능합니다.</span>
      </div>
    </div>
  );
}

function PerformanceDetailPlaceholder() {
  const performanceDetail = useWatch<PerformanceRegisterForm, 'performanceDetail'>({ name: 'performanceDetail' });
  if (performanceDetail)
    return null;
  return (
    <div className={`
      pointer-events-none absolute inset-0 flex items-center justify-center
    `}
    >
      <span className="typo-body-m-3 text-gray-550">공연에 대한 상세 내용을 작성해 주세요</span>
    </div>
  );
}

function PerformanceDetailField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'performanceDetail' });

  return (
    <div className="flex flex-1 flex-col space-y-2">
      <Label required error={errors.performanceDetail?.message}>공연 상세 내용</Label>
      <div className="relative flex-1">
        <textarea
          className={cn(
            `
              h-full w-full resize-none rounded-lg border-none bg-gray-100 p-6
              typo-body-m-3 text-black
              focus:border-gray-700 focus:ring-1 focus:outline-none
            `,
            errors.performanceDetail && `
              ring-1 ring-error
              focus:ring-error
            `,
          )}
          {...register('performanceDetail')}
        />
        <PerformanceDetailPlaceholder />
      </div>
    </div>
  );
}

export function Step03() {
  return (
    <div className="flex gap-3.75">
      <PosterImageField />
      <PerformanceDetailField />
    </div>
  );
}
