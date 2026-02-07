'use client';

import type { ReactElement } from 'react';
import type { Root } from 'react-dom/client';
import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { CLUSTER_BADGE_SIZE_PX } from '@/constants/busking-map';

interface UseKakaoClustererOptions {
  enabled: boolean;
  minLevel?: number;
  onMarkerClick?: (markerId: string) => void;
  onClusterClick?: (cluster: kakao.maps.Cluster, markerIds: string[]) => void;
}

interface OverlayEntry {
  root: Root;
  container: HTMLDivElement;
}

type RenderClusterBadge = (args: { count: number }) => ReactElement;
type ClickHandler = () => void;

export function useKakaoClusterer(
  map: kakao.maps.Map | null,
  markers: KakaoMarkerInputs[],
  options: UseKakaoClustererOptions,
  renderClusterBadge: RenderClusterBadge,
) {
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const markerByIdRef = useRef<Map<string, kakao.maps.Marker>>(new Map());

  // 마커 id별 클릭 핸들러 참조를 저장해 removeListener 수행
  const clickHandlerByIdRef = useRef<Map<string, ClickHandler>>(new Map());

  // 마커 인스턴스 → id 역매핑(WeakMap: 마커 GC 시 매핑도 함께 정리)
  const markerIdByInstanceRef = useRef<WeakMap<kakao.maps.Marker, string>>(new WeakMap());

  // CustomOverlay별 React root/container를 추적해 배지를 갱신하고 누수 없이 정리
  const overlayRootMapRef = useRef<Map<kakao.maps.CustomOverlay, OverlayEntry>>(new Map());

  // 최신 동작 보장
  const renderRef = useRef(renderClusterBadge);
  renderRef.current = renderClusterBadge;

  const onMarkerClickRef = useRef(options.onMarkerClick);
  onMarkerClickRef.current = options.onMarkerClick;

  const onClusterClickRef = useRef(options.onClusterClick);
  onClusterClickRef.current = options.onClusterClick;

  const enabled = options.enabled;
  const minLevel = options.minLevel ?? 6;

  const cleanupTimerRef = useRef<number | null>(null);

  // clusterer 생성 + clustered/clusterclick 이벤트 연결 + overlay 배지 렌더링
  useEffect(() => {
    if (!enabled || !map || !window.kakao?.maps) {
      return;
    }

    if (cleanupTimerRef.current !== null) {
      window.clearTimeout(cleanupTimerRef.current);
      cleanupTimerRef.current = null;
    }

    const kakaoMaps = window.kakao.maps;

    // 로컬 변수 캡처로 cleanup에서 동일 참조를 사용(Ref 변경 경고 방지)
    const overlayRootMap = overlayRootMapRef.current;

    const pendingDisposeMap = new Map<kakao.maps.CustomOverlay, OverlayEntry>();
    let disposeTimer: number | null = null;

    const flushDisposes = () => {
      pendingDisposeMap.forEach((entry, overlay) => {
        const current = overlayRootMap.get(overlay);
        if (!current || current !== entry) {
          return;
        }

        entry.root.unmount();
        entry.container.remove();
        overlayRootMap.delete(overlay);
      });

      pendingDisposeMap.clear();
    };

    const scheduleFlushDisposes = () => {
      if (disposeTimer !== null) {
        return;
      }

      disposeTimer = window.setTimeout(() => {
        disposeTimer = null;
        flushDisposes();
      }, 0);
    };

    const queueDispose = (overlay: kakao.maps.CustomOverlay, entry: OverlayEntry) => {
      if (pendingDisposeMap.has(overlay)) {
        return;
      }

      pendingDisposeMap.set(overlay, entry);
      entry.root.render(null);
      scheduleFlushDisposes();
    };

    const clusterer = new kakaoMaps.MarkerClusterer({
      map,
      minLevel,
      averageCenter: true,
      disableClickZoom: true,
    });

    clustererRef.current = clusterer;

    // overlay가 있으면 갱신, 없으면 생성해서 연결
    const upsertOverlay = (overlay: kakao.maps.CustomOverlay, count: number) => {
      const existing = overlayRootMap.get(overlay);

      if (!existing) {
        const container = document.createElement('div');

        // 초기 렌더 전에 컨테이너 크기를 선고정해 배지 위치 스냅을 최소화
        container.style.width = `${CLUSTER_BADGE_SIZE_PX}px`;
        container.style.height = `${CLUSTER_BADGE_SIZE_PX}px`;

        const root = createRoot(container);

        overlay.setContent(container);
        root.render(renderRef.current({ count }));

        overlayRootMap.set(overlay, { root, container });
        return;
      }

      existing.root.render(renderRef.current({ count }));
      overlay.setContent(existing.container);
    };

    // prune: 이번 clustered 계산에 포함되지 않은 overlay 정리
    const pruneOverlays = (aliveOverlays: Set<kakao.maps.CustomOverlay>) => {
      overlayRootMap.forEach((entry, overlay) => {
        if (aliveOverlays.has(overlay)) {
          return;
        }
        queueDispose(overlay, entry);
      });
    };

    const handleClustered = (clusters: kakao.maps.Cluster[]) => {
      const aliveOverlays = new Set<kakao.maps.CustomOverlay>();

      clusters.forEach((cluster) => {
        const overlay = cluster.getClusterMarker();
        aliveOverlays.add(overlay);

        if (pendingDisposeMap.has(overlay)) {
          pendingDisposeMap.delete(overlay);
        }

        upsertOverlay(overlay, cluster.getSize());
      });

      pruneOverlays(aliveOverlays);
    };

    // cluster 클릭 시 cluster에 포함된 markerIds를 추출해 상위로 전달
    const handleClusterClick = (cluster: kakao.maps.Cluster) => {
      const markerIdByInstance = markerIdByInstanceRef.current;
      const clusterMarkerInstances = cluster.getMarkers();

      const markerIds = clusterMarkerInstances
        .map(m => markerIdByInstance.get(m))
        .filter((id): id is string => Boolean(id));

      onClusterClickRef.current?.(cluster, markerIds);
    };

    kakaoMaps.event.addListener(clusterer, 'clustered', handleClustered);
    kakaoMaps.event.addListener(clusterer, 'clusterclick', handleClusterClick);

    return () => {
      kakaoMaps.event.removeListener(clusterer, 'clustered', handleClustered);
      kakaoMaps.event.removeListener(clusterer, 'clusterclick', handleClusterClick);

      if (disposeTimer !== null) {
        window.clearTimeout(disposeTimer);
        disposeTimer = null;
      }

      // overlay React root 정리(배치 처리)
      const entriesToDispose: OverlayEntry[] = [];

      overlayRootMap.forEach((entry, overlay) => {
        pendingDisposeMap.delete(overlay);
        entriesToDispose.push(entry);
      });

      overlayRootMap.clear();
      pendingDisposeMap.clear();

      cleanupTimerRef.current = window.setTimeout(() => {
        cleanupTimerRef.current = null;

        entriesToDispose.forEach((entry) => {
          entry.root.unmount();
          entry.container.remove();
        });
      }, 0);

      clusterer.clear();
      clustererRef.current = null;
    };
  }, [enabled, map, minLevel]);

  // markers diff 동기화(add/remove/update 최소화) 후 redraw 1회
  useEffect(() => {
    if (!enabled || !map || !window.kakao?.maps) {
      return;
    }

    const kakaoMaps = window.kakao.maps;
    const clusterer = clustererRef.current;

    if (!clusterer) {
      return;
    }

    const markerById = markerByIdRef.current;
    const clickHandlerById = clickHandlerByIdRef.current;
    const markerIdByInstance = markerIdByInstanceRef.current;

    const nextIds = new Set(markers.map(m => m.id));

    // 1) 제거: 다음 목록에 없는 마커는 리스너 해제 → clusterer 제거 → 지도 detach
    const markersToRemove: kakao.maps.Marker[] = [];

    markerById.forEach((marker, id) => {
      if (nextIds.has(id)) {
        return;
      }

      const handler = clickHandlerById.get(id);
      if (handler) {
        kakaoMaps.event.removeListener(marker, 'click', handler);
        clickHandlerById.delete(id);
      }

      markersToRemove.push(marker);
      markerIdByInstance.delete(marker);
      markerById.delete(id);
    });

    if (markersToRemove.length > 0) {
      clusterer.removeMarkers(markersToRemove, false);
      markersToRemove.forEach((m) => {
        m.setMap(null);
      });
    }

    // 2) 추가 및 갱신: 있으면 위치 업데이트, 없으면 생성 + 클릭 리스너 등록
    const markersToAdd: kakao.maps.Marker[] = [];

    markers.forEach((input) => {
      const position = new kakaoMaps.LatLng(input.position.lat, input.position.lng);
      const existing = markerById.get(input.id);

      if (existing) {
        existing.setPosition(position);
        return;
      }

      const marker = new kakaoMaps.Marker({ position });
      markerById.set(input.id, marker);
      markerIdByInstance.set(marker, input.id);

      const handler = () => {
        onMarkerClickRef.current?.(input.id);
      };

      clickHandlerById.set(input.id, handler);
      kakaoMaps.event.addListener(marker, 'click', handler);

      markersToAdd.push(marker);
    });

    if (markersToAdd.length > 0) {
      clusterer.addMarkers(markersToAdd, false);
    }

    // 3) 일괄 redraw
    clusterer.redraw();

    // cleanup은 전체 destroy가 아니라 diff 전략을 유지해 깜빡임/비용
  }, [enabled, map, markers]);
}
