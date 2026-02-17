'use client';

import type { Coordinate } from '@/types/kakao/kakao-map';
import { useCallback, useEffect, useRef } from 'react';
import { Header } from '@/components/common/header';
import { useBuskingMapUiStore } from '@/stores/busking-map';

interface BuskingMapHeaderSectionProps {
  initialSearchQuery?: string;
}

export function BuskingMapHeaderSection({ initialSearchQuery }: BuskingMapHeaderSectionProps) {
  const map = useBuskingMapUiStore(state => state.map);
  const searchQuery = useBuskingMapUiStore(state => state.searchQuery);

  const openSidebar = useBuskingMapUiStore(state => state.openSidebar);
  const openSearchResults = useBuskingMapUiStore(state => state.openSearchResults);
  const clearSearchQuery = useBuskingMapUiStore(state => state.clearSearchQuery);
  const setActiveSidebarTab = useBuskingMapUiStore(state => state.setActiveSidebarTab);

  const didInitFromSearchParamsRef = useRef(false);

  const clearSearchResults = useCallback(() => {
    clearSearchQuery();
    setActiveSidebarTab('places');
  }, [clearSearchQuery, setActiveSidebarTab]);

  const handleSearch = useCallback((searchKeyword: string) => {
    const keyword = searchKeyword.trim();

    if (keyword === '') {
      clearSearchResults();
      return;
    }

    const center = map?.getCenter();
    const originCoordinate: Coordinate | null = center
      ? { lat: center.getLat(), lng: center.getLng() }
      : null;

    openSidebar();
    openSearchResults(keyword, originCoordinate);
  }, [map, openSidebar, openSearchResults, clearSearchResults]);

  useEffect(() => {
    if (didInitFromSearchParamsRef.current) {
      return;
    }

    const trimmed = initialSearchQuery?.trim() ?? '';
    if (trimmed === '') {
      didInitFromSearchParamsRef.current = true;
      return;
    }

    didInitFromSearchParamsRef.current = true;

    openSidebar();
    openSearchResults(trimmed, null);
  }, [initialSearchQuery, openSearchResults, openSidebar]);

  return (
    <Header
      layout="SEARCH"
      onSearch={handleSearch}
      onSearchClear={clearSearchResults}
      initialSearchKeyword={initialSearchQuery?.trim() || searchQuery || undefined}
    />
  );
}
