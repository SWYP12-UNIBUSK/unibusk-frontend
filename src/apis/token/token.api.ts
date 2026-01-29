import type { TokenExchangeRequestDto } from './token.type';
import { api, parseResponse } from '@/apis';
import { TokenExchangeResponseDtoSchema } from './token.schema';

export function exchangeToken(tokenExchangeRequestDto: TokenExchangeRequestDto) {
  return api.post('/api/auths/token', tokenExchangeRequestDto).then(parseResponse(TokenExchangeResponseDtoSchema));
}
