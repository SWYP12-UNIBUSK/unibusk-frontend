import { BuskingMapDataProvider } from '@/providers/busking-map/busking-map-data.context';
import { BuskingMapHeaderSection, BuskingMapMapSection, BuskingMapSidebarSection } from './_components';

interface SearchParams {
  keyword?: string | string[];
};

export default async function BuskingMapPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const { keyword } = await searchParams;

  const initialSearchQuery = typeof keyword === 'string' ? keyword : '';

  return (
    <main className="relative h-screen w-full bg-gray-100">
      <h1 className="sr-only">버스킹 장소 지도</h1>

      <BuskingMapDataProvider>
        <BuskingMapHeaderSection initialSearchQuery={initialSearchQuery} />
        <BuskingMapMapSection />
        <BuskingMapSidebarSection />
      </BuskingMapDataProvider>
    </main>
  );
}
