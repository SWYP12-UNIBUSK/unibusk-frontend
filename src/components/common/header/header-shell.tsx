import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface HeaderShellProps {
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
  className?: string;
  layout?: 'default' | 'search';
}

export function HeaderShell({
  left,
  middle,
  right,
  className,
  layout = 'default',
}: HeaderShellProps) {
  const isDefault = layout === 'default';
  const isSearch = layout === 'search';

  const innerClassName = isDefault
    ? 'grid grid-cols-[1fr_auto_1fr] items-center'
    : 'flex items-center justify-between';

  const headerPositionClassName = isSearch
    ? 'fixed inset-x-0 top-0 pointer-events-none'
    : 'relative';

  const outerPaddingXClassName = isSearch
    ? 'px-8'
    : 'px-2.5';

  return (
    <header className={cn('z-header w-full', headerPositionClassName, className)}>
      <div className={cn('mx-auto w-full py-2.5', outerPaddingXClassName)}>
        <div
          className={cn(
            `
              pointer-events-auto h-20 rounded-full bg-white px-7
              shadow-[0_0_10px_rgba(0,0,0,0.15)]
            `,
            innerClassName,
          )}
        >
          <div className={cn('flex min-w-0 items-center', isDefault
            ? `justify-self-start`
            : '')}
          >
            {left}
          </div>

          <div className={cn('flex min-w-0 items-center', isDefault
            ? `justify-self-center`
            : '')}
          >
            {middle}
          </div>

          <div className={cn('flex min-w-0 items-center justify-end', isDefault
            ? `justify-self-end`
            : '')}
          >
            {right}
          </div>
        </div>
      </div>
    </header>
  );
}
