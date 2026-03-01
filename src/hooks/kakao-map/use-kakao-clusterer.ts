'use client';

import type { ReactElement } from 'react';
import type { Root } from 'react-dom/client';
import type { KakaoMarkerInputs } from '@/types/kakao/kakao-map';
import { useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { CLUSTER_BADGE_SIZE_PX } from '@/constants/busking-map';
import { buildClusterKeyFromCenter } from '@/utils/kakao-map/build-cluster-key-from-center';

interface UseKakaoClustererOptions {
  enabled: boolean;
  minLevel?: number;
  isClusterListOpen?: boolean;
  onMarkerClick?: (markerId: string) => void;
  onClusterClick?: (cluster: kakao.maps.Cluster, markerIds: string[]) => void;
}

interface OverlayEntry {
  badgeReactRoot: Root;
  badgeLayerEl: HTMLDivElement;
  containerEl: HTMLDivElement;
  count: number;

  // clusterclick이 content 교체로 끊기는 케이스가 있어, DOM click 브릿지를 위해 보관
  cluster: kakao.maps.Cluster | null;
  markerIds: string[];
}

interface RenderClusterBadge {
  (args: { count: number; isActive: boolean }): ReactElement;
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

  // clusterKey별 React root/container를 추적해 배지를 갱신하고 누수 없이 정리
  const overlayEntryByClusterKeyRef = useRef<Map<string, OverlayEntry>>(new Map());

  // 마지막으로 클릭된 클러스터 key(배지 active 스타일용)
  const activeClusterKeyRef = useRef<string | null>(null);

  // 최신 동작 보장
  const renderRef = useRef(renderClusterBadge);
  renderRef.current = renderClusterBadge;

  const onMarkerClickRef = useRef(options.onMarkerClick);
  onMarkerClickRef.current = options.onMarkerClick;

  const onClusterClickRef = useRef(options.onClusterClick);
  onClusterClickRef.current = options.onClusterClick;

  const isClustererEnabled = options.enabled;
  const clusterMinLevel = options.minLevel ?? 6;
  const isClusterListOpen = options.isClusterListOpen ?? false;

  const cleanupTimerRef = useRef<number | null>(null);

  // cluster badge isActive 상태 해제 동작
  useEffect(() => {
    if (!isClustererEnabled || !map) {
      return;
    }

    if (isClusterListOpen) {
      return;
    }

    const prevActiveClusterKey = activeClusterKeyRef.current;
    if (!prevActiveClusterKey) {
      return;
    }

    activeClusterKeyRef.current = null;

    const overlayEntry = overlayEntryByClusterKeyRef.current.get(prevActiveClusterKey);
    if (!overlayEntry) {
      return;
    }

    overlayEntry.badgeReactRoot.render(renderRef.current({ count: overlayEntry.count, isActive: false }));
  }, [isClusterListOpen, isClustererEnabled, map]);

  // 언마운트 시 마커 클릭 리스너와 내부 ref를 정리해 누수/중복 이벤트를 방지
  useEffect(() => {
    const markerById = markerByIdRef.current;
    const markerClickHandlerById = markerClickHandlerByIdRef.current;

    return () => {
      if (cleanupTimerRef.current !== null) {
        window.clearTimeout(cleanupTimerRef.current);
        cleanupTimerRef.current = null;
      }

      const kakaoEvt = window.kakao?.maps?.event;
      if (kakaoEvt) {
        markerClickHandlerById.forEach((handler, markerId) => {
          const marker = markerById.get(markerId);

          if (marker) {
            kakaoEvt.removeListener(marker, 'click', handler);
          }
        });
      }

      markerClickHandlerById.clear();
      markerById.clear();
      markerIdByInstanceRef.current = new WeakMap();
    };
  }, []);

  // clusterer 생성 + clustered 이벤트 연결 + overlay 배지 렌더링
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
    const overlayEntryByClusterKey = overlayEntryByClusterKeyRef.current;

    const pendingDisposeMap = new Map<string, OverlayEntry>();
    let disposeTimer: number | null = null;

    const ensureOverlayContent = (overlay: kakao.maps.CustomOverlay, containerEl: HTMLDivElement) => {
      const content = overlay.getContent();
      if (typeof content === 'string' || content !== containerEl) {
        overlay.setContent(containerEl);
      }
    };

    const renderEntry = (clusterKey: string) => {
      const overlayEntry = overlayEntryByClusterKey.get(clusterKey);
      if (!overlayEntry) {
        return;
      }

      const isActive = activeClusterKeyRef.current === clusterKey;
      overlayEntry.badgeReactRoot.render(renderRef.current({ count: overlayEntry.count, isActive }));
    };

    const flushOverlayDisposals = () => {
      pendingDisposeMap.forEach((overlayEntry, clusterKey) => {
        const current = overlayEntryByClusterKey.get(clusterKey);
        if (!current || current !== overlayEntry) {
          return;
        }

        if (activeClusterKeyRef.current === clusterKey) {
          activeClusterKeyRef.current = null;
        }

        overlayEntry.containerEl.onclick = null;

        overlayEntry.badgeReactRoot.unmount();
        overlayEntry.badgeLayerEl.remove();
        overlayEntry.containerEl.remove();

        overlayEntryByClusterKey.delete(clusterKey);
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

    const queueOverlayDisposal = (clusterKey: string, overlayEntry: OverlayEntry) => {
      if (pendingDisposeMap.has(clusterKey)) {
        return;
      }

      pendingDisposeMap.set(clusterKey, overlayEntry);
      scheduleFlushOverlayDisposals();
    };

    const clusterer = new kakaoMaps.MarkerClusterer({
      map,
      minLevel: clusterMinLevel,
      averageCenter: true,
      disableClickZoom: true,
    });

    clustererRef.current = clusterer;

    // clusterer 재생성 시 기존 마커를 새 clusterer에 재등록해 빈 클러스터러 상태를 방지
    const existingMarkers: kakao.maps.Marker[] = [];

    markerByIdRef.current.forEach((markerInstance) => {
      existingMarkers.push(markerInstance);
    });

    if (existingMarkers.length > 0) {
      clusterer.addMarkers(existingMarkers, false);
      clusterer.redraw();
    }

    // clusterKey가 있으면 갱신, 없으면 생성해서 연결
    // overlay 인스턴스가 교체되어도 같은 clusterKey면 동일 DOM/ReactRoot를 setContent로 재부착
    const upsertOverlay = (
      clusterKey: string,
      overlay: kakao.maps.CustomOverlay,
      cluster: kakao.maps.Cluster,
      markerIds: string[],
      count: number,
    ) => {
      const overlayEntry = overlayEntryByClusterKey.get(clusterKey);
      const isActive = activeClusterKeyRef.current === clusterKey;

      if (!overlayEntry) {
        const containerEl = document.createElement('div');
        containerEl.style.width = `${CLUSTER_BADGE_SIZE_PX}px`;
        containerEl.style.height = `${CLUSTER_BADGE_SIZE_PX}px`;
        containerEl.style.cursor = 'pointer';
        containerEl.style.position = 'relative';
        // 브라우저 기본 focus outline 삭제
        containerEl.style.outline = 'none';
        containerEl.style.border = '0';
        containerEl.style.boxShadow = 'none';
        containerEl.style.background = 'transparent';
        containerEl.tabIndex = -1;

        const badgeMountEl = document.createElement('div');
        badgeMountEl.style.position = 'absolute';
        badgeMountEl.style.inset = '0';
        badgeMountEl.style.width = '100%';
        badgeMountEl.style.height = '100%';
        badgeMountEl.style.pointerEvents = 'none';

        containerEl.appendChild(badgeMountEl);

        ensureOverlayContent(overlay, containerEl);

        const overlayReactRoot = createRoot(badgeMountEl);
        overlayReactRoot.render(renderRef.current({ count, isActive }));

        overlayEntryByClusterKey.set(clusterKey, {
          badgeReactRoot: overlayReactRoot,
          badgeLayerEl: badgeMountEl,
          containerEl,
          count,
          cluster,
          markerIds,
        });

        // clusterclick이 content 교체로 끊기는 케이스가 있어, DOM click으로 전이를 보장합니다.
        containerEl.onclick = (event: MouseEvent) => {
          event.preventDefault();
          event.stopPropagation();

          const prevActiveClusterKey = activeClusterKeyRef.current;
          if (prevActiveClusterKey !== clusterKey) {
            activeClusterKeyRef.current = clusterKey;

            if (prevActiveClusterKey) {
              renderEntry(prevActiveClusterKey);
            }
          }

          renderEntry(clusterKey);

          const entry = overlayEntryByClusterKey.get(clusterKey);
          if (!entry || !entry.cluster) {
            return;
          }

          onClusterClickRef.current?.(entry.cluster, entry.markerIds);
        };

        return;
      }

      overlayEntry.count = count;
      overlayEntry.cluster = cluster;
      overlayEntry.markerIds = markerIds;

      ensureOverlayContent(overlay, overlayEntry.containerEl);
      overlayEntry.badgeReactRoot.render(renderRef.current({ count, isActive }));
    };

    // prune: 이번 clustered 계산에 포함되지 않은 clusterKey 정리
    const removeStaleEntries = (activeClusterKeys: Set<string>) => {
      overlayEntryByClusterKey.forEach((overlayEntry, clusterKey) => {
        if (activeClusterKeys.has(clusterKey)) {
          return;
        }

        queueOverlayDisposal(clusterKey, overlayEntry);
      });
    };

    const handleClustered = (clusters: kakao.maps.Cluster[]) => {
      const activeClusterKeys = new Set<string>();
      const markerIdByInstance = markerIdByInstanceRef.current;

      clusters.forEach((cluster) => {
        const clusterKey = buildClusterKeyFromCenter(cluster.getCenter());
        activeClusterKeys.add(clusterKey);

        if (pendingDisposeMap.has(clusterKey)) {
          pendingDisposeMap.delete(clusterKey);
        }

        const markerIds = cluster.getMarkers()
          .map(markerInstance => markerIdByInstance.get(markerInstance))
          .filter((id): id is string => Boolean(id));

        const overlay = cluster.getClusterMarker();
        upsertOverlay(clusterKey, overlay, cluster, markerIds, cluster.getSize());
      });

      removeStaleEntries(activeClusterKeys);
    };

    kakaoMaps.event.addListener(clusterer, 'clustered', handleClustered);

    return () => {
      kakaoMaps.event.removeListener(clusterer, 'clustered', handleClustered);

      if (disposeTimer !== null) {
        window.clearTimeout(disposeTimer);
        disposeTimer = null;
      }

      // overlay React root 정리(배치 처리)
      const entriesToDispose: OverlayEntry[] = [];

      overlayEntryByClusterKey.forEach((overlayEntry, clusterKey) => {
        pendingDisposeMap.delete(clusterKey);
        overlayEntry.containerEl.onclick = null;
        entriesToDispose.push(overlayEntry);
      });

      overlayEntryByClusterKey.clear();
      pendingDisposeMap.clear();

      cleanupTimerRef.current = window.setTimeout(() => {
        cleanupTimerRef.current = null;
        activeClusterKeyRef.current = null;

        entriesToDispose.forEach((overlayEntry) => {
          overlayEntry.badgeReactRoot.unmount();
          overlayEntry.badgeLayerEl.remove();
          overlayEntry.containerEl.remove();
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
