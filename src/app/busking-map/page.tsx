import { BuskingMapDataProvider } from '@/providers/busking-map/busking-map-data.context';
import { BuskingMapMapSection } from './_components/busking-map-map-section';
import { BuskingMapSidebarSection } from './_components/busking-map-sidebar-section';

export default function BuskingMapPage() {
  return (
    <main className="relative h-screen w-full bg-gray-100">
      <h1 className="sr-only">버스킹 장소 지도</h1>

      <BuskingMapDataProvider>
        <BuskingMapMapSection />
        <BuskingMapSidebarSection />
      </BuskingMapDataProvider>
    </main>
  );
}
