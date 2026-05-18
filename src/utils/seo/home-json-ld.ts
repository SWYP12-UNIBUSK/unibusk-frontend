import type { Organization, WebSite, WithContext } from 'schema-dts';
import { SITE_URL } from '@/constants';
import { toAbsoluteUrl } from './site-url';

export const HOME_SITE_NAME = 'UNIBUSK';
export const HOME_DESCRIPTION = 'UNIBUSK(유니버스크)에서 버스킹 공연 일정과 장소를 찾고, 다가오는 공연 정보를 확인해보세요.';
export const HOME_ALTERNATE_NAME = '유니버스크';

export function getHomeWebsiteJsonLd(): WithContext<WebSite> {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': HOME_SITE_NAME,
    'alternateName': HOME_ALTERNATE_NAME,
    'url': SITE_URL,
    'description': HOME_DESCRIPTION,
    'inLanguage': 'ko-KR',
  };
}

export function getHomeOrganizationJsonLd(): WithContext<Organization> {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': HOME_SITE_NAME,
    'alternateName': HOME_ALTERNATE_NAME,
    'url': SITE_URL,
    'logo': toAbsoluteUrl('/logos/logo-unibusk-stacked-vertical.png'),
    'description': '공연이 만들어지고, 보여지고, 시작되는 곳. 버스킹의 모든 순간을 잇다, UNIBUSK(유니버스크)',
  };
}
