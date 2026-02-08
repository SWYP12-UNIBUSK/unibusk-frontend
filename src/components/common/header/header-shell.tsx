import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface HeaderShellProps {
  left: ReactNode;
  middle: ReactNode;
  right: ReactNode;
  className?: string;
}

export function HeaderShell({ left, middle, right, className }: HeaderShellProps) {
  return (
    <header className={cn('w-full', className)}>
      <div className="mx-auto w-full px-2.5 py-2.5">
        <div
          className={cn(
            `
              flex h-20 items-center justify-between rounded-full bg-white px-7
              shadow-[0_0_10px_rgba(0,0,0,0.15)]
            `,
          )}
        >
          <div className="flex items-center">{left}</div>
          <div className="flex min-w-0 flex-1 items-center">{middle}</div>
          <div className="flex items-center justify-end">{right}</div>
        </div>
      </div>
    </header>
  );
}
