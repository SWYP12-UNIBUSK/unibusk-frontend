import type { PerformanceFilterTab } from '@/types/performance';
import { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';
import { getPerformanceDetail, getPerformanceList, getSearchPerformanceList } from '@/apis/performance';
import { performanceKeys } from './performance.keys';

/** 공연 목록 무한 스크롤 쿼리 옵션 */
export function performanceListInfiniteQueryOptions(filter: PerformanceFilterTab) {
  return infiniteQueryOptions({
    queryKey: performanceKeys.list(filter),
    queryFn: async ({ pageParam, signal }) => {
      return getPerformanceList(filter, pageParam, { signal });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.hasNext ? lastPage.page + 1 : undefined,
  });
}

/**
 * 공연 검색 무한 스크롤 쿼리 옵션
 * - enabled: 검색어가 있을 때만 실행
 */
export function performanceSearchInfiniteQueryOptions(
  filter: PerformanceFilterTab,
  keyword: string,
) {
  return infiniteQueryOptions({
    queryKey: performanceKeys.search(filter, keyword),
    queryFn: async ({ pageParam, signal }) => {
      return getSearchPerformanceList(keyword, filter, pageParam, { signal });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.hasNext ? lastPage.page + 1 : undefined,
    /** 검색어가 있을 때만 쿼리 실행 (성능 최적화) */
    enabled: keyword.trim().length > 0,
  });
}

/** 공연 상세 조회 쿼리 옵션 */
export function performanceDetailQueryOptions(performanceId: number) {
  return queryOptions({
    queryKey: performanceKeys.detail(performanceId),
    queryFn: async ({ signal }) => {
      return getPerformanceDetail(performanceId, { signal });
    },
  });
}
