import { Header } from '@/components/common/header';
import { BuskingMapDataProvider } from '@/providers/busking-map/busking-map-data.context';
import { BuskingMapMapSection } from './_components/busking-map-map-section';
import { BuskingMapSidebarSection } from './_components/busking-map-sidebar-section';

export default function BuskingMapPage() {
  return (
    <main className="relative h-screen w-full bg-gray-100">
      <h1 className="sr-only">버스킹 장소 지도</h1>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-header">
        <div className="pointer-events-auto px-5.5 pt-1.25">
          <Header />
        </div>
      </div>

      <BuskingMapDataProvider>
        <BuskingMapMapSection />
        <BuskingMapSidebarSection />
      </BuskingMapDataProvider>
    </main>
  );
}
