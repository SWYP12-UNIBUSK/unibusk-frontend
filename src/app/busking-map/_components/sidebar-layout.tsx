import type { ReactNode } from 'react';
import { BUSKING_PANEL_HEIGHT, BUSKING_PANEL_LEFT_GAP, BUSKING_PANEL_TOP, PANEL_GAP, PANEL_WIDTH } from '@/constants/busking-map';
import { cn } from '@/utils';
import { SidebarToggleButton } from './sidebar-toggle-button';

interface SidebarLayoutProps {
  isOpen: boolean;
  isDetailOpen: boolean;
  onToggleButtonClick: () => void;
  children: ReactNode;
}

export function SidebarLayout({ isOpen, isDetailOpen, onToggleButtonClick, children }: SidebarLayoutProps) {
  const containerWidth = isOpen ? (isDetailOpen ? PANEL_WIDTH * 2 + PANEL_GAP : PANEL_WIDTH) : 0;

  const layoutStyle = {
    top: BUSKING_PANEL_TOP,
    left: isOpen ? BUSKING_PANEL_LEFT_GAP : 0,
    width: containerWidth,
    height: BUSKING_PANEL_HEIGHT,
  };

  return (
    <aside className="pointer-events-none fixed z-sidebar" style={layoutStyle}>
      <div className="pointer-events-auto relative flex h-full items-stretch">
        {isOpen
          ? (
              <div className="flex h-full w-full items-stretch" style={{ gap: PANEL_GAP }}>
                {children}
              </div>
            )
          : null}

        <SidebarToggleButton
          isSidebarOpen={isOpen}
          onClick={onToggleButtonClick}
          className={cn(
            'absolute top-1/2 -translate-y-1/2 cursor-pointer',
            isOpen ? 'right-0 translate-x-full' : 'left-0 translate-x-0',
          )}
        />
      </div>
    </aside>
  );
}
