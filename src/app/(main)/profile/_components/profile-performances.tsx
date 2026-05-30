'use client';

import type { MyPerformanceSummary } from '@/apis/performance';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useRef, useState } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/common/dropdown-menu';
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
  imageUrl?: string | null;
}

interface MyPerformanceCardMoreMenuProps {
  onDeleteClick: () => void;
  isDeletePending: boolean;
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
          imageUrl={performance.imageUrl}
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
  imageUrl,
}: MyPerformanceCardProps) {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate: deleteMyPerformance, isPending: isDeletePending } = useDeletePerformance();
  const { date, time } = formatPerformanceTime(startTime, endTime);
  const thumbnailSrc = imageUrl;

  return (
    <>
      <article className={`
        relative flex w-full items-center rounded-lg bg-white p-2.5
        shadow-elevate-2
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
        <div className="flex h-45 flex-1 flex-col justify-center gap-7.5 px-10">
          {/* 상단: 제목 + 더보기 */}
          <div className="flex items-center justify-between">
            <h3 className="typo-body-sb-1 text-black">
              {/*
                ::after overlay 패턴: 이 <a> 의 ::after 가 <article> 전체를 덮어
                카드 아무 곳이나 클릭하면 상세로 이동. nesting 없음.
              */}
              <Link
                href={routePaths.performanceDetail(performanceId)}
                className={`
                  text-black outline-0
                  after:absolute after:inset-0 after:content-['']
                  focus-visible:underline
                `}
              >
                {title}
              </Link>
            </h3>
            {/* z-20: ::after(z-10) 위에 떠야 클릭이 트리거에 닿음 */}
            <div className="relative z-20">
              <MyPerformanceCardMoreMenu
                onDeleteClick={() => setIsDeleteDialogOpen(true)}
                isDeletePending={isDeletePending}
              />
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
      </article>
      <PerformanceDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() => deleteMyPerformance(performanceId)}
        isPending={isDeletePending}
      />
    </>
  );
}

export function MyPerformanceCardMoreMenu({
  onDeleteClick,
  isDeletePending,
}: MyPerformanceCardMoreMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="더보기"
          className={`
            cursor-pointer rounded-full p-1.5 outline-0
            hover:bg-gray-100
            focus-visible:ring-0 focus-visible:ring-offset-0
          `}
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
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={`
          w-30 typo-caption-r-1 text-black shadow-[0_0_4px_rgba(0,0,0,0.25)]
          outline-0
        `}
      >
        <DropdownMenuItem className="cursor-pointer px-2.5 py-[14.5px]">
          <Image
            src="/icons/pencilSquare.svg"
            alt=""
            width={19}
            height={19}
            aria-hidden="true"
            unoptimized
          />
          수정하기
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-black/10" />
        <DropdownMenuItem
          disabled={isDeletePending}
          className="cursor-pointer px-2.5 py-[14.5px]"
          onSelect={onDeleteClick}
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
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
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
