import type { Coordinate } from '@/types/kakao/kakao-map';

export function panToCoordinate(map: kakao.maps.Map, coordinate: Coordinate) {
  const latLng = new kakao.maps.LatLng(coordinate.lat, coordinate.lng);

  map.panTo(latLng);
}
