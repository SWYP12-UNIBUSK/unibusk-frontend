import type { CSSProperties, ReactNode } from 'react';
import { BUSKING_MAP_SIDEBAR_CSS } from '@/constants/busking-map';
import { cn } from '@/utils';

interface SidebarOverlayProps {
  children: ReactNode;
  className?: string;
}

export function SidebarOverlay({ children, className }: SidebarOverlayProps) {
  return (
    <div
      className={cn('pointer-events-none fixed inset-0 z-sidebar', className)}
      style={BUSKING_MAP_SIDEBAR_CSS as CSSProperties}
    >
      {children}
    </div>
  );
}
