'use client';

import { useSuspenseQuery } from '@tanstack/react-query';
import { ImageIcon } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/common/button';
import { performanceDetailQueryOptions } from '@/queries/performance';
import { cn } from '@/utils';
import { PerformanceLocation } from './performance-location';

interface PerformanceInfoProps {
  performanceId: number;
}

export function PerformanceInfo({ performanceId }: PerformanceInfoProps) {
  const { data: performanceDetail } = useSuspenseQuery(performanceDetailQueryOptions(performanceId));
  const { title, performanceDate, locationName, images, summary, startTime, endTime, performers, description } = performanceDetail;
  const router = useRouter();

  return (
    <section className="pt-37.5">
      <Summary
        title={title}
        performanceDate={performanceDate}
        locationName={locationName}
      />
      <Content
        title={title}
        posterUrl={images[0]}
        summary={summary}
        startTime={startTime}
        endTime={endTime}
        performers={performers[0] ?? { name: '', email: '', phoneNumber: '' }}
        description={description}
      />
      <PerformanceLocation />
      <div className="flex justify-center pt-17.5 pb-20.75">
        <Button
          onClick={() => {
            router.back();
          }}
          theme="lightGray"
          size="lg"
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
}

function Summary({ title, performanceDate, locationName }: SummaryProps) {
  const currentTab = useSearchParams().get('tab') ?? 'upcoming';

  return (
    <div className="flex flex-col gap-5 border-b-2 border-orange-200">
      {/* 현재 공연 탭 */}
      <div className="flex items-center gap-2.5">
        <div className={cn(
          'typo-body-sb-2',
          currentTab === 'upcoming' ? 'text-primary' : 'text-gray-300',
        )}
        >
          다가오는 공연
        </div>
        <div className="h-1.25 w-1.25 rounded-full bg-gray-300" />
        <div className={cn(
          'typo-body-sb-2',
          currentTab === 'past' ? 'text-primary' : 'text-gray-300',
        )}
        >
          지난 공연
        </div>
      </div>

      {/* 공연 요약 */}
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-3.75">
          <h1 className="typo-title-b-3 text-black">{title}</h1>
          <div className="flex items-center gap-5 pb-5">
            <span className="typo-body-sb-2 text-gray-500">{performanceDate}</span>
            <div className="h-3 w-px bg-gray-300" />
            <span className="typo-body-sb-2 text-gray-500">
              {locationName}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

interface ContentProps {
  title: string;
  posterUrl: string;
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
        flex flex-col gap-10 border-b-2 border-gray-200 pt-10.5 pb-12.5
        lg:flex-row lg:gap-17.5
      `}
      >
        {/* 공연 포스터 */}
        <div className={`
          relative overflow-hidden rounded-lg
          sm:h-[400px] sm:w-[300px]
          md:h-[600px] md:w-[500px]
          lg:h-[808px] lg:w-[708px]
        `}
        >
          {posterUrl
            ? (
                <Image
                  src={posterUrl}
                  alt={`${title} 공연 포스터`}
                  fill
                  className="object-cover"
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
        <div className="flex flex-col pt-7.5">
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
              <div>{performers.email}</div>
            </div>
          </InfoRow>
        </div>
      </div>
      <div className={`
        min-h-[622px] border-b-2 border-gray-200 py-2.5 typo-title-b-5
        text-black
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
    <div className={cn('flex items-start gap-7.5', className)}>
      <div className={`
        flex h-[44px] w-[85px] flex-none items-center justify-center
        rounded-full border border-gray-200 typo-body-m-3 text-gray-700
      `}
      >
        {label}
      </div>
      <div className="flex flex-col p-2.5 typo-body-m-3 text-black">
        {children}
      </div>
    </div>
  );
}
