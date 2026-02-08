import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';
import { isSameOrderedIds } from '@/utils/id-equals';

interface UseKakaoViewportPlaceIdsProps {
  map: kakao.maps.Map | null;
  markers: KakaoMarkerInputs[];
  enabled?: boolean;
  onViewportPlaceIdsChange: (placeIds: string[]) => void;
}

// client 전용 hook
export function useKakaoViewportPlaceIds({
  map,
  markers,
  enabled = true,
  onViewportPlaceIdsChange,
}: UseKakaoViewportPlaceIdsProps) {
  const lastViewportPlaceIdsRef = useRef<string[]>([]);
  const onChangeRef = useRef(onViewportPlaceIdsChange);
  onChangeRef.current = onViewportPlaceIdsChange;

  useEffect(() => {
    if (!enabled || !map || !window.kakao?.maps) {
      const prevIds = lastViewportPlaceIdsRef.current;
      if (prevIds.length > 0) {
        lastViewportPlaceIdsRef.current = [];
        onChangeRef.current([]);
      }
      return;
    }

    const kakaoMaps = window.kakao.maps;

    // 지도 idle(드래그/줌 종료) 시점에 현재 bounds 내 placeId만 계산해 반영
    const syncViewportPlaceIds = () => {
      const bounds = map.getBounds();
      const southWest = bounds.getSouthWest();
      const northEast = bounds.getNorthEast();

      const southLatitude = southWest.getLat();
      const westLongitude = southWest.getLng();
      const northLatitude = northEast.getLat();
      const eastLongitude = northEast.getLng();

      const nextIds: string[] = [];

      markers.forEach((marker) => {
        const { lat, lng } = marker.position;

        if (lat < southLatitude || lat > northLatitude) {
          return;
        }

        if (lng < westLongitude || lng > eastLongitude) {
          return;
        }

        nextIds.push(marker.id);
      });

      const prevIds = lastViewportPlaceIdsRef.current;
      if (isSameOrderedIds(prevIds, nextIds)) {
        return;
      }

      lastViewportPlaceIdsRef.current = nextIds;
      onChangeRef.current(nextIds);
    };

    syncViewportPlaceIds();
    kakaoMaps.event.addListener(map, 'idle', syncViewportPlaceIds);

    return () => {
      kakaoMaps.event.removeListener(map, 'idle', syncViewportPlaceIds);
    };
  }, [enabled, map, markers]);
}
