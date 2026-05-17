'use client';

import type { PerformanceFilterTab } from '@/types/performance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { performanceListInfiniteQueryOptions } from '@/queries/performance';
import { PerformanceList } from './performance-list';

interface PerformanceListModeProps {
  /** 공연 필터 타입 */
  validTab: PerformanceFilterTab;
}

/** 일반 공연 목록 모드 (SSR prefetch 활용) */
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
