'use client';

import { useEffect, useRef } from 'react';

interface LatLng { lat: number; lng: number }

interface UseKakaoMapProps {
  isLoaded: boolean;
  center: LatLng;
  level: number;
}

export function useKakaoMap({ isLoaded, center, level }: UseKakaoMapProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<kakao.maps.Map | null>(null);

  const centerLat = center.lat;
  const centerLng = center.lng;

  // 지도 한 번만 생성함을 보장하기 위한 Effect
  useEffect(() => {
    // !isLoaded: SDK 로드 전, !mapContainerRef.current: DOM 준비 전, mapRef.current: 이미 지도 instance 존재
    if (!isLoaded || !containerRef.current || mapRef.current) {
      return;
    }

    const map = new window.kakao.maps.Map(containerRef.current, {
      center: new window.kakao.maps.LatLng(centerLat, centerLng),
      level,
    });

    mapRef.current = map;
  }, [isLoaded, level, centerLat, centerLng]);

  // 지도 중앙 좌표 설정
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    mapRef.current.setCenter(new window.kakao.maps.LatLng(centerLat, centerLng));
  }, [centerLat, centerLng]);

  return { containerRef, mapRef };
}
