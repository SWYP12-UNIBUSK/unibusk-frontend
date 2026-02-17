import type { BuskingPlace } from '@/types/busking-map/busking-place';
import type { Coordinate } from '@/types/kakao/kakao-map';

function getApproxSquaredDistance(origin: Coordinate, target: Coordinate) {
  const rad = (origin.lat * Math.PI) / 180;
  const cosLat = Math.cos(rad);

  const dLat = origin.lat - target.lat;
  const dLng = (origin.lng - target.lng) * cosLat;

  return dLat * dLat + dLng * dLng;
}

/**
 * 검색 결과를 searchAnchorCoordinate 기준으로 가까운 순 정렬
 * - 정확한 실거리(m)가 목적이 아니라 "가까운 순" 정렬이 목적
 * - sqrt를 하지 않고 거리 제곱값으로 비교해 비용을 감소시킴
 * - 경도는 위도에 따라 실제 길이가 달라 cos(lat)로 보정
 */
export function sortPlacesByAnchor(
  places: readonly BuskingPlace[],
  searchAnchorCoordinate: Coordinate | null,
) {
  if (!searchAnchorCoordinate) {
    return [...places];
  }

  return [...places].sort((a, b) => {
    const distanceA = getApproxSquaredDistance(searchAnchorCoordinate, { lat: a.lat, lng: a.lng });
    const distanceB = getApproxSquaredDistance(searchAnchorCoordinate, { lat: b.lat, lng: b.lng });

    return distanceA - distanceB || a.id.localeCompare(b.id);
  });
}
