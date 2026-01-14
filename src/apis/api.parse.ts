import type z from 'zod';

export function parseResponse<T extends z.ZodType>(schema: T) {
  return (data: unknown): z.infer<T> => {
    const result = schema.safeParse(data);

    if (!result.success) {
      console.error('API Response Contract Violation:', {
        errors: result.error.issues,
        receivedData: data,
      });
      throw new Error('Invalid API response format');
    }

    return result.data;
  };
}
