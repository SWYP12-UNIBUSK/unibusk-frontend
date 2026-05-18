import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { cn } from '@/utils';

interface VisionCard {
  iconSrc: string;
  title: string;
  description: string;
}

interface AboutUsVisionSectionProps {
  heading: string;
  cards: readonly VisionCard[];
}

export function AboutUsVisionSection({ heading, cards }: AboutUsVisionSectionProps) {
  return (
    <section className="h-275 w-full bg-orange-400">
      <MainLayout className="flex h-full flex-col items-center justify-center">
        <h2 className="text-center typo-title-b-1 text-white">{heading}</h2>

        <div className="mt-23 grid w-full grid-cols-3 gap-10">
          {cards.map(card => (
            <VisionCardItem key={card.title} {...card} />
          ))}
        </div>
      </MainLayout>
    </section>
  );
}

function VisionCardItem({ iconSrc, title, description }: VisionCard) {
  return (
    <article
      className={cn(
        `
          flex flex-col items-center rounded-3xl bg-white px-10 py-14
          text-center
        `,
        'shadow-[0_0_42.2px_rgba(255,255,255,1)]',
      )}
    >
      <div className={`
        mx-auto flex h-25 w-25 items-center justify-center rounded-full
        bg-orange-150
      `}
      >
        <Image
          src={iconSrc}
          alt=""
          width={50}
          height={50}
          className="block object-contain"
          aria-hidden
        />
      </div>

      <h3 className={cn('mt-17.5 break-keep whitespace-pre-line', `
        typo-title-sb-4 text-gray-800
      `)}
      >
        {title}
      </h3>

      <p className={cn('mt-12.5 w-full max-w-78', `
        typo-body-sb-2 break-keep whitespace-pre-line text-gray-550
      `)}
      >
        {description}
      </p>
    </article>
  );
}
