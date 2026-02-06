import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { SearchInput } from './search-input';

const meta = {
  title: 'Component/Common/SearchInput',
  component: SearchInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: '제어 컴포넌트로 구현된 검색 입력 필드입니다. `value`와 `onChange` props를 필수로 전달해야 합니다. 왼쪽 검색 아이콘과 오른쪽 Clear 버튼이 내장되어 있으며, 입력값이 있을 때만 Clear 버튼이 표시됩니다.',
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
      description: '입력값 (필수)',
    },
    onChange: {
      description: '입력값 변경 핸들러 (필수)',
    },
  },
} satisfies Meta<typeof SearchInput>;

export default meta;

// render 함수 사용 시 args를 선택적으로 만들기 위한 타입
type Story = Omit<StoryObj<typeof meta>, 'args'> & {
  args?: Partial<React.ComponentProps<typeof SearchInput>>;
};

function DefaultGrayExample() {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      theme="gray"
      placeholder="검색어를 입력하세요 (Gray Theme)"
      aria-label="검색어 입력"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
}

export const DefaultGray = {
  render: () => <DefaultGrayExample />,
} satisfies Story;

function BlackThemeExample() {
  const [value, setValue] = useState('');
  return (
    <SearchInput
      theme="black"
      placeholder="검색어를 입력하세요 (Black Theme)"
      aria-label="검색어 입력"
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
    />
  );
}

export const BlackTheme = {
  render: () => <BlackThemeExample />,
} satisfies Story;

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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      />
    </div>
  );
}

export const Controlled = {
  render: () => <ControlledInputExample />,
} satisfies Story;

function DisabledExample() {
  const [value, setValue] = useState('수정 불가');
  return (
    <SearchInput
      placeholder="비활성화된 검색창"
      disabled={true}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
      theme="gray"
    />
  );
}

export const Disabled = {
  render: () => <DisabledExample />,
} satisfies Story;

interface SearchFormData {
  searchQuery: string;
}

function ReactHookFormExample() {
  const { control, handleSubmit, reset, watch } = useForm<SearchFormData>({
    defaultValues: {
      searchQuery: '',
    },
  });

  const searchValue = watch('searchQuery');

  const onSubmit = (data: SearchFormData) => {
    // eslint-disable-next-line no-console
    console.log('검색어:', data.searchQuery);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <label
          htmlFor="searchQuery"
          className="text-sm font-medium text-gray-700"
        >
          공연 검색 (복잡한 버전: DOM 직접 조작)
        </label>
        <Controller
          name="searchQuery"
          control={control}
          render={({ field }) => (
            <SearchInput
              id="searchQuery"
              value={field.value}
              onChange={field.onChange}
              placeholder="공연명을 입력하세요"
              theme="gray"
              aria-label="공연 검색"
            />
          )}
        />
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          className={`
            rounded-lg bg-blue-600 px-4 py-2 text-white
            hover:bg-blue-700
          `}
        >
          검색
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className={`
            rounded-lg bg-gray-200 px-4 py-2 text-gray-700
            hover:bg-gray-300
          `}
        >
          초기화
        </button>
      </div>
      <div className="text-sm text-gray-500">
        <p>
          현재 입력값:
          {searchValue}
        </p>
      </div>
    </form>
  );
}

export const WithReactHookForm = {
  render: () => <ReactHookFormExample />,
  parameters: {
    docs: {
      description: {
        story: 'react-hook-form과 함께 사용하는 예시입니다. 제어 컴포넌트이므로 `Controller`를 사용하여 폼 상태를 관리합니다.',
      },
    },
  },
} satisfies Story;
