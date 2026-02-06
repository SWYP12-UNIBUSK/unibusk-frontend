'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { performanceListInfiniteQueryOptions } from '@/queries/performance';
import { PerformanceList } from './performance-list';

interface PerformanceListModeProps {
  /** 조회할 공연 필터 ('upcoming' 또는 'past') */
  validTab: PerformanceFilterTab;
}

/**
 * 일반 공연 목록 모드 컴포넌트 (Client Component)
 *
 * useSuspenseInfiniteQuery를 사용하여 일반 공연 목록을 무한 스크롤로 불러옵니다.
 * Server Component에서 prefetch된 데이터를 활용하여 초기 로딩 성능을 최적화합니다.
 */
export function PerformanceListMode({ validTab }: PerformanceListModeProps) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage }
    = useSuspenseInfiniteQuery(performanceListInfiniteQueryOptions(validTab));

  const performances = data.pages.flatMap(page => page.content);

  return (
    <PerformanceList
      performances={performances}
      onLoadMore={fetchNextPage}
      hasMore={hasNextPage}
      isLoading={isFetchingNextPage}
    />
  );
}
