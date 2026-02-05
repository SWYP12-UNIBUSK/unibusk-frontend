import { KakaoMapView } from '@/components/kakao-map';
import { BUSKING_MAP_PLACES_MOCK } from '@/mocks/busking-map-places';
import { SidebarShell } from './_components';

export default function BuskingMapPage() {
  return (
    <main className="relative h-screen w-full bg-gray-100">
      <KakaoMapView className="h-full w-full" center={{ lat: 37.5665, lng: 126.978 }} level={5} />
      <SidebarShell places={BUSKING_MAP_PLACES_MOCK} />
    </main>
  );
}
