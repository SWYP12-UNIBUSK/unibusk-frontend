import type { PerformanceLocationDto } from '@/apis/performance-locations';
import type { BuskingPlace } from '@/types/busking-place';

export function adaptPerformanceLocationsToBuskingPlaces(locations: PerformanceLocationDto[]): BuskingPlace[] {
  return locations.map(dto => ({
    id: String(dto.performanceLocationId),
    title: dto.name,
    lat: dto.latitude,
    lng: dto.longitude,
    thumbnailUrl: dto.imageUrls[0] ?? null,
  }));
}
