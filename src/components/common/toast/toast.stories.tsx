import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { toast } from 'sonner';
import { Toaster } from './toast';

/**
 * Sonner Toast 컴포넌트입니다.
 * 실제 사용 시에는 `toast.success()`, `toast.error()` 등의 함수를 호출하여 사용합니다.
 * 스토리에서는 버튼을 클릭하여 토스트를 확인할 수 있습니다.
 */
const meta = {
  title: 'Component/Common/Toast',
  component: Toaster,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Toaster>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-primary px-4 py-2 text-white"
        onClick={() => toast('Default Toast 메시지입니다.')}
      >
        Show Default Toast
      </button>
    </div>

  ),
  parameters: {
    docs: {
      description: {
        story: 'Default Toast 메시지입니다.',
      },
    },
  },
};

export const SuccessStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-green-500 px-4 py-2 text-white"
        onClick={() => toast.success('작업이 성공적으로 완료되었습니다.')}
      >
        Show Success Toast
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Success Toast 메시지입니다.',
      },
    },
  },
};

export const InfoStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-blue-500 px-4 py-2 text-white"
        onClick={() => toast.info('새로운 알림이 있습니다.')}
      >
        Show Info Toast
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Info Toast 메시지입니다.',
      },
    },
  },
};

export const WarningStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-yellow-500 px-4 py-2 text-white"
        onClick={() => toast.warning('주의가 필요한 작업입니다.')}
      >
        Show Warning Toast
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Warning Toast 메시지입니다.',
      },
    },
  },
};

export const ErrorStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-red-500 px-4 py-2 text-white"
        onClick={() => toast.error('심각한 오류가 발생했습니다.')}
      >
        Show Error Toast
      </button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Error Toast 메시지입니다.',
      },
    },
  },
};

export const LoadingStory: Story = {
  render: () => (
    <div className="flex h-screen items-center justify-center">
      <button
        type="button"
        className="rounded-md bg-gray-500 px-4 py-2 text-white"
        onClick={() => {
          const promise = new Promise((resolve, reject) =>
            setTimeout(
              () =>
                Math.random() < 0.5
                  ? resolve({ name: 'Sonner' })
                  : reject(new Error('load failed')),
              2000,
            ),
          );

          toast.promise(promise, {
            loading: '데이터를 불러오는 중...',
            success: '데이터 로드 완료!',
            error: '데이터 로드 실패',
          });
        }}
      >
        Show Loading Toast
      </button>
    </div>
  ),
};
