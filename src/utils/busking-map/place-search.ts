import type { BuskingPlace } from '@/types/busking-map';

export function filterBuskingPlacesBySearchQuery(places: BuskingPlace[], query: string) {
  const searchQuery = query.trim();
  if (!searchQuery) {
    return places;
  }

  return places.filter(place => place.title.includes(searchQuery));
}
