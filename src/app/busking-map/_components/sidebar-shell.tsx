'use client';

import type { BuskingPlace } from '@/types/busking-map';
import { useSidebarShellModel } from '@/hooks/busking-map';
import { useMediaQuery } from '@/hooks/use-media-query';

import { BuskingMapBottomSheet } from './busking-map-bottom-sheet';
import { DetailPanel } from './detail-panel';
import { SidebarLayout } from './sidebar-layout';
import { SidebarOverlay } from './sidebar-overlay';
import { SidebarPanel } from './sidebar-panel';

interface SidebarShellProps {
  places: BuskingPlace[];
}

export function SidebarShell({ places }: SidebarShellProps) {
  const model = useSidebarShellModel(places);
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (isMobile) {
    return (
      <BuskingMapBottomSheet
        activeTab={model.sidebar.activeTab}
        places={model.sidebar.places}
        focusedPlace={model.sidebar.focusedPlace}
        selectedPlace={model.detail.place}
        onTabClick={model.actions.onTabClick}
        onListItemClick={model.actions.onListItemClick}
        onFocusedCloseClick={model.actions.onFocusedCloseClick}
        onDetailCloseClick={model.actions.onDetailCloseClick}
      />
    );
  }

  return (
    <SidebarOverlay>
      <SidebarLayout
        isOpen={model.sidebar.isOpen}
        isDetailOpen={model.detail.isOpen}
        onToggleButtonClick={model.actions.onToggleSidebarButtonClick}
      >
        <SidebarPanel
          listScope={model.sidebar.listScope}
          activeTab={model.sidebar.activeTab}
          onTabClick={model.actions.onTabClick}
          places={model.sidebar.places}
          focusedPlace={model.sidebar.focusedPlace}
          onListItemClick={model.actions.onListItemClick}
          onFocusedCloseClick={model.actions.onFocusedCloseClick}
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
