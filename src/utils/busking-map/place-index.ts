import type { BuskingPlace } from '@/types/busking-map';

export function createBuskingPlaceIndex(places: BuskingPlace[]) {
  return new Map(places.map(place => [place.id, place]));
}
