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
    <section className={`
      w-full bg-orange-400 py-18
      lg:h-275 lg:py-0
    `}
    >
      <MainLayout className={`
        flex flex-col items-center justify-center px-5
        md:px-6
        lg:h-full
      `}
      >
        <h2
          className={`
            text-center typo-body-b-1 text-white
            md:typo-title-b-5
            lg:typo-title-b-1
          `}
        >
          {heading}
        </h2>

        <div className={`
          mt-12.5 grid w-full grid-cols-1 gap-8
          lg:mt-23 lg:grid-cols-3 lg:gap-10
        `}
        >
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
          mx-auto flex w-full max-w-72.5 flex-col items-center rounded-3xl
          bg-white px-7 py-9 text-center
        `,
        'lg:max-w-none lg:px-10 lg:py-14',
        'shadow-[0_0_42.2px_rgba(255,255,255,1)]',
      )}
    >
      <div className={`
        mx-auto flex h-15 w-15 items-center justify-center rounded-full
        bg-orange-150
        lg:h-25 lg:w-25
      `}
      >
        <Image
          src={iconSrc}
          alt=""
          width={50}
          height={50}
          className={`
            block h-7.5 w-7.5 object-contain
            lg:h-12.5 lg:w-12.5
          `}
          aria-hidden
        />
      </div>

      <h3 className={cn(`
        mt-8 typo-body-sb-3 break-keep whitespace-pre-line
        lg:mt-17.5 lg:typo-title-sb-4
      `, `text-gray-800`)}
      >
        {title}
      </h3>

      <p className={cn(`
        mt-6 w-full max-w-60 typo-caption-m-2
        lg:mt-12.5 lg:max-w-78 lg:typo-body-sb-2
      `, `break-keep whitespace-pre-line text-gray-550`)}
      >
        {description}
      </p>
    </article>
  );
}
