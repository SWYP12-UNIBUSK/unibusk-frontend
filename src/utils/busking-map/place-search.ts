import type { BuskingPlace } from '@/types/busking-map';

export function filterBuskingPlacesBySearchQuery(places: BuskingPlace[], query: string) {
  const searchQuery = query.trim();
  if (!searchQuery) {
    return places;
  }
  const lowerQuery = searchQuery.toLowerCase();
  return places.filter(place => place.title.toLowerCase().includes(lowerQuery));
}
