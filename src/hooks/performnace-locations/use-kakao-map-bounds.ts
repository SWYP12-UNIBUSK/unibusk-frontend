'use client';

import type { PerformanceLocationsQuery } from '@/apis/performance-locations';
import { useEffect, useMemo, useRef, useState } from 'react';

function normalizeBounds(bounds: kakao.maps.LatLngBounds): PerformanceLocationsQuery {
  const northEast = bounds.getNorthEast();
  const southWest = bounds.getSouthWest();

  return {
    north: northEast.getLat(),
    east: northEast.getLng(),
    south: southWest.getLat(),
    west: southWest.getLng(),
  };
}

function isSameBounds(a: PerformanceLocationsQuery | null, b: PerformanceLocationsQuery | null) {
  if (!a || !b) {
    return false;
  }

  return (
    a.north === b.north
    && a.south === b.south
    && a.east === b.east
    && a.west === b.west
  );
}

export function useKakaoMapBounds(map: kakao.maps.Map | null) {
  const [bounds, setBounds] = useState<PerformanceLocationsQuery | null>(null);
  const handlerRef = useRef<(() => void) | null>(null);

  const stableSetBounds = useMemo(() => {
    return (next: PerformanceLocationsQuery) => {
      setBounds((prev) => {
        if (isSameBounds(prev, next)) {
          return prev;
        }
        return next;
      });
    };
  }, []);

  useEffect(() => {
    if (!map) {
      return;
    }

    handlerRef.current = () => {
      const nextBounds = normalizeBounds(map.getBounds());
      stableSetBounds(nextBounds);
    };

    const onIdle = () => {
      handlerRef.current?.();
    };

    kakao.maps.event.addListener(map, 'idle', onIdle);

    // 최초 1회 즉시 동기화
    onIdle();

    return () => {
      kakao.maps.event.removeListener(map, 'idle', onIdle);
    };
  }, [map, stableSetBounds]);

  return bounds;
}
