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
      control: { type: 'number', min: 20, max: 200, step: 4 },
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

/** 1. 기본 아바타 (디자인 시안 64px) */
export const Default: Story = {
  args: {
    'variant': 'primary',
    'size': 64,
    'aria-label': '유저 프로필',
  },
};

/** 2. 회색 테마 아바타 */
export const Secondary: Story = {
  args: {
    'variant': 'secondary',
    'size': 64,
    'aria-label': '유저 프로필',
  },
};

/** 3. 유동적인 사이즈 비교 (32px, 64px, 128px) */
export const SizeComparison: Story = {
  render: args => (
    <div className="flex items-end gap-6">
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={32} aria-label="작은 아바타" />
        <span className="text-xs text-gray-500">32px</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={64} aria-label="중간 아바타" />
        <span className="text-xs text-gray-500">64px (Default)</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <AvatarButton {...args} size={128} aria-label="큰 아바타" />
        <span className="text-xs text-gray-500">128px</span>
      </div>
    </div>
  ),
};

/** 4. 비활성화 상태 */
export const Disabled: Story = {
  args: {
    'variant': 'primary',
    'size': 64,
    'disabled': true,
    'aria-label': '비활성화된 프로필',
  },
};
