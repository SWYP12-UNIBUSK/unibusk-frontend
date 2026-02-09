import type { FetchConfig } from '../api.types';
import type { PerformanceCreateRequestDto } from './performance.schema';
import type { PerformanceFilterTab } from '@/types/performance';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import {

  performanceByLocationCursorSchema,
  PerformanceDetailResponseDtoSchema,
  PerformanceListResponseDtoSchema,
  PerformanceUpcomingPreviewResponseDtoSchema,
} from './performance.schema';

/**
 * 공연 목록 조회
 * @param type - 'upcoming' | 'past'
 * @param page - 페이지 번호 (기본값: 0)
 */
export function getPerformanceList(
  type: PerformanceFilterTab,
  page: number = 0,
  config?: FetchConfig,
) {
  return api.get(`/api/performances/${type}`, {
    ...config,
    params: { page: page.toString() },
  }).then(parseResponse(PerformanceListResponseDtoSchema));
}

/**
 * 공연 검색
 * @param keyword - 검색 키워드
 * @param type - 'upcoming' | 'past'
 * @param page - 페이지 번호 (기본값: 0)
 */
export function getSearchPerformanceList(
  keyword: string,
  type: PerformanceFilterTab,
  page: number = 0,
  config?: FetchConfig,
) {
  return api
    .get(`/api/performances/${type}/search`, {
      ...config,
      params: { keyword, page: page.toString() },
    })
    .then(parseResponse(PerformanceListResponseDtoSchema));
}

/**
 * 공연 등록
 * @param data - 공연 등록 요청 정보 (images 포함)
 */
export function createPerformance(
  data: PerformanceCreateRequestDto,
  config?: FetchConfig,
) {
  const formData = new FormData();

  const { images, ...requestData } = data;

  // JSON 데이터 (request 필드)
  formData.append('request', new Blob([JSON.stringify(requestData)], { type: 'application/json' }));

  // 이미지 파일 (images 필드)
  if (images && images instanceof File) {
    formData.append('images', images);
  }

  return api.post('/api/performances', formData, {
    ...config,
    headers: {
      ...config?.headers,
      // 'Content-Type': 'multipart/form-data', // 브라우저가 자동으로 Boundary를 포함하여 설정하도록 주석 처리
    },
  });
}

export function getPerformanceDetail(
  performanceId: number,
  config?: FetchConfig,
) {
  return api.get(`/api/performances/${performanceId}`, config)
    .then(parseResponse(PerformanceDetailResponseDtoSchema));
}

/**
 * 공연 장소별 다가오는 공연(예정중) 조회[버스킹맵 사용]
 * @param performanceLocationId 공연 장소 ID
 * @param size 조회 개수(기본 10)
 * @returns 예정중 공연 목록
 */
export function getUpcomingPerformancesByLocation(
  performanceLocationId: number,
  size = 10,
) {
  return api
    .get(`/api/performances/locations/${performanceLocationId}/upcoming`, {
      params: { size: String(size) },
    })
    .then(parseResponse(performanceByLocationCursorSchema));
}

/**
 * 공연 장소별 지난 공연(종료됨) 조회
 * @param performanceLocationId 공연 장소 ID
 * @param size 조회 개수(기본 10)
 * @returns 종료됨 공연 목록
 */
export function getPastPerformancesByLocation(
  performanceLocationId: number,
  size = 10,
) {
  return api
    .get(`/api/performances/locations/${performanceLocationId}/past`, {
      params: { size: String(size) },
    })
    .then(parseResponse(performanceByLocationCursorSchema));
}

/**
 * [home] 다가오는 공연 미리보기 조회
 * @returns 다가오는 공연 미리보기 목록(최대 8개)
 */
export function getUpcomingPerformancePreview(config?: FetchConfig) {
  return api
    .get('/api/performances/upcoming/preview', { ...config })
    .then(parseResponse(PerformanceUpcomingPreviewResponseDtoSchema));
}
