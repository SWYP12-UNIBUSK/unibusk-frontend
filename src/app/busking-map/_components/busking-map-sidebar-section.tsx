'use client';

import { useEffect, useMemo } from 'react';

import { useBuskingMapData } from '@/providers/busking-map/busking-map-data.context';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { SidebarShell } from './sidebar-shell';

export function BuskingMapSidebarSection() {
  const { places } = useBuskingMapData();

  const listScope = useBuskingMapUiStore(state => state.listScope);
  const setViewportPlaceIds = useBuskingMapUiStore(state => state.setViewportPlaceIds);
  const clearViewportPlaceIds = useBuskingMapUiStore(state => state.clearViewportPlaceIds);

  const viewportIds = useMemo(() => {
    return places
      .slice()
      .sort((a, b) => a.id.localeCompare(b.id))
      .map(place => place.id);
  }, [places]);

  useEffect(() => {
    if (listScope !== 'viewport') {
      return;
    }

    if (viewportIds.length === 0) {
      clearViewportPlaceIds();
      return;
    }

    setViewportPlaceIds(viewportIds);
  }, [listScope, viewportIds, setViewportPlaceIds, clearViewportPlaceIds]);

  return <SidebarShell places={places} />;
}
