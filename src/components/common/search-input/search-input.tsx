'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import * as React from 'react';
import { SearchIcon } from '@/components/common/icon';
import { Input } from '@/components/common/input/input';
import { cn } from '@/utils';

const inputThemeVariants = cva(`
  h-12.5 rounded-full border pr-[70px] pl-5 typo-body-m-3 shadow-none
  transition-colors
  placeholder:text-gray-550
  focus-visible:ring-0
  disabled:opacity-50
  [&::-webkit-search-cancel-button]:appearance-none
  [&::-webkit-search-decoration]:appearance-none
  [&::-webkit-search-results-button]:appearance-none
  [&::-webkit-search-results-decoration]:appearance-none
`, {
  variants: {
    theme: {
      gray: `
        border-gray-300 bg-gray-100
        focus:border-gray-300
      `,
      black: `
        border-gray-700 bg-white
        focus:border-gray-700
      `,
    },
  },
  defaultVariants: {
    theme: 'gray',
  },
});

interface SearchInputProps
  extends React.ComponentProps<typeof Input>,
  VariantProps<typeof inputThemeVariants> {}

function SearchInput({ className, theme, value, disabled, onChange, ...props }: SearchInputProps) {
  // value prop의 존재 여부로 제어/비제어 모드 판단
  const isControlled = value !== undefined;
  // 비제어 모드일 때만 사용할 내부 상태 (초기값은 defaultValue 유무)
  const [internalHasValue, setInternalHasValue] = React.useState(!!props.defaultValue);

  // 제어 모드이면 value를 따르고, 비제어 모드이면 내부 상태를 따름
  const hasValue = isControlled ? !!value : internalHasValue;

  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) {
      setInternalHasValue(!!e.target.value);
    }
    onChange?.(e);
  };

  /**
   * X 버튼 클릭 시 input 값을 지우는 핸들러
   * 제어/비제어 컴포넌트 모두 지원하기 위해 복잡한 로직 사용
   */
  const handleClear = () => {
    if (inputRef.current) {
      // 1. Native Setter를 사용하여 input 값을 직접 변경
      // (단순 inputRef.current.value = ''는 React가 감지하지 못함)
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        'value',
      )?.set;
      nativeInputValueSetter?.call(inputRef.current, '');

      // 2. input/change 이벤트를 수동으로 발생시켜 React에게 변경 사항 알림
      // → 제어 컴포넌트: 부모의 onChange 호출 → 상태 업데이트
      // → 비제어 컴포넌트: 내부 handleChange 호출 → internalHasValue 업데이트
      const inputEvent = new Event('input', { bubbles: true });
      inputRef.current.dispatchEvent(inputEvent);

      const changeEvent = new Event('change', { bubbles: true });
      inputRef.current.dispatchEvent(changeEvent);

      // 3. 포커스 유지 (UX 개선)
      inputRef.current.focus();
    }

    // 4. 비제어 모드일 때만 내부 상태 직접 업데이트 (안전장치)
    if (!isControlled) {
      setInternalHasValue(false);
    }
  };

  return (
    <div className={cn(`
      relative flex w-full items-center
      [&>div:first-child]:w-full
    `, className)}
    >
      <Input
        ref={inputRef}
        type="search"
        value={value}
        onChange={handleChange}
        className={cn(inputThemeVariants({ theme }))}
        disabled={disabled}
        {...props}
      />
      <div className="absolute right-4 flex items-center gap-[2px]">
        {hasValue && !disabled && (
          <button
            type="button"
            onClick={handleClear}
            className={`
              flex cursor-pointer items-center justify-center rounded-full
            `}
            aria-label="검색어 지우기"
          >
            <Image
              src="/icons/xCircle-gray.svg"
              alt=""
              width={24}
              height={24}
              unoptimized={true}
              aria-hidden="true"
            />
          </button>
        )}
        <SearchIcon
          aria-hidden="true"
          className={
            cn(
              'size-6',
              theme === 'black'
                ? 'text-gray-800'
                : `text-gray-550`,
            )
          }
        />
      </div>
    </div>
  );
}

export { SearchInput };
