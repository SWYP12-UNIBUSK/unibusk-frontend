import { useEffect, useRef } from 'react';

interface UseKakaoExitClusterListOnMapInteractionProps {
  map: kakao.maps.Map | null;
  isClusterMode: boolean;
  clusterClickGuardMs: number;
  lastClusterClickAtMsRef: React.RefObject<number>;
  onExitClusterList: () => void;
}

// client 전용 hook
export function useKakaoExitClusterListOnMapInteraction({
  map,
  isClusterMode,
  clusterClickGuardMs,
  lastClusterClickAtMsRef,
  onExitClusterList,
}: UseKakaoExitClusterListOnMapInteractionProps) {
  const onExitRef = useRef(onExitClusterList);
  onExitRef.current = onExitClusterList;

  useEffect(() => {
    if (!map || !window.kakao?.maps) {
      return;
    }

    const kakaoMaps = window.kakao.maps;

    const exitClusterListIfNeeded = () => {
      if (!isClusterMode) {
        return;
      }

      onExitRef.current();
    };

    const isRecentClusterClick = () => {
      const now = Date.now();
      return now - lastClusterClickAtMsRef.current < clusterClickGuardMs;
    };

    const handleMapClick = () => {
      if (isRecentClusterClick()) {
        return;
      }

      exitClusterListIfNeeded();
    };

    const handleDragStart = () => {
      exitClusterListIfNeeded();
    };

    const handleZoomChanged = () => {
      const now = Date.now();
      if (now - lastClusterClickAtMsRef.current < clusterClickGuardMs) {
        return;
      }

      exitClusterListIfNeeded();
    };

    kakaoMaps.event.addListener(map, 'click', handleMapClick);
    kakaoMaps.event.addListener(map, 'dragstart', handleDragStart);
    kakaoMaps.event.addListener(map, 'zoom_changed', handleZoomChanged);

    return () => {
      kakaoMaps.event.removeListener(map, 'click', handleMapClick);
      kakaoMaps.event.removeListener(map, 'dragstart', handleDragStart);
      kakaoMaps.event.removeListener(map, 'zoom_changed', handleZoomChanged);
    };
  }, [clusterClickGuardMs, isClusterMode, lastClusterClickAtMsRef, map]);
}
