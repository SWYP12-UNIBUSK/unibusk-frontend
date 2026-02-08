import { cn } from '@/utils';

interface PromoStepCardProps {
  step: string;
  title: string;
  description: string;
}

export function PromoStepCard({ step, title, description }: PromoStepCardProps) {
  return (
    <article
      className={cn(
        'rounded-2xl bg-white',
        'px-6 py-7',
        'shadow-[0_16px_40px_rgba(255,99,71,0.18)]',
      )}
    >
      <div className="flex justify-center">
        <div className={`
          flex h-12 w-12 items-center justify-center rounded-full bg-orange-100
        `}
        >
          <div className="h-6 w-6 rounded-md bg-orange-500" aria-hidden />
        </div>
      </div>

      <div className={`
        mt-4 text-center text-[11px] font-semibold text-orange-500
      `}
      >
        {step}
      </div>
      <div className={`
        mt-2 text-center typo-caption-r-1 font-semibold text-gray-900
      `}
      >
        {title}
      </div>
      <div className="mt-2 text-center typo-caption-r-2 text-gray-500">{description}</div>
    </article>
  );
}
