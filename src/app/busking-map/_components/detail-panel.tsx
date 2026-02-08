import type { UIEvent } from 'react';
import type { BuskingPlace } from '@/types/busking-map';
import Image from 'next/image';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/common/button';
import { LineDivider } from '@/components/common/line-divider';
import { PERFORMANCE_LOCATIONS_MAP_MOCK_RESPONSE } from '@/mocks/performance-locations';
import { cn } from '@/utils';

type PerformanceTab = 'upcoming' | 'finished';

interface DetailPanelProps {
  place: BuskingPlace | null;
  onCloseClick: () => void;
}

interface PerformanceItem {
  id: string;
  dateText: string;
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

function PerformanceCard({ dateText }: { dateText: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div
        className={`
          aspect-[1/1.15] w-full overflow-hidden rounded-2xl bg-gray-200
        `}
      />
      <p className="typo-caption-r-2 whitespace-pre-line text-gray-600">{dateText}</p>
    </div>
  );
}

function EmptyPerformances({ tab }: { tab: PerformanceTab }) {
  const message = tab === 'upcoming'
    ? '아직 등록된 공연 일정이 없어요.\n다음 공연을 기다려주세요!'
    : '아직 등록된 공연 일정이 없어요.\n다음 공연을 기다려주세요!';

  return (
    <div
      className={`
        flex w-full items-center justify-center px-6 py-7.75 pb-34 text-center
      `}
    >
      <p className="typo-caption-r-1 whitespace-pre-line text-gray-500">{message}</p>
    </div>
  );
}

export function DetailPanel({ place, onCloseClick }: DetailPanelProps) {
  const [activeTab, changeActiveTab] = useState<PerformanceTab>('upcoming');
  const [isHeaderSolid, setIsHeaderSolid] = useState(false);

  const performanceLocation = useMemo(() => {
    if (!place) {
      return null;
    }

    return (
      PERFORMANCE_LOCATIONS_MAP_MOCK_RESPONSE.locations.find((location) => {
        const locationIdText = String(location.performanceLocationId);
        return locationIdText === place.id || location.name === place.title;
      }) ?? null
    );
  }, [place]);

  const heroImageUrl = performanceLocation?.imageUrls?.[0] ?? place?.thumbnailUrl ?? null;

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const nextIsSolid = event.currentTarget.scrollTop > 8;
    setIsHeaderSolid(nextIsSolid);
  }, []);

  const upcomingPerformances: PerformanceItem[] = [];
  const finishedPerformances: PerformanceItem[] = [];
  const performances = activeTab === 'upcoming' ? upcomingPerformances : finishedPerformances;

  if (!place) {
    return null;
  }

  const operatorUrl = performanceLocation?.operatorUrl ?? null;

  return (
    <section
      className={`
        relative h-full w-full overflow-hidden rounded-4xl bg-white
        shadow-sidebar
      `}
    >
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
          `
            absolute inset-x-0 bottom-0 z-10 rounded-t-4xl bg-white
            transition-all duration-200
          `,
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
          <div className="px-7.5 pb-10">
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
                {performanceLocation?.operatorUrl ?? '-'}
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

            <div className="mt-13 flex w-full justify-center gap-1.25 px-4.75">
              <Button size="md" theme="lightGray" appearance="filled" disabled={!operatorUrl}>
                신청 방법 보기
              </Button>

              <Button
                size="md"
                theme="orange"
                appearance="filled"
                asChild
                disabled={!operatorUrl}
              >
                <a href={operatorUrl ?? '#'} target="_blank" rel="noopener noreferrer">
                  신청 하러 가기
                </a>
              </Button>
            </div>

            <LineDivider className="mt-7.5 w-full" />

            <div className="mt-8.25">
              <p className="text-center typo-body-sb-2 text-black">
                이곳에서 진행중인 공연
              </p>

              <div
                className="mt-5 flex w-full items-center justify-center"
              >
                <button
                  type="button"
                  onClick={() => changeActiveTab('upcoming')}
                  className={cn(
                    `
                      relative w-full max-w-25 flex-1 cursor-pointer border-b
                      border-gray-300 py-3 text-center typo-caption-m-1
                    `,
                    activeTab === 'upcoming'
                      ? 'text-primary'
                      : 'text-gray-500',
                  )}
                >
                  예정중
                  {activeTab === 'upcoming'
                    ? (
                        <span
                          className={`
                            absolute bottom-0 left-0 h-0.5 w-full bg-primary
                          `}
                        />
                      )
                    : null}
                </button>

                <button
                  type="button"
                  onClick={() => changeActiveTab('finished')}
                  className={cn(
                    `
                      relative w-full max-w-25 flex-1 cursor-pointer border-b
                      border-gray-300 py-3 text-center typo-caption-m-1
                    `,
                    activeTab === 'finished'
                      ? 'text-primary'
                      : 'text-gray-500',
                  )}
                >
                  종료됨
                  {activeTab === 'finished'
                    ? (
                        <span
                          className={`
                            absolute bottom-0 left-0 h-0.5 w-full bg-primary
                          `}
                        />
                      )
                    : null}
                </button>
              </div>

              {performances.length === 0
                ? (
                    <EmptyPerformances tab={activeTab} />
                  )
                : (
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      {performances.map(performance => (
                        <PerformanceCard key={performance.id} dateText={performance.dateText} />
                      ))}
                    </div>
                  )}
            </div>

          </div>
        </div>
      </div>

      <PanelHeader
        onBackClick={onCloseClick}
        onCloseClick={onCloseClick}
        isSolid={isHeaderSolid}
      />
    </section>
  );
}
