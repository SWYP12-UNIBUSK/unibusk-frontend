'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ImageIcon } from 'lucide-react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { Button } from '@/components/common/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/common/dropdown-menu';
import { PerformanceDeleteConfirmDialog } from '@/components/performance/performance-delete-confirm-dialog';
import { useDeletePerformance } from '@/hooks/performance/use-delete-performance';
import { useAuth } from '@/hooks/use-auth';
import { performanceDetailQueryOptions } from '@/queries/performance';
import { cn } from '@/utils';

const PerformanceLocation = dynamic(
  () => import('./performance-location').then(m => m.PerformanceLocation),
  { ssr: false },
);

interface PerformanceInfoProps {
  performanceId: number;
}

export function PerformanceInfo({ performanceId }: PerformanceInfoProps) {
  const { data: performanceDetail } = useSuspenseQuery(performanceDetailQueryOptions(performanceId));
  const { title, performanceDate, locationName, imageUrl, summary, startTime, endTime, performers, description, latitude, longitude, memberId } = performanceDetail;
  const router = useRouter();
  const { user, isAuthenticated, isPending } = useAuth();
  const isOwner = !isPending && isAuthenticated && user?.memberId === memberId;

  return (
    <section className={`
      pt-15
      lg:pt-37.5
    `}
    >
      <Suspense fallback={<div>로딩 중...</div>}>
        <Summary
          title={title}
          performanceDate={performanceDate}
          locationName={locationName}
          isOwner={isOwner}
          performanceId={performanceId}
        />
      </Suspense>
      <Content
        title={title}
        posterUrl={imageUrl}
        summary={summary}
        startTime={startTime}
        endTime={endTime}
        performers={performers[0] ?? { name: '', email: '', phoneNumber: '' }}
        description={description}
      />
      <PerformanceLocation coordinate={{ lat: latitude, lng: longitude }} />
      <div className={`
        flex justify-center py-10
        lg:pt-17.5 lg:pb-20.75
      `}
      >
        <Button
          onClick={() => {
            if (window.history.length > 1) {
              router.back();
            }
            else {
              router.push('/performance-list');
            }
          }}
          theme="lightGray"
          size="lg"
          mobileSize="md"
        >
          목록
        </Button>
      </div>
    </section>
  );
}

interface SummaryProps {
  title: string;
  performanceDate: string;
  locationName: string;
  isOwner: boolean;
  performanceId: number;
}

function Summary({ title, performanceDate, locationName, isOwner, performanceId }: SummaryProps) {
  const currentTab = useSearchParams().get('tab') ?? 'upcoming';

  return (
    <div className={`
      flex flex-col gap-3 border-b-2 border-orange-200
      lg:gap-5
    `}
    >
      {/* 현재 공연 탭 */}
      <div className={`
        flex items-center gap-2
        lg:gap-2.5
      `}
      >
        <div className={cn(
          `
            typo-caption-sb-1
            lg:typo-body-sb-2
          `,
          currentTab === 'upcoming' ? 'text-primary' : 'text-gray-300',
        )}
        >
          다가오는 공연
        </div>
        <div className="h-1.25 w-1.25 rounded-full bg-gray-300" />
        <div className={cn(
          `
            typo-caption-sb-1
            lg:typo-body-sb-2
          `,
          currentTab === 'past' ? 'text-primary' : 'text-gray-300',
        )}
        >
          지난 공연
        </div>
      </div>

      {/* 공연 요약 */}
      <div className={`
        flex items-center justify-between gap-2.5
        lg:gap-5
      `}
      >
        <div className={`
          flex min-w-0 flex-col gap-2
          lg:gap-3.75
        `}
        >
          <h1 className={`
            typo-body-b-1 wrap-break-word text-black
            lg:typo-title-b-3
          `}
          >
            {title}
          </h1>
          <div className={`
            flex flex-wrap items-center gap-2.5 pb-3
            lg:gap-5 lg:pb-5
          `}
          >
            <span className={`
              typo-caption-sb-1 text-gray-500
              lg:typo-body-sb-2
            `}
            >
              {performanceDate}
            </span>
            <div className="h-3 w-px bg-gray-300" />
            <span className={`
              typo-caption-sb-1 wrap-break-word text-gray-500
              lg:typo-body-sb-2
            `}
            >
              {locationName}
            </span>
          </div>
        </div>
        {isOwner && <PerformanceOwnerMenu performanceId={performanceId} />}
      </div>
    </div>
  );
}

