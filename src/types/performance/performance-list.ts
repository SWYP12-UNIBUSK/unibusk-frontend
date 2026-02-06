/**
 * 공연 리스트 정보를 나타내는 도메인 모델
 */
export interface Performance {
  /** 공연 고유 ID */
  performanceId: number;
  /** 공연 제목 */
  title: string;
  /** 공연 날짜 (YYYY-MM-DD 형식) */
  performanceDate: string;
  /** 공연 시작 시간 (HH:mm 형식) */
  startTime: string;
  /** 공연 종료 시간 (HH:mm 형식) */
  endTime: string;
  /** 공연 장소명 */
  locationName: string;
  /** 공연 이미지 URL 배열 */
  images: string[];
}

/**
 * 공연 목록 타입 (Performance 배열)
 */
export type Performances = Performance[];

/**
 * 공연 필터 탭 타입
 * - 'upcoming': 다가오는 공연
 * - 'past': 지난 공연
 */
export type PerformanceFilterTab = 'upcoming' | 'past';

/**
 * 주어진 값이 유효한 PerformanceFilterTab 타입인지 검증하는 타입 가드 함수
 *
 * @param tab - 검증할 값 (문자열 또는 null)
 * @returns tab이 'upcoming' 또는 'past'이면 true, 그 외에는 false
 *
 * @example
 * const tab = searchParams.get('tab');
 * if (isValidPerformanceTab(tab)) {
 *   // tab은 'upcoming' | 'past' 타입으로 좁혀짐
 *   console.log(tab);
 * }
 */
export function isValidPerformanceTab(tab: string | null): tab is PerformanceFilterTab {
  return tab === 'upcoming' || tab === 'past';
}
