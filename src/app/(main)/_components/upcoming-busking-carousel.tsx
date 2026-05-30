'use client';

import { EmblaCardCarousel } from '@/components/carousel';
import { PerformanceCard, PerformanceCardSkeleton } from '@/components/performance';
import { useUpcomingPerformancePreview } from '@/hooks/performance/use-upcoming-performance-preview';
import { routePaths } from '@/utils';

export function UpcomingBuskingCarousel() {
  const { data, isPending } = useUpcomingPerformancePreview();

  return (
    <EmblaCardCarousel
      perView={{ base: 2, md: 3, lg: 4 }}
      slidesToScroll={1}
      gapPx={4.5}
      showArrows={true}
      showProgress={true}
      progressVariant="thumb"
      className="relative"
      arrowClassName="hidden lg:flex"
    >
      {isPending
        ? Array.from({ length: 8 }, (_, i) => <PerformanceCardSkeleton key={i} />)
        : (data ?? []).map(dto => (
            <PerformanceCard
              key={dto.performanceId}
              performance={dto}
              href={routePaths.performanceDetail(dto.performanceId)}
            />
          ))}
    </EmblaCardCarousel>
  );
}
