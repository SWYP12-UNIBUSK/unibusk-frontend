import type z from 'zod';
import type { UserResponseDtoSchema } from './user.schema';

export type UserResponseDto = z.infer<typeof UserResponseDtoSchema>;
