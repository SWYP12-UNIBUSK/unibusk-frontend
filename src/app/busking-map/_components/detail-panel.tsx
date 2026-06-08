'use client';

import type { UIEvent } from 'react';
import type { BuskingPlace } from '@/types/busking-map';
import { cva } from 'class-variance-authority';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/common/button';
import { LineDivider } from '@/components/common/line-divider';
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/common/tags/tabs';
import { usePerformanceLocationApplicationGuides, usePerformanceLocationDetail } from '@/hooks/performance-locations';
import { useLocationPerformances } from '@/hooks/performance/use-location-performances';
import { cn } from '@/utils';

type DetailPanelVariant = 'focused' | 'detail';
type PerformanceTab = 'upcoming' | 'past';

interface ApplicationGuideItem {
  applicationGuideId: number;
  performanceLocationId: number;
  content: string;
}

interface DetailPanelProps {
  place: BuskingPlace | null;
  onCloseClick: () => void;
  variant?: DetailPanelVariant;
}

const detailPanelVariants = cva(`
  relative h-full w-full overflow-hidden bg-white
`, {
  variants: {
    variant: {
      focused: 'rounded-4xl shadow-sidebar',
      detail: 'rounded-none shadow-none',
    },
  },
  defaultVariants: {
    variant: 'focused',
  },
});

const detailPanelBodyVariants = cva(
  'absolute inset-x-0 bottom-0 z-10 bg-white transition-all duration-200',
  {
    variants: {
      variant: {
        focused: 'rounded-t-4xl',
        detail: 'rounded-none',
      },
    },
    defaultVariants: {
      variant: 'focused',
    },
  },
);

interface PerformanceItem {
  id: string;
  dateText: string;
  imageUrl: string | null;
  title: string;
}

interface LocationPerformanceItem {
  performanceId: number;
  title: string;
  performanceDate: string;
  startTime: string;
  endTime: string;
  imageUrl?: string;
}

interface LocationPerformancesResponse {
  content: LocationPerformanceItem[];
  nextCursorTime: string | null;
  nextCursorId: number | null;
  hasNext: boolean;
}

function formatPerformanceDateText(item: LocationPerformanceItem) {
  const rawDate = item.performanceDate;
  const dateText = rawDate.includes('-') ? rawDate.replaceAll('-', '.') : rawDate;

  const start = item.startTime.length >= 16 ? item.startTime.slice(11, 16) : '';
  const end = item.endTime.length >= 16 ? item.endTime.slice(11, 16) : '';
  const timeText = start && end ? `(${start}~${end})` : '(시간 정보 없음)';

  return `${dateText}\n${timeText}`;
}

function IconCircleButton({
  ariaLabel,
  iconSrc,
  iconSize,
  onClick,
  hoverClassName,
}: {
  ariaLabel: string;
  iconSrc: string;
  iconSize: { w: number; h: number };
  onClick: () => void;
  hoverClassName: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(
        `
          pointer-events-auto flex h-10 w-10 cursor-pointer items-center
          justify-center rounded-full
        `,
        hoverClassName,
      )}
    >
      <Image src={iconSrc} alt="" width={iconSize.w} height={iconSize.h} />
    </button>
  );
}

function PanelHeader({
  onBackClick,
  onCloseClick,
  isSolid,
}: {
  onBackClick: () => void;
  onCloseClick: () => void;
  isSolid: boolean;
}) {
  const backIconSrc = isSolid ? '/icons/chevron-left.svg' : '/icons/chevron-left-white.svg';
  const closeIconSrc = isSolid ? '/icons/x.svg' : '/icons/x-white.svg';

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-20">
      <div
        className={cn(
          'flex h-17 items-center justify-between px-3 transition-colors',
          isSolid ? 'border-b border-gray-200 bg-white' : 'bg-transparent',
        )}
      >
        <IconCircleButton
          ariaLabel="뒤로"
          iconSrc={backIconSrc}
          iconSize={{ w: 14, h: 24 }}
          onClick={onBackClick}
          hoverClassName={isSolid ? 'hover:bg-black/5' : 'hover:bg-white/10'}
        />
        <IconCircleButton
          ariaLabel="닫기"
          iconSrc={closeIconSrc}
          iconSize={{ w: 16, h: 16 }}
          onClick={onCloseClick}
          hoverClassName={isSolid ? 'hover:bg-black/5' : 'hover:bg-white/10'}
        />
      </div>
    </div>
  );
}

