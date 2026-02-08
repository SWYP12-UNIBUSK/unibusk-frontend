import { Header } from '@/components/common/header';
import { HomeFooter, HomeHeroSection, HomePromoSection, HomeUpcomingBuskingSection } from './_components';

export default function Page() {
  return (
    <main className="w-full">
      <div
        className="mx-auto my-5 flex h-16 w-full max-w-360 items-center px-6"
      >
        <Header />
      </div>
      <HomeHeroSection
        mapBgSrc="/images/main-bg.png"
        heroIllustSrc="/images/main-image.png"
      />

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
