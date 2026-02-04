import type { ReactNode } from 'react';
import { cn } from '@/utils';

interface SidebarOverlayProps {
  children: ReactNode;
  className?: string;
}

export function SidebarOverlay({ children, className }: SidebarOverlayProps) {
  return (
    <div
      className={cn('pointer-events-none fixed inset-0 z-sidebar', className)}
    >
      {children}
    </div>
  );
}
