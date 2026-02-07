'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';
import { useKakaoClusterer, useKakaoLoader, useKakaoMap, useKakaoMarkers } from '@/hooks/kakao-map';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { cn } from '@/utils';

import { ClusterBadge } from './cluster-badge';

interface KakaoMapViewProps {
  center: Coordinate;
  level?: number;
  markers?: KakaoMarkerInputs[];
  className?: string;
  enableClusterer?: boolean;
  clusterMinLevel?: number;
}

const EMPTY_MARKERS: KakaoMarkerInputs[] = [];
const DEFAULT_CLUSTER_MIN_LEVEL = 6;

function buildClusterKey(center: kakao.maps.LatLng) {
  const lat = center.getLat().toFixed(5);
  const lng = center.getLng().toFixed(5);
  return `${lat},${lng}`;
}

export function KakaoMapView({
  center,
  level = 3,
  markers,
  className,
  enableClusterer = true,
  clusterMinLevel = DEFAULT_CLUSTER_MIN_LEVEL,
}: KakaoMapViewProps) {
  const { isLoaded, error } = useKakaoLoader();
  const { mapContainerRef, map } = useKakaoMap({ isLoaded, center, level });

  const hasError = Boolean(error);
  const safeMarkers = markers ?? EMPTY_MARKERS;
  const isClustererEnabled = Boolean(enableClusterer && isLoaded && !hasError);

  const clusterLayerMap = hasError ? null : map;
  const clusterLayerMarkers = hasError ? EMPTY_MARKERS : safeMarkers;

  const lastClusterClickAtRef = useRef(0);

  useKakaoClusterer(
    clusterLayerMap,
    clusterLayerMarkers,
    {
      enabled: isClustererEnabled,
      minLevel: clusterMinLevel,
      onMarkerClick: (markerId) => {
        useBuskingMapUiStore.getState().focusPlace(markerId);
      },
      onClusterClick: (cluster, markerIds) => {
        lastClusterClickAtRef.current = Date.now();
        const clusterKey = buildClusterKey(cluster.getCenter());
        useBuskingMapUiStore.getState().openClusterList(clusterKey, markerIds);
      },
    },
    ({ count, isActive = false }) => <ClusterBadge count={count} isActive={isActive} />,
  );

  const markerLayerMap = hasError ? null : (isClustererEnabled ? null : map);
  const markerLayerMarkers = hasError || isClustererEnabled ? EMPTY_MARKERS : safeMarkers;

  useKakaoMarkers(markerLayerMap, markerLayerMarkers);

  useEffect(() => {
    if (!map || !window.kakao?.maps) {
      return;
    }

    const kakaoMaps = window.kakao.maps;

    const handleMapClick = () => {
      const now = Date.now();
      if (now - lastClusterClickAtRef.current < 80) {
        return;
      }

      const { listScope, exitClusterList } = useBuskingMapUiStore.getState();
      if (listScope !== 'cluster') {
        return;
      }

      exitClusterList();
    };

    kakaoMaps.event.addListener(map, 'click', handleMapClick);

    return () => {
      kakaoMaps.event.removeListener(map, 'click', handleMapClick);
    };
  }, [map]);

  return (
    <div className={cn('relative h-full w-full', className)} aria-busy={!isLoaded}>
      <div ref={mapContainerRef} className="h-full w-full" />

      {error
        ? (
            <div className="absolute inset-0" role="alert">
              지도 로딩 실패:
              {' '}
              {error.message}
            </div>
          )
        : null}
    </div>
  );
}
