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
  badgeReactRoot: Root;
  badgeLayerEl: HTMLDivElement;
}

interface RenderClusterBadge {
  (args: { count: number }): ReactElement;
}

interface ClickHandler {
  (): void;
}

export function useKakaoClusterer(
  map: kakao.maps.Map | null,
  markers: KakaoMarkerInputs[],
  options: UseKakaoClustererOptions,
  renderClusterBadge: RenderClusterBadge,
) {
  const clustererRef = useRef<kakao.maps.MarkerClusterer | null>(null);
  const markerByIdRef = useRef<Map<string, kakao.maps.Marker>>(new Map());

  // 마커 id별 클릭 핸들러 참조를 저장해 removeListener 수행
  const markerClickHandlerByIdRef = useRef<Map<string, ClickHandler>>(new Map());

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

  const isClustererEnabled = options.enabled;
  const clusterMinLevel = options.minLevel ?? 6;

  const cleanupTimerRef = useRef<number | null>(null);

  // clusterer 생성 + clustered/clusterclick 이벤트 연결 + overlay 배지 렌더링
  useEffect(() => {
    if (!isClustererEnabled || !map || !window.kakao?.maps) {
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

    const flushOverlayDisposals = () => {
      pendingDisposeMap.forEach((overlayEntry, overlay) => {
        const current = overlayRootMap.get(overlay);
        if (!current || current !== overlayEntry) {
          return;
        }

        overlayEntry.badgeReactRoot.unmount();
        overlayEntry.badgeLayerEl.remove();
        overlayRootMap.delete(overlay);
      });

      pendingDisposeMap.clear();
    };

    const scheduleFlushOverlayDisposals = () => {
      if (disposeTimer !== null) {
        return;
      }

      disposeTimer = window.setTimeout(() => {
        disposeTimer = null;
        flushOverlayDisposals();
      }, 0);
    };

    const queueOverlayDisposal = (overlay: kakao.maps.CustomOverlay, overlayEntry: OverlayEntry) => {
      if (pendingDisposeMap.has(overlay)) {
        return;
      }

      pendingDisposeMap.set(overlay, overlayEntry);
      overlayEntry.badgeReactRoot.render(null);
      scheduleFlushOverlayDisposals();
    };

    const clusterer = new kakaoMaps.MarkerClusterer({
      map,
      minLevel: clusterMinLevel,
      averageCenter: true,
      disableClickZoom: true,
    });

    clustererRef.current = clusterer;

    // overlay가 있으면 갱신, 없으면 생성해서 연결
    const upsertOverlay = (overlay: kakao.maps.CustomOverlay, count: number) => {
      const overlayEntry = overlayRootMap.get(overlay);

      if (!overlayEntry) {
        const content = overlay.getContent();
        const overlayContentEl = typeof content === 'string' ? document.createElement('div') : content;

        if (typeof content === 'string') {
          overlay.setContent(overlayContentEl);
        }

        overlayContentEl.style.width = `${CLUSTER_BADGE_SIZE_PX}px`;
        overlayContentEl.style.height = `${CLUSTER_BADGE_SIZE_PX}px`;
        overlayContentEl.style.cursor = 'pointer';
        overlayContentEl.style.position = 'relative';

        const badgeMountEl = document.createElement('div');
        badgeMountEl.style.position = 'absolute';
        badgeMountEl.style.inset = '0';
        badgeMountEl.style.width = '100%';
        badgeMountEl.style.height = '100%';
        badgeMountEl.style.pointerEvents = 'none';

        overlayContentEl.appendChild(badgeMountEl);

        const overlayReactRoot = createRoot(badgeMountEl);
        overlayReactRoot.render(renderRef.current({ count }));

        overlayRootMap.set(overlay, { badgeReactRoot: overlayReactRoot, badgeLayerEl: badgeMountEl });
        return;
      }

      overlayEntry.badgeReactRoot.render(renderRef.current({ count }));
    };

    // prune: 이번 clustered 계산에 포함되지 않은 overlay 정리
    const removeStaleOverlays = (activeOverlays: Set<kakao.maps.CustomOverlay>) => {
      overlayRootMap.forEach((overlayEntry, overlay) => {
        if (activeOverlays.has(overlay)) {
          return;
        }
        queueOverlayDisposal(overlay, overlayEntry);
      });
    };

    const handleClustered = (clusters: kakao.maps.Cluster[]) => {
      const activeOverlays = new Set<kakao.maps.CustomOverlay>();

      clusters.forEach((cluster) => {
        const overlay = cluster.getClusterMarker();
        activeOverlays.add(overlay);

        if (pendingDisposeMap.has(overlay)) {
          pendingDisposeMap.delete(overlay);
        }

        upsertOverlay(overlay, cluster.getSize());
      });

      removeStaleOverlays(activeOverlays);
    };

    // cluster 클릭 시 cluster에 포함된 markerIds를 추출해 상위로 전달
    const handleClusterClick = (cluster: kakao.maps.Cluster) => {
      const markerIdByInstance = markerIdByInstanceRef.current;
      const clusterMarkerInstances = cluster.getMarkers();

      const markerIds = clusterMarkerInstances
        .map(markerInstance => markerIdByInstance.get(markerInstance))
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

      overlayRootMap.forEach((overlayEntry, overlay) => {
        pendingDisposeMap.delete(overlay);
        entriesToDispose.push(overlayEntry);
      });

      overlayRootMap.clear();
      pendingDisposeMap.clear();

      cleanupTimerRef.current = window.setTimeout(() => {
        cleanupTimerRef.current = null;

        entriesToDispose.forEach((overlayEntry) => {
          overlayEntry.badgeReactRoot.unmount();
          overlayEntry.badgeLayerEl.remove();
        });
      }, 0);

      clusterer.clear();
      clustererRef.current = null;
    };
  }, [clusterMinLevel, isClustererEnabled, map]);

  // markers diff 동기화(add/remove/update 최소화) 후 redraw 1회
  useEffect(() => {
    if (!isClustererEnabled || !map || !window.kakao?.maps) {
      return;
    }

    const kakaoMaps = window.kakao.maps;
    const clusterer = clustererRef.current;

    if (!clusterer) {
      return;
    }

    const markerById = markerByIdRef.current;
    const markerClickHandlerById = markerClickHandlerByIdRef.current;
    const markerIdByInstance = markerIdByInstanceRef.current;

    const nextMarkerIds = new Set(markers.map(m => m.id));

    // 1) 제거: 다음 목록에 없는 마커는 리스너 해제 → clusterer 제거 → 지도 detach
    const markersToRemove: kakao.maps.Marker[] = [];

    markerById.forEach((markerInstance, markerId) => {
      if (nextMarkerIds.has(markerId)) {
        return;
      }

      const onMarkerClick = markerClickHandlerById.get(markerId);
      if (onMarkerClick) {
        kakaoMaps.event.removeListener(markerInstance, 'click', onMarkerClick);
        markerClickHandlerById.delete(markerId);
      }

      markersToRemove.push(markerInstance);
      markerIdByInstance.delete(markerInstance);
      markerById.delete(markerId);
    });

    if (markersToRemove.length > 0) {
      clusterer.removeMarkers(markersToRemove, false);
      markersToRemove.forEach((markerInstance) => {
        markerInstance.setMap(null);
      });
    }

    // 2) 추가 및 갱신: 있으면 위치 업데이트, 없으면 생성 + 클릭 리스너 등록
    const markersToAdd: kakao.maps.Marker[] = [];

    markers.forEach((input) => {
      const position = new kakaoMaps.LatLng(input.position.lat, input.position.lng);
      const markerInstance = markerById.get(input.id);

      if (markerInstance) {
        markerInstance.setPosition(position);

        // dev 환경에서 WeakMap 매핑이 비어있을 수 있어, 항상 역매핑을 보장
        markerIdByInstance.set(markerInstance, input.id);
        return;
      }

      const nextMarker = new kakaoMaps.Marker({ position });
      markerById.set(input.id, nextMarker);
      markerIdByInstance.set(nextMarker, input.id);

      const onMarkerClick = () => {
        onMarkerClickRef.current?.(input.id);
      };

      markerClickHandlerById.set(input.id, onMarkerClick);
      kakaoMaps.event.addListener(nextMarker, 'click', onMarkerClick);

      markersToAdd.push(nextMarker);
    });

    if (markersToAdd.length > 0) {
      clusterer.addMarkers(markersToAdd, false);
    }

    // 3) 일괄 redraw
    clusterer.redraw();

    // cleanup은 전체 destroy가 아니라 diff 전략을 유지해 깜빡임/비용
  }, [isClustererEnabled, map, markers]);
}
