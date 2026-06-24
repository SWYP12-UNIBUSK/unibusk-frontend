'use client';

import useEmblaCarousel from 'embla-carousel-react';
import React, { useCallback, useId, useMemo, useRef, useSyncExternalStore } from 'react';
import { cn } from '@/utils';

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

type ProgressVariant = 'thumb' | 'fill';

export interface ResponsivePerView {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
}

interface ResponsiveNumber {
  base: number;
  sm?: number;
  md?: number;
  lg?: number;
}

interface EmblaSnapshot {
  progress: number;
  snapCount: number;
  canPrev: boolean;
  canNext: boolean;
}

const DEFAULT_SNAPSHOT: EmblaSnapshot = {
  progress: 0,
  snapCount: 1,
  canPrev: false,
  canNext: false,
};

export interface EmblaCardCarouselProps {
  children: React.ReactNode;
  className?: string;

  perView?: number | ResponsivePerView;
  slidesToScroll?: number;
  loop?: boolean;

  gapPx?: number | ResponsiveNumber;

  showProgress?: boolean;
  progressVariant?: ProgressVariant;

  showArrows?: boolean;
  arrowClassName?: string;
  progressTrackClassName?: string;
  progressIndicatorClassName?: string;
}

function flattenChildren(node: React.ReactNode): React.ReactNode[] {
  if (node == null || typeof node === 'boolean') {
    return [];
  }

  if (Array.isArray(node)) {
    return node.flatMap(flattenChildren);
  }

  return [node];
}

function normalizePerView(value: number) {
  return Math.max(1, Math.min(value, 12));
}

function useResponsivePerView(base: number, sm: number, md: number, lg: number) {
  const subscribe = useCallback((onStoreChange: () => void) => {
    const mediaQueries = [
      window.matchMedia('(min-width: 36rem)'),
      window.matchMedia('(min-width: 48rem)'),
      window.matchMedia('(min-width: 64rem)'),
    ];

    mediaQueries.forEach(query => query.addEventListener('change', onStoreChange));

    return () => {
      mediaQueries.forEach(query => query.removeEventListener('change', onStoreChange));
    };
  }, []);

  const getSnapshot = useCallback(() => {
    if (window.matchMedia('(min-width: 64rem)').matches) {
      return lg;
    }

    if (window.matchMedia('(min-width: 48rem)').matches) {
      return md;
    }

    if (window.matchMedia('(min-width: 36rem)').matches) {
      return sm;
    }

    return base;
  }, [base, lg, md, sm]);

  return useSyncExternalStore(subscribe, getSnapshot, () => base);
}

