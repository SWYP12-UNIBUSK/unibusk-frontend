import { KakaoMapView } from '@/components';

export default function BuskingMapPage() {
  return (
    <main className="h-screen w-full">
      <KakaoMapView
        className="h-full w-full"
        center={{ lat: 37.5665, lng: 126.978 }} // 서울 시청 좌표
        level={5}
      />
    </main>
  );
}
