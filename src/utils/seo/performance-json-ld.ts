import type { BreadcrumbList, Event, ListItem, WithContext } from 'schema-dts';
import type { PerformanceDetailResponseDto } from '@/apis/performance';
import { SITE_URL } from '@/constants';
import { routePaths } from '../route-paths';
import { toAbsoluteUrl } from './site-url';

const HTTP_URL_PATTERN = /^https?:\/\//i;
const PROTOCOL_RELATIVE_URL_PATTERN = /^\/\//;

function toKstDateTime(date: string, time: string) {
  return `${date}T${time}:00+09:00`;
}

function toAbsoluteImageUrl(imageUrl: string) {
  const normalizedImageUrl = imageUrl.trim();

  if (HTTP_URL_PATTERN.test(normalizedImageUrl)) {
    return normalizedImageUrl;
  }

  if (PROTOCOL_RELATIVE_URL_PATTERN.test(normalizedImageUrl)) {
    return `https:${normalizedImageUrl}`;
  }

  return toAbsoluteUrl(normalizedImageUrl);
}

export function buildPerformanceEventJsonLd(
  performanceId: number,
  performanceDetail: PerformanceDetailResponseDto,
): WithContext<Event> {
  const absoluteImageUrl = performanceDetail.imageUrl?.trim()
    ? toAbsoluteImageUrl(performanceDetail.imageUrl)
    : undefined;

  return {
    '@context': 'https://schema.org',
    '@type': 'Event',
    'name': performanceDetail.title,
    'description': performanceDetail.summary || performanceDetail.description,
    'url': toAbsoluteUrl(routePaths.performanceDetail(performanceId)),
    'startDate': toKstDateTime(performanceDetail.performanceDate, performanceDetail.startTime),
    'endDate': toKstDateTime(performanceDetail.performanceDate, performanceDetail.endTime),
    'eventAttendanceMode': 'https://schema.org/OfflineEventAttendanceMode',
    'eventStatus': 'https://schema.org/EventScheduled',
    'inLanguage': 'ko-KR',
    ...(absoluteImageUrl && {
      image: absoluteImageUrl,
    }),
    'location': {
      '@type': 'Place',
      'name': performanceDetail.locationName,
      'address': performanceDetail.address,
      'geo': {
        '@type': 'GeoCoordinates',
        'latitude': performanceDetail.latitude,
        'longitude': performanceDetail.longitude,
      },
    },
    ...(performanceDetail.performers.length > 0 && {
      performer: performanceDetail.performers.map(performer => ({
        '@type': 'Person',
        'name': performer.name,
      })),
    }),
    'organizer': {
      '@type': 'Organization',
      'name': 'UNIBUSK',
      'url': SITE_URL,
    },
  };
}

export function buildPerformanceBreadcrumbJsonLd(
  performanceId: number,
  title: string,
): WithContext<BreadcrumbList> {
  const itemListElement: ListItem[] = [
    {
      '@type': 'ListItem',
      'position': 1,
      'name': '홈',
      'item': SITE_URL,
    },
    {
      '@type': 'ListItem',
      'position': 2,
      'name': '공연 정보',
      'item': toAbsoluteUrl('/performance-list'),
    },
    {
      '@type': 'ListItem',
      'position': 3,
      'name': title,
      'item': toAbsoluteUrl(routePaths.performanceDetail(performanceId)),
    },
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': itemListElement,
  };
}
