import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AvatarButton } from './avatar-button';

const meta: Meta<typeof AvatarButton> = {
  title: 'Component/Common/AvatarButton',
  component: AvatarButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    'variant': {
      control: 'select',
      options: ['primary', 'secondary'],
      description: '아바타의 배경색 테마를 선택합니다.',
    },
    'size': {
      control: { type: 'number', min: 20, max: 200, step: 5 },
      description: '아바타의 크기를 px 단위로 직접 지정합니다.',
    },
    'aria-label': {
      control: 'text',
      description: '스크린 리더를 위한 접근성 레이블',
    },
    'onClick': { action: 'clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof AvatarButton>;

export const Default: Story = {
  args: {
    'variant': 'primary',
    'size': 70,
    'aria-label': '유저 프로필',
  },
  parameters: {
    docs: {
      description: {
        story: '기본 아바타 (디자인 시안 70px)',
      },
    },
  },
};

export const Secondary: Story = {
  args: {
    'variant': 'secondary',
    'size': 70,
    'aria-label': '유저 프로필',
  },
  parameters: {
    docs: {
      description: {
        story: '회색 테마 아바타 (디자인 시안 70px)',
      },
    },
  },
};

export const SizeComparison: Story = {
  render: args => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={35} aria-label="작은 아바타" />
        <span className="text-xs text-gray-500">35px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={70} aria-label="중간 아바타" />
        <span className="text-xs text-gray-500">70px (Default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={140} aria-label="큰 아바타" />
        <span className="text-xs text-gray-500">140px</span>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: '유동적인 사이즈 비교 (35px, 70px, 140px)',
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    'variant': 'primary',
    'size': 70,
    'disabled': true,
    'aria-label': '비활성화된 프로필',
  },
  parameters: {
    docs: {
      description: {
        story: '비활성화 상태',
      },
    },
  },
};
