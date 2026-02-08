'use client';

import type { BuskingPlace } from '@/types/busking-map';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { useBuskingMapUiStore } from '@/stores/busking-map';

function makePlaceIndex(places: BuskingPlace[]) {
  return new Map(places.map(p => [p.id, p]));
}

function filterPlacesBySearch(places: BuskingPlace[], query: string) {
  const searchQuery = query.trim();
  if (!searchQuery) {
    return places;
  }

  return places.filter(p => p.title.includes(searchQuery));
}

export function useSidebarShellModel(places: BuskingPlace[]) {
  const state = useBuskingMapUiStore(
    useShallow(s => ({
      isSidebarOpen: s.isSidebarOpen,
      listScope: s.listScope,
      clusterPlaceIds: s.clusterPlaceIds,
      viewportPlaceIds: s.viewportPlaceIds,
      searchQuery: s.searchQuery,
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
      exitClusterList: s.exitClusterList,
    })),
  );

  const placeIndex = useMemo(() => makePlaceIndex(places), [places]);

  const selectedPlace
    = state.selectedPlaceId ? placeIndex.get(state.selectedPlaceId) ?? null : null;

  const focusedPlace
    = state.focusedPlaceId ? placeIndex.get(state.focusedPlaceId) ?? null : null;

  const sidebarPlaces = useMemo(() => {
    if (state.listScope === 'cluster') {
      return state.clusterPlaceIds
        .map(id => placeIndex.get(id))
        .filter((p): p is BuskingPlace => Boolean(p));
    }

    if (state.listScope === 'search') {
      return filterPlacesBySearch(places, state.searchQuery);
    }

    // viewport 모드에서 현재 지도에 보이는 place만 노출
    if (state.listScope === 'viewport') {
      return state.viewportPlaceIds
        .map(id => placeIndex.get(id))
        .filter((p): p is BuskingPlace => Boolean(p));
    }

    return places;
  }, [
    places,
    placeIndex,
    state.clusterPlaceIds,
    state.listScope,
    state.searchQuery,
    state.viewportPlaceIds,
  ]);

  return {
    sidebar: {
      isOpen: state.isSidebarOpen,
      mode: state.listScope,
      places: sidebarPlaces,
      focusedPlace,
    },
    detail: {
      isOpen: state.isSidebarOpen && selectedPlace !== null,
      place: selectedPlace,
    },
    actions: {
      onToggleSidebarButtonClick: storeActions.toggleSidebar,
      onListItemClick: storeActions.selectPlace,
      onDetailCloseClick: storeActions.clearSelectedPlace,
      onFocusedCloseClick: storeActions.clearFocusedPlace,
      onExitClusterListClick: storeActions.exitClusterList,
    },
  };
}
