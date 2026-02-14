import { Header } from '@/components/common/header';
import mapBg from '../../public/images/main-bg.webp';
import heroIllust from '../../public/images/main-image.webp';
import { HomeFooter, HomeHeroSection, HomePromoSection, HomeUpcomingBuskingSection } from './_components';

export default function Page() {
  return (
    <main className="w-full">
      <section className={`
        min-h-250 w-full
        bg-[radial-gradient(circle_at_center,#FAFAFA_0%,#FFF7F2CC_100%)] pt-5
      `}
      >
        <div className="mx-auto flex h-16 w-full max-w-360 items-center px-6">
          <Header />
        </div>

        <HomeHeroSection mapBgSrc={mapBg} heroIllustSrc={heroIllust} />
      </section>

      <HomeUpcomingBuskingSection
        title="다가오는 버스킹"
        tags={['#지금공연중', '#오늘의공연', '#가까운공연예정']}
        viewAllHref="/performance-list"
      />

      <HomePromoSection ctaHref="/performance-list" />
      <HomeFooter />
    </main>
  );
}
