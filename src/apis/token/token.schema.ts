import * as z from 'zod';

export const TokenExchangeRequestDtoSchema = z.object({
  code: z.string(),
});

export const TokenExchangeResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenExchangeRequestDto = z.infer<typeof TokenExchangeRequestDtoSchema>;
export type TokenExchangeResponseDto = z.infer<typeof TokenExchangeResponseDtoSchema>;
