import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { Header } from '@/components/common/header';
import { getQueryClient } from '@/queries';
import { performanceDetailQueryOptions } from '@/queries/performance';
import { PerformanceInfo } from './_components';
import { Footer } from './_components/footer';

export default async function PerformanceDetailPage(
  {
    params,
  }: {
    params: Promise<{ performanceId: string }>;
  },
) {
  const { performanceId: rawPerformanceId } = await params;
  const performanceId = Number(rawPerformanceId);
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(performanceDetailQueryOptions(performanceId));

  return (
    <div className="relative mt-5 container-1920 flex min-h-screen flex-col">
      <Header />
      <main className="flex flex-1 flex-col">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <PerformanceInfo performanceId={performanceId} />
        </HydrationBoundary>
      </main>
      <Footer />
    </div>
  );
}
