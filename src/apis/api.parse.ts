import type * as z from 'zod';

/**
 * API 응답 데이터를 Zod 스키마로 검증하고 타입 안전성을 보장합니다.
 * Promise의 then 체이닝으로 사용을 권장합니다.
 *
 * @example
 * const userSchema = z.object({
 *  id: z.number(),
 *  name: z.string(),
 * });
 *
 * const user = await api.get('/users/1')
 *  .then(parseResponse(userSchema));
 *
 * @param schema - zod.ZodType
 * @returns 검증된 데이터를 반환하는 함수 (zod.infer 타입 추론)
 * @throws {Error} 스키마 검증 실패 시 'Invalid API response format' 에러 발생
 */
export function parseResponse<T extends z.ZodType>(schema: T) {
  return (data: unknown): z.infer<T> => {
    const result = schema.safeParse(data);

    if (!result.success) {
      console.error('API Response Contract Violation:', {
        errors: result.error.issues,
        receivedData: process.env.NODE_ENV === 'development' ? data : undefined,
      });

      throw new Error('Invalid API response format');
    }

    return result.data;
  };
}
