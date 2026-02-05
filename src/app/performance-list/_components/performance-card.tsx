'use client';

import { ImageIcon, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { Card, CardContent } from '@/components/common/card';
import { cn } from '@/utils';

// !todo: Card 공통 컴포넌트로 분리 및 개선 예정
interface PerformanceCardProps {
  /**
   * 공연 정보 객체
   */
  performance: {
    /** 공연 Id */
    id: number;
    /** 공연 제목 */
    title: string;
    /** 공연 날짜 (YYYY.MM.DD) */
    date: string;
    /** 공연 시작 시간 (HH:mm) */
    startTime: string;
    /** 공연 종료 시간 (HH:mm) */
    endTime: string;
    /** 공연 장소 */
    location: string;
    /** 공연 포스터 썸네일 이미지 URL */
    thumbnailUrl?: string;
  };
  /**
   * 카드 클릭 핸들러
   * @param id 클릭된 공연의 ID
   */
  onClick?: (id: string) => void;
  /** 추가적인 스타일링을 위한 클래스 이름 */
  className?: string;
}

export function PerformanceCard({ performance, onClick, className }: PerformanceCardProps) {
  const [imageError, setImageError] = useState(false);
  const { id, date, title, startTime, endTime, location, thumbnailUrl } = performance;

  const handleClick = () => {
    onClick?.(String(id));
  };

  const showPlaceholder = !thumbnailUrl || imageError;

  return (
    <Card
      className={cn(
        `
          group h-full w-full cursor-pointer overflow-hidden border
          border-transparent bg-transparent py-0 shadow-none transition-all
          duration-300 ease-in-out
        `,
        'hover:border-border/30',
        'hover:shadow-lg',
        'active:scale-[0.98]',
        className,
      )}
      onClick={handleClick}
      role="article"
      aria-label={`${title} 공연 카드`}
    >
      <CardContent className="flex h-full flex-col p-2.5">
        {/* Thumbnail */}
        <div className={`
          relative mb-2.5 aspect-5/8 w-full shrink-0 overflow-hidden rounded-lg
          bg-muted
        `}
        >
          {showPlaceholder
            ? (
              // !todo: placeholder 이미지로 교체 예정
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
              )
            : (
                <Image
                  src={thumbnailUrl}
                  alt={`${title} 포스터`}
                  fill

                  className={cn(
                    `
                      h-auto w-full transition-transform duration-500
                      group-hover:scale-105
                    `,
                    imageError && 'opacity-0', // ← 에러 시 숨김
                  )}
                  onError={() => {
                    setImageError(true);
                  }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                />
              )}

          {/* Gradient overlay on hover */}
          <div className={`
            absolute inset-0 bg-linear-to-t from-black/20 via-transparent
            to-transparent opacity-0 transition-opacity duration-300
            group-hover:opacity-100
          `}
          />
        </div>

        {/* Info Section */}
        <div className="flex flex-1 flex-col p-2.5">
          <div className="shrink-0 text-sm text-muted-foreground">
            {/* Date and Time */}
            <p className="font-medium tabular-nums">
              {`${date} (${startTime} ~ ${endTime})`}
            </p>

            {/* Location */}
            <div className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 shrink-0" strokeWidth={2} />
              <span className="line-clamp-1">{location}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className={`
            mt-2.5 line-clamp-1 text-lg leading-tight font-bold text-foreground
            transition-colors duration-200
            group-hover:text-primary
          `}
          >
            {title}
          </h3>
        </div>
      </CardContent>
    </Card>
  );
}
