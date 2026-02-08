'use client';

import type { PerformanceLocationSearchListResponseDto } from '@/apis/performance-locations';

import { useQuery } from '@tanstack/react-query';
import { getPerformanceLocationSearchList } from '@/apis/performance-locations';
import { performanceLocationKeys } from '@/queries/performance-locations';

export function usePerformanceLocationSearchList(keyword: string) {
  const trimmedKeyword = keyword.trim();
  const isEnabled = trimmedKeyword.length > 0;

  return useQuery<PerformanceLocationSearchListResponseDto>({
    queryKey: [...performanceLocationKeys.searches(), 'list', trimmedKeyword] as const,
    enabled: isEnabled,
    queryFn: () => getPerformanceLocationSearchList(trimmedKeyword),
  });
}
