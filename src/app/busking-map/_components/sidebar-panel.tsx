import type { BuskingPlace } from '@/types/busking-map';
import type { ListScope } from '@/types/busking-map/busking-place';
import { LineDivider } from '@/components/common/line-divider';
import { cn } from '@/utils';

interface SidebarPanelProps {
  mode: ListScope;
  places: BuskingPlace[];
  focusedPlace: BuskingPlace | null;
  onListItemClick: (placeId: string) => void;
  onFocusedCloseClick?: () => void;
  onExitClusterListClick?: () => void;
}

export function SidebarPanel({
  mode,
  places,
  focusedPlace,
  onListItemClick,
  onFocusedCloseClick,
  onExitClusterListClick,
}: SidebarPanelProps) {
  if (focusedPlace) {
    return (
      <section className={`
        flex h-full w-full flex-col overflow-hidden rounded-xl bg-white
        shadow-sidebar
      `}
      >
        <FocusedHeader
          title={focusedPlace.title}
          onCloseClick={onFocusedCloseClick ?? (() => {})}
        />
        <div className="flex-1 overflow-y-auto pb-11.25">
          <FocusedBody place={focusedPlace} />
        </div>
      </section>
    );
  }

  const isClusterMode = mode === 'cluster';
  const headerTitle = isClusterMode ? `주변 장소 (${places.length})` : '공연 장소';

  return (
    <section className={`
      flex h-full w-full flex-col overflow-hidden rounded-xl bg-white
      shadow-sidebar
    `}
    >
      <ListHeader
        title={headerTitle}
        onBackClick={isClusterMode ? onExitClusterListClick : undefined}
      />
      <div className="flex-1 overflow-y-auto pb-11.25">
        <ul className="flex w-full flex-col">
          {places.map((place, index) => {
            return (
              <li key={place.id}>
                <PlaceCard
                  place={place}
                  onClick={() => onListItemClick(place.id)}
                />
                {index !== places.length - 1 && (
                  <LineDivider width="84%" thickness={1} colorClassName="bg-gray-200" />
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

interface ListHeaderProps {
  title: string;
  onBackClick?: () => void;
}

function ListHeader({ title, onBackClick }: ListHeaderProps) {
  return (
    <div className="flex h-17 items-center gap-2 px-[18.5px] pt-1">
      {onBackClick
        ? (
            <button
              type="button"
              onClick={onBackClick}
              className={`
                flex h-10 w-10 items-center justify-center rounded-full
                hover:bg-black/5
              `}
              aria-label="클러스터 목록 종료"
            >
              ‹
            </button>
          )
        : null}

      <div className={`
        rounded-full bg-primary px-2.5 py-1 text-caption-2 font-semibold
        text-white
      `}
      >
        {title}
      </div>
    </div>
  );
}

interface FocusedHeaderProps {
  title: string;
  onCloseClick: () => void;
}

function FocusedHeader({ title, onCloseClick }: FocusedHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between px-3">
      <button
        type="button"
        onClick={onCloseClick}
        className={`
          flex h-10 w-10 items-center justify-center rounded-full
          hover:bg-black/5
        `}
        aria-label="리스트로 돌아가기"
      >
        ‹
      </button>

      <p className={`
        min-w-0 flex-1 truncate px-2 text-sm font-semibold text-black/70
      `}
      >
        {title}
      </p>

      <button
        type="button"
        onClick={onCloseClick}
        className={`
          flex h-10 w-10 items-center justify-center rounded-full
          hover:bg-black/5
        `}
        aria-label="리스트로 돌아가기"
      >
        ×
      </button>
    </div>
  );
}

interface PlaceCardProps {
  place: BuskingPlace;
  onClick: () => void;
}

function PlaceCard({ place, onClick }: PlaceCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'w-full cursor-pointer bg-white px-[18.5px] py-4 text-left',
        'hover:bg-orange-150',
      )}
    >
      <h3 className="text-body-3 font-semibold text-black">{place.title}</h3>
      <div className="mt-4.5 h-50 w-full rounded-lg bg-black/10" />
    </button>
  );
}

interface FocusedBodyProps {
  place: BuskingPlace;
}

function FocusedBody({ place }: FocusedBodyProps) {
  return (
    <div className="pt-4">
      <div className="h-56 w-full rounded-3xl bg-black/10" />

      <div className="mt-4">
        <p className="text-base font-semibold text-black">{place.title}</p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className={`
              h-14 rounded-full bg-black/10 text-sm font-semibold text-black/60
            `}
          >
            신청 방법 보기
          </button>
          <button
            type="button"
            className={`
              h-14 rounded-full bg-orange-500 text-sm font-semibold text-white
            `}
          >
            신청 하러 가기
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="h-28 rounded-3xl bg-black/10" />
          <div className="h-28 rounded-3xl bg-black/10" />
        </div>
      </div>
    </div>
  );
}
