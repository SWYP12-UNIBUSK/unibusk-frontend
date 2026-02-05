'use client';

import type { Coordinate } from '@/types/kakao/kakao-map';
import { useCallback, useEffect, useRef, useState } from 'react';

interface UseKakaoMapProps {
  isLoaded: boolean;
  center: Coordinate;
  level: number;
}

export function useKakaoMap({ isLoaded, center, level }: UseKakaoMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  const centerLat = center.lat;
  const centerLng = center.lng;

  // 콜백 ref로 컨테이너 DOM이 실제로 붙는 순간(node)만 잡아 지도 초기화를 1회 수행하기 위해 저장
  const setMapContainerRef = useCallback(
    (node: HTMLDivElement | null) => {
      mapContainerRef.current = node;

      // SDK 미로드(isLoaded), 컨테이너 DOM 미준비(node), 이미 생성됨(mapRef), Kakao Maps 미주입(window.kakao.maps)
      if (!isLoaded || !node || mapRef.current || !window.kakao?.maps) {
        return;
      }

      const instance = new window.kakao.maps.Map(node, {
        center: new window.kakao.maps.LatLng(centerLat, centerLng),
        level,
      });

      mapRef.current = instance;
      setMap(instance); // 외부(마커 레이어 등)에서 map 값을 사용할 수 있도록 state로 노출
    },
    [isLoaded, centerLat, centerLng, level],
  );

  // 지도 중앙 좌표 설정
  useEffect(() => {
    if (!map) {
      return;
    }

    map.setCenter(new window.kakao.maps.LatLng(centerLat, centerLng));
    map.setLevel(level);
  }, [map, centerLat, centerLng, level]);

  return { mapContainerRef: setMapContainerRef, map };
}
