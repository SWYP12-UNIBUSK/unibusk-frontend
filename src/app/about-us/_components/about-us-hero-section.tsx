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
    <section className="relative h-275 w-full overflow-hidden">
      <div
        className={cn(
          'pointer-events-none absolute',
          'top-1/2 left-1/2',
          'h-266 w-375 -translate-x-2/3 -translate-y-1/2',
          'rounded-full',
          'bg-[radial-gradient(circle,#FF6138_0%,rgba(255,97,56,0)_100%)]',
          'opacity-10 blur-lg',
        )}
        aria-hidden
      />

      <MainLayout className="flex h-full items-center px-6">
        <div className={`
          mx-auto flex -translate-y-8 flex-col items-center justify-center
          text-center
        `}
        >
          <Image src={logoSrc} alt="UNIBUSK" draggable={false} width={400} height={270} priority />

          <h1 className={cn('mt-6 break-keep whitespace-pre-line', `
            typo-title-sb-2 text-gray-800
          `)}
          >
            {headline}
          </h1>

          <p className={cn(`mt-18.75 max-w-238 break-keep whitespace-pre-line`, `
            typo-title-r-4 text-gray-600
          `)}
          >
            {description}
          </p>
        </div>
      </MainLayout>
    </section>
  );
}