export function EmblaCardCarousel({
  children,
  className,
  perView = 4,
  slidesToScroll = 1,
  loop = false,
  gapPx = 24,
  showProgress = true,
  progressVariant = 'thumb',
  showArrows = false,
  arrowClassName,
  progressTrackClassName,
  progressIndicatorClassName,
}: EmblaCardCarouselProps) {
  const slides = useMemo(() => flattenChildren(children), [children]);
  const totalSlides = slides.length;

  const [viewportRef, embla] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll,
    loop,
  });

  const subscribe = useCallback(
    (onStoreChange: () => void) => {
      if (!embla) {
        return () => {};
      }

      const handler = () => {
        onStoreChange();
      };

      embla.on('select', handler);
      embla.on('scroll', handler);
      embla.on('reInit', handler);

      return () => {
        embla.off('select', handler);
        embla.off('scroll', handler);
        embla.off('reInit', handler);
      };
    },
    [embla],
  );

  const snapshotRef = useRef<EmblaSnapshot>(DEFAULT_SNAPSHOT);

  const getSnapshot = useCallback((): EmblaSnapshot => {
    if (!embla) {
      return DEFAULT_SNAPSHOT;
    }

    const next: EmblaSnapshot = {
      progress: Number(clamp01(embla.scrollProgress()).toFixed(6)),
      snapCount: Math.max(1, embla.scrollSnapList().length),
      canPrev: embla.canScrollPrev(),
      canNext: embla.canScrollNext(),
    };

    const prev = snapshotRef.current;

    if (
      prev.progress === next.progress
      && prev.snapCount === next.snapCount
      && prev.canPrev === next.canPrev
      && prev.canNext === next.canNext
    ) {
      return prev;
    }

    snapshotRef.current = next;
    return next;
  }, [embla]);

  const { progress, snapCount, canPrev, canNext } = useSyncExternalStore(
    subscribe,
    getSnapshot,
    () => DEFAULT_SNAPSHOT,
  );

  const safePerViewBase = normalizePerView(typeof perView === 'number' ? perView : perView.base);
  const safePerViewSm = normalizePerView(typeof perView === 'number' ? perView : (perView.sm ?? safePerViewBase));
  const safePerViewMd = normalizePerView(typeof perView === 'number' ? perView : (perView.md ?? safePerViewSm));
  const safePerViewLg = normalizePerView(typeof perView === 'number' ? perView : (perView.lg ?? safePerViewMd));
  const safePerView = useResponsivePerView(safePerViewBase, safePerViewSm, safePerViewMd, safePerViewLg);
  const hasScrollable = totalSlides > safePerView;

  const safeGapBase = typeof gapPx === 'number' ? gapPx : gapPx.base;
  const safeGapSm = typeof gapPx === 'number' ? gapPx : (gapPx.sm ?? safeGapBase);
  const safeGapMd = typeof gapPx === 'number' ? gapPx : (gapPx.md ?? safeGapSm);
  const safeGapLg = typeof gapPx === 'number' ? gapPx : (gapPx.lg ?? safeGapMd);

  const thumbWidthPct
    = progressVariant === 'thumb'
      ? Math.min(100, 100 / snapCount)
      : Math.min(100, (safePerView / Math.max(1, totalSlides)) * 100);

  const leftPct
    = progressVariant === 'thumb'
      ? thumbWidthPct >= 100
        ? 0
        : progress * (100 - thumbWidthPct)
      : 0;

  const fillPct = progressVariant === 'fill' ? progress * 100 : 0;

  const handlePrev = useCallback(() => {
    if (!embla) {
      return;
    }

    embla.scrollPrev();
  }, [embla]);

  const handleNext = useCallback(() => {
    if (!embla) {
      return;
    }

    embla.scrollNext();
  }, [embla]);

  const fallbackKeyPrefix = useId();

  return (
    <section
      className={cn(
        'group relative w-full',
        '[--carousel-gap:var(--carousel-gap-base)]',
        '[--carousel-per-view:var(--carousel-per-view-base)]',
        'sm:[--carousel-gap:var(--carousel-gap-sm)]',
        'sm:[--carousel-per-view:var(--carousel-per-view-sm)]',
        'md:[--carousel-gap:var(--carousel-gap-md)]',
        'md:[--carousel-per-view:var(--carousel-per-view-md)]',
        'lg:[--carousel-gap:var(--carousel-gap-lg)]',
        'lg:[--carousel-per-view:var(--carousel-per-view-lg)]',
        className,
      )}
      style={
        {
          '--carousel-gap-base': `${safeGapBase}px`,
          '--carousel-gap-sm': `${safeGapSm}px`,
          '--carousel-gap-md': `${safeGapMd}px`,
          '--carousel-gap-lg': `${safeGapLg}px`,
          '--carousel-per-view-base': String(safePerViewBase),
          '--carousel-per-view-sm': String(safePerViewSm),
          '--carousel-per-view-md': String(safePerViewMd),
          '--carousel-per-view-lg': String(safePerViewLg),
        } as React.CSSProperties
      }
    >
      <div ref={viewportRef} className="overflow-hidden">
        <div className="-ml-(--carousel-gap) flex touch-pan-y">
          {slides.map((node, idx) => {
            const nodeKey
              = React.isValidElement(node) && node.key != null
                ? node.key
                : `${fallbackKeyPrefix}-${idx}`;

            return (
              <div
                key={nodeKey}
                className={cn(
                  'box-border min-w-0 cursor-pointer pl-(--carousel-gap)',
                  'flex-[0_0_calc(100%/var(--carousel-per-view))]',
                )}
                aria-roledescription="slide"
              >
                {node}
              </div>
            );
          })}
        </div>
      </div>

      {showArrows && hasScrollable && (
        <>
          <button
            type="button"
            aria-label="이전"
            onClick={handlePrev}
            disabled={!canPrev}
            className={cn(
              `
                absolute top-1/2 -left-14 z-10 -translate-y-1/2 cursor-pointer
                opacity-0 transition-opacity
              `,
              `
                group-hover:opacity-100
                hover:opacity-100
                focus-visible:opacity-100
              `,
              `
                flex h-10 w-10 items-center justify-center rounded-full bg-white
                shadow-[0_6px_22px_rgba(0,0,0,0.12)]
              `,
              'disabled:opacity-30',
              arrowClassName,
            )}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path d="M15 6L9 12L15 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            type="button"
            aria-label="다음"
            onClick={handleNext}
            disabled={!canNext}
            className={cn(
              `
                absolute top-1/2 -right-14 z-10 -translate-y-1/2 cursor-pointer
                opacity-0 transition-opacity
              `,
              `
                group-hover:opacity-100
                hover:opacity-100
                focus-visible:opacity-100
              `,
              `
                flex h-10 w-10 items-center justify-center rounded-full bg-white
                shadow-[0_6px_22px_rgba(0,0,0,0.12)]
              `,
              'disabled:opacity-30',
              arrowClassName,
            )}

          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="block"
            >
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {showProgress && hasScrollable && (
        <div className={cn('relative mt-6 h-0.5 w-full bg-gray-300', progressTrackClassName)}>
          {progressVariant === 'thumb' && (
            <div
              className={cn('absolute top-0 h-full bg-primary', progressIndicatorClassName)}
              style={{ width: `${thumbWidthPct}%`, left: `${leftPct}%` }}
            />
          )}

          {progressVariant === 'fill' && (
            <div
              className={cn('absolute top-0 h-full bg-primary', progressIndicatorClassName)}
              style={{ width: `${fillPct}%` }}
            />
          )}
        </div>
      )}
    </section>
  );
}
