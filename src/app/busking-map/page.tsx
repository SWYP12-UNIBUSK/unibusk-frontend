import { BuskingMapDataProvider } from '@/providers/busking-map/busking-map-data.context';
import { BuskingMapHeaderSection, BuskingMapMapSection, BuskingMapSidebarSection } from './_components';

export default function BuskingMapPage() {
  return (
    <main className="relative h-screen w-full bg-gray-100">
      <h1 className="sr-only">버스킹 장소 지도</h1>
      <BuskingMapHeaderSection />

      <BuskingMapDataProvider>
        <BuskingMapMapSection />
        <BuskingMapSidebarSection />
      </BuskingMapDataProvider>
    </main>
  );
}
