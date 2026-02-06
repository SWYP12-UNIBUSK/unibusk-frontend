import type { FetchConfig } from '../api.types';
import type { PerformanceFilterTab } from '@/types/performance';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import { PerformanceListResponseDtoSchema } from './performance.schema';

/**
 * 공연 목록을 조회하는 API 함수
 *
 * @param type - 조회할 공연 타입 ('upcoming': 다가오는 공연, 'past': 지난 공연)
 * @param page - 페이지 번호 (0부터 시작, 기본값: 0)
 * @param config - Axios 요청 설정 (signal 등)
 * @returns 페이지네이션된 공연 목록 응답 Promise
 *
 * @example
 * // 다가오는 공연 첫 페이지 조회
 * const data = await getPerformanceList('upcoming', 0);
 *
 * // AbortSignal과 함께 사용
 * const data = await getPerformanceList('past', 1, { signal: abortSignal });
 */
export function getPerformanceList(
  type: PerformanceFilterTab,
  page: number = 0,
  config?: FetchConfig,
) {
  return api.get(`/api/performances/${type}?page=${page}`, config).then(parseResponse(PerformanceListResponseDtoSchema));
}
