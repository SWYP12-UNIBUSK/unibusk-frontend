import type { PerformanceCreateRequestDto, PerformanceRegisterForm } from './performance.schema';
import { format } from 'date-fns';
import * as z from 'zod';

/**
 * 프론트엔드 폼 데이터(PerformanceRegisterForm)를
 * 백엔드 API 요청 데이터(PerformanceCreateRequestDto)로 변환하는 함수
 */
export function transformPerformanceFormToApiRequest(formData: PerformanceRegisterForm): PerformanceCreateRequestDto {
  const combineDateAndTime = (date: Date, timeStr: string) => {
    if (!timeStr)
      return new Date().toISOString();

    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);

    // KST(Local) 시간 유지를 위해 date-fns format 사용
    return format(result, 'yyyy-MM-dd\'T\'HH:mm:ss');
  };

  const toDateString = (date: Date) => {
    return format(date, 'yyyy-MM-dd');
  };

  return {
    performanceLocationId: formData.performanceLocation.id,
    performers: [
      {
        name: formData.teamName,
        email: formData.email,
        phoneNumber: formData.contactNumber,
        instagram: formData.instagramUrl,
      },
    ],
    summary: formData.performanceDescription, // 한줄 소개 (Step 2)
    description: formData.performanceDetail, // 상세 소개 (Step 3)
    startTime: combineDateAndTime(formData.performanceDate, formData.startTime),
    endTime: combineDateAndTime(formData.performanceDate, formData.endTime),
    validTimeRange: true,
    title: formData.performanceName,
    performanceDate: toDateString(formData.performanceDate),
    images: formData.posterImage,
  };
};

/**
 * 공연 등록 폼 전체 유효성 검사 (복잡한 로직) - performance.schema.ts에서 사용
 */
export function validatePerformanceForm(data: PerformanceRegisterForm, ctx: z.RefinementCtx) {
  const { performanceDate, startTime, endTime } = data;

  if (!performanceDate || !startTime || !endTime) {
    return;
  }

  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startDateTime = new Date(performanceDate);
  startDateTime.setHours(startHour, startMinute, 0, 0);

  const endDateTime = new Date(performanceDate);
  endDateTime.setHours(endHour, endMinute, 0, 0);

  const now = new Date();

  // 1. 종료 시간이 시작 시간보다 빨라야 함
  // 사용자의 "start time보다 앞에 있으면 안되고" -> start < end
  if (startDateTime >= endDateTime) {
    ctx.addIssue({
      code: 'custom',
      message: '종료 시간은 시작 시간보다 이후여야 합니다.',
      path: ['endTime'],
    });
  }

  // 2. 현재 시간보다 이후여야 함 (과거의 공연 등록 불가)
  if (startDateTime <= now) {
    const errorMessage = '이미 지난 시간의 공연은 등록할 수 없습니다.';

    ctx.addIssue({
      code: 'custom',
      message: errorMessage,
      path: ['startTime'],
    });

    ctx.addIssue({
      code: 'custom',
      message: errorMessage,
      path: ['endTime'],
    });

    ctx.addIssue({
      code: 'custom',
      message: errorMessage,
      path: ['performanceDate'],
    });
  }
}

/** ISO 시간 → HH:mm 변환 */
export const transformerISOToHHmmSchema = z.string().transform((date, ctx) => {
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
