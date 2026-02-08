import type { PerformanceLocationSearchDtoSchema } from '../performance-locations/performance-location.schema';
import * as z from 'zod';
import { CHECKLIST_ITEMS, PERFORMANCE_ERROR_MESSAGE } from '@/constants/performance/register';
import { transformerISOToHHmmSchema, validatePerformanceForm } from './performance.lib';

/**
 * 공연 등록 폼 스키마 (프론트엔드 입력용)
 *
 */
export const PerformanceRegisterFormSchema = z.object({
  // Step 1: 공연자 정보
  teamName: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  contactNumber: z.string()
    .min(1, PERFORMANCE_ERROR_MESSAGE)
    .regex(/^(02|0[1-9]\d)-?(\d{3,4})-?(\d{4})$/, '올바른 전화번호 형식이 아닙니다.'),
  email: z.email('올바른 이메일 형식이 아닙니다.'),
  instagramUrl: z.string().optional(),

  // Step 2: 공연 기본 정보
  performanceName: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  // 장소 검색 결과 객체 전체 저장 (ID 추출용)
  performanceLocation: z.custom<z.infer<typeof PerformanceLocationSearchDtoSchema>>(
    val => val !== null && val !== undefined && typeof val === 'object',
    '장소를 선택해주세요.',
  ),
  performanceDate: z.date({
    message: PERFORMANCE_ERROR_MESSAGE,
  }).refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, '과거 날짜는 선택할 수 없습니다.'),
  performanceDescription: z.string().min(1, PERFORMANCE_ERROR_MESSAGE),
  startTime: z.string(PERFORMANCE_ERROR_MESSAGE).min(1, PERFORMANCE_ERROR_MESSAGE),
  endTime: z.string(PERFORMANCE_ERROR_MESSAGE).min(1, PERFORMANCE_ERROR_MESSAGE),

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
}).superRefine(validatePerformanceForm);

/**
 * 공연 생성 요청 스키마 (백엔드 전송용)
 */
export const PerformanceCreateRequestDtoSchema = z.object({
  performanceLocationId: z.number(),
  performers: z.array(z.object({
    name: z.string(),
    email: z.email(),
    phoneNumber: z.string(),
    instagram: z.string().optional(),
  })),
  summary: z.string(),
  endTime: z.iso.datetime(),
  startTime: z.iso.datetime(),
  validTimeRange: z.boolean(),
  title: z.string(),
  description: z.string(),
  performanceDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다.'),
  /** 공연 포스터 이미지 (multipart/form-data의 images 필드에 매핑됨) */
  images: z.union([
    z.custom<File>(val => typeof File !== 'undefined' && val instanceof File),
    z.string(),
    z.null(),
  ]).optional(),
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
    startTime: transformerISOToHHmmSchema,
    /** 공연 종료 시간 (ISO 형식 → HH:mm 형식으로 변환) */
    endTime: transformerISOToHHmmSchema,
    /** 공연 장소명 */
    locationName: z.string(),
    /** 공연 이미지 URL 배열 */
    images: z.array(z.string()).default([]),
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

/** 공연 등록 폼 타입 (프론트엔드 입력용) */
export type PerformanceRegisterForm = z.infer<typeof PerformanceRegisterFormSchema>;

/** 공연 생성 API 요청 타입 (백엔드 전송용) */
export type PerformanceCreateRequestDto = z.infer<typeof PerformanceCreateRequestDtoSchema>;

/** 공연 목록 조회 API 응답 타입 */
export type PerformanceListResponseDto = z.infer<typeof PerformanceListResponseDtoSchema>;
