'use client';

import type { BuskingPlace } from '@/types/busking-map';
import type { Coordinate } from '@/types/kakao/kakao-map';
import { useEffect, useMemo, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { usePerformanceLocationSearchList } from '@/hooks/performance-locations';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import {
  adaptPerformanceLocationsToBuskingPlaces,
  createBuskingPlaceIndex,
  panToCoordinate,
} from '@/utils/busking-map';

export function useSidebarShellModel(places: BuskingPlace[]) {
  const state = useBuskingMapUiStore(
    useShallow(s => ({
      isSidebarOpen: s.isSidebarOpen,
      listScope: s.listScope,
      clusterPlaceIds: s.clusterPlaceIds,
      viewportPlaceIds: s.viewportPlaceIds,

      selectedPlaceId: s.selectedPlaceId,
      focusedPlaceId: s.focusedPlaceId,

      searchQuery: s.searchQuery,
      activeSidebarTab: s.activeSidebarTab,
      searchAnchorCoordinate: s.searchAnchorCoordinate as Coordinate | null,

      map: s.map,
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

  const trimmedSearchQuery = state.searchQuery.trim();

  const { data: searchListData } = usePerformanceLocationSearchList(trimmedSearchQuery);

  const searchLocationDtos = useMemo(() => {
    return searchListData?.performanceLocationSearchResponses ?? [];
  }, [searchListData]);

  const searchTabPlaces = useMemo(() => {
    return adaptPerformanceLocationsToBuskingPlaces(searchLocationDtos);
  }, [searchLocationDtos]);

  const placeIndex = useMemo(() => {
    return createBuskingPlaceIndex([...places, ...searchTabPlaces]);
  }, [places, searchTabPlaces]);

  const selectedPlace = state.selectedPlaceId
    ? placeIndex.get(state.selectedPlaceId) ?? null
    : null;

  const focusedPlace = state.focusedPlaceId
    ? placeIndex.get(state.focusedPlaceId) ?? null
    : null;

  const placesTabMode = state.listScope === 'cluster' ? 'cluster' : 'viewport';

  const placesTabPlaces = useMemo(() => {
    if (state.listScope === 'cluster') {
      return state.clusterPlaceIds
        .map(id => placeIndex.get(id))
        .filter((p): p is BuskingPlace => Boolean(p));
    }

    return state.viewportPlaceIds
      .map(id => placeIndex.get(id))
      .filter((p): p is BuskingPlace => Boolean(p));
  }, [placeIndex, state.clusterPlaceIds, state.listScope, state.viewportPlaceIds]);

  const activeMode = state.activeSidebarTab === 'search' ? 'search' : placesTabMode;

  const activePlaces = state.activeSidebarTab === 'search' ? searchTabPlaces : placesTabPlaces;

  const lastAutoPanKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (state.activeSidebarTab !== 'search') {
      return;
    }

    if (!trimmedSearchQuery) {
      lastAutoPanKeyRef.current = null;
      return;
    }

    if (!state.map) {
      return;
    }

    const nearest = searchTabPlaces[0];
    if (!nearest) {
      return;
    }

    const autoPanKey = `${trimmedSearchQuery}:${nearest.id}`;
    if (lastAutoPanKeyRef.current === autoPanKey) {
      return;
    }

    lastAutoPanKeyRef.current = autoPanKey;
    panToCoordinate(state.map, { lat: nearest.lat, lng: nearest.lng });
  }, [searchTabPlaces, state.activeSidebarTab, state.map, trimmedSearchQuery]);

  function handleListItemClick(placeId: string) {
    const clickedPlace = placeIndex.get(placeId) ?? null;

    if (state.activeSidebarTab === 'search' && clickedPlace && state.map) {
      panToCoordinate(state.map, { lat: clickedPlace.lat, lng: clickedPlace.lng });
    }

    actions.selectPlace(placeId);
  }

  return {
    sidebar: {
      isOpen: state.isSidebarOpen,
      mode: activeMode,
      listScope: state.listScope,
      activeTab: state.activeSidebarTab,
      places: activePlaces,
      focusedPlace,
    },
    detail: {
      isOpen: state.isSidebarOpen && selectedPlace !== null,
      place: selectedPlace,
    },
    actions: {
      onToggleSidebarButtonClick: actions.toggleSidebar,
      onTabClick: actions.setActiveSidebarTab,
      onListItemClick: handleListItemClick,
      onFocusedCloseClick: actions.clearFocusedPlace,
      onExitClusterListClick: actions.exitClusterList,
      onDetailCloseClick: actions.clearSelectedPlace,
    },
  };
}
