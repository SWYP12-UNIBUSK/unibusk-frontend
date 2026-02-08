'use client';

import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useMemo } from 'react';

import { KakaoMapView } from '@/components/kakao-map/kakao-map-view';
import { DEFAULT_CENTER, DEFAULT_LEVEL } from '@/constants/kakao-map';
import { useBuskingMapData } from '@/providers/busking-map/busking-map-data.context';

export function BuskingMapMapSection() {
  const { places } = useBuskingMapData();

  const markers: KakaoMarkerInputs[] = useMemo(() => {
    return places.map((place) => {
      return {
        id: place.id,
        position: { lat: place.lat, lng: place.lng },
      };
    });
  }, [places]);

  return (
    <KakaoMapView
      className="h-full w-full"
      center={DEFAULT_CENTER}
      level={DEFAULT_LEVEL}
      markers={markers}
    />
  );
}
