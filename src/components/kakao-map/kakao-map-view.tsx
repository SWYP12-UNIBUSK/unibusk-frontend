'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useKakaoLoader, useKakaoMap, useKakaoMarkers } from '@/hooks/kakao-map';
import { cn } from '@/utils';

interface KakaoMapViewProps {
  center: Coordinate;
  level?: number;
  markers?: KakaoMarkerInputs[];
  className?: string;
}

const EMPTY_MARKERS: KakaoMarkerInputs[] = [];

export function KakaoMapView({ center, level = 3, markers, className }: KakaoMapViewProps) {
  const { isLoaded, error } = useKakaoLoader();
  const { mapContainerRef, map } = useKakaoMap({ isLoaded, center, level });

  const safeMarkers = markers ?? EMPTY_MARKERS;

  // 에러 발생시 마커 레이어 비활성화를 통해 side effect 통제
  const markerLayerMap = error ? null : map;
  const markerLayerMarkers = error ? EMPTY_MARKERS : safeMarkers;

  useKakaoMarkers(markerLayerMap, markerLayerMarkers);

  return (
    <div className={cn('relative h-full w-full', className)} aria-busy={!isLoaded}>
      <div ref={mapContainerRef} className="h-full w-full" />

      {error
        ? (
            <div className="absolute inset-0" role="alert" aria-live="polite">
              지도 로딩 실패:
              {' '}
              {error.message}
            </div>
          )
        : null}
    </div>
  );
}
