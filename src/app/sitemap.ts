import type { MetadataRoute } from 'next';
import type { PerformanceFilterTab } from '@/types/performance';
import { getPerformanceList } from '@/apis/performance';
import { routePaths } from '@/utils';
import { toAbsoluteUrl } from '@/utils/seo';

export const revalidate = 3600;

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

  while (true) {
    const { content, hasNext } = await getPerformanceList(type, page, {
      skipRedirectOn401: true,
    });

    performanceIds.push(...content.map(({ performanceId }) => performanceId));

    if (!hasNext) {
      return performanceIds;
    }

    page += 1;
  }
}

function getUniqueValues<TValue>(values: TValue[]): TValue[] {
  return values.filter((value, index) => values.indexOf(value) === index);
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
  // 현재 sitemap 생성 시각입니다.
  // 지금은 모든 엔트리에 공통으로 넣고, 추후에는 페이지별 실제 수정 시각으로 고도화할 수 있습니다.
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
