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
        'flex flex-col items-center justify-center rounded-2xl bg-white',
        'h-53 max-w-72.5 px-10 py-6',
        'shadow-[0_16px_40px_rgba(255,99,71,0.18)]',
      )}
    >
      <div className="flex justify-center">
        <div
          className={`
            flex h-16 w-16 items-center justify-center rounded-full bg-primary
          `}

        >
          <Image src={iconSrc} alt="" className="h-6 w-6" aria-hidden unoptimized width={24} height={24} />
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
      <div className="mt-2 text-center typo-caption-r-2 text-gray-700">{description}</div>
    </article>
  );
}
