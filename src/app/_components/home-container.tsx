import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface HomeContainerProps {
  children: ReactNode;
  className?: string;
}

export function HomeContainer({ children, className }: HomeContainerProps) {
  return <section className={cn('mx-auto w-full max-w-360 px-6', className)}>{children}</section>;
}
