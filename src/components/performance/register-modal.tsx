'use client';

import type { PerformanceRegisterRequestDto } from '@/apis/performance';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { PerformanceRegisterRequestDtoSchema } from '@/apis/performance';
import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/common/dialog';
import { STEP_FIELDS, STEP_HEADER_INFO } from '@/constants/performance';
import { useRegisterStore } from '@/stores/performance';
import { cn } from '@/utils';
import { Step01 } from './steps/step-01';
import { Step02 } from './steps/step-02';
import { Step03 } from './steps/step-03';
import { Step04 } from './steps/step-04';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface StepCommonProps {
  step: number;
}

interface StepFooterProps extends StepCommonProps {
  onPrev: () => void;
  onNext: () => void;
}

export function RegisterModal({ isOpen, onClose }: RegistrationModalProps) {
  const { step, setStep, formData, setFormData, reset: resetStore } = useRegisterStore();

  const methods = useForm<PerformanceRegisterRequestDto>({
    resolver: zodResolver(PerformanceRegisterRequestDtoSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: formData,
  });

  const { trigger, handleSubmit, getValues, reset } = methods;

  const nextStep = async () => {
    const fields = STEP_FIELDS[step as 1 | 2 | 3 | 4] || [];
    const isValid = await trigger(fields);
    if (isValid) {
      setFormData(getValues());
      setStep(Math.min(step + 1, 4));
    }
  };

  const onSubmit = (data: PerformanceRegisterRequestDto) => {
    // eslint-disable-next-line no-console
    console.log('Form Submitted:', data);
    setFormData(data);

    reset();
    resetStore();
    onClose();
  };

  const prevStep = () => {
    setFormData(getValues());
    setStep(Math.max(step - 1, 1));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className={`
          h-175 w-300 max-w-none rounded-lg border-none p-[80px_122px] shadow-xl
        `}
        showCloseButton={false}
      >
        <button
          type="button"
          onClick={onClose}
          className={`
            absolute top-8 right-8 text-gray-400
            hover:text-black
          `}
        >
          <X size={28} />
        </button>

        <FormProvider {...methods}>
          <section className="flex h-full flex-col">
            <StepHeader step={step} />
            <StepContent step={step} />
            <StepFooter
              step={step}
              onPrev={prevStep}
              onNext={step === 4 ? handleSubmit(onSubmit) : nextStep}
            />
          </section>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

function StepHeader({ step }: StepCommonProps) {
  const { title, description } = STEP_HEADER_INFO[step as keyof typeof STEP_HEADER_INFO] || { title: '', description: '' };

  return (
    <DialogHeader>
      <div className="flex items-start gap-7.5">
        <span className="typo-title-sb-4 text-primary">
          {`STEP 0${step}`}
        </span>
        <div className="space-y-1.25">
          <DialogTitle className="typo-title-sb-4 text-black">
            {title}
          </DialogTitle>
          <p className="typo-body-m-3 text-gray-550">
            {description}
          </p>
        </div>
      </div>
    </DialogHeader>
  );
}

function StepContent({ step }: StepCommonProps) {
  return (
    <div className="mt-12.5 h-80">
      {step === 1 && <Step01 />}
      {step === 2 && <Step02 />}
      {step === 3 && <Step03 />}
      {step === 4 && <Step04 />}
    </div>
  );
}

function StepFooter({ step, onPrev, onNext }: StepFooterProps) {
  return (
    <DialogFooter className={cn(
      `absolute bottom-13.75 left-0`,
      `flex w-full items-center justify-end gap-1.25`,

    )}
    >
      {/* 이전 버튼 (Step 1에서는 보이지 않음) */}
      <div>
        {step > 1 && (
          <Button onClick={onPrev} theme="gray">
            이전
          </Button>
        )}
      </div>
      {/* 페이지네이션  */}
      <div className="absolute left-1/2 flex -translate-x-1/2 gap-2">
        {[1, 2, 3, 4].map(i => (
          <div
            key={i}
            className={cn(
              'h-2 w-2 rounded-full',
              step === i ? 'bg-primary' : 'bg-gray-300',
            )}
          />
        ))}
      </div>
      {/* 다음/등록 버튼 */}
      <div className="pr-12.75">
        <Button onClick={onNext}>
          {step === 4 ? '등록하기' : '다음'}
        </Button>
      </div>
    </DialogFooter>
  );
}
