import type { ReactNode } from 'react';
import { HomeFooter } from '@/app/(main)/_components/home-footer';
import { cn } from '@/utils';
import { LegalConfirmButton } from '../legal-confirm-button';

interface LegalLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalLayout({ title, children }: LegalLayoutProps) {
  return (
    <div className="min-h-screen bg-white">
      <main
        className={cn(
          'container-1920 py-17.5',
          'md:pt-21.25 md:pb-39.75',
        )}
      >
        <section className="flex flex-col items-center">
          <h1 className={cn(
            `text-center typo-title-b-5 text-black`,
            `md:typo-title-b-3`,
          )}
          >
            {title}
          </h1>

          <div
            className={cn(
              'mt-12.5',
              `
                md:mt-20.5 md:h-211.5 md:w-full md:max-w-205.5
                md:overflow-y-auto md:rounded-lg md:bg-gray-50
              `,
              'md:px-11.25 md:py-7.5',
            )}
          >
            {children}
          </div>

          <div
            className={cn(
              'mt-15 hidden',
              'md:flex md:justify-center',
            )}
          >
            <LegalConfirmButton />
          </div>
        </section>
      </main>

      <div className={cn('hidden', 'md:block')}>
        <HomeFooter />
      </div>
    </div>
  );
}
