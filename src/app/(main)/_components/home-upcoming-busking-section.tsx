import Link from 'next/link';
import { MainLayout } from '@/components/layout';
import { UpcomingBuskingCarousel } from './upcoming-busking-carousel';

interface HomeUpcomingBuskingSectionProps {
  title: string;
  tags: string[];
  viewAllHref: string;
};

export function HomeUpcomingBuskingSection({
  title,
  tags,
  viewAllHref,
}: HomeUpcomingBuskingSectionProps) {
  return (
    <section className={`
      w-full bg-white py-14
      md:py-20
    `}
    >
      <MainLayout className={`
        px-5
        md:px-6
      `}
      >
        <div className="text-center">
          <h2 className="typo-title-sb-2 text-black">{title}</h2>
          <p className="mt-3.75 typo-title-r-4 break-keep text-gray-600">{tags.join(' ')}</p>
        </div>

        <div className={`
          mt-12.5 flex justify-end
          md:mt-14.75
        `}
        >
          <Link
            href={viewAllHref}
            className={`
              typo-body-sb-3 text-primary
              hover:opacity-70
            `}
          >
            전체보기 +
          </Link>
        </div>

        <div className={`
          mt-3
          md:mt-8
        `}
        >
          <UpcomingBuskingCarousel />
        </div>
      </MainLayout>
    </section>
  );
}
