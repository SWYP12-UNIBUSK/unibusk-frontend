'use client';

import type { Performance } from '@/types/performance';
import { ImageIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useState } from 'react';
import { Card, CardContent } from '@/components/common/card';
import { cn } from '@/utils';

interface PerformanceCardProps {
  performance: Performance;
  href: string;
  className?: string;
}

export const PerformanceCard = memo(({ performance, href, className }: PerformanceCardProps) => {
  const [imageError, setImageError] = useState(false);
  const { title, performanceDate, startTime, endTime, locationName, images } = performance;

  const showPlaceholder = !images[0] || imageError;

  return (
    <Link href={href} className="group block h-full">
      <Card
        className={cn(
          `
            h-full w-full cursor-pointer overflow-hidden border
            border-transparent bg-transparent py-0 shadow-none transition-all
            duration-300 ease-in-out
          `,
          'hover:border-border/30',
          'hover:shadow-lg',
          'active:scale-[0.98]',
          className,
        )}
        role="article"
        aria-label={`${title} 공연 카드`}
      >
        <CardContent className="flex h-full flex-col p-2.5">
          {/* Thumbnail */}
          <div className={`
            relative aspect-5/8 w-full shrink-0 overflow-hidden rounded-lg
            bg-muted
          `}
          >
            {showPlaceholder
              ? (
                  <div className={`
                    flex h-full w-full items-center justify-center
                    bg-linear-to-br from-muted via-muted/80 to-muted/60
                  `}
                  >
                    <div className={`
                      text-muted-foreground/40 transition-transform duration-300
                      group-hover:scale-110
                    `}
                    >
                      <ImageIcon className="h-full w-16" strokeWidth={1.5} />
                    </div>
                  </div>
                )
              : (
                  <Image
                    src={images[0]}
                    alt={`${title} 포스터`}
                    fill
                    className={cn(`
                      h-auto w-full transition-transform duration-500
                      group-hover:scale-105
                    `)}
                    onError={() => {
                      setImageError(true);
                    }}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                )}

            <div className={`
              absolute inset-0 bg-linear-to-t from-black/20 via-transparent
              to-transparent opacity-0 transition-opacity duration-300
              group-hover:opacity-100
            `}
            />
          </div>

          <div className={`
            flex flex-1 flex-col p-1.5 typo-caption-r-2 text-gray-700
            sm:p-2.5 sm:typo-caption-r-1
          `}
          >
            <div className="shrink-0">
              <p className="tabular-nums">
                {`${performanceDate} (${startTime}~${endTime})`}
              </p>

              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
                <span className="line-clamp-1">{locationName}</span>
              </div>
            </div>

            <h3 className={`
              mt-0.75 line-clamp-2 typo-body-sb-2 text-black transition-colors
              duration-200
              group-hover:text-primary
            `}
            >
              {title}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
});
