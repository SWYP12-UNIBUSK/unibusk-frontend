import type { Bounds } from '@/types/busking-map/busking-place';

/**
 * Performance Location 관련 Query Key 팩토리
 */
export const performanceLocationKeys = {
  all: ['performanceLocation'] as const,

  maps: () => [...performanceLocationKeys.all, 'map'] as const,
  map: (bounds: Bounds | null) => [...performanceLocationKeys.maps(), bounds] as const,

  details: () => [...performanceLocationKeys.all, 'detail'] as const,
  detail: (performanceLocationId: number) =>
    [...performanceLocationKeys.details(), performanceLocationId] as const,

  applicationGuides: () => [...performanceLocationKeys.all, 'applicationGuides'] as const,
  applicationGuide: (performanceLocationId: number) =>
    [...performanceLocationKeys.applicationGuides(), performanceLocationId] as const,

  searches: () => [...performanceLocationKeys.all, 'search'] as const,
  search: (keyword: string) => [...performanceLocationKeys.searches(), keyword] as const,
} as const;
