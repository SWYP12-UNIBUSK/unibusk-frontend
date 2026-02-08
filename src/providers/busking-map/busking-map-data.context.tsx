'use client';

/* eslint-disable react-refresh/only-export-components */

import type { ReactNode } from 'react';
import type { BuskingPlace } from '@/types/busking-map/busking-place';
import { createContext, use, useMemo } from 'react';
import { useKakaoMapBounds, usePerformanceLocationsMap } from '@/hooks/performnace-locations';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { adaptPerformanceLocationsToBuskingPlaces } from '@/utils/busking-map';

interface BuskingMapDataContextValue {
  places: BuskingPlace[];
  isLoading: boolean;
}

const BuskingMapDataContext = createContext<BuskingMapDataContextValue | null>(null);

interface BuskingMapDataProviderProps {
  children: ReactNode;
}

export function BuskingMapDataProvider({ children }: BuskingMapDataProviderProps) {
  const map = useBuskingMapUiStore(state => state.map);
  const bounds = useKakaoMapBounds(map);

  const { data, isLoading } = usePerformanceLocationsMap(bounds);

  const places = useMemo<BuskingPlace[]>(() => {
    const locations = data?.locations ?? [];
    return adaptPerformanceLocationsToBuskingPlaces(locations);
  }, [data]);

  const value = useMemo<BuskingMapDataContextValue>(() => {
    return { places, isLoading };
  }, [places, isLoading]);

  return <BuskingMapDataContext value={value}>{children}</BuskingMapDataContext>;
}

export function useBuskingMapData() {
  const context = use(BuskingMapDataContext);
  if (!context) {
    throw new Error('버스킹맵 data는 BuskingMapDataProvider 안에 위치해야합니다.');
  }
  return context;
}
