import z from 'zod';

export const TokenExchangeRequestDtoSchema = z.object({
  code: z.string(),
});

export const TokenExchangeResponseDtoSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});
