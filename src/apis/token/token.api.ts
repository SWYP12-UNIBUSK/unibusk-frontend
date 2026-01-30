import type { TokenExchangeRequestDto } from './token.schema';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import { TokenExchangeResponseDtoSchema } from './token.schema';

export function exchangeToken(tokenExchangeRequestDto: TokenExchangeRequestDto) {
  return api.post('/api/auths/token', tokenExchangeRequestDto).then(parseResponse(TokenExchangeResponseDtoSchema));
}
