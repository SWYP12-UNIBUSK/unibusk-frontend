'use client';

import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';

export function useKakaoMarkers(map: kakao.maps.Map | null, markers: KakaoMarkerInputs[]) {
  const markerMapRef = useRef<Record<string, kakao.maps.Marker>>({}); // 생성된 마커 재사용하기 위한 인스턴스 캐시
  const onClickMapRef = useRef<Record<string, (() => void) | undefined>>({}); // 클릭 callback을 최신 값으로 유지하기 위한 콜백 캐시

  useEffect(() => {
    if (!map) {
      return;
    }

    if (!window.kakao?.maps) {
      return;
    }

    const nextById: Record<string, KakaoMarkerInputs> = {};
    markers.forEach((m) => {
      nextById[m.id] = m;
      onClickMapRef.current[m.id] = m.onClick;
    });

    // 제거
    Object.keys(markerMapRef.current).forEach((id) => {
      if (nextById[id]) {
        return;
      }

      markerMapRef.current[id].setMap(null); // map 인스턴스 변경 guard
      delete markerMapRef.current[id];
      delete onClickMapRef.current[id];
    });

    // 갱신: 기존 마커를 유지하면서 신규 마커 갱신
    markers.forEach((m) => {
      const existing = markerMapRef.current[m.id];

      if (!existing) {
        const marker = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(m.position.lat, m.position.lng),
        });

        window.kakao.maps.event.addListener(marker, 'click', () => {
          onClickMapRef.current[m.id]?.();
        });

        marker.setMap(map);
        markerMapRef.current[m.id] = marker;
        return;
      }

      existing.setPosition(new window.kakao.maps.LatLng(m.position.lat, m.position.lng));
      existing.setMap(map);
    });
  }, [map, markers]);
}
