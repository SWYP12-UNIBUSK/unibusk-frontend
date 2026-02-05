import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ImageUpload } from './image-upload';

const meta = {
  title: 'Component/Common/ImageUpload',
  component: ImageUpload,
  tags: ['autodocs'],
  argTypes: {
    defaultImageUrl: { control: 'text' },
    disabled: { control: 'boolean' },
    error: { control: 'boolean' },
    maxSize: { control: 'number' },
    onFileChange: { action: 'fileChanged' },
  },
  args: {
    onFileChange: () => {},
  },
  decorators: [
    Story => (
      <div className="m-auto flex min-h-screen w-55 flex-col justify-center">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ImageUpload>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  parameters: {
    docs: {
      description: {
        story: '기본 상태의 이미지 업로드 스토리입니다.',
      },
    },
  },
};

export const WithPreview: Story = {
  args: {
    defaultImageUrl: 'https://picsum.photos/400/300', // 예시 이미지
  },
  parameters: {
    docs: {
      description: {
        story: '미리보기 이미지가 있는 상태의 이미지 업로드 스토리입니다.',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태의 이미지 업로드 스토리입니다.',
      },
    },
  },
};

export const FunctionalSizeError: Story = {
  args: {
    maxSize: 0,
  },
  parameters: {
    docs: {
      description: {
        story: '파일 크기 제한 에러의 이미지 업로드 스토리입니다.',
      },
    },
  },
};

function FileInfoDisplay({ file }: { file: File | null }) {
  if (!file) {
    return null;
  }

  return (

    <div className="grid grid-cols-[80px_1fr] gap-y-2 text-sm">
      <span className="font-semibold text-black">파일명:</span>
      <span className="break-all text-gray-700">{file.name}</span>

      <span className="font-semibold text-green-800">크기:</span>
      <span className="text-gray-700">
        {(file.size / 1024).toFixed(2)}
        {' '}
        KB
      </span>

      <span className="font-semibold text-green-800">타입:</span>
      <span className="text-gray-700">{file.type}</span>
    </div>

  );
}

function FormLayoutRenderer(args: any) {
  const { control, watch } = useForm();
  const imageValue = watch('image');

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <h3 className="typo-title-b-3 text-gray-900">공연 포스터</h3>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, value } }) => (
            <ImageUpload
              {...args}
              onFileChange={(file) => {
                onChange(file);
                args.onFileChange(file);
              }}
              defaultImageUrl={value || undefined}
            />
          )}
        />
      </div>

      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h4 className="mb-2 font-bold text-gray-700">Form State</h4>
        <div className="font-mono text-sm">
          <strong>image:</strong>
          <FileInfoDisplay file={imageValue} />
        </div>
      </div>
    </div>
  );
}

export const FormLayout: Story = {
  render: args => <FormLayoutRenderer {...args} />,
  parameters: {
    docs: {
      description: {
        story: 'react-hook-form의 Controller를 사용하여 연동한 일반적인 폼 레이아웃입니다.',
      },
    },
  },
};
