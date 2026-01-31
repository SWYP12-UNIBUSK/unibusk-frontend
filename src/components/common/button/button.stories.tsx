import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'Component/Common/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'select',
      options: ['orange', 'lightOrange', 'gray', 'lightGray'],
      description: '버튼의 브랜드 색상을 선택합니다.',
    },
    appearance: {
      control: 'select',
      options: ['filled', 'outline'],
      description: '버튼의 형태(채우기 또는 테두리)를 선택합니다.',
    },
    size: {
      control: 'select',
      options: ['lg', 'md', 'sm'],
      description: '버튼의 크기를 선택합니다. outline 시 크기별로 테두리 두께가 달라집니다.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

/** 1. 디자인 시안: '내 공연 등록하기' (Large Orange Filled) */
export const LargeOrangeFilled: Story = {
  args: {
    size: 'lg',
    theme: 'orange',
    appearance: 'filled',
    children: '내 공연 등록하기',
  },
};

/** 2. 디자인 시안: '장소 찾기' (Small Orange Outline - border 1px) */
export const SmallOrangeOutline: Story = {
  args: {
    size: 'sm',
    theme: 'orange',
    appearance: 'outline',
    children: '장소 찾기',
  },
};

/** 3. 사이즈별 Outline 두께 비교 (lg: 3px, md: 2px, sm: 1px) */
export const OutlineSizeComparison: Story = {
  render: args => (
    <div className="flex flex-col items-center gap-4">
      <Button {...args} size="lg" appearance="outline">Large Outline (3px)</Button>
      <Button {...args} size="md" appearance="outline">Medium Outline (2px)</Button>
      <Button {...args} size="sm" appearance="outline">Small Outline (1px)</Button>
    </div>
  ),
  args: {
    theme: 'orange',
  },
};

/** 4. 다양한 색상의 Filled 버튼 조합 */
export const ThemeVariants: Story = {
  render: args => (
    <div className="flex items-center gap-4">
      <Button {...args} theme="orange">Orange</Button>
      <Button {...args} theme="gray">Gray</Button>
      <Button {...args} theme="lightGray">Light Gray</Button>
      <Button {...args} theme="lightOrange">Light Orange</Button>
    </div>
  ),
  args: {
    size: 'md',
    appearance: 'filled',
  },
};

/** 5. 비활성화 상태 */
export const Disabled: Story = {
  args: {
    size: 'md',
    theme: 'orange',
    appearance: 'filled',
    children: '비활성화 버튼',
    disabled: true,
  },
};
