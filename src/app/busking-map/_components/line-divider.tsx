import type { CSSProperties } from 'react';
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
  const style: CSSProperties = {
    width: typeof width === 'number' ? `${width}px` : width,
    height: `${thickness}px`,
  };

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={cn('mx-auto', colorClassName, className)}
      style={style}
    />
  );
}
