import { useMemo } from 'react';
import { KakaoMapView } from '@/components/kakao-map';
import { BUSKING_MAP_PLACES_MOCK } from '@/mocks/busking-map-places';
import { SidebarShell } from './_components';

export default function BuskingMapPage() {
  const places = BUSKING_MAP_PLACES_MOCK;

  const markers = useMemo(() =>
    places.map(place => ({
      id: place.id,
      position: { lat: place.lat, lng: place.lng },
    })), [places]);

  return (
    <main className="relative h-screen w-full bg-gray-100">
      <KakaoMapView
        className="h-full w-full"
        center={{ lat: 37.5665, lng: 126.978 }}
        level={5}
        markers={markers}
      />
      <SidebarShell places={places} />
    </main>
  );
}
