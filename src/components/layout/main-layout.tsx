import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface MainLayoutProps {
  children: ReactNode;
  className?: string;
}

export function MainLayout({ children, className }: MainLayoutProps) {
  return <div className={cn('mx-auto w-full max-w-360 px-6', className)}>{children}</div>;
}
