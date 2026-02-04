import type { PerformanceLocationsQuery } from './performance-location.schema';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import {
  PerformanceLocationDtoSchema,
  PerformanceLocationsMapQuerySchema,
  PerformanceLocationsResponseDtoSchema,
} from './performance-location.schema';

function buildBoundsQueryParams(query: PerformanceLocationsQuery) {
  return {
    north: String(query.north),
    south: String(query.south),
    east: String(query.east),
    west: String(query.west),
  };
}

/**
 * 지도 영역(Bounds) 내 버스킹 장소 목록을 조회
 * @param query 지도 영역 경계값(north/south/east/west)
 * @returns Bounds에 맞는 버스킹 장소 리스트
 */
export function getPerformanceLocations(query: PerformanceLocationsQuery) {
  const validQuery = PerformanceLocationsMapQuerySchema.parse(query);

  return api
    .get('/performance-locations/map', { params: buildBoundsQueryParams(validQuery) })
    .then(parseResponse(PerformanceLocationsResponseDtoSchema));
}

/**
 * 특정 버스킹 장소의 상세 정보를 조회
 * @param performanceLocationId 버스킹 장소 ID
 * @returns PerformanceLocationDto(장소 1건 상세)
 */
export function getPerformanceLocationDetail(performanceLocationId: number) {
  return api
    .get(`/performance-locations/${performanceLocationId}`)
    .then(parseResponse(PerformanceLocationDtoSchema));
}
