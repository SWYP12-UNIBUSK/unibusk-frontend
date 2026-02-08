'use client';

import type { Performances } from '@/types/performance';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { routePaths } from '@/utils';
import { PerformanceCard } from './performance-card';

interface PerformanceListProps {
  /** 표시할 공연 목록 배열 */
  performances: Performances;
  /** 다음 페이지를 불러오는 콜백 함수 */
  onLoadMore?: () => void;
  /** 다음 페이지 존재 여부 */
  hasMore?: boolean;
  /** 다음 페이지 로딩 중 여부 */
  isLoading?: boolean;
}

/**
 * 공연 목록 컴포넌트 (Client Component)
 *
 * Intersection Observer를 사용하여 무한 스크롤을 구현합니다.
 * 사용자가 목록 하단에 도달하면 자동으로 다음 페이지를 불러옵니다.
 */
export function PerformanceList({
  performances,
  onLoadMore,
  hasMore,
  isLoading,
}: PerformanceListProps) {
  /** Intersection Observer 타겟 요소 참조 */
  const observerTarget = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * 공연 상세 페이지로 이동
   * 현재 탭 정보(tab)를 쿼리 파라미터로 함께 전달합니다.
   */
  const handlePerformanceClick = useCallback((performanceId: number) => {
    const currentTab = searchParams.get('tab') ?? 'upcoming';
    const targetPath = routePaths.performanceDetail(performanceId);

    router.push(`${targetPath}?tab=${currentTab}`);
  }, [router, searchParams]);

  /**
   * Intersection Observer를 사용한 무한 스크롤 구현
   *
   * 타겟 요소가 뷰포트에 50% 이상 보이면 다음 페이지를 자동으로 로드합니다.
   */
  useEffect(() => {
    if (!observerTarget.current || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // 타겟이 뷰포트에 진입하고, 더 불러올 데이터가 있고, 로딩 중이 아닐 때
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          onLoadMore?.();
        }
      },
      { threshold: 0.5 }, // 요소의 50%가 보일 때 트리거
    );

    observer.observe(observerTarget.current);

    return () => observer.disconnect();
  }, [hasMore, isLoading, onLoadMore]);

  const performanceCards = useMemo(
    () =>
      performances.map(performance => (
        <PerformanceCard
          key={performance.performanceId}
          performance={performance}
          onClick={handlePerformanceClick}
          className="w-full"
        />
      )),
    [performances, handlePerformanceClick],
  );

  return (
    <div>
      <div className={`
        grid w-full grid-cols-1 gap-6
        sm:grid-cols-2
        lg:grid-cols-3
        xl:grid-cols-4
      `}
      >
        {performanceCards}
      </div>
      {hasMore && (
        <div
          ref={observerTarget}
          className="flex h-20 items-center justify-center"
        >
          {isLoading && <div>로딩 중...</div>}
        </div>
      )}

    </div>

  );
}
