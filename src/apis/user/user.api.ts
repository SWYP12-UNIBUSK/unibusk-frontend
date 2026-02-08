import type { FetchConfig } from '../api.types';
import { api } from '../api.instance';
import { parseResponse } from '../api.parse';
import { UserResponseDtoSchema } from './user.schema';

export function getUser(config?: FetchConfig) {
  return api.get('/api/members/me', config).then(parseResponse(UserResponseDtoSchema));
}

export function logoutUser(config?: FetchConfig) {
  return api.post<void>('/api/auths/logout', undefined, config);
}
