'use client';

import { useCallback } from 'react';
import { Header } from '@/components/common/header';
import { useBuskingMapUiStore } from '@/stores/busking-map';

export function BuskingMapHeaderSection() {
  const map = useBuskingMapUiStore(state => state.map);
  const searchQuery = useBuskingMapUiStore(state => state.searchQuery);

  const openSidebar = useBuskingMapUiStore(state => state.openSidebar);
  const setSearchQuery = useBuskingMapUiStore(state => state.setSearchQuery);
  const clearSearchQuery = useBuskingMapUiStore(state => state.clearSearchQuery);

  const handleSearch = useCallback((searchKeyword: string) => {
    const keyword = searchKeyword.trim();

    if (keyword === '') {
      clearSearchQuery();
      return;
    }

    openSidebar();

    const center = map?.getCenter();
    if (!center) {
      setSearchQuery(keyword);
      return;
    }

    setSearchQuery(keyword);
  }, [map, openSidebar, setSearchQuery, clearSearchQuery]);

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-header">
      <div className="pointer-events-auto px-5.5 pt-1.25">
        <Header
          layout="SEARCH"
          onSearch={handleSearch}
          initialSearchKeyword={searchQuery}
        />
      </div>
    </div>
  );
}