function PerformanceCard({ performanceId, dateText, imageUrl, title }: { performanceId: number; dateText: string; imageUrl: string | null; title: string }) {
  return (
    <div className="flex flex-col">

      <Link
        href={`/performance-detail/${performanceId}`}
        aria-label="공연 상세로 이동"
        className="block"
      >
        <div className={`
          relative aspect-130/180 w-full cursor-pointer overflow-hidden
          rounded-sm bg-gray-200
        `}
        >
          {imageUrl
            ? (
                <Image
                  src={imageUrl}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 420px) 130px, 180px"
                />
              )
            : null}
        </div>
      </Link>

      <div className="px-0.5">
        <p className={`
          mt-1 mb-px typo-caption-r-2 whitespace-pre-line text-gray-600
        `}
        >
          {dateText}
        </p>
        <span className={`
          typo-caption-r-2 wrap-break-word whitespace-normal text-black
        `}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

function EmptyPerformances({ tab }: { tab: PerformanceTab }) {
  const message = tab === 'upcoming'
    ? '아직 등록된 공연 일정이 없어요.\n다음 공연을 기다려주세요!'
    : '종료된 공연이 아직 없어요.\n다음 공연을 기다려주세요!';

  return (
    <div
      className={`
        flex min-h-40 w-full items-center justify-center px-6 pt-7.75 pb-50
        text-center
      `}
    >
      <p className="typo-caption-r-1 whitespace-pre-line text-gray-500">{message}</p>
    </div>
  );
}

function LocationPerformancesSection({ performanceLocationId }: { performanceLocationId: number | null }) {
  const [activeTab, setActiveTab] = useState<PerformanceTab>('upcoming');

  const {
    upcoming,
    past,
    isPending,
  } = useLocationPerformances({ performanceLocationId, size: 10 });

  const upcomingItems = (upcoming as LocationPerformancesResponse | null)?.content ?? [];
  const pastItems = (past as LocationPerformancesResponse | null)?.content ?? [];
  const items = activeTab === 'upcoming' ? upcomingItems : pastItems;

  const performances: PerformanceItem[] = useMemo(() => {
    return items.map((item) => {
      return {
        id: String(item.performanceId),
        dateText: formatPerformanceDateText(item),
        imageUrl: item.imageUrl ?? null,
        title: item.title ?? '',
      };
    });
  }, [items]);

  return (
    <div className="mt-8.25">
      <p className="mb-1.25 text-center typo-body-sb-2 text-black">이곳에서 진행되는 공연</p>

      <div className="px-7.25">
        <Tabs defaultValue="upcoming" onValueChange={value => setActiveTab(value as PerformanceTab)}>
          <TabsList
            className={
              `
                mx-auto flex w-50 border-0 bg-transparent p-0 shadow-none ring-0
                outline-none
              `
            }
          >
            <TabsTrigger
              value="upcoming"
              className={
                `
                  h-10.5 w-25 cursor-pointer rounded-none border-0 border-b-2
                  border-transparent bg-transparent typo-caption-m-1
                  text-gray-500 shadow-none ring-0 outline-none
                  focus-visible:ring-0 focus-visible:outline-none
                  data-[state=active]:border-b-2
                  data-[state=active]:border-primary
                  data-[state=active]:text-primary
                  data-[state=active]:shadow-none data-[state=active]:ring-0
                `
              }
            >
              예정중
            </TabsTrigger>

            <TabsTrigger
              value="past"
              className={
                `
                  h-10.5 w-25 cursor-pointer rounded-none border-0 border-b-2
                  border-transparent bg-transparent typo-caption-m-1
                  text-gray-500 shadow-none ring-0 outline-none
                  focus-visible:ring-0 focus-visible:outline-none
                  data-[state=active]:border-b-2
                  data-[state=active]:border-primary
                  data-[state=active]:text-primary
                  data-[state=active]:shadow-none data-[state=active]:ring-0
                `
              }
            >
              종료됨
            </TabsTrigger>
          </TabsList>
        </Tabs>

        {isPending && performances.length === 0
          ? (
              <div className="pointer-events-none mt-5.5 grid grid-cols-2 gap-4">
                <PerformanceCard performanceId={0} dateText="" imageUrl={null} title="" />
                <PerformanceCard performanceId={0} dateText="" imageUrl={null} title="" />
              </div>
            )
          : (performances.length === 0
              ? (
                  <EmptyPerformances tab={activeTab} />
                )
              : (
                  <div className="mt-5.5 grid grid-cols-2 gap-4 pb-13">
                    {performances.map(performance => (
                      <PerformanceCard
                        key={performance.id}
                        performanceId={Number(performance.id)}
                        dateText={performance.dateText}
                        imageUrl={performance.imageUrl}
                        title={performance.title}
                      />
                    ))}
                  </div>
                ))}
      </div>
    </div>
  );
}

function ApplicationGuidePanel({
  title,
  operatorUrl,
  guides,
  onBackClick,
  onCloseClick,
  variant = 'focused',
}: {
  title: string;
  operatorUrl: string | null;
  guides: ApplicationGuideItem[];
  onBackClick: () => void;
  onCloseClick: () => void;
  variant?: DetailPanelVariant;
}) {
  return (
    <div
      className={cn(
        'absolute inset-0 z-40 bg-white',
        variant === 'detail'
          ? 'rounded-none'
          : 'rounded-4xl',
      )}
    >
      <div className="absolute inset-x-0 top-0 z-20">
        <div className={`
          flex h-17 items-center justify-between border-b border-gray-200
          bg-white px-3
        `}
        >
          <IconCircleButton
            ariaLabel="뒤로"
            iconSrc="/icons/chevron-left.svg"
            iconSize={{ w: 14, h: 24 }}
            onClick={onBackClick}
            hoverClassName="hover:bg-black/5"
          />

          <p className="typo-body-sb-2 text-black">신청 방법 보기</p>

          <IconCircleButton
            ariaLabel="닫기"
            iconSrc="/icons/x.svg"
            iconSize={{ w: 16, h: 16 }}
            onClick={onCloseClick}
            hoverClassName="hover:bg-black/5"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 top-17 bottom-0 overflow-y-auto">
        <div className="px-7.5 pt-10 pb-34">
          <div className={`
            mx-auto w-60.75 rounded-full border-2 border-gray-200 bg-gray-100
            px-7 py-3 text-center
          `}
          >
            <p className="typo-body-sb-2 text-black">
              {title}
            </p>
          </div>

          <div className="relative mt-12">
            <div className="absolute top-0 left-6 h-full w-px bg-gray-200" />

            <ul className="flex flex-col gap-20.5">
              {guides.map((guide, index) => {
                const stepText = String(index + 1).padStart(2, '0');

                return (
                  <li
                    key={guide.applicationGuideId}
                    className="relative flex gap-4"
                  >
                    <div
                      className={cn(
                        `
                          relative z-10 flex h-12 w-12 shrink-0 items-center
                          justify-center rounded-full bg-primary text-center
                          text-white shadow-sm
                        `,
                      )}
                    >
                      <span className="typo-caption-m-1 leading-[1.1]">
                        step
                        <br />
                        {stepText}
                      </span>
                    </div>
                    <p className="typo-body-m-3 text-black">{guide.content}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      <div className={`
        absolute inset-x-0 bottom-0 z-30 border-t border-gray-200 bg-white
        px-4.25 pt-6 pb-13.75
      `}
      >
        <div className="flex gap-3">
          <Button
            size="md"
            theme="orange"
            appearance="filled"
            asChild
            disabled={!operatorUrl}
            className="flex-1"
          >
            <a href={operatorUrl ?? '#'} target="_blank" rel="noopener noreferrer">
              신청 하러 가기
            </a>
          </Button>

          <Button
            size="md"
            theme="gray"
            appearance="filled"
            onClick={onBackClick}
            className="flex-1"
          >
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}

export function DetailPanel({ place, onCloseClick, variant = 'focused' }: DetailPanelProps) {
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);
  const [isApplicationGuideOpen, setIsApplicationGuideOpen] = useState(false);

  const placeId = place?.id ?? null;

  const performanceLocationId = useMemo(() => {
    if (!placeId) {
      return null;
    }
    const parsed = Number(placeId);
    if (!Number.isFinite(parsed)) {
      return null;
    }
    return parsed;
  }, [placeId]);

  const { data: performanceLocation } = usePerformanceLocationDetail(performanceLocationId);

  const guidesQueryId = isApplicationGuideOpen ? performanceLocationId : null;
  const { data: applicationGuides } = usePerformanceLocationApplicationGuides(guidesQueryId);

  const heroImageUrl = performanceLocation?.imageUrls?.[0] ?? place?.thumbnailUrl ?? null;

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const nextIsSolid = event.currentTarget.scrollTop > 8;
    setIsHeaderSolid(nextIsSolid);
  }, []);

  if (!place) {
    return null;
  }

  const operatorUrl = performanceLocation?.operatorUrl ?? null;

  return (
    <section
      className={detailPanelVariants({ variant })}
    >
      {isApplicationGuideOpen
        ? (
            <ApplicationGuidePanel
              title={place.title}
              operatorUrl={operatorUrl}
              guides={(applicationGuides?.applicationGuideResponses ?? []) as ApplicationGuideItem[]}
              variant={variant}
              onBackClick={() => {
                setIsApplicationGuideOpen(false);
              }}
              onCloseClick={onCloseClick}
            />
          )
        : null}

      <div
        className={cn(
          'relative h-56 w-full overflow-hidden',
          isHeaderSolid ? 'bg-white' : 'bg-gray-200',
        )}
      >
        {heroImageUrl
          ? (
              <Image
                src={heroImageUrl}
                alt={place.title}
                fill
                priority
                className={cn(
                  'object-cover transition-opacity duration-200',
                  isHeaderSolid ? 'opacity-0' : 'opacity-100',
                )}
              />
            )
          : null}

        {!isHeaderSolid
          ? (
              <div
                className={`
                  pointer-events-none absolute inset-0 bg-linear-to-b
                  from-black/50 via-black/25 to-transparent
                `}
              />
            )
          : null}
      </div>

      <div
        className={cn(
          detailPanelBodyVariants({ variant }),
          isHeaderSolid ? 'top-0' : 'top-44',
        )}
      >
        <div
          className={cn(
            'absolute inset-x-0 bottom-6 overflow-y-auto',
            isHeaderSolid ? 'top-17' : 'top-9.5',
          )}
          onScroll={handleScroll}
        >
          <section className="px-7.75">
            <h3 className="text-center typo-title-b-5 text-black">{place.title}</h3>

            <div className="mt-8 flex flex-col gap-1">
              <p className="typo-caption-r-1 text-black">
                사용 가능 시간:
                {' '}
                {performanceLocation?.availableHours ?? '-'}
              </p>
              <p className="typo-caption-r-1 text-black">
                신청 링크:
                {' '}
                {performanceLocation?.operatorUrl
                  ? (
                      <a
                        href={performanceLocation.operatorUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all underline"
                      >
                        {performanceLocation.operatorUrl}
                      </a>
                    )
                  : (
                      '-'
                    )}
              </p>
              <p className="typo-caption-r-1 text-black">
                운영 기관:
                {' '}
                {performanceLocation?.operatorName ?? '-'}
              </p>
              <p className="typo-caption-r-1 text-black">
                연락처:
                {' '}
                {performanceLocation?.operatorPhoneNumber ?? '-'}
              </p>
            </div>
          </section>

          <div className="mt-13 flex w-full justify-center gap-1.25 px-4.75">
            <Button
              size="md"
              theme="lightGray"
              appearance="filled"
              disabled={!operatorUrl || !performanceLocationId}
              onClick={() => {
                setIsApplicationGuideOpen(true);
              }}
            >
              신청 방법 보기
            </Button>

            <Button size="md" theme="orange" appearance="filled" asChild disabled={!operatorUrl}>
              <a href={operatorUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                신청 하러 가기
              </a>
            </Button>
          </div>

          <LineDivider className="mt-7.5 w-full" />

          <LocationPerformancesSection
            key={placeId ?? 'empty'}
            performanceLocationId={performanceLocationId}
          />

        </div>
      </div>

      <PanelHeader onBackClick={onCloseClick} onCloseClick={onCloseClick} isSolid={isHeaderSolid} />
    </section>
  );
}
