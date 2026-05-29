'use client';

import type { PerformanceUpcomingPreviewItemDto } from '@/apis/performance';
import Image from 'next/image';
import Link from 'next/link';
import { EmblaCardCarousel } from '@/components/carousel';
import { Card } from '@/components/common/card';
import { useUpcomingPerformancePreview } from '@/hooks/performance/use-upcoming-performance-preview';
import { cn } from '@/utils';

interface UpcomingItem {
  id: string;
  dateText: string;
  placeText: string;
  title: string;
  imageUrl: string | null;
  isSkeleton?: boolean;
}

const SKELETON_IMAGE_SRC = '/images/loading-unibusk-vertical.png';

function formatDateText(performanceDate: string, startTime: string, endTime: string) {
  const [y, m, d] = performanceDate.split('-');
  const yyyy = y ?? '0000';
  const mm = m ?? '00';
  const dd = d ?? '00';

  return `${yyyy}.${mm}.${dd} (${startTime}~${endTime})`;
}

function mapDtoToItem(dto: PerformanceUpcomingPreviewItemDto): UpcomingItem {
  return {
    id: String(dto.performanceId),
    dateText: formatDateText(dto.performanceDate, dto.startTime, dto.endTime),
    placeText: dto.locationName,
    title: dto.title,
    imageUrl: dto.images?.[0] ?? null,
  };
}

export function UpcomingBuskingCarousel() {
  const skeleton: UpcomingItem[] = Array.from({ length: 8 }, (_, i) => ({
    id: `skeleton-${i + 1}`,
    dateText: ' ',
    placeText: ' ',
    title: ' ',
    imageUrl: null,
    isSkeleton: true,
  }));

  const { data, isPending } = useUpcomingPerformancePreview();
  const items = isPending ? skeleton : (data ?? []).map(mapDtoToItem);

  return (
    <EmblaCardCarousel
      perView={{ base: 2, md: 3, lg: 4 }}
      slidesToScroll={1}
      gapPx={24}
      showArrows={true}
      showProgress={true}
      progressVariant="thumb"
      className="relative"
      arrowClassName="hidden lg:flex"
    >
      {items.map((item) => {
        const isSkeleton = Boolean(item.isSkeleton);
        const imageSrc = item.imageUrl ?? SKELETON_IMAGE_SRC;
        const isPlaceholder = isSkeleton || !item.imageUrl;

        return (
          <article key={item.id} className="h-full w-full">
            <Link
              href={`/performance-detail/${item.id}`}
              className="group/upcoming-card block h-full"
              aria-label={isSkeleton ? undefined : `${item.title} 공연 상세 보기`}
            >
              <Card
                className={cn(
                  `
                    mx-auto h-full w-full cursor-pointer overflow-hidden
                    rounded-xl bg-white transition-all duration-300 ease-in-out
                  `,
                  'shadow-[0_0_10px_0_rgba(0,0,0,0.2)]',
                  'p-2.5',
                  'gap-0 border border-transparent py-0 text-black shadow-none',
                  'hover:border-border/30',
                  'hover:shadow-lg',
                  'active:scale-[0.98]',
                )}
              >
                <div className={`
                  relative aspect-[161/224] w-full overflow-hidden rounded-lg
                  bg-white
                `}
                >
                  <Image
                    src={imageSrc}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                    unoptimized={true}
                    className={cn(`
                      block transition-transform duration-500
                      group-hover/upcoming-card:scale-105
                    `, isPlaceholder
                      ? 'object-contain'
                      : `object-cover`)}
                  />
                  <div
                    className={`
                      absolute inset-0 z-0 bg-linear-to-t from-black/20
                      via-transparent to-transparent opacity-0
                      transition-opacity duration-300
                      group-hover/upcoming-card:opacity-100
                    `}
                  />
                </div>

                <div className="p-2.5">
                  <div className={cn(`
                    mt-0.75 typo-caption-r-1 text-gray-700 transition-colors
                    duration-200
                  `, isSkeleton && `opacity-0`)}
                  >
                    {item.dateText}
                  </div>

                  <div className={cn(`
                    mt-0.5 flex gap-1.75 typo-caption-r-1 text-gray-700
                  `, isSkeleton && `opacity-0`)}
                  >
                    <Image src="/icons/mapPin.svg" width={11} height={14.37} alt="" unoptimized />
                    {item.placeText}
                  </div>

                  <div className={cn(`
                    mt-0.75 typo-body-sb-2 text-black
                    group-hover/upcoming-card:text-primary
                  `, isSkeleton && `opacity-0`)}
                  >
                    {item.title}
                  </div>
                </div>
              </Card>
            </Link>
          </article>
        );
      })}
    </EmblaCardCarousel>
  );
}
