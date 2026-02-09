import { MapPin } from 'lucide-react';

export function PerformanceLocation() {
  return (
    <div className="border-b-2 border-gray-200 pt-5 pb-12.5">
      <h3 className="py-2.5 typo-title-b-5 text-black">위치 안내</h3>
      <div className={`
        mt-3.75 flex h-[400px] w-full flex-col items-center justify-center gap-4
        rounded-lg bg-gray-50 text-gray-400
      `}
      >
        <div className="rounded-full bg-gray-100 p-4">
          <MapPin className="h-8 w-8 text-gray-500" />
        </div>
        <div className="text-center">
          <p className="typo-title-sb-4 text-gray-600">지도 서비스 준비 중</p>
          <p className="mt-1 typo-body-m-3">조금만 기다려주세요!</p>
        </div>
      </div>
    </div>
  );
}
