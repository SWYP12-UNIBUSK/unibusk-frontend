import type { Bounds } from '@/types/busking-map/busking-place';
import { useQuery } from '@tanstack/react-query';

import { getPerformanceLocations } from '@/apis/performance-locations';
import { performanceLocationKeys } from '@/queries/performance-locations';

export function usePerformanceLocationsMap(bounds: Bounds | null) {
  const isEnabled = bounds !== null;

  return useQuery({
    queryKey: performanceLocationKeys.map(bounds),
    enabled: isEnabled,
    queryFn: () => {
      if (!bounds) {
        throw new TypeError('bounds 값이 필요합니다.');
      }
      return getPerformanceLocations(bounds);
    },
  });
}
