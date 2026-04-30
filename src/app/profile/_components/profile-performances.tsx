'use client';

import type { MyPerformanceSummary } from '@/apis/performance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { Spinner } from '@/components/common/spinner';
import { PerformanceDeleteConfirmDialog, PerformanceRegisterButton } from '@/components/performance';
import { useDeletePerformance } from '@/hooks/performance';
import { myPerformancesInfiniteQueryOptions } from '@/queries/performance/performance.query';
import { routePaths } from '@/utils';

interface PerformancesProps {
  performances: MyPerformanceSummary[];
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
}

interface MyPerformanceCardProps {
  performanceId: number;
  title: string;
  startTime: string;
  endTime: string;
  performanceLocationName: string;
  imageUrls: string[];
}

function formatPerformanceTime(startTime: string, endTime: string) {
  const start = new Date(startTime);
  const end = new Date(endTime);

  return {
    date: format(start, 'yyyy년 MM월 dd일 (eee)', { locale: ko }),
    time: `${format(start, 'HH:mm')} ~ ${format(end, 'HH:mm')}`,
  };
}

export function ProfilePerformances() {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage }
    = useSuspenseInfiniteQuery(myPerformancesInfiniteQueryOptions());
  const performances = data.pages.flatMap(page => page.content);

  return (
    <div className="flex w-full flex-1 flex-col">
      {performances.length === 0
        ? (
            <EmptyPerformances />
          )
        : (
            <>
              {/*
            absolute 버튼: 이 div는 relative 없음
            → 상위 profile-tab.tsx의 div.relative 기준으로 위치됨
          */}
              <PerformanceRegisterButton className="absolute -top-17.5 right-0" theme="lightGray" size="md">
                내 공연 등록하기
              </PerformanceRegisterButton>
              <Performances
                performances={performances}
                onLoadMore={fetchNextPage}
                hasMore={!!hasNextPage}
                isLoading={isFetchingNextPage}
              />
            </>
          )}
    </div>
  );
}

