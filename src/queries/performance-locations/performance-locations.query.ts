import { infiniteQueryOptions } from '@tanstack/react-query';
import { getPerformanceLocationSearch } from '@/apis/performance-locations/performance-location.api';
import { performanceLocationKeys } from './performance-locations.key';

/**
 * 장소 검색 무한 스크롤 쿼리 옵션
 * - enabled: 검색어가 있을 때만 실행
 */
export function performanceLocationSearchInfiniteQueryOptions(
  keyword: string,
) {
  return infiniteQueryOptions({
    queryKey: performanceLocationKeys.search(keyword),
    queryFn: async ({ pageParam, signal }) => {
      // 페이지 파라미터는 0부터 시작
      return getPerformanceLocationSearch(keyword, pageParam, { signal });
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => lastPage.hasNext ? lastPage.currentPage + 1 : undefined,
    enabled: keyword.trim().length > 0,
  });
}
