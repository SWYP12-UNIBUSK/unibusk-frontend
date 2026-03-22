import { BuskingMapDataProvider } from '@/providers/busking-map/busking-map-data.context';
import { createPageMetadata } from '@/utils/creat-page-metadata';
import { BuskingMapHeaderSection, BuskingMapMapSection, BuskingMapSidebarSection } from './_components';

interface SearchParams {
  keyword?: string | string[];
};

export const metadata = createPageMetadata({
  title: '버스킹 맵',
  description: '지도에서 버스킹 가능한 장소와 공연 장소를 빠르게 찾아보세요.',
  path: '/busking-map',
});

export default async function BuskingMapPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { keyword } = await searchParams;

  const initialSearchQuery = typeof keyword === 'string' ? keyword : '';

  return (
    <main className={`
      relative flex h-screen w-full flex-col overflow-hidden bg-gray-100
    `}
    >
      <h1 className="sr-only">버스킹 장소 지도</h1>

      <BuskingMapDataProvider>
        <BuskingMapHeaderSection initialSearchQuery={initialSearchQuery} />
        <BuskingMapMapSection />
        <BuskingMapSidebarSection />
      </BuskingMapDataProvider>
    </main>
  );
}