function Performances({ performances, onLoadMore, hasMore, isLoading }: PerformancesProps) {
  const isLoadingRef = useRef(isLoading);
  isLoadingRef.current = isLoading;

  const sentinelCallbackRef = useCallback((node: HTMLDivElement | null) => {
    if (!node)
      return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingRef.current) {
          onLoadMore();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [onLoadMore]);

  return (
    <section className="flex w-full flex-1 flex-col gap-7.5">
      {performances.map(performance => (
        <MyPerformanceCard
          key={performance.performanceId}
          performanceId={performance.performanceId}
          title={performance.title}
          startTime={performance.startTime}
          endTime={performance.endTime}
          performanceLocationName={performance.performanceLocationName}
          imageUrls={performance.imageUrls}
        />
      ))}
      {hasMore && (
        <div
          ref={sentinelCallbackRef}
          className="flex h-20 items-center justify-center"
        >
          {isLoading && <Spinner className="size-6 text-gray-400" />}
        </div>
      )}
    </section>
  );
}

function MyPerformanceCard({
  performanceId,
  title,
  startTime,
  endTime,
  performanceLocationName,
  imageUrls,
}: MyPerformanceCardProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deleteMyPerformance, isPending: isDeletePending } = useDeletePerformance();
  const { date, time } = formatPerformanceTime(startTime, endTime);
  const thumbnailSrc = imageUrls[0];

  return (
    <>
      <Link href={routePaths.performanceDetail(performanceId)}>
        <div className={`
          flex w-full items-center rounded-lg bg-white p-2.5 shadow-elevate-2
        `}
        >
          {/* 썸네일 */}
          <div className={`
            relative h-45 w-37.5 shrink-0 overflow-hidden rounded-lg bg-gray-300
          `}
          >
            {thumbnailSrc && (
              <Image
                src={thumbnailSrc}
                alt={title}
                fill
                className="object-cover"
                sizes="150px"
              />
            )}
          </div>

          {/* 콘텐츠 */}
          <div className={`
            flex h-45 flex-1 flex-col justify-center gap-7.5 px-10
          `}
          >
            {/* 상단: 제목 + 더보기 */}
            <div className="flex items-center justify-between">
              <h3 className="typo-body-sb-1 text-black">{title}</h3>
              <div
                className="relative"
                onBlurCapture={(event) => {
                  const nextTarget = event.relatedTarget;
                  if (!(nextTarget instanceof Node)) {
                    setIsMenuOpen(false);
                    return;
                  }
                  if (!event.currentTarget.contains(nextTarget)) {
                    setIsMenuOpen(false);
                  }
                }}
              >
                <button
                  type="button"
                  aria-label="더보기"
                  aria-haspopup="menu"
                  aria-expanded={isMenuOpen}
                  className={`
                    flex shrink-0 cursor-pointer items-center justify-center
                    rounded-full p-1.5 transition-colors
                    hover:bg-gray-100
                  `}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setIsMenuOpen(prev => !prev);
                  }}
                >
                  <Image
                    src="/icons/ellipsisVertical.svg"
                    alt=""
                    width={30}
                    height={30}
                    aria-hidden="true"
                    unoptimized
                  />
                </button>

                {isMenuOpen && (
                  <div
                    role="menu"
                    aria-label="더보기 메뉴"
                    className={`
                      absolute top-[calc(100%+8px)] right-0 z-dropdown w-30
                      overflow-hidden rounded-[10px] bg-white
                      shadow-[0_0_4px_rgba(0,0,0,0.25)]
                    `}
                  >
                    <button
                      type="button"
                      role="menuitem"
                      className={`
                        flex h-12.5 w-full cursor-pointer items-center gap-1.25
                        border-b border-black/10 p-2.5 typo-caption-r-1
                        text-black transition-colors
                        hover:bg-gray-100
                      `}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMenuOpen(false);
                      }}
                    >
                      <Image
                        src="/icons/pencilSquare.svg"
                        alt=""
                        width={19}
                        height={19}
                        aria-hidden="true"
                        unoptimized
                      />
                      수정하기
                    </button>
                    <button
                      type="button"
                      role="menuitem"
                      disabled={isDeletePending}
                      className={`
                        flex h-12.5 w-full cursor-pointer items-center gap-1.25
                        p-2.5 typo-caption-r-1 text-black transition-colors
                        hover:bg-gray-100
                        disabled:cursor-not-allowed disabled:opacity-50
                      `}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsMenuOpen(false);
                        setIsDeleteDialogOpen(true);
                      }}
                    >
                      <Image
                        src="/icons/trashCan.svg"
                        alt=""
                        width={19}
                        height={19}
                        aria-hidden="true"
                        unoptimized
                      />
                      삭제하기
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 하단: 날짜/시간 + 장소 */}
            <div className="flex flex-col gap-1.25">
              <div className="typo-caption-m-1 text-gray-700">
                <p>{date}</p>
                <p>{time}</p>
              </div>
              <div className="flex items-center gap-1.25">
                <Image
                  src="/icons/mapPin.svg"
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden="true"
                  unoptimized
                />
                <p className="typo-caption-m-1 text-gray-700">
                  {performanceLocationName}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
      <PerformanceDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => deleteMyPerformance(performanceId)}
        isPending={isDeletePending}
      />
    </>
  );
}

function EmptyPerformances() {
  return (
    <section className="flex w-full flex-1 flex-col items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        <div className="flex flex-col items-center gap-2.5">
          <Image
            src="/icons/bangCircle-gray.svg"
            alt=""
            width={40}
            height={40}
            unoptimized
            aria-hidden="true"
          />
          <div className="flex flex-col items-center gap-1.25">
            <p className="typo-body-m-3 text-gray-600">등록한 공연이 없습니다.</p>
            <p className="typo-caption-r-1 text-gray-600">나의 공연을 등록하고 홍보해 보세요!</p>
          </div>
        </div>
        <PerformanceRegisterButton theme="lightGray" size="md">
          내 공연 등록하기
        </PerformanceRegisterButton>
      </div>
    </section>
  );
}
