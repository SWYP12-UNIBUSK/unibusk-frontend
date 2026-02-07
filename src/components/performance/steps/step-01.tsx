'use client';

import type { PerformanceRegisterRequestDto } from '@/apis/performance';
import { useFormContext } from 'react-hook-form';
import { FormInput } from '@/components/common/input';

export function Step01() {
  const { register, watch, formState: { errors } } = useFormContext<PerformanceRegisterRequestDto>();
  const teamName = watch('teamName');

  return (
    <div className="flex flex-col gap-6">
      <div className="max-w-146.5 space-y-2">
        <FormInput
          label="팀 이름"
          required
          placeholder="팀명 또는 활동명을 적어주세요"
          error={errors.teamName?.message}
          {...register('teamName')}
          showCount
          maxLength={20}
          currentCount={teamName?.length || 0}
        />
      </div>
      <div className="flex w-full gap-6">
        <div className="flex-1 space-y-2">
          <FormInput
            label="공연자 전화번호"
            required
            placeholder="전화번호를 적어주세요"
            error={errors.contactNumber?.message}
            {...register('contactNumber')}
          />
        </div>
        <div className="flex-1 space-y-2">
          <FormInput
            label="공연자 이메일"
            required
            placeholder="이메일을 적어주세요"
            error={errors.email?.message}
            {...register('email')}
          />
        </div>
      </div>
      <div className="w-[calc(50%-0.75rem)] space-y-2">
        <FormInput
          label="인스타그램"
          placeholder="인스타그램 URL을 입력해주세요"
          error={errors.instagramUrl?.message}
          {...register('instagramUrl')}
        />
      </div>
    </div>
  );
}
