import type { Metadata } from 'next';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { cache, Suspense } from 'react';
import { JsonLdScript } from '@/components/seo';
import { getQueryClient } from '@/queries';
import { performanceDetailQueryOptions } from '@/queries/performance';
import { createPageMetadata } from '@/utils';
import { buildPerformanceBreadcrumbJsonLd, buildPerformanceEventJsonLd } from '@/utils/seo';
import { Footer, PerformanceInfo } from './_components';

const getPerformanceDetail = cache(async (performanceId: number) => {
  const queryClient = getQueryClient();

  return queryClient.fetchQuery(performanceDetailQueryOptions(performanceId));
});

export async function generateMetadata(
  {
    params,
  }: {
    params: Promise<{ performanceId: string }>;
  },
): Promise<Metadata> {
  const { performanceId: rawPerformanceId } = await params;
  const performanceId = Number(rawPerformanceId);

  if (Number.isNaN(performanceId) || performanceId <= 0) {
    return createPageMetadata({
      title: '공연 상세',
      description: '버스킹 공연 상세 정보와 일정, 장소, 진행 내용을 확인해보세요.',
      path: '/performance-detail',
    });
  }

  const performanceDetail = await getPerformanceDetail(performanceId);

  return createPageMetadata({
    title: performanceDetail.title,
    description: `${performanceDetail.title} 공연의 일정, 장소, 상세 정보를 확인해보세요.`,
    path: `/performance-detail/${performanceId}`,
    image: performanceDetail.images[0],
  });
}

export default async function PerformanceDetailPage(
  {
    params,
  }: {
    params: Promise<{ performanceId: string }>;
  },
) {
  const { performanceId: rawPerformanceId } = await params;
  const performanceId = Number(rawPerformanceId);

  if (Number.isNaN(performanceId) || performanceId <= 0) {
    notFound();
  }

  const performanceDetail = await getPerformanceDetail(performanceId);
  const eventJsonLd = buildPerformanceEventJsonLd(performanceId, performanceDetail);
  const breadcrumbJsonLd = buildPerformanceBreadcrumbJsonLd(performanceId, performanceDetail.title);

  const queryClient = getQueryClient();

  queryClient.setQueryData(
    performanceDetailQueryOptions(performanceId).queryKey,
    performanceDetail,
  );

  return (
    <div className="relative container-1920 flex min-h-screen flex-col">
      <JsonLdScript id="performance-event-json-ld" data={eventJsonLd} />
      <JsonLdScript id="performance-breadcrumb-json-ld" data={breadcrumbJsonLd} />
      <main className="flex flex-1 flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <PerformanceInfo performanceId={performanceId} />
          </Suspense>
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
