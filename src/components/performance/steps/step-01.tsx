'use client';

import type { PerformanceRegisterForm } from '@/apis/performance';
import { useFormContext, useFormState, useWatch } from 'react-hook-form';
import { FormInput } from '@/components/common/input';
import { formatPhoneNumber } from '@/utils';

function TeamNameCharCount() {
  const teamName = useWatch<PerformanceRegisterForm, 'teamName'>({ name: 'teamName' });

  return <>{teamName?.length ?? 0}</>;
}

function TeamNameField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'teamName' });

  return (
    <div className="max-w-146.5 space-y-2">
      <FormInput
        label="팀 이름"
        required
        placeholder="팀명 또는 활동명을 적어주세요"
        error={errors.teamName?.message}
        {...register('teamName')}
        showCount
        maxLength={20}
        currentCount={<TeamNameCharCount />}
      />
    </div>
  );
}

function ContactNumberField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'contactNumber' });
  const contactNumberProps = register('contactNumber');

  return (
    <div className="flex-1 space-y-2">
      <FormInput
        {...contactNumberProps}
        label="공연자 전화번호"
        required
        placeholder="전화번호를 적어주세요"
        error={errors.contactNumber?.message}
        inputMode="tel"
        onChange={(e) => {
          e.target.value = formatPhoneNumber(e.target.value);
          contactNumberProps.onChange(e);
        }}
      />
    </div>
  );
}

function EmailField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'email' });

  return (
    <div className="flex-1 space-y-2">
      <FormInput
        label="공연자 이메일"
        required
        placeholder="이메일을 적어주세요"
        error={errors.email?.message}
        {...register('email')}
      />
    </div>
  );
}

function InstagramField() {
  const { register } = useFormContext<PerformanceRegisterForm>();
  const { errors } = useFormState<PerformanceRegisterForm>({ name: 'instagramUrl' });

  return (
    <div className="w-[calc(50%-0.75rem)] space-y-2">
      <FormInput
        label="인스타그램"
        placeholder="인스타그램 URL을 입력해주세요"
        error={errors.instagramUrl?.message}
        {...register('instagramUrl')}
      />
    </div>
  );
}

export function Step01() {
  return (
    <div className="flex flex-col gap-6">
      <TeamNameField />
      <div className="flex w-full gap-6">
        <ContactNumberField />
        <EmailField />
      </div>
      <InstagramField />
    </div>
  );
}
