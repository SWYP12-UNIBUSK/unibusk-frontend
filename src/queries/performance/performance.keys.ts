import type { PerformanceFilterTab } from '@/types/performance';

/**
 * Performance 관련 Query Key 팩토리
 *
 * @example
 * // 모든 performance 쿼리 무효화
 * queryClient.invalidateQueries({ queryKey: performanceKeys.all });
 *
 * // 특정 탭의 리스트만 무효화
 * queryClient.invalidateQueries({ queryKey: performanceKeys.list('upcoming') });
 *
 */
export const performanceKeys = {
  all: ['performance'] as const,
  lists: () => [...performanceKeys.all, 'list'] as const,
  list: (filter: PerformanceFilterTab) => [...performanceKeys.lists(), filter] as const,
  searches: () => [...performanceKeys.all, 'search'] as const,
  search: (filter: PerformanceFilterTab, keyword: string) => [...performanceKeys.searches(), filter, keyword] as const,
  detail: (performanceId: number) => [...performanceKeys.all, 'detail', performanceId] as const,

  // 장소별 공연 목록
  performances: () => [...performanceKeys.all, 'performances'] as const,
  upcomingPerformances: (performanceLocationId: number) =>
    [...performanceKeys.performances(), 'upcoming', performanceLocationId] as const,
  pastPerformances: (performanceLocationId: number) =>
    [...performanceKeys.performances(), 'past', performanceLocationId] as const,

} as const;
