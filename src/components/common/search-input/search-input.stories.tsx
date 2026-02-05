import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { SearchInput } from './search-input';

const meta = {
  title: 'Component/Common/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '검색을 위한 입력 컴포넌트입니다. 왼쪽(Search)와 오른쪽(Clear) 아이콘이 내장되어 있으며, 입력값에 따라 Clear 버튼이 조건부로 렌더링됩니다.',
      },
    },
  },
  decorators: [
    Story => (
      <div className="w-[560px]">
        <Story />
      </div>
    ),
  ],
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['gray', 'black'],
      description: '검색창 테마',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    value: {
      control: 'text',
      description: '입력값 (Controlled Component)',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultGray: Story = {
  args: {
    'theme': 'gray',
    'placeholder': '검색어를 입력하세요 (Gray Theme)',
    'aria-label': '검색어 입력',
  },
};

export const BlackTheme: Story = {
  args: {
    'theme': 'black',
    'placeholder': '검색어를 입력하세요 (Black Theme)',
    'aria-label': '검색어 입력',
  },
};

function ControlledInputExample() {
  const [value, setValue] = useState('');
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-gray-500">
        입력된 값:
        {value}
      </p>
      <SearchInput
        theme="gray"
        placeholder="입력해보세요..."
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
}

export const Controlled: Story = {
  render: () => <ControlledInputExample />,
  args: {
    placeholder: 'Controlled Input',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: '비활성화된 검색창',
    disabled: true,
    value: '수정 불가',
    theme: 'gray',
  },
};
