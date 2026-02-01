import type { BuskingPlace } from '@/types/busking-map';

interface DetailPanelProps {
  place: BuskingPlace | null;
  onCloseClick: () => void;
}

// TODO - 현재 뼈대만 구축되어 디테일한 구현은 추후 개발
export function DetailPanel({ place, onCloseClick }: DetailPanelProps) {
  if (!place)
    return null;

  return (
    <section className={`
      flex h-full w-full flex-col rounded-2xl bg-white shadow-md
    `}
    >
      <div className={`
        flex h-16 items-center justify-between border-b border-black/5 px-4
      `}
      >
        <button
          type="button"
          onClick={onCloseClick}
          className={`
            h-10 w-10 rounded-full
            hover:bg-black/5
          `}
          aria-label="뒤로"
        >
          ‹
        </button>

        <button
          type="button"
          onClick={onCloseClick}
          className={`
            h-10 w-10 rounded-full
            hover:bg-black/5
          `}
          aria-label="닫기"
        >
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        <div className="h-48 w-full rounded-xl bg-black/10" />

        <div className="mt-4 rounded-2xl bg-white">
          <h3 className="text-base font-semibold text-black">{place.title}</h3>
          <p className="mt-2 text-sm text-black/60">{place.description ?? '상세 정보'}</p>

          <div className="mt-6 flex gap-3">
            <button
              type="button"
              className="h-11.25 flex-1 rounded-full bg-black/20 text-white"
            >
              신청 방법 보기
            </button>
            <button
              type="button"
              className="h-11.25 flex-1 rounded-full bg-orange-500 text-white"
            >
              신청 하러 가기
            </button>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="h-45 w-32.5 rounded-sm bg-black/10" />
            <div className="h-45 w-32.5 rounded-sm bg-black/10" />
          </div>
        </div>
      </div>
    </section>
  );
}
