import { SITE_URL } from '@/constants';

export function toAbsoluteUrl(path: string) {
  return new URL(path, SITE_URL).toString();
}
