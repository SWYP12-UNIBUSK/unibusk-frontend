import Image from 'next/image';
import { useId } from 'react';
import { cn } from '@/utils/index';

interface ErrorMessageProps {
  message?: string;
  className?: string;
}

function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message)
    return null;

  return (
    <span className={cn(`flex items-center gap-0.5 typo-caption-r-1 text-error`, className)}>
      <Image
        src="/icons/bangCircle-red.svg"
        alt="Warning Icon"
        width={17}
        height={17}
        unoptimized={true}
      />
      {message}
    </span>
  );
}

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
  error?: string;
}

function Label({
  ref,
  className,
  children,
  required = false,
  error,
  ...props
}: LabelProps & { ref?: React.RefObject<HTMLLabelElement | null> }) {
  return (
    <div className="mb-2.5 flex items-center gap-1.25 pl-2.5">
      <label
        ref={ref}
        className={cn('typo-body-sb-2 text-black', className)}
        {...props}
      >
        {required && <span className="pr-0.5 text-error">*</span>}
        {children}
      </label>
      {error && <ErrorMessage message={error} />}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  showCount?: boolean;
  currentCount?: React.ReactNode;
  /** Input 컴포넌트의 최상위 래퍼 div에 적용될 클래스 */
  containerClassName?: string;
}

function Input({
  ref,
  className,
  containerClassName,
  error,
  type,
  showCount,
  maxLength,
  currentCount,
  onChange,
  ...props
}: InputProps & { ref?: React.Ref<HTMLInputElement> }) {
  /**
   * 한글 IME(Input Method Editor) 문제 해결
   * - HTML의 maxLength attribute는 한글 조합 중에 정확하게 작동하지 않음
   * - 예: "모로오로오로오로오로오" (20자) 상태에서 "ㄹ" 추가 입력 시 21자가 됨
   * - onBeforeInput과 onInput으로 직접 제어하여 정확한 글자수 제한 구현
   */
  const handleBeforeInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (maxLength) {
      const target = e.currentTarget;
      const selectionLength = (target.selectionEnd ?? 0) - (target.selectionStart ?? 0);

      if (target.value.length - selectionLength >= maxLength) {
        e.preventDefault();
      }
    }
  };

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (maxLength) {
      const target = e.currentTarget;
      if (target.value.length > maxLength) {
        target.value = target.value.slice(0, maxLength);
        if (onChange) {
          const changeEvent = {
            ...e,
            target,
            currentTarget: target,
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(changeEvent);
        }
      }
    }
  };

  return (
    <div className={cn('relative', containerClassName)}>
      <input
        ref={ref}
        type={type}
        aria-invalid={!!error}
        className={cn(
          'h-15 w-full rounded-full border bg-white p-5',
          'typo-body-m-3 text-black',
          'transition-[border-color,box-shadow] outline-none',
          `placeholder:typo-caption-r-1 placeholder:text-gray-550`,
          // !todo: disabled:pointer-events-none이 포함되어 있다면,
          // !todo:마우스 이벤트가 차단되어 cursor-not-allowed가 나타나지 않습니다.
          // !todo: Input 컴포넌트를 개선하는 과정에서 cursor-not-allowed로 수정
          'disabled:pointer-events-none disabled:bg-gray-300',
          'border-gray-300 bg-gray-100',
          'focus:border-gray-700',
          error && `
            border-error
            focus:border-error
          `,
          className,
        )}
        onChange={onChange}
        onBeforeInput={handleBeforeInput}
        onInput={handleInput}
        {...props}
      />
      {showCount && maxLength && currentCount !== undefined && (
        <span className={`
          absolute top-1/2 right-5 -translate-y-1/2 typo-caption-r-1
          text-gray-550
        `}
        >
          {currentCount}
          /
          {maxLength}
        </span>
      )}
    </div>
  );
}

interface FormInputProps extends InputProps {
  label?: string;
  required?: boolean;
  error?: string;
}

function FormInput({
  ref,
  label,
  required,
  error,
  id,
  className,
  showCount,
  maxLength,
  currentCount,
  ...props
}: FormInputProps & { ref?: React.Ref<HTMLInputElement> }) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <Label htmlFor={inputId} required={required} error={error}>
          {label}
        </Label>
      )}
      <Input
        ref={ref}
        id={inputId}
        error={error}
        showCount={showCount}
        maxLength={maxLength}
        currentCount={currentCount}
        {...props}
      />
    </div>
  );
}

export { ErrorMessage, FormInput, Input, Label };
