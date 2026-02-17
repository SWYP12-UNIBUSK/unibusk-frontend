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

  const innerClassName = isDefault
    ? 'grid grid-cols-[1fr_auto_1fr] items-center'
    : 'flex items-center justify-between';

  return (
    <header className={cn('relative z-header w-full', className)}>
      <div className="mx-auto w-full px-2.5 py-2.5">
        <div className={cn(`
          h-20 rounded-full bg-white px-7 shadow-[0_0_10px_rgba(0,0,0,0.15)]
        `, innerClassName)}
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
