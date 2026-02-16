import type { BuskingPlace, SidebarTab } from '@/types/busking-map/busking-place';
import type { Coordinate } from '@/types/kakao/kakao-map';
import { useMemo } from 'react';
import { useShallow } from 'zustand/react/shallow';

import { useBuskingMapUiStore } from '@/stores/busking-map';
import { adaptPerformanceLocationsToBuskingPlaces, createBuskingPlaceIndex, sortPlacesByAnchor } from '@/utils/busking-map';
import { usePerformanceLocationSearchList } from '../performance-locations';

export function useSidebarShellModel(places: BuskingPlace[]) {
  const state = useBuskingMapUiStore(
    useShallow(s => ({
      isSidebarOpen: s.isSidebarOpen,
      listScope: s.listScope,
      clusterPlaceIds: s.clusterPlaceIds,
      viewportPlaceIds: s.viewportPlaceIds,

      selectedPlaceId: s.selectedPlaceId,
      focusedPlaceId: s.focusedPlaceId,

      activeSidebarTab: s.activeSidebarTab as SidebarTab,
      searchQuery: s.searchQuery,
      searchAnchorCoordinate: s.searchAnchorCoordinate as Coordinate | null,
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

  const { data: searchListData } = usePerformanceLocationSearchList(state.searchQuery);

  const searchLocationDtos = useMemo(() => {
    return searchListData?.performanceLocationSearchResponses ?? [];
  }, [searchListData]);

  const searchTabPlaces = useMemo(() => {
    const adapted = adaptPerformanceLocationsToBuskingPlaces(searchLocationDtos);
    return sortPlacesByAnchor(adapted, state.searchAnchorCoordinate);
  }, [searchLocationDtos, state.searchAnchorCoordinate]);

  const placeIndex = useMemo(() => {
    return createBuskingPlaceIndex([...places, ...searchTabPlaces]);
  }, [places, searchTabPlaces]);

  const selectedPlace = state.selectedPlaceId
    ? placeIndex.get(state.selectedPlaceId) ?? null
    : null;

  const focusedPlace = state.focusedPlaceId
    ? placeIndex.get(state.focusedPlaceId) ?? null
    : null;

  const placesTabPlaces = useMemo(() => {
    const placeIds = state.listScope === 'cluster' ? state.clusterPlaceIds : state.viewportPlaceIds;

    return placeIds
      .map(id => placeIndex.get(id))
      .filter((place): place is BuskingPlace => Boolean(place));
  }, [placeIndex, state.clusterPlaceIds, state.listScope, state.viewportPlaceIds]);

  const activePlaces = state.activeSidebarTab === 'search' ? searchTabPlaces : placesTabPlaces;

  return {
    sidebar: {
      isOpen: state.isSidebarOpen,
      mode: state.listScope,
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
      onListItemClick: actions.selectPlace,
      onFocusedCloseClick: actions.clearFocusedPlace,
      onExitClusterListClick: actions.exitClusterList,
      onDetailCloseClick: actions.clearSelectedPlace,
      onSidebarTabClick: actions.setActiveSidebarTab,
    },
  };
}
