'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/common/alert-dialog';

interface PerformanceDeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  isPending?: boolean;
}

export function PerformanceDeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  isPending = false,
}: PerformanceDeleteConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        size="default"
        className="max-w-238! gap-5 rounded-[20px] border-0 px-20 py-12.5"
      >
        <AlertDialogHeader className="gap-5">
          <AlertDialogTitle className="typo-body-sb-1 text-black">등록한 공연을 삭제하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription className="typo-body-m-3 text-black">
            삭제된 공연 정보는 복구할 수 없으며, 모든 목록에서 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-row items-center justify-center">
          <AlertDialogCancel theme="gray" appearance="filled" size="md">
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            theme="orange"
            appearance="filled"
            size="md"
            disabled={isPending}
            onClick={onConfirm}
          >
            삭제하기
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
