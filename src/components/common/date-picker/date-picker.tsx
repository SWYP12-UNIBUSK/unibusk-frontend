import * as React from 'react';
import { cn } from '@/utils/index';
import { Calendar } from '../calendar';
import { FormInput } from '../input';
import { Popover, PopoverContent, PopoverTrigger } from '../popover';

export interface DatePickerProps {
  /** 선택된 날짜 (제어 컴포넌트) */
  value?: Date;
  /** 날짜 변경 핸들러 */
  onChange?: (date: Date | undefined) => void;
  /** 기본값 (비제어 컴포넌트) */
  defaultValue?: Date;
  /** 라벨 텍스트 */
  label: string;
  /** 라벨이 필수 여부 */
  required?: boolean;
  /** placeholder 텍스트 */
  placeholder?: string;
  /** 비활성화 여부 */
  disabled?: boolean;
  /** 에러 상태 */
  error?: boolean;
  /** 에러 메시지 */
  errorMessage?: string;
  /** 날짜 포맷 함수 (기본: toLocaleDateString) */
  formatDate?: (date: Date) => string;
  /** Input 추가 className */
  className?: string;
  /** Calendar에 전달할 props */
  calendarProps?: Omit<
    React.ComponentPropsWithoutRef<typeof Calendar>,
    'mode' | 'selected' | 'onSelect'
  >;
  ref?: React.Ref<HTMLInputElement>;
}

function DatePicker({
  value,
  onChange,
  defaultValue,
  label,
  required,
  placeholder = '날짜를 선택하세요',
  disabled = false,
  error = false,
  errorMessage,
  formatDate = date => date.toLocaleDateString('ko-KR'),
  className,
  ref,
  calendarProps,
}: DatePickerProps) {
  // 내부 상태 (비제어 모드용)
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    defaultValue,
  );
  const [isOpen, setIsOpen] = React.useState(false);

  // 제어/비제어 결정
  const isControlled = value !== undefined;
  const currentDate = isControlled ? value : internalDate;

  const handleSelect = (selectedDate: Date | undefined) => {
    if (!isControlled) {
      setInternalDate(selectedDate);
    }
    onChange?.(selectedDate);
    setIsOpen(false);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        if (disabled && open)
          return;
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild disabled={disabled}>
        {/*
          [중요] Radix UI의 Trigger는 자식에게 ref를 전달해야 하는데,
          커스텀 Input 컴포넌트와의 호환성을 위해 div로 한 번 감싸주는 것이 안전합니다.
        */}
        <div className="w-full">
          <FormInput
            ref={ref}
            placeholder={placeholder}
            value={currentDate ? formatDate(currentDate) : ''}
            readOnly // 직접 타이핑 방지 (달력으로만 선택)
            label={label}
            required={required}
            disabled={disabled}
            aria-disabled={disabled}
            aria-label="날짜 선택"
            aria-invalid={error}
            aria-describedby={error ? 'date-error' : undefined}
            error={errorMessage}
            className={cn(
              'caret-transparent',
              disabled ? 'cursor-not-allowed' : 'cursor-pointer',
              error && `
                border-red-500
                focus-visible:ring-red-500
              `,
              className,
            )}
            onClick={() => !disabled && setIsOpen(true)}
          />
        </div>
      </PopoverTrigger>

      {/* [스타일링 핵심]
        PopoverContent의 기본 패딩과 너비를 제거(w-auto p-0)하여
        Calendar 컴포넌트의 스타일과 충돌하지 않게 합니다.
      */}
      <PopoverContent
        align="start"
        className={cn(`
          z-popup w-auto border-none bg-transparent p-0 shadow-none
        `)}
      >
        <Calendar
          mode="single"
          selected={currentDate}
          onSelect={handleSelect}
          autoFocus
          disabled={disabled}
          {...calendarProps}
        />
      </PopoverContent>

    </Popover>
  );
}

DatePicker.displayName = 'DatePicker';

export { DatePicker };
