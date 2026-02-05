'use client';

import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';

type MarkerMapProps = Record<string, kakao.maps.Marker>; // 생성된 마커 재사용하기 위한 인스턴스 캐시
type OnClickMapProps = Record<string, (() => void) | undefined>; // id 기준 최신 onClick 콜백 캐시
type ClickHandlerMapProps = Record<string, (() => void) | undefined>; // id 기준 addListener에 전달한 handler 캐시(removeListener용)

function removeMarkerById(
  id: string,
  markerMap: MarkerMapProps,
  onClickMap: OnClickMapProps,
  clickHandlerMap: ClickHandlerMapProps,
) {
  const marker = markerMap[id];
  if (!marker) {
    return;
  }

  const handler = clickHandlerMap[id];
  if (handler && window.kakao?.maps?.event?.removeListener) {
    window.kakao.maps.event.removeListener(marker, 'click', handler);
  }

  // 실제 지도에서 마커 제거
  marker.setMap(null);

  delete markerMap[id];
  delete onClickMap[id];
  delete clickHandlerMap[id];
}

// 현재 캐시에 존재하는 모든 마커를 제거
function clearAllMarkers(markerMap: MarkerMapProps, onClickMap: OnClickMapProps, clickHandlerMap: ClickHandlerMapProps) {
  Object.keys(markerMap).forEach((id) => {
    removeMarkerById(id, markerMap, onClickMap, clickHandlerMap);
  });
}

export function useKakaoMarkers(map: kakao.maps.Map | null, markers: KakaoMarkerInputs[]) {
  const markerMapRef = useRef<MarkerMapProps>({});
  const onClickMapRef = useRef<OnClickMapProps>({});
  const clickHandlerMapRef = useRef<ClickHandlerMapProps>({});

  useEffect(() => {
    if (!window.kakao?.maps) {
      return;
    }

    const markerMap = markerMapRef.current;
    const onClickMap = onClickMapRef.current;
    const clickHandlerMap = clickHandlerMapRef.current;

    if (!map) {
      clearAllMarkers(markerMap, onClickMap, clickHandlerMap);
      return;
    }

    // 다음 markers를 id로 인덱싱(존재 여부 및 제거 판단에 사용)
    const nextById: Record<string, KakaoMarkerInputs> = {};
    markers.forEach((m) => {
      nextById[m.id] = m;

      onClickMap[m.id] = m.onClick;
    });

    // 제거
    Object.keys(markerMap).forEach((id) => {
      if (nextById[id]) {
        return;
      }

      removeMarkerById(id, markerMap, onClickMap, clickHandlerMap);
    });

    // 기존 마커를 유지하면서 마커 추가 갱신
    markers.forEach((m) => {
      const existing = markerMap[m.id];
      const position = new window.kakao.maps.LatLng(m.position.lat, m.position.lng);

      if (!existing) {
        const marker = new window.kakao.maps.Marker({ position });

        const handleClick = () => {
          onClickMap[m.id]?.();
        };

        clickHandlerMap[m.id] = handleClick;
        window.kakao.maps.event.addListener(marker, 'click', handleClick);

        marker.setMap(map);
        markerMap[m.id] = marker;
        return;
      }

      // 기존 마커는 위치만 갱신
      existing.setPosition(position);

      if (existing.getMap() !== map) {
        existing.setMap(map);
      }
    });
  }, [map, markers]);

  // 언마운트 정리
  useEffect(() => {
    const markerMap = markerMapRef.current;
    const onClickMap = onClickMapRef.current;
    const clickHandlerMap = clickHandlerMapRef.current;

    return () => {
      if (!window.kakao?.maps) {
        return;
      }

      // 페이지 이동/컴포넌트 제거 시 마커/리스너/캐시를 정리
      clearAllMarkers(markerMap, onClickMap, clickHandlerMap);
    };
  }, []);
}
