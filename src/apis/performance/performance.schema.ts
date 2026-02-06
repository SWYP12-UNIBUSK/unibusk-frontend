import * as z from 'zod';

/**
 * ISO 형식의 시간을 HH:mm 형식으로 변환하는 스키마
 */
const timeTransformSchema = z.string().transform((date, ctx) => {
  const parts = date.split('T');
  if (parts.length! < 2) {
    ctx.addIssue({
      code: 'custom',
      message: 'Invalid date format',
    });
    return z.NEVER;
  }

  return parts[1].substring(0, 5);
});

/**
 * 공연 리스트 조회 API 응답 스키마
 *
 * 페이지네이션된 공연 목록을 검증하고 타입을 추론합니다.
 * startTime과 endTime은 ISO 형식에서 HH:mm 형식으로 자동 변환됩니다.
 */
export const PerformanceListResponseDtoSchema = z.object({
  /** 공연 목록 배열 */
  content: z.array(z.object({
    /** 공연 고유 ID */
    performanceId: z.number(),
    /** 공연 제목 */
    title: z.string(),
    /** 공연 날짜 (YYYY-MM-DD 형식) */
    performanceDate: z.string().regex(
      /^\d{4}-\d{2}-\d{2}$/,
      'Invalid date format: expected YYYY-MM-DD',
    ),
    /** 공연 시작 시간 (ISO 형식 → HH:mm 형식으로 변환) */
    startTime: timeTransformSchema,
    /** 공연 종료 시간 (ISO 형식 → HH:mm 형식으로 변환) */
    endTime: timeTransformSchema,
    /** 공연 장소명 */
    locationName: z.string(),
    /** 공연 이미지 URL 배열 */
    images: z.array(z.url('Invalid image URL format')).min(1, 'At least one image URL is required'),
  })),
  /** 현재 페이지 번호 (0부터 시작) */
  page: z.int().nonnegative(),
  /** 페이지당 항목 수 */
  size: z.int().positive(),
  /** 전체 항목 수 */
  totalElements: z.int().nonnegative(),
  /** 전체 페이지 수 */
  totalPages: z.int().nonnegative(),
  /** 다음 페이지 존재 여부 */
  hasNext: z.boolean(),
});

/**
 * 공연 리스트 조회 API 응답 타입
 * PerformanceListResponseDtoSchema에서 자동으로 추론됩니다.
 */
export type PerformanceListResponseDto = z.infer<typeof PerformanceListResponseDtoSchema>;
