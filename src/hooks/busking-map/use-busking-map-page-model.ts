'use client';

import type { Bounds, BuskingPlace } from '@/types/busking-map/busking-place';
import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useMemo, useState } from 'react';
import { adaptPerformanceLocationsToBuskingPlaces } from '@/utils/busking-map';
import { useKakaoMapBounds, usePerformanceLocationsMap } from '../performnace-locations';

interface UseBuskingMapPageModelResult {
  setMap: (map: kakao.maps.Map) => void;
  bounds: Bounds | null;

  places: BuskingPlace[];
  markers: KakaoMarkerInputs[];

  isPending: boolean;
  isError: boolean;
}

const EMPTY_MARKERS: KakaoMarkerInputs[] = [];

export function useBuskingMapPageModel(): UseBuskingMapPageModelResult {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const bounds = useKakaoMapBounds(map);
  const { data, isPending, isError } = usePerformanceLocationsMap(bounds);

  const places = useMemo<BuskingPlace[]>(() => {
    const locations = data?.locations ?? [];
    return adaptPerformanceLocationsToBuskingPlaces(locations);
  }, [data]);

  const markers = useMemo<KakaoMarkerInputs[]>(() => {
    if (places.length === 0) {
      return EMPTY_MARKERS;
    }

    return places.map(place => ({
      id: place.id,
      position: { lat: place.lat, lng: place.lng },
    }));
  }, [places]);

  return {
    setMap,
    bounds,
    places,
    markers,
    isPending,
    isError,
  };
}
