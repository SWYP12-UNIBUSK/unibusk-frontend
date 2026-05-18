import type { Metadata } from 'next';
import { JsonLdScript } from '@/components/seo';
import { SHARED_OPEN_GRAPH } from '@/utils';
import { getHomeOrganizationJsonLd, getHomeWebsiteJsonLd, HOME_DESCRIPTION } from '@/utils/seo';
import { HomeFooter, HomeHeroSection, HomePromoSection, HomeUpcomingBuskingSection } from './_components';

const HOME_TITLE = 'UNIBUSK';
const HOME_OG_IMAGE = '/logos/logo-unibusk-stacked-vertical.webp';

export const metadata: Metadata = {
  title: {
    absolute: HOME_TITLE,
  },
  description: HOME_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    ...SHARED_OPEN_GRAPH,
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    url: '/',
    images: [HOME_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    images: [HOME_OG_IMAGE],
  },
};

export default function HomePage() {
  return (
    <main className="w-full">
      <JsonLdScript id="website-json-ld" data={getHomeWebsiteJsonLd()} />
      <JsonLdScript id="organization-json-ld" data={getHomeOrganizationJsonLd()} />
      <h1 className="sr-only">UNIBUSK 유니버스크 - 버스킹 공연 일정과 장소 플랫폼</h1>
      <HomeHeroSection
        mapBgSrc="/images/compressed-main-bg.avif"
        heroIllustSrc="/images/compressed-main-image.avif"
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
