'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types';
import { useKakaoLoader, useKakaoMap } from '@/hooks';

interface KakaoMapViewProps {
  center: Coordinate;
  level?: number;
  markers?: KakaoMarkerInputs[];
  className?: string;
}

export function KakaoMapView({ center, level = 3, className }: KakaoMapViewProps) {
  const { isLoaded, error } = useKakaoLoader();
  const { containerRef } = useKakaoMap({ isLoaded, center, level });

  if (error) {
    return (
      <div className={className}>
        지도 로딩 실패:
        {error.message}
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
