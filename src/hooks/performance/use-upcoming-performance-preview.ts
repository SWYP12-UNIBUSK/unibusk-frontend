'use client';

import { useQuery } from '@tanstack/react-query';
import { getUpcomingPerformancePreview } from '@/apis/performance/performance.api';
import { performanceKeys } from '@/queries/performance/performance.keys';

export function useUpcomingPerformancePreview() {
  return useQuery({
    queryKey: performanceKeys.upcomingPreview(),
    queryFn: () => getUpcomingPerformancePreview(),
    staleTime: 1000 * 60 * 5,
  });
}
