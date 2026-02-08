'use client';

import type { BuskingPlace } from '@/types/busking-map';
import { useSidebarShellModel } from '@/hooks/busking-map';

import { DetailPanel } from './detail-panel';
import { SidebarLayout } from './sidebar-layout';
import { SidebarOverlay } from './sidebar-overlay';
import { SidebarPanel } from './sidebar-panel';

interface SidebarShellProps {
  places: BuskingPlace[];
}

export function SidebarShell({ places }: SidebarShellProps) {
  const model = useSidebarShellModel(places);

  return (
    <SidebarOverlay>
      <SidebarLayout
        isOpen={model.sidebar.isOpen}
        isDetailOpen={model.detail.isOpen}
        onToggleButtonClick={model.actions.onToggleSidebarButtonClick}
      >
        <SidebarPanel
          mode={model.sidebar.mode}
          places={model.sidebar.places}
          focusedPlace={model.sidebar.focusedPlace}
          onListItemClick={model.actions.onListItemClick}
          onFocusedCloseClick={model.actions.onFocusedCloseClick}
          onExitClusterListClick={model.actions.onExitClusterListClick}
        />

        {model.detail.isOpen
          ? (
              <DetailPanel place={model.detail.place} onCloseClick={model.actions.onDetailCloseClick} />
            )
          : null}
      </SidebarLayout>
    </SidebarOverlay>
  );
}
