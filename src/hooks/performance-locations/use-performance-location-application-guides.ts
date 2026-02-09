import { useQuery } from '@tanstack/react-query';

import { getPerformanceLocationApplicationGuides } from '@/apis/performance-locations';
import { performanceLocationKeys } from '@/queries/performance-locations';

export function usePerformanceLocationApplicationGuides(performanceLocationId: number | null) {
  const isEnabled = typeof performanceLocationId === 'number';

  return useQuery({
    queryKey: [...performanceLocationKeys.applicationGuides(), performanceLocationId] as const,
    enabled: isEnabled,
    queryFn: async () => {
      if (typeof performanceLocationId !== 'number') {
        throw new TypeError('performanceLocationId 값이 필요합니다.');
      }

      return getPerformanceLocationApplicationGuides(performanceLocationId);
    },
  });
}
