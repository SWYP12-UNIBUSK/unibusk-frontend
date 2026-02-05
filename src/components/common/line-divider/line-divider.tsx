import { cn } from '@/utils';

type DividerWidth = number | `${number}%` | `${number}px`;

interface LineDividerProps {
  width?: DividerWidth;
  thickness?: number;
  colorClassName?: string;
  className?: string;
}

export function LineDivider({
  width = '84%',
  thickness = 1,
  colorClassName = 'bg-gray-200',
  className,
}: LineDividerProps) {
  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn('mx-auto', colorClassName, className)}
      style={{ width, height: thickness }}
    />
  );
}
