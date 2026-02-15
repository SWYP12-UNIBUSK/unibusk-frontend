import { Header } from '@/components/common/header';
import { MainLayout } from '@/components/layout';
import {
  AboutUsHeroSection,
  AboutUsMomentsSection,
  AboutUsVisionSection,
} from './_components';

const HERO_ITEMS = {
  logoSrc: '/logos/logo-unibusk-stacked-vertical-small.webp',
  headline: `공연이 만들어지고, 보여지고, 시작되는 곳
버스킹의 모든 순간을 잇다, UNIBUSK.`,
  description:
    'UNIBUSK는 거리 위의 아티스트와 관객을 하나로 연결하는 지도 기반의 버스킹 \n 통합 플랫폼입니다. 우리는 흩어져 있던 공연 정보를 한데 모아 아티스트에게는 \n 성장의 무대를, 관객에게는 일상 속 특별한 공연 경험을 제공합니다.',
};

const VISION_CARDS = [
  {
    iconSrc: '/icons/guitar-orange.svg',
    title: `낮은 진입 장벽
: 누구나 주인공이 되는
무대`,
    description:
      'UNIBUSK는 예술적 열정만 있다면 누구나 거리 위에서 자신의 무대를 펼칠 수 있는 환경을 만듭니다. 버스킹 공연의 진입 장벽을 낮추어 더 많은 아티스트가 대중을 마주하며 성장할 수 있는 기회를 제공합니다.',
  },
  {
    iconSrc: '/icons/personSpotlight-orange.svg',
    title: `거리의 가능성 발견
: 잠들어 있는 공간에 숨을
불어넣다`,
    description:
      '막막했던 거리 공연 장소 탐색 과정을 보다 편리하게 하여, 아티스트에게는 숨은 기회를, 관객에게는 일상 속 특별한 감동을 선사합니다. 도심 곳곳의 숨겨진 스팟을 발굴하고, 동네 거리를 생동감 넘치는 공연장으로 변화시킵니다.',
  },
  {
    iconSrc: '/icons/userGroup-orange.svg',
    title: `함께 만드는 도시문화
: 아티스트와 관객이
연결되는 곳`,
    description:
      '단순한 정보 제공을 넘어 아티스트와 관객을 이어가며 함께 거리 예술을 도시의 새로운 문화로 확산시켜 만들어갑니다. 일상이 곧 예술이 되는 지속 가능한 버스킹 생태계를 지향합니다.',
  },
] as const;

const MOMENT_ITEMS = [
  {
    title: '스마트한 공연 장소 탐색',
    description: '버스킹에 최적화된 스팟 정보를 지도에서 한눈에 확인하세요.',
  },
  {
    title: '아티스트 홍보 및 공연 등록',
    description: '공연을 홍보하고 더 많은 관객을 만나보세요.',
  },
  {
    title: '가까운 라이브와의 만남',
    description:
      '내 주변 공연 정보를 확인하세요.\n오늘 우리 동네의 버스킹 소식을 가장 빠르게 발견하고 즐길 수 있습니다.',
  },
] as const;

export default function AboutUsPage() {
  return (
    <main className="w-full bg-white">
      <MainLayout>
        <Header />
      </MainLayout>
      <AboutUsHeroSection {...HERO_ITEMS} />
      <AboutUsVisionSection heading="UNIBUSK가 꿈꾸는 거리" cards={VISION_CARDS} />
      <AboutUsMomentsSection heading="UNIBUSK가 연결하는 순간들" items={MOMENT_ITEMS} />
    </main>
  );
}
