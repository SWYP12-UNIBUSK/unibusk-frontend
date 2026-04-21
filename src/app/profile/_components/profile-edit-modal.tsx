'use client';

import type { UpdateMemberNameRequestDto } from '@/apis/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateMemberNameRequestDtoSchema } from '@/apis/user/user.schema';
import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/common/dialog';
import { FormInput } from '@/components/common/input';
import { useUpdateMemberName } from '@/hooks/member/use-update-member-name';

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
}

export function ProfileEditModal({ open, onOpenChange, currentName }: ProfileEditModalProps) {
  const { mutate: updateName, isPending } = useUpdateMemberName();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UpdateMemberNameRequestDto>({
    resolver: zodResolver(UpdateMemberNameRequestDtoSchema),
    defaultValues: { name: currentName },
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
  });

  // 모달이 열릴 때마다 현재 닉네임으로 초기화
  useEffect(() => {
    if (open)
      reset({ name: currentName });
  }, [open, currentName, reset]);

  const nameValue = watch('name') ?? '';

  const onSubmit = (data: UpdateMemberNameRequestDto) => {
    updateName(data, { onSuccess: () => onOpenChange(false) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-143.75 gap-0 px-28.5 py-16.25"
      >
        <DialogTitle className="typo-body-sb-1 text-black">닉네임 변경</DialogTitle>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-12.5 flex flex-col gap-16.75"
        >
          <FormInput
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            showCount
            maxLength={15}
            currentCount={nameValue.length}
            error={errors.name?.message}
            {...register('name')}
          />
          <div className="flex justify-center gap-2.5">
            <Button
              type="button"
              theme="gray"
              appearance="filled"
              size="md"
              onClick={() => onOpenChange(false)}
            >
              취소
            </Button>
            <Button
              type="submit"
              theme="orange"
              appearance="filled"
              size="md"
              disabled={isPending}
            >
              확인
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
