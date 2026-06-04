import Image from 'next/image';
import { MainLayout } from '@/components/layout';
import { cn } from '@/utils';

interface AboutUsHeroSectionProps {
  logoSrc: string;
  headline: string;
  description: string;
}

export function AboutUsHeroSection({ logoSrc, headline, description }: AboutUsHeroSectionProps) {
  return (
    <section className={`
      relative w-full overflow-hidden py-18
      md:py-28
      lg:h-275 lg:py-0
    `}
    >
      <div
        className={cn(
          'pointer-events-none absolute',
          'top-1/2 left-1/2',
          'h-180 w-180 -translate-x-1/2 -translate-y-1/2',
          'md:h-220 md:w-220',
          'lg:h-266 lg:w-375 lg:-translate-x-2/3',
          'rounded-full',
          'bg-[radial-gradient(circle,#FF6138_0%,rgba(255,97,56,0)_100%)]',
          'opacity-10 blur-lg',
        )}
        aria-hidden
      />

      <MainLayout className={`
        relative z-10 flex items-center px-5
        md:px-6
        lg:h-full
      `}
      >
        <div className={`
          mx-auto flex flex-col items-center justify-center text-center
          lg:-translate-y-8
        `}
        >
          <Image
            src={logoSrc}
            alt="UNIBUSK"
            draggable={false}
            width={400}
            height={270}
            priority
            className={`
              h-auto w-34
              md:w-40
              lg:w-100
            `}
          />

          <h1 className={cn(`
            mt-6 max-w-85 typo-body-sb-2 break-keep whitespace-pre-line
            md:max-w-120 md:typo-title-sb-5
            lg:max-w-none lg:typo-title-sb-2
          `, `text-gray-800`)}
          >
            {headline}
          </h1>

          <p className={cn(`
            mt-8 max-w-85 typo-caption-r-2 break-keep whitespace-normal
            md:max-w-125 md:typo-caption-r-1
            lg:mt-18.75 lg:max-w-238 lg:typo-title-r-4 lg:whitespace-pre-line
          `, `text-gray-600`)}
          >
            {description}
          </p>
        </div>
      </MainLayout>
    </section>
  );
}
