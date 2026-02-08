'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types/kakao/kakao-map';
<<<<<<< HEAD
import { useCallback, useMemo, useRef } from 'react';
=======
import { useRef } from 'react';
>>>>>>> 89b65f0 (feat: viewport 리스트 동기화 및 클러스터 모드 이탈 처리)
import { CLUSTER_CLICK_GUARD_MS } from '@/constants/kakao-map';
import {
  useKakaoClusterer,
  useKakaoExitClusterListOnMapInteraction,
  useKakaoLoader,
  useKakaoMap,
  useKakaoMarkers,
  useKakaoViewportPlaceIds,
} from '@/hooks/kakao-map';
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

// 중심 좌표를 소수 5자리(≈ 1.1m)로 고정해 미세한 드리프트로 clusterKey가 흔들리는 걸 방지
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
  const listScope = useBuskingMapUiStore(state => state.listScope);

  const hasError = Boolean(error);
  const safeMarkers = markers ?? EMPTY_MARKERS;
  const isClustererEnabled = Boolean(enableClusterer && isLoaded && !hasError);

  const clusterLayerMap = hasError ? null : map;
  const clusterLayerMarkers = useMemo<KakaoMarkerInputs[]>(() => {
    if (!clusterLayerMap || hasError) {
      return EMPTY_MARKERS;
    }

    return safeMarkers;
  }, [clusterLayerMap, hasError, safeMarkers]);

  const lastClusterClickAtRef = useRef(0);

  useKakaoClusterer(
    clusterLayerMap,
    clusterLayerMarkers,
    {
      enabled: isClustererEnabled,
      minLevel: clusterMinLevel,
      isClusterListOpen: listScope === 'cluster',
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

<<<<<<< HEAD
  const handleViewportPlaceIdsChange = useCallback((placeIds: string[]) => {
    useBuskingMapUiStore.getState().setViewportPlaceIds(placeIds);
  }, []);

  const handleExitClusterList = useCallback(() => {
    useBuskingMapUiStore.getState().exitClusterList();
  }, []);

  useKakaoViewportPlaceIds({
    map: clusterLayerMap,
    markers: clusterLayerMarkers,
    enabled: Boolean(clusterLayerMap),
    onViewportPlaceIdsChange: handleViewportPlaceIdsChange,
  });

=======
  useKakaoViewportPlaceIds({
    map: clusterLayerMap,
    markers: clusterLayerMarkers,
    enabled: Boolean(clusterLayerMap && !hasError),
    onViewportPlaceIdsChange: (placeIds) => {
      useBuskingMapUiStore.getState().setViewportPlaceIds(placeIds);
    },
  });

>>>>>>> 89b65f0 (feat: viewport 리스트 동기화 및 클러스터 모드 이탈 처리)
  useKakaoExitClusterListOnMapInteraction({
    map,
    isClusterMode: listScope === 'cluster',
    clusterClickGuardMs: CLUSTER_CLICK_GUARD_MS,
    lastClusterClickAtMsRef: lastClusterClickAtRef,
<<<<<<< HEAD
    onExitClusterList: handleExitClusterList,
=======
    onExitClusterList: () => {
      useBuskingMapUiStore.getState().exitClusterList();
    },
>>>>>>> 89b65f0 (feat: viewport 리스트 동기화 및 클러스터 모드 이탈 처리)
  });

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
