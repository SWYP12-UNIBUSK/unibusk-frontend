import Image from 'next/image';
import { cn } from '@/utils';

interface PromoStepCardProps {
  step: string;
  title: string;
  description: string;
  iconSrc: string;
}

export function PromoStepCard({ step, title, description, iconSrc }: PromoStepCardProps) {
  return (
    <article
      className={cn(
        `
          mx-auto flex min-h-44 w-full flex-col items-center justify-center
          rounded-2xl bg-white
        `,
        'px-2 py-4',
        'md:h-53 md:max-w-72.5 md:px-10 md:py-6',
        'shadow-[0_16px_40px_rgba(255,99,71,0.18)]',
      )}
    >
      <div className="flex justify-center">
        <div
          className={`
            flex h-12 w-12 items-center justify-center rounded-full bg-primary
            md:h-16 md:w-16
          `}

        >
          <Image
            src={iconSrc}
            alt=""
            className={`
              h-5 w-5
              md:h-6 md:w-6
            `}
            aria-hidden
            unoptimized
            width={24}
            height={24}
          />
        </div>
      </div>

      <div className="mt-4 text-center typo-caption-r-2 text-primary">
        {step}
      </div>
      <div className={`
        mt-2 text-center typo-caption-sb-1 font-semibold text-gray-800
      `}
      >
        {title}
      </div>
      <div className={`
        mt-2 text-center typo-caption-r-2 break-keep text-gray-700
      `}
      >
        {description}
      </div>
    </article>
  );
}
