'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { Children, useCallback, useEffect, useMemo, useState } from 'react';
import { cn } from '@/utils';

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type ProgressVariant = 'thumb' | 'fill';

export interface EmblaCardCarouselProps {
  children: React.ReactNode;
  className?: string;

  perView?: number;
  slidesToScroll?: number;
  loop?: boolean;

  gapPx?: number;

  showProgress?: boolean;
  progressVariant?: ProgressVariant;

  arrowClassName?: string;
  progressTrackClassName?: string;
  progressIndicatorClassName?: string;
};

export function EmblaCardCarousel({
  children,
  className,
  perView = 4,
  slidesToScroll = 1,
  loop = false,
  gapPx = 24,
  showProgress = true,
  progressVariant = 'thumb',
  progressTrackClassName,
  progressIndicatorClassName,
}: EmblaCardCarouselProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const totalSlides = slides.length;

  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll,
    loop,
  });

  const [progress, setProgress] = useState(0);
  const [snapCount, setSnapCount] = useState(1);

  const update = useCallback(() => {
    if (!embla) {
      return;
    }

    setProgress(clamp01(embla.scrollProgress()));
    setSnapCount(Math.max(1, embla.scrollSnapList().length));
  }, [embla]);

  useEffect(() => {
    if (!embla) {
      return;
    }

    update();
    embla.on('select', update);
    embla.on('scroll', update);
    embla.on('reInit', update);

    return () => {
      embla.off('select', update);
      embla.off('scroll', update);
      embla.off('reInit', update);
    };
  }, [embla, update]);

  const safePerView = Math.max(1, Math.min(perView, 12));

  const thumbWidthPct
    = progressVariant === 'thumb' ? Math.min(100, 100 / snapCount) : Math.min(100, (safePerView / Math.max(1, totalSlides)) * 100);

  const leftPct
    = progressVariant === 'thumb'
      ? thumbWidthPct >= 100
        ? 0
        : progress * (100 - thumbWidthPct)
      : 0;

  const fillPct = progressVariant === 'fill' ? progress * 100 : 0;

  const hasScrollable = totalSlides > safePerView;

  return (
    <section
      className={cn('group relative w-full', className)}
      style={
        {
          ['--carousel-gap' as any]: `${gapPx}px`,
          ['--carousel-per-view' as any]: String(safePerView),
        } as React.CSSProperties
      }
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="-ml-(--carousel-gap) flex touch-pan-y">
          {slides.map((node, idx) => (
            <div
              key={idx}
              className={cn(
                'box-border min-w-0 cursor-pointer pl-(--carousel-gap)',
                'flex-[0_0_calc(100%/var(--carousel-per-view))]',
              )}
              aria-roledescription="slide"
            >
              {node}
            </div>
          ))}
        </div>
      </div>

      {showProgress && hasScrollable && (
        <div className={cn('relative mt-6 h-0.5 w-full bg-gray-200', progressTrackClassName)}>
          {progressVariant === 'thumb' && (
            <div
              className={cn('absolute top-0 h-full bg-orange-500', progressIndicatorClassName)}
              style={{ width: `${thumbWidthPct}%`, left: `${leftPct}%` }}
            />
          )}

          {progressVariant === 'fill' && (
            <div
              className={cn('absolute top-0 h-full bg-orange-500', progressIndicatorClassName)}
              style={{ width: `${fillPct}%` }}
            />
          )}
        </div>
      )}
    </section>
  );
}
