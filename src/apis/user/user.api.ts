import type { FetchConfig } from '@/apis/';
import { api, parseResponse } from '@/apis/';
import { UserResponseDtoSchema } from './user.schema';

export function getUser(config?: FetchConfig) {
  return api.get('/api/members/me', config).then(parseResponse(UserResponseDtoSchema));
}
