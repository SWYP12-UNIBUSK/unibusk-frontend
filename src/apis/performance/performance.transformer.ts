import type { PerformanceCreateRequestDto, PerformanceRegisterForm } from './performance.schema';

/**
 * 프론트엔드 폼 데이터(PerformanceRegisterForm)를
 * 백엔드 API 요청 데이터(PerformanceCreateRequestDto)로 변환하는 함수
 */
export function transformFormToApiRequest(formData: PerformanceRegisterForm): PerformanceCreateRequestDto {
  const combineDateAndTime = (date: Date, timeStr: string) => {
    if (!timeStr)
      return new Date().toISOString();
    const [hours, minutes] = timeStr.split(':').map(Number);
    const result = new Date(date);
    result.setHours(hours, minutes, 0, 0);
    return result.toISOString();
  };

  const toDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
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
