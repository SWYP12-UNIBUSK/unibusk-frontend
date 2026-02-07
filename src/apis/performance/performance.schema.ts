import * as z from 'zod';
import { CHECKLIST_ITEMS, PERFORMANCE_ERROR_MESSAGE } from '@/constants/performance/register';

/** ISO 시간 → HH:mm 변환 */
const timeTransformSchema = z.string().transform((date, ctx) => {
  const parts = date.split('T');
  if (parts.length < 2) {
    ctx.addIssue({
      code: 'custom',
      message: 'Invalid date format',
    });
    return z.NEVER;
  }

  return parts[1].substring(0, 5);
});

/**
 * 공연 등록 API 요청 스키마
 *
 */
export const PerformanceRegisterRequestDtoSchema = z.object({
  // Step 1: 공연자 정보
  teamName: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  contactNumber: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  email: z.email(PERFORMANCE_ERROR_MESSAGE),
  instagramUrl: z.string().optional(),

  // Step 2: 공연 기본 정보
  performanceName: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  performanceLocation: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  performanceDate: z.date({ error: PERFORMANCE_ERROR_MESSAGE }),
  performanceDescription: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  startTime: z.string({ error: PERFORMANCE_ERROR_MESSAGE }).min(1, PERFORMANCE_ERROR_MESSAGE),
  endTime: z.string({ error: PERFORMANCE_ERROR_MESSAGE }).min(1, PERFORMANCE_ERROR_MESSAGE),

  // Step 3: 공연 상세 정보
  posterImage: z.union([
    z.custom<File>(val => typeof File !== 'undefined' && val instanceof File),
    z.string(),
    z.null(),
  ]).optional(),
  performanceDetail: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),

  // Step 4: 체크리스트
  // 모든 항목을 체크해야 하므로 배열로 정의
  checklist: z.array(z.string()).min(CHECKLIST_ITEMS.length, '*체크리스트의 모든 항목이 완료되어야 등록할 수 있습니다. 빠진 곳이 없는지 다시 한번 봐주세요.'),
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

/** 공연 등록 API 요청 타입 */
export type PerformanceRegisterRequestDto = z.infer<typeof PerformanceRegisterRequestDtoSchema>;

/** 공연 목록 조회 API 응답 타입 */
export type PerformanceListResponseDto = z.infer<typeof PerformanceListResponseDtoSchema>;
