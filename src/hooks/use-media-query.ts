import { useSyncExternalStore } from 'react';

/**
 * CSS 미디어 쿼리 결과를 구독하는 훅. 쿼리 조건의 참/거짓이 바뀔 때만 리렌더됩니다.
 *
 * @param query - 표준 CSS 미디어 쿼리 문자열
 * @returns 쿼리가 현재 뷰포트에 일치하면 `true`, 아니면 `false`
 *
 * @example
 * // 단일 브레이크포인트
 * const isMobile = useMediaQuery('(max-width: 767px)');
 *
 * @example
 * // 범위 지정
 * const isTablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
 *
 * @example
 * // 기기 특성 감지
 * const isTouchDevice = useMediaQuery('(hover: none) and (pointer: coarse)');
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (callback) => {
      const media = window.matchMedia(query);
      media.addEventListener('change', callback);

      return () => media.removeEventListener('change', callback);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
