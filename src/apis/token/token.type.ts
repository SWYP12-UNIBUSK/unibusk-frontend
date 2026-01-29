import type z from 'zod';
import type { TokenExchangeRequestDtoSchema, TokenExchangeResponseDtoSchema } from './token.schema';

export type TokenExchangeRequestDto = z.infer<typeof TokenExchangeRequestDtoSchema>;
export type TokenExchangeResponseDto = z.infer<typeof TokenExchangeResponseDtoSchema>;
