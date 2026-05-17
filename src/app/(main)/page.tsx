import { HomeFooter, HomeHeroSection, HomePromoSection, HomeUpcomingBuskingSection } from '../_components';

export default function Page() {
  return (
    <main className="w-full">
      <section className={`
        min-h-250 w-full
        bg-[radial-gradient(circle_at_center,#FAFAFA_0%,#FFF7F2CC_100%)]
      `}
      >
        <HomeHeroSection
          mapBgSrc="/images/main-bg.webp"
          heroIllustSrc="/images/main-image.webp"
        />
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
