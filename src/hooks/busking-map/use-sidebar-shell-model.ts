'use client';

import type { BuskingPlace } from '@/types/busking-map';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBuskingMapUiStore } from '@/stores/busking-map';

function makePlaceIndex(places: BuskingPlace[]) {
  return new Map(places.map(p => [p.id, p]));
}

export function useSidebarShellModel(places: BuskingPlace[]) {
  const state = useBuskingMapUiStore(
    useShallow(s => ({
      isSidebarOpen: s.isSidebarOpen,
      listScope: s.listScope,
      selectedPlaceId: s.selectedPlaceId,
      focusedPlaceId: s.focusedPlaceId,
    })),
  );

  const storeActions = useBuskingMapUiStore(
    useShallow(s => ({
      toggleSidebar: s.toggleSidebar,
      selectPlace: s.selectPlace,
      clearSelectedPlace: s.clearSelectedPlace,
      clearFocusedPlace: s.clearFocusedPlace,
    })),
  );

  const placeIndex = useMemo(() => makePlaceIndex(places), [places]);

  const selectedPlace
    = state.selectedPlaceId ? placeIndex.get(state.selectedPlaceId) ?? null : null;

  const focusedPlace
    = state.focusedPlaceId ? placeIndex.get(state.focusedPlaceId) ?? null : null;

  return {
    sidebar: {
      isOpen: state.isSidebarOpen,
      mode: state.listScope,
      places,
      focusedPlace,
    },
    detail: {
      isOpen: state.isSidebarOpen && state.selectedPlaceId !== null,
      place: selectedPlace,
    },
    actions: {
      onToggleSidebarButtonClick: storeActions.toggleSidebar,
      onListItemClick: storeActions.selectPlace,
      onDetailCloseClick: storeActions.clearSelectedPlace,
      onFocusedCloseClick: storeActions.clearFocusedPlace,
    },
  };
}
