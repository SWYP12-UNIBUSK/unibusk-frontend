import type { MetadataRoute } from 'next';
import type { PerformanceFilterTab } from '@/types/performance';
import { getPerformanceList } from '@/apis/performance';
import { routePaths } from '@/utils';
import { toAbsoluteUrl } from '@/utils/seo';

export const revalidate = 3600;

// API가 잘못된 페이지네이션 응답을 반환해도 사이트맵 생성이 무한 루프에 빠지지 않도록 최대 페이지 수를 제한
// 추후 최대 공연 수에 따라 변동
const MAX_PERFORMANCE_PAGES = 200;

const STATIC_PAGES: Array<{
  path: string;
  changeFrequency: NonNullable<MetadataRoute.Sitemap[number]['changeFrequency']>;
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/about-us', changeFrequency: 'monthly', priority: 0.7 },
  { path: '/performance-list', changeFrequency: 'daily', priority: 0.9 },
  { path: '/busking-map', changeFrequency: 'daily', priority: 0.8 },
];

async function getPerformanceIds(type: PerformanceFilterTab): Promise<number[]> {
  const performanceIds: number[] = [];
  let page = 0;

  while (page < MAX_PERFORMANCE_PAGES) {
    const { content, hasNext } = await getPerformanceList(type, page, {
      skipRedirectOn401: true,
    });

    performanceIds.push(...content.map(({ performanceId }) => performanceId));

    if (!hasNext) {
      return performanceIds;
    }

    if (content.length === 0) {
      console.warn(`사이트맵: ${type} ${page} 페이지 응답이 비어 있어 순회를 중단`);
      return performanceIds;
    }

    page += 1;
  }

  // 변경: 최대 페이지 상한에 도달한 경우에도 현재까지 수집한 ID로 사이트맵 생성
  console.warn(`사이트맵: ${type} 페이지 상한(${MAX_PERFORMANCE_PAGES})에 도달함`);
  return performanceIds;
}

function getUniqueValues<TValue>(values: TValue[]): TValue[] {
  return Array.from(new Set(values));
}

async function getPerformanceIdsSafely(): Promise<number[]> {
  const performanceIdResults = await Promise.allSettled([
    getPerformanceIds('upcoming'),
    getPerformanceIds('past'),
  ]);

  const performanceIds = performanceIdResults.flatMap((result) => {
    if (result.status === 'rejected') {
      console.error('사이트맵 생성 중 공연 ID 조회에 실패했습니다.', result.reason);
      return [];
    }

    return result.value;
  });

  return getUniqueValues(performanceIds);
}

async function getPerformanceDetailEntries(): Promise<MetadataRoute.Sitemap> {
  try {
    const performanceIds = await getPerformanceIdsSafely();

    return performanceIds.map(performanceId => ({
      url: toAbsoluteUrl(routePaths.performanceDetail(performanceId)),
      changeFrequency: 'weekly',
      priority: 0.6,
    }));
  }
  catch (error) {
    console.error('사이트맵 생성 중 공연 상세 URL 목록 생성에 실패했습니다.', error);
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const performanceDetailEntries = await getPerformanceDetailEntries();

  return [
    ...STATIC_PAGES.map(({ path, ...metadata }) => ({
      url: toAbsoluteUrl(path),
      lastModified,
      ...metadata,
    })),
    ...performanceDetailEntries.map(entry => ({
      ...entry,
      lastModified,
    })),
  ];
}