interface PerformanceOwnerMenuProps {
  performanceId: number;
}

function PerformanceOwnerMenu({ performanceId }: PerformanceOwnerMenuProps) {
  const router = useRouter();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const { mutate, isPending: isDeletePending } = useDeletePerformance();

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            aria-label="더보기"
            className={`
              cursor-pointer rounded-full p-1.5 outline-0
              hover:bg-gray-100
              focus-visible:ring-2 focus-visible:ring-primary
              focus-visible:ring-offset-2
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
          <DropdownMenuItem
            asChild
            className="cursor-pointer px-2.5 py-[14.5px]"
          >
            <Link href={`/performance/${performanceId}/edit`}>
              <Image
                src="/icons/pencilSquare.svg"
                alt=""
                width={19}
                height={19}
                aria-hidden="true"
                unoptimized
              />
              수정하기
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-black/10" />
          <DropdownMenuItem
            disabled={isDeletePending}
            className="cursor-pointer px-2.5 py-[14.5px]"
            onSelect={() => setIsDeleteDialogOpen(true)}
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
      <PerformanceDeleteConfirmDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={() =>
          mutate(performanceId, {
            onSuccess: () => {
              if (window.history.length > 1) {
                router.back();
              }
              else {
                router.push('/performance-list');
              }
            },
          })}
        isPending={isDeletePending}
      />
    </>
  );
}

interface ContentProps {
  title: string;
  posterUrl: string | null | undefined;
  summary: string;
  startTime: string;
  endTime: string;
  performers: {
    name: string;
    email: string;
    phoneNumber: string;
  };
  description: string;
}

function Content({ posterUrl, summary, startTime, endTime, performers, description, title }: ContentProps) {
  return (
    <div>
      <div className={`
        flex flex-col gap-5 border-b-2 border-gray-200 pt-5 pb-6
        lg:flex-row lg:gap-17.5 lg:pt-10.5 lg:pb-12.5
      `}
      >
        {/* 공연 포스터 */}
        <div className={`
          relative aspect-3/4 w-full overflow-hidden rounded-lg
          sm:aspect-auto sm:h-100 sm:w-75
          md:h-150 md:w-125
          lg:h-202 lg:w-177
        `}
        >
          {posterUrl
            ? (
                <Image
                  src={posterUrl}
                  alt={`${title} 공연 포스터`}
                  fill
                  className="object-cover"
                  sizes={`
                    (max-width: 575px) calc(100vw - 40px),
                    (max-width: 767px) 300px,
                    (max-width: 1023px) 500px,
                    708px
                  `}
                />
              )
            : (
                <div className={`
                  flex h-full w-full items-center justify-center bg-linear-to-br
                  from-muted via-muted/80 to-muted/60
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
              )}
        </div>

        {/* 공연 정보 */}
        <div className={`
          flex min-w-0 flex-col
          lg:pt-7.5
        `}
        >
          <InfoRow label="공연소개" className="pb-3.75">
            {summary}
          </InfoRow>

          <InfoRow label="시간" className="pb-7.5">
            {`${startTime} - ${endTime}`}
          </InfoRow>

          <InfoRow label="공연자">
            <div className="flex flex-col gap-2">
              <div>{performers.name}</div>
              <div>{performers.phoneNumber}</div>
              <div className="break-all">{performers.email}</div>
            </div>
          </InfoRow>
        </div>
      </div>
      <div className={`
        min-h-100 border-b-2 border-gray-200 py-2.5 typo-body-m-3
        wrap-break-word whitespace-pre-wrap text-black
        lg:min-h-155.5 lg:typo-title-b-5
      `}
      >
        {description}
      </div>
    </div>
  );
}

interface InfoRowProps {
  label: string;
  children: React.ReactNode;
  className?: string;
}

function InfoRow({ label, children, className }: InfoRowProps) {
  return (
    <div className={cn(`
      flex min-w-0 items-start gap-3
      lg:gap-7.5
    `, className)}
    >
      <div className={`
        flex h-8 w-16 flex-none items-center justify-center rounded-full border
        border-gray-200 typo-caption-r-2 text-gray-700
        lg:h-11 lg:w-[85px] lg:typo-body-m-3
      `}
      >
        {label}
      </div>
      <div className={`
        flex min-w-0 flex-col p-1 typo-caption-r-1 wrap-break-word text-black
        lg:p-2.5 lg:typo-body-m-3
      `}
      >
        {children}
      </div>
    </div>
  );
}
