import type { FetchConfig } from '../api.types';
import type { PerformanceLocationsQuery } from './performance-location.schema';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import {
  PerformanceLocationApplicationGuidesResponseDtoSchema,
  PerformanceLocationDtoSchema,
  PerformanceLocationSearchListResponseDtoSchema,
  PerformanceLocationSearchResponseDtoSchema,
  PerformanceLocationsQuerySchema,
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
  const validQuery = PerformanceLocationsQuerySchema.parse(query);

  return api
    .get('/api/performance-locations/map', { params: buildBoundsQueryParams(validQuery) })
    .then(parseResponse(PerformanceLocationsResponseDtoSchema));
}

/**
 * 특정 버스킹 장소의 상세 정보를 조회
 * @param performanceLocationId 버스킹 장소 ID
 * @returns PerformanceLocationDto(장소 1건 상세)
 */
export function getPerformanceLocationDetail(performanceLocationId: number) {
  return api
    .get(`/api/performance-locations/${performanceLocationId}`)
    .then(parseResponse(PerformanceLocationDtoSchema));
}

/**
 * 버스킹 장소 검색
 * @param keyword 검색 키워드
 * @param page 페이지 번호
 * @returns 검색된 버스킹 장소 목록
 */
export function getPerformanceLocationSearch(
  keyword: string,
  page: number = 0,
  config?: FetchConfig,
) {
  return api
    .get('/api/performance-locations/search', {
      ...config,
      params: { keyword, page: page.toString() },
    })
    .then(parseResponse(PerformanceLocationSearchResponseDtoSchema));
}

/**
 * 버스킹 장소 신청 가이드 조회
 * @param performanceLocationId 버스킹 장소 ID
 * @returns 버스킹 장소 신청 가이드 정보
 */
export function getPerformanceLocationApplicationGuides(performanceLocationId: number) {
  return api
    .get(`/api/performance-locations/${performanceLocationId}/application-guides`)
    .then(parseResponse(PerformanceLocationApplicationGuidesResponseDtoSchema));
}

/**
 * 버스킹 장소 검색 리스트 조회
 * @param keyword 검색 키워드
 * @returns 검색된 버스킹 장소 목록
 */
export function getPerformanceLocationSearchList(keyword: string, config?: FetchConfig) {
  return api
    .get('/api/performance-locations/search/list', {
      ...config,
      params: { keyword },
    })
    .then(parseResponse(PerformanceLocationSearchListResponseDtoSchema));
}
