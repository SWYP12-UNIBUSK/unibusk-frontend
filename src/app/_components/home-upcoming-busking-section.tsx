import Link from 'next/link';
import { HomeContainer } from './home-container';
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
    <section className="w-full bg-white py-20">
      <HomeContainer>
        <div className="text-center">
          <h2 className="typo-title-sb-2 leading-[1.3] font-bold text-gray-900">{title}</h2>
          <p className="mt-4 typo-title-r-4 text-gray-500">{tags.join(' ')}</p>
        </div>

        <div className="mt-10 flex justify-end">
          <Link
            href={viewAllHref}
            className={`
              typo-caption-r-1 text-orange-500
              hover:opacity-70
            `}
          >
            전체보기 +
          </Link>
        </div>

        <div className="mt-8">
          <UpcomingBuskingCarousel />
        </div>
      </HomeContainer>
    </section>
  );
}
