'use client';

import type { BuskingPlace, ListScope, SidebarTab } from '@/types/busking-map';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { usePerformanceLocationSearchList } from '@/hooks/performance-locations/use-performance-location-list';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { adaptPerformanceLocationsToBuskingPlaces } from '@/utils/busking-map/performance-location.adapter';
import { createBuskingPlaceIndex } from '@/utils/busking-map/place-index';
import { sortPlacesByAnchor } from '@/utils/busking-map/sort-places-by-anchor';

export function useSidebarShellModel(places: BuskingPlace[]) {
  const state = useBuskingMapUiStore(
    useShallow(s => ({
      isSidebarOpen: s.isSidebarOpen,
      listScope: s.listScope,
      clusterPlaceIds: s.clusterPlaceIds,
      viewportPlaceIds: s.viewportPlaceIds,
      selectedPlaceId: s.selectedPlaceId,
      focusedPlaceId: s.focusedPlaceId,

      activeSidebarTab: s.activeSidebarTab,
      searchQuery: s.searchQuery,
      searchAnchorCoordinate: s.searchAnchorCoordinate,
    })),
  );

  const actions = useBuskingMapUiStore(
    useShallow(s => ({
      toggleSidebar: s.toggleSidebar,
      selectPlace: s.selectPlace,
      clearSelectedPlace: s.clearSelectedPlace,
      clearFocusedPlace: s.clearFocusedPlace,
      exitClusterList: s.exitClusterList,
      setActiveSidebarTab: s.setActiveSidebarTab,
    })),
  );

  const placeIndex = useMemo(() => createBuskingPlaceIndex(places), [places]);

  const selectedPlace = state.selectedPlaceId
    ? placeIndex.get(state.selectedPlaceId) ?? null
    : null;

  const focusedPlace = state.focusedPlaceId
    ? placeIndex.get(state.focusedPlaceId) ?? null
    : null;

  const placesForPlacesTab = useMemo(() => {
    if (state.listScope === 'cluster') {
      return state.clusterPlaceIds
        .map(id => placeIndex.get(id))
        .filter((p): p is BuskingPlace => Boolean(p));
    }

    if (state.listScope === 'viewport') {
      return state.viewportPlaceIds
        .map(id => placeIndex.get(id))
        .filter((p): p is BuskingPlace => Boolean(p));
    }

    return places;
  }, [places, placeIndex, state.clusterPlaceIds, state.listScope, state.viewportPlaceIds]);

  const searchListQuery = usePerformanceLocationSearchList(state.searchQuery);

  const placesForSearchTab = useMemo(() => {
    const responses = searchListQuery.data?.performanceLocationSearchResponses ?? [];
    const adapted = adaptPerformanceLocationsToBuskingPlaces(responses);
    return sortPlacesByAnchor(adapted, state.searchAnchorCoordinate);
  }, [searchListQuery.data, state.searchAnchorCoordinate]);

  const sidebarPlaces = state.activeSidebarTab === 'search'
    ? placesForSearchTab
    : placesForPlacesTab;

  return {
    sidebar: {
      isOpen: state.isSidebarOpen,
      listScope: state.listScope as ListScope,
      activeTab: state.activeSidebarTab as SidebarTab,
      places: sidebarPlaces,
      focusedPlace,
    },
    detail: {
      isOpen: state.isSidebarOpen && selectedPlace !== null,
      place: selectedPlace,
    },
    actions: {
      onToggleSidebarButtonClick: actions.toggleSidebar,
      onSidebarTabClick: actions.setActiveSidebarTab,
      onListItemClick: actions.selectPlace,
      onFocusedCloseClick: actions.clearFocusedPlace,
      onExitClusterListClick: actions.exitClusterList,
      onDetailCloseClick: actions.clearSelectedPlace,
    },
  };
}
