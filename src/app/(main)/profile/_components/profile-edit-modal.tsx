'use client';

import type { SubmitHandler } from 'react-hook-form';
import type { UpdateMemberNameRequestDto } from '@/apis/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UpdateMemberNameRequestDtoSchema } from '@/apis/user/user.schema';
import { Button } from '@/components/common/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/common/dialog';
import { AvatarCircleIcon } from '@/components/common/icon';
import { FormInput } from '@/components/common/input';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/common/sheet';
import { useUpdateMemberName } from '@/hooks/member/use-update-member-name';
import { useMediaQuery } from '@/hooks/use-media-query';

interface ProfileEditModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentName: string;
}

interface ProfileEditViewProps {
  open: boolean;
  isPending: boolean;
  nameValue: string;
  errors: ReturnType<typeof useForm<UpdateMemberNameRequestDto>>['formState']['errors'];
  register: ReturnType<typeof useForm<UpdateMemberNameRequestDto>>['register'];
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  onOpenChange: (open: boolean) => void;
}

export function ProfileEditModal({ open, onOpenChange, currentName }: ProfileEditModalProps) {
  const { mutate: updateName, isPending } = useUpdateMemberName();
  const isMobile = useMediaQuery('(max-width: 767px)');

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

  useEffect(() => {
    if (open)
      reset({ name: currentName });
  }, [open, currentName, reset]);

  const nameValue = watch('name') ?? '';

  const handleFormSubmit: SubmitHandler<UpdateMemberNameRequestDto> = (data) => {
    updateName(data, { onSuccess: () => onOpenChange(false) });
  };

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isPending)
      onOpenChange(nextOpen);
  };

  const viewProps: ProfileEditViewProps = {
    open,
    isPending,
    nameValue,
    errors,
    register,
    onSubmit: handleSubmit(handleFormSubmit),
    onOpenChange: handleOpenChange,
  };

  if (isMobile) {
    return <MobileProfileEditModal {...viewProps} />;
  }

  return <DesktopProfileEditModal {...viewProps} />;
}

function MobileProfileEditModal({
  open,
  isPending,
  nameValue,
  errors,
  register,
  onSubmit,
  onOpenChange,
}: ProfileEditViewProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" rounded className="px-5">
        <SheetHeader align="center">
          <SheetTitle className="typo-title-b-5">프로필 변경</SheetTitle>
        </SheetHeader>

        <form
          onSubmit={onSubmit}
          className="flex flex-col items-center gap-6 pb-5"
        >
          <div className={`
            flex size-20 items-center justify-center rounded-full bg-gray-200
          `}
          >
            <AvatarCircleIcon className="size-14 text-gray-400" />
          </div>

          <FormInput
            label="닉네임"
            placeholder="닉네임을 입력해 주세요"
            showCount
            maxLength={15}
            currentCount={nameValue.length}
            error={errors.name?.message}
            {...register('name')}
          />

          <Button
            type="submit"
            theme="orange"
            appearance="filled"
            size="md"
            className="w-50"
            disabled={isPending}
          >
            변경
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

function DesktopProfileEditModal({
  open,
  isPending,
  nameValue,
  errors,
  register,
  onSubmit,
  onOpenChange,
}: ProfileEditViewProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="w-143.75 gap-0 px-28.5 py-16.25"
      >
        <DialogTitle className="typo-body-sb-1 text-black">닉네임 변경</DialogTitle>
        <form
          onSubmit={onSubmit}
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
              disabled={isPending}
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
