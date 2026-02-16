import type { PerformanceLocationDto } from '@/apis/performance-locations';
import type { BuskingPlace } from '@/types/busking-map';

type PerformanceLocationAdapterInput = Pick<
  PerformanceLocationDto,
  'performanceLocationId' | 'name' | 'latitude' | 'longitude' | 'imageUrls'
>;

export function adaptPerformanceLocationsToBuskingPlaces(
  locations: readonly PerformanceLocationAdapterInput[],
): BuskingPlace[] {
  return locations.map(dto => ({
    id: String(dto.performanceLocationId),
    title: dto.name,
    lat: dto.latitude,
    lng: dto.longitude,
    thumbnailUrl: dto.imageUrls[0] ?? null,
  }));
}
