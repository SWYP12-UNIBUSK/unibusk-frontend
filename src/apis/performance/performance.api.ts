import type { FetchConfig } from '../api.types';
import type { PerformanceFilterTab } from '@/types/performance';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import { PerformanceListResponseDtoSchema } from './performance.schema';

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
