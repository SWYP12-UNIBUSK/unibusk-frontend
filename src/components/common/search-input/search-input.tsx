'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import { useImperativeHandle, useRef } from 'react';
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

/**
 * SearchInput 컴포넌트 Props
 *
 * @remarks
 * 이 컴포넌트는 제어(Controlled) 컴포넌트입니다.
 * 반드시 `value`와 `onChange` prop을 함께 전달해야 합니다.
 *
 * @example
 * **기본 사용법 (useState)**
 * ```tsx
 * const [searchValue, setSearchValue] = useState('');
 *
 * <SearchInput
 *   value={searchValue}
 *   onChange={(e) => setSearchValue(e.target.value)}
 *   placeholder="검색어를 입력하세요"
 * />
 * ```
 *
 * @example
 * **react-hook-form과 함께 사용**
 * react-hook-form과 함께 사용할 때는 반드시 `Controller`를 사용해야 합니다.
 * `register()`를 사용하면 X 버튼이 정상 작동하지 않습니다.
 * ```tsx
 * import { Controller, useForm } from 'react-hook-form';
 *
 * const { control } = useForm();
 *
 * <Controller
 *   name="searchQuery"
 *   control={control}
 *   render={({ field }) => (
 *     <SearchInput
 *       value={field.value}
 *       onChange={field.onChange}
 *       placeholder="검색어를 입력하세요"
 *     />
 *   )}
 * />
 * ```
 */
interface SearchInputProps
  extends React.ComponentProps<typeof Input>,
  VariantProps<typeof inputThemeVariants> {
  /** 검색 입력값 (필수) */
  value: string;
  /** 입력값 변경 핸들러 (필수) */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** 부모 컴포넌트에서 ref를 전달할 때 사용 */
  ref?: React.Ref<HTMLInputElement>;
}

function SearchInput({
  className,
  theme,
  value,
  disabled,
  onChange,
  ref,
  ...props
}: SearchInputProps) {
  const innerRef = useRef<HTMLInputElement>(null);

  useImperativeHandle(ref, () => innerRef.current!, []);

  const handleClear = () => {
    onChange({
      target: { value: '' },
      currentTarget: { value: '' },
      type: 'change',
    } as React.ChangeEvent<HTMLInputElement>);

    // UX 개선: 클리어 후 input에 포커스
    innerRef.current?.focus();
  };

  return (
    <div className={cn(`relative flex w-full items-center`, className)}>
      <Input
        containerClassName="w-full"
        ref={innerRef}
        type="search"
        value={value}
        onChange={onChange}
        className={cn(inputThemeVariants({ theme }))}
        disabled={disabled}
        {...props}
      />
      <div className="absolute right-4 flex items-center gap-[2px]">
        {!!value && !disabled && (
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
