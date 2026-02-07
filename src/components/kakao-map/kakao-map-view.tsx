'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useKakaoClusterer, useKakaoLoader, useKakaoMap, useKakaoMarkers } from '@/hooks/kakao-map';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { cn } from '@/utils';

import { ClusterBadge } from './cluster-badge';

interface KakaoMapViewProps {
  center: Coordinate;
  level?: number;
  markers?: KakaoMarkerInputs[];
  className?: string;
  enableClusterer?: boolean; // 클러스터링 필요 여부
  clusterMinLevel?: number; // 기본 레벨
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

  // 1) clusterer 레이어
  useKakaoClusterer(
    clusterLayerMap,
    clusterLayerMarkers,
    {
      enabled: isClustererEnabled,
      minLevel: clusterMinLevel,

      // 1단 focused 모드
      onMarkerClick: (markerId) => {
        useBuskingMapUiStore.getState().focusPlace(markerId);
      },

      // listScope='cluster' 모드
      onClusterClick: (cluster, markerIds) => {
        const clusterKey = buildClusterKey(cluster.getCenter());
        useBuskingMapUiStore.getState().openClusterList(clusterKey, markerIds);
      },
    },
    ({ count }) => <ClusterBadge count={count} />,
  );

  // 2) marker 레이어(클러스터러 모드일 때는 비활성)
  const markerLayerMap = hasError ? null : (isClustererEnabled ? null : map);
  const markerLayerMarkers = hasError || isClustererEnabled ? EMPTY_MARKERS : safeMarkers;

  useKakaoMarkers(markerLayerMap, markerLayerMarkers);

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
