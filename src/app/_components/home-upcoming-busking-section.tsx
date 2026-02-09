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
          <h2 className="typo-title-sb-2 text-black">{title}</h2>
          <p className="mt-3.75 typo-title-r-4 text-gray-600">{tags.join(' ')}</p>
        </div>

        <div className="mt-14.75 flex justify-end">
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

        <div className="mt-8">
          <UpcomingBuskingCarousel />
        </div>
      </HomeContainer>
    </section>
  );
}
