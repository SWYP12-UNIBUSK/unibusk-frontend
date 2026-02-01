import type { CSSProperties, ReactNode } from 'react';
import { cn } from '@/utils';
import { SidebarToggleButton } from './sidebar-toggle-button';

interface SidebarLayoutProps {
  isOpen: boolean;
  isDetailOpen: boolean;
  onToggleButtonClick: () => void;
  children: ReactNode;
}

const PANEL_WIDTH = 343;
const PANEL_GAP = 17;

export function SidebarLayout({ isOpen, isDetailOpen, onToggleButtonClick, children }: SidebarLayoutProps) {
  const containerWidth = isOpen ? (isDetailOpen ? PANEL_WIDTH * 2 + PANEL_GAP : PANEL_WIDTH) : 0;

  const layoutStyle: CSSProperties = {
    top: 'var(--busking-panel-top)',
    left: isOpen ? 'var(--busking-panel-left-gap)' : '0px',

    width: `${containerWidth}px`,
    height: 'max(0px, calc(100vh - var(--busking-panel-top) - var(--busking-panel-bottom-gap)))',
  };

  return (
    <aside className="pointer-events-none fixed z-sidebar" style={layoutStyle}>
      <div className="pointer-events-auto relative flex h-full items-stretch">
        {isOpen
          ? (
              <div className={`
                flex h-full w-full items-stretch gap-(--busking-panel-gap)
              `}
              >
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
