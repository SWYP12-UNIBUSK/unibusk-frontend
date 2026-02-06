import type { PerformanceFilterTab } from '@/types/performance';
import { infiniteQueryOptions } from '@tanstack/react-query';
import { getPerformanceList } from '@/apis/performance/performance.api';
import { performanceKeys } from './performance.keys';

/**
 * 공연 목록 무한 스크롤 쿼리 옵션
 *
 * TanStack Query의 useInfiniteQuery와 함께 사용하여
 * 페이지네이션된 공연 목록을 무한 스크롤로 불러옵니다.
 *
 * @param filter - 조회할 공연 필터 ('upcoming' 또는 'past')
 * @returns TanStack Query infiniteQueryOptions 객체
 *
 * @example
 * // useSuspenseInfiniteQuery와 함께 사용
 * const { data, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery(
 *   performanceListInfiniteQueryOptions('upcoming')
 * );
 *
 * // 모든 페이지의 데이터를 하나의 배열로 합치기
 * const performances = data.pages.flatMap(page => page.content);
 */
export function performanceListInfiniteQueryOptions(filter: PerformanceFilterTab) {
  return infiniteQueryOptions({
    /** 쿼리 캐시 키 (필터별로 독립적인 캐시 유지) */
    queryKey: performanceKeys.list(filter),
    /** 페이지 데이터를 가져오는 함수 */
    queryFn: async ({ pageParam, signal }) => {
      return getPerformanceList(filter, pageParam, { signal });
    },
    /** 첫 페이지 번호 */
    initialPageParam: 0,
    /** 다음 페이지 번호를 계산하는 함수 (hasNext가 false면 undefined 반환) */
    getNextPageParam: lastPage => lastPage.hasNext ? lastPage.page + 1 : undefined,
    /** 데이터가 신선한 것으로 간주되는 시간 (5분) */
    staleTime: 5 * 60 * 1000,
  });
}
