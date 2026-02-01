import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils';

interface SidebarOverlayProps {
  children: ReactNode;
  className?: string;
}

const BUSKING_MAP_SIDEBAR_CSS = {
  '--busking-header-height': '110px',
  '--busking-panel-top-gap': '6px',
  '--busking-panel-top': 'calc(var(--busking-header-height) + var(--busking-panel-top-gap))',
  '--busking-panel-left-gap': '32px',
  '--busking-panel-bottom-gap': '64px',
  '--busking-panel-width': '343px',
  '--busking-panel-gap': '17px',
} as const;

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
