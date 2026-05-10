import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './alert-dialog';

const meta: Meta<typeof AlertDialog> = {
  title: 'Component/Common/AlertDialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

/** size="default": 기본 모달 — flex-row 버튼 레이아웃, sm(576px) 이상에서 max-w-238 */
export const Default: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={`
            cursor-pointer rounded-md bg-red-500 px-4 py-2 text-sm text-white
          `}
        >
          기본 다이얼로그
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className={`
        gap-6 rounded-lg px-10 py-12.5
        sm:gap-10 sm:px-20
      `}
      >
        <AlertDialogHeader className={`
          gap-2.5
          sm:gap-5
        `}
        >
          <AlertDialogTitle className={`
            typo-body-sb-3
            sm:typo-body-sb-1
          `}
          >
            등록한 공연을 삭제하시겠습니까?
          </AlertDialogTitle>
          <AlertDialogDescription className={`
            typo-caption-r-2
            sm:typo-body-m-3
          `}
          >
            삭제된 공연 정보는 복구할 수 없으며, 모든 목록에서 삭제됩니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className={`
          gap-1
          sm:gap-2
        `}
        >
          <AlertDialogCancel
            theme="gray"
            appearance="filled"
            size="md"
            className={`
              h-9 w-30 min-w-0
              sm:h-11.25 sm:w-auto sm:min-w-37.5
            `}
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            theme="orange"
            appearance="filled"
            size="md"
            className={`
              h-9 w-30 min-w-0
              sm:h-11.25 sm:w-auto sm:min-w-37.5
            `}
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};

/** size="sm": 소형 모달 — grid-cols-2 버튼 레이아웃, max-w-xs(320px) */
export const Small: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className={`
            cursor-pointer rounded-md bg-gray-500 px-4 py-2 text-sm text-white
          `}
        >
          소형 다이얼로그
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm" className="gap-6 px-10 py-8">
        <AlertDialogHeader className="gap-2.5">
          <AlertDialogTitle className="typo-body-sb-3">
            정말 삭제할까요?
          </AlertDialogTitle>
          <AlertDialogDescription className="typo-caption-r-2">
            이 작업은 되돌릴 수 없습니다.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-1">
          <AlertDialogCancel
            theme="gray"
            appearance="filled"
            size="md"
            className="h-9 min-w-0"
          >
            취소
          </AlertDialogCancel>
          <AlertDialogAction
            theme="orange"
            appearance="filled"
            size="md"
            className="h-9 min-w-0"
          >
            확인
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
