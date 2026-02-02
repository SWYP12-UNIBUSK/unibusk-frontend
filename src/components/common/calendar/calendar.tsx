import type { DayButton, MonthCaptionProps } from 'react-day-picker';
import { ko } from 'date-fns/locale';
import React from 'react';
import { DayPicker, getDefaultClassNames, useDayPicker } from 'react-day-picker';
import { cn } from '@/utils/index';
import { ChevronLeftIcon, ChevronRightIcon } from '../icon';

function CalendarRoot({
  className,
  rootRef,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  rootRef?: React.Ref<HTMLDivElement>;
}) {
  return (
    <div
      data-slot="calendar"
      ref={rootRef}
      className={cn(className)}
      {...props}
    />
  );
}

function CustomCaption({ calendarMonth }: MonthCaptionProps) {
  const { previousMonth, nextMonth, goToMonth } = useDayPicker();
  const { date } = calendarMonth;

  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const commonButtonStyle = cn(
    'flex h-6.75 w-6.75 items-center justify-center rounded-full p-0',
    'cursor-pointer text-gray-550 transition-colors select-none',
    'hover:text-orange-200',
    'disabled:cursor-not-allowed',
  );

  return (
    <div className={`
      mb-3.75 flex w-full items-center justify-between px-[2.5px]
    `}
    >
      <button
        type="button"
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
        className={commonButtonStyle}
        aria-label={`${previousMonth ? previousMonth.getMonth() + 1 : ''}월로 이동`}
      >
        <ChevronLeftIcon className="size-5" aria-hidden="true" />
      </button>

      <div
        className="typo-body-sb-2 font-semibold text-black select-none"
        role="heading"
        aria-level={2}
      >
        {`${month}월 ${year}`}
      </div>

      <button
        type="button"
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
        className={commonButtonStyle}
        aria-label={`${nextMonth ? nextMonth.getMonth() + 1 : ''}월로 이동`}
      >
        <ChevronRightIcon className="size-5" aria-hidden="true" />
      </button>
    </div>
  );
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  ...props
}: React.ComponentProps<typeof DayButton>) {
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused)
      ref.current?.focus();
  }, [modifiers.focused]);

  const isSelected = modifiers.selected;
  const isRangeStart = modifiers.range_start;
  const isRangeEnd = modifiers.range_end;
  const isRangeMiddle = modifiers.range_middle;

  return (
    <button
      ref={ref}
      type="button"
      data-day={day.date.toLocaleDateString()}
      className={cn(
        // 기본 스타일
        `
          flex aspect-square size-7.5 cursor-pointer items-center justify-center
          rounded-full typo-body-m-3 leading-none font-normal text-black
          transition-colors
        `,
        // hover 상태
        `
          hover:bg-gray-200
          focus-visible:ring-2 focus-visible:ring-primary
          focus-visible:outline-none
        `,
        // 선택된 날짜
        (isSelected && !isRangeMiddle) && `
          bg-orange-200 text-black
          hover:bg-orange-200
        `,
        // 범위 중간
        isRangeMiddle && 'rounded-none bg-primary/10 text-primary',
        // 범위 시작
        isRangeStart && 'rounded-full bg-primary text-white',
        // 범위 끝
        isRangeEnd && 'rounded-full bg-primary text-white',
        // 다른 달 날짜
        modifiers.outside && `
          text-gray-400
          hover:bg-transparent
        `,
        modifiers.disabled && `
          cursor-not-allowed text-gray-300 opacity-70
          hover:bg-transparent
        `,
        className,
      )}
      {...props}
    />
  );
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      locale={ko}
      hideNavigation
      fixedWeeks
      className={cn(
        `
          group/calendar w-84.75 rounded-lg border border-gray-300 bg-white
          p-6.25 shadow-elevate-1
          [--cell-size:2.5rem]
        `,
        className,
      )}

      classNames={{
        root: cn('w-70 space-y-2.5', defaultClassNames.root),
        months: cn(
          `
            relative flex flex-col
            md:flex-row
          `,
          defaultClassNames.months,
        ),
        month: cn('flex w-full flex-col', defaultClassNames.month),

        table: cn('border-collapse'),
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          `mb-1 flex-1 typo-body-sb-3 text-primary select-none`,
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full', defaultClassNames.week),
        day: cn(
          `
            group/day flex aspect-square h-full w-full items-center
            justify-center p-0 text-center select-none
            [&:first-child[data-selected=true]_button]:rounded-full
            [&:last-child[data-selected=true]_button]:rounded-full
          `,
          defaultClassNames.day,
        ),
        range_start: cn('rounded-full bg-primary/20', defaultClassNames.range_start),
        range_middle: cn('rounded-none bg-primary/10', defaultClassNames.range_middle),
        range_end: cn('rounded-full bg-primary/20', defaultClassNames.range_end),
        today: defaultClassNames.today,
        outside: cn('text-gray-400', defaultClassNames.outside),
        disabled: cn('text-gray-400', defaultClassNames.disabled),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: CalendarRoot,
        DayButton: CalendarDayButton,
        MonthCaption: CustomCaption,
      }}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
