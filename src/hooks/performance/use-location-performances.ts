'use client';

import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { getPastPerformancesByLocation, getUpcomingPerformancesByLocation } from '@/apis/performance';
import { performanceKeys } from '@/queries/performance/performance.keys';

interface UseLocationPerformancesParams {
  performanceLocationId: number | string | null | undefined;
  size?: number;
}

export function useLocationPerformances({
  performanceLocationId,
  size = 10,
}: UseLocationPerformancesParams) {
  const locationId = useMemo(() => {
    if (performanceLocationId === null || performanceLocationId === undefined) {
      return null;
    }

    const value = typeof performanceLocationId === 'string'
      ? Number(performanceLocationId)
      : performanceLocationId;

    if (!Number.isFinite(value)) {
      return null;
    }

    return value;
  }, [performanceLocationId]);

  const isEnabled = locationId !== null;

  const upcomingQuery = useQuery({
    queryKey: [...performanceKeys.upcomingPerformances(locationId ?? 0), size] as const,
    enabled: isEnabled,
    queryFn: () => {
      if (locationId === null) {
        throw new Error('performanceLocationId가 필수로 필요합니다.');
      }
      return getUpcomingPerformancesByLocation(locationId, size);
    },
  });

  const pastQuery = useQuery({
    queryKey: [...performanceKeys.pastPerformances(locationId ?? 0), size] as const,
    enabled: isEnabled,
    queryFn: () => {
      if (locationId === null) {
        throw new Error('performanceLocationId가 필수로 필요합니다.');
      }
      return getPastPerformancesByLocation(locationId, size);
    },
  });

  return {
    upcoming: upcomingQuery.data ?? null,
    past: pastQuery.data ?? null,
    isPending: upcomingQuery.isPending || pastQuery.isPending,
    isError: upcomingQuery.isError || pastQuery.isError,
    upcomingError: upcomingQuery.error ?? null,
    pastError: pastQuery.error ?? null,
  };
}
