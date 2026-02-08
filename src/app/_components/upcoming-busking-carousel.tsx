'use client';

import { EmblaCardCarousel } from '@/components/carousel';
import { cn } from '@/utils';

interface UpcomingItem {
  id: string;
  dateText: string;
  placeText: string;
  title: string;
}

const MOCK: UpcomingItem[] = Array.from({ length: 8 }).map((_, i) => ({
  id: `upcoming-${i + 1}`,
  dateText: '2026.01.01 (20:00~22:00)',
  placeText: '홍대 걷고 싶은 거리',
  title: '공연 이름',
}));

function UpcomingCard({ item }: { item: UpcomingItem }) {
  return (
    <article className="w-full">
      <div
        className={cn(
          'rounded-2xl bg-white',
          'shadow-[0_6px_22px_rgba(0,0,0,0.08)]',
          'p-4',
        )}
      >
        <div className="h-[260px] rounded-xl bg-gray-200" />
        <div className="mt-4 text-[11px] text-gray-500">{item.dateText}</div>
        <div className="mt-1 text-[11px] text-gray-500">
          📍
          {item.placeText}
        </div>
        <div className="mt-2 typo-caption-r-1 font-semibold text-gray-900">{item.title}</div>
      </div>
    </article>
  );
}

export function UpcomingBuskingCarousel() {
  return (
    <EmblaCardCarousel
      perView={4}
      slidesToScroll={1}
      gapPx={24}
      showProgress={true}
      progressVariant="thumb"
      className="relative"
    >
      {MOCK.map(item => (
        <UpcomingCard key={item.id} item={item} />
      ))}
    </EmblaCardCarousel>
  );
}
