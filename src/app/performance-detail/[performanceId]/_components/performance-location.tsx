'use client';

import type { Coordinate } from '@/types/kakao/kakao-map';
import { LocateFixed } from 'lucide-react';
import { useCallback, useMemo } from 'react';
import { useKakaoLoader } from '@/hooks/kakao-map/use-kakao-loader';
import { useKakaoMap } from '@/hooks/kakao-map/use-kakao-map';
import { useKakaoMarkers } from '@/hooks/kakao-map/use-kakao-markers';

interface PerformanceLocationProps {
  coordinate: Coordinate;
}

export function PerformanceLocation({ coordinate }: PerformanceLocationProps) {
  const { isLoaded, error } = useKakaoLoader();
  const { mapContainerRef, map } = useKakaoMap({ isLoaded, center: coordinate, level: 3 });

  const markers = useMemo(
    () => [{ id: 'performance-location', position: coordinate }],
    [coordinate],
  );

  useKakaoMarkers(map, markers);

  const handleReset = useCallback(() => {
    if (!map) {
      return;
    }

    map.setCenter(new window.kakao.maps.LatLng(coordinate.lat, coordinate.lng));
    map.setLevel(3);
  }, [map, coordinate]);

  return (
    <div className="border-b-2 border-gray-200 pt-5 pb-12.5">
      <h3 className="py-2.5 typo-title-b-5 text-black">위치 안내</h3>
      <div className="relative mt-3.75 h-100 w-full overflow-hidden rounded-lg">
        {error
          ? (
              <div
                className={`
                  flex h-full items-center justify-center text-gray-400
                `}
                role="alert"
              >
                지도를 불러오지 못했습니다.
              </div>
            )
          : (
              <>
                <div ref={mapContainerRef} className="h-full w-full" />
                {!isLoaded && (
                  <div
                    className={`
                      absolute inset-0 flex items-center justify-center
                    `}
                    role="status"
                  >
                    로딩중...
                  </div>
                )}
                {isLoaded && map && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className={`
                      absolute right-3 bottom-3 z-10 flex cursor-pointer
                      items-center gap-1.5 rounded-full bg-white px-3 py-1.5
                      typo-caption-r-1 text-gray-700 shadow-md
                      hover:bg-gray-50
                    `}
                  >
                    <LocateFixed className="h-3.5 w-3.5" />
                    위치 초기화
                  </button>
                )}
              </>
            )}
      </div>
    </div>
  );
}
