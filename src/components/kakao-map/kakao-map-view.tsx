'use client';

import type { Coordinate, KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect } from 'react';

import { DEFAULT_CLUSTER_MIN_LEVEL, DEFAULT_LEVEL } from '@/constants/kakao-map';
import { useKakaoClusterer } from '@/hooks/kakao-map/use-kakao-clusterer';
import { useKakaoLoader } from '@/hooks/kakao-map/use-kakao-loader';
import { useKakaoMap } from '@/hooks/kakao-map/use-kakao-map';
import { useKakaoMarkers } from '@/hooks/kakao-map/use-kakao-markers';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { cn } from '@/utils';
import { ClusterBadge } from './cluster-badge';

interface KakaoMapViewProps {
  center: Coordinate;
  level?: number;
  markers: KakaoMarkerInputs[];
  className?: string;
  enableClusterer?: boolean;
  clusterMinLevel?: number;
}

function buildClusterKeyFromCenter(center: kakao.maps.LatLng) {
  return `${center.getLat().toFixed(5)},${center.getLng().toFixed(5)}`;
}

export function KakaoMapView({
  center,
  level = DEFAULT_LEVEL,
  markers,
  className,
  enableClusterer = true,
  clusterMinLevel = DEFAULT_CLUSTER_MIN_LEVEL,
}: KakaoMapViewProps) {
  const { isLoaded, error } = useKakaoLoader();
  const hasError = Boolean(error);

  const { mapContainerRef, map } = useKakaoMap({
    isLoaded,
    center,
    level,
  });

  const setMap = useBuskingMapUiStore(state => state.setMap);

  const focusPlace = useBuskingMapUiStore(state => state.focusPlace);
  const openClusterList = useBuskingMapUiStore(state => state.openClusterList);
  const listScope = useBuskingMapUiStore(state => state.listScope);

  const isClusterListOpen = listScope === 'cluster';

  useEffect(() => {
    setMap(map);
    return () => {
      setMap(null);
    };
  }, [map, setMap]);

  useKakaoClusterer(
    map,
    markers,
    {
      enabled: enableClusterer,
      minLevel: clusterMinLevel,
      isClusterListOpen,
      onMarkerClick: (markerId) => {
        focusPlace(markerId);
      },
      onClusterClick: (cluster, markerIds) => {
        const clusterKey = buildClusterKeyFromCenter(cluster.getCenter());
        openClusterList(clusterKey, markerIds);
      },
    },
    ({ count, isActive }) => <ClusterBadge count={count} isActive={isActive} />,
  );

  useKakaoMarkers(enableClusterer ? null : map, markers);

  if (hasError) {
    return (
      <div className={cn('relative h-full w-full', className)} role="alert">
        지도를 불러오지 못했습니다.
      </div>
    );
  }

  return (
    <div className={cn('relative h-full w-full', className)} aria-busy={!isLoaded}>
      <div ref={mapContainerRef} className="h-full w-full" />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center" role="status">
          로딩중...
        </div>
      )}
    </div>
  );
}
