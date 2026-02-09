import { useQuery } from '@tanstack/react-query';

import { getPerformanceLocationDetail } from '@/apis/performance-locations';
import { performanceLocationKeys } from '@/queries/performance-locations';

export function usePerformanceLocationDetail(performanceLocationId: number | null) {
  const isEnabled = typeof performanceLocationId === 'number';

  return useQuery({
    queryKey: [...performanceLocationKeys.details(), performanceLocationId] as const,
    enabled: isEnabled,
    queryFn: async () => {
      if (typeof performanceLocationId !== 'number') {
        throw new TypeError('performanceLocationId 값이 필요합니다.');
      }

      return getPerformanceLocationDetail(performanceLocationId);
    },
  });
}
