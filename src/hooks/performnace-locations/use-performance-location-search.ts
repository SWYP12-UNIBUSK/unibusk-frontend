import { useQuery } from '@tanstack/react-query';

import { getPerformanceLocationSearch } from '@/apis/performance-locations';
import { performanceLocationKeys } from '@/queries/performance-locations';

export function usePerformanceLocationSearch(keyword: string) {
  const trimmedKeyword = keyword.trim();
  const isEnabled = trimmedKeyword.length > 0;

  return useQuery({
    queryKey: performanceLocationKeys.search(trimmedKeyword),
    enabled: isEnabled,
    queryFn: () => getPerformanceLocationSearch(trimmedKeyword),
  });
}
