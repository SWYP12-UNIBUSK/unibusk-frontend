import type { FetchConfig } from '../api.types';
import type { PerformanceCreateRequestDto } from './performance.schema';
import type { PerformanceFilterTab } from '@/types/performance';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import {

  PerformanceListResponseDtoSchema,
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
