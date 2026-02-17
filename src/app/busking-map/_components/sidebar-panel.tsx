import type { BuskingPlace, ListScope } from '@/types/busking-map';
import type { SidebarTab } from '@/types/busking-map/busking-place';
import Image from 'next/image';
import { LineDivider } from '@/components/common/line-divider';
import { cn } from '@/utils';
import { DetailPanel } from './detail-panel';

interface SidebarPanelProps {
  listScope: ListScope;
  activeTab: SidebarTab;
  places: BuskingPlace[];
  focusedPlace: BuskingPlace | null;
  onTabClick: (tab: SidebarTab) => void;
  onListItemClick: (placeId: string) => void;
  onFocusedCloseClick: () => void;
}

function TabChips({
  activeTab,
  onTabClick,
}: {
  activeTab: SidebarTab;
  onTabClick: (tab: SidebarTab) => void;
}) {
  const baseClassName = `
    cursor-pointer rounded-full px-2.5 py-1 typo-caption-r-2 font-semibold 
  `;

  const activeClassName = 'bg-primary text-white';
  const inactiveClassName = 'bg-gray-100 text-gray-700 ring-1 ring-gray-200';

  return (
    <div className="flex h-17 w-full items-center gap-1 px-4.5 pt-1">
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'places'}
        onClick={() => onTabClick('places')}
        className={cn(baseClassName, activeTab === 'places' ? activeClassName : inactiveClassName)}
      >
        공연 장소
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'search'}
        onClick={() => onTabClick('search')}
        className={cn(baseClassName, activeTab === 'search' ? activeClassName : inactiveClassName)}
      >
        검색 결과
      </button>
    </div>
  );
}

function EmptyState({
  activeTab,
  isClusterModeInPlacesTab,
}: {
  activeTab: SidebarTab;
  isClusterModeInPlacesTab: boolean;
}) {
  const message
    = activeTab === 'search'
      ? '검색 결과가 없습니다.'
      : isClusterModeInPlacesTab
        ? '클러스터 내 공연 장소가 없습니다.'
        : '표시할 공연 장소가 없습니다.';

  return (
    <div className="px-4 text-center">
      <p className="typo-body-m-3 text-gray-600">{message}</p>
    </div>
  );
}

function PlaceCard({
  place,
  onClick,
}: {
  place: BuskingPlace;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full cursor-pointer flex-col items-start gap-4.5 px-[18.5px] py-5
        text-left
        hover:bg-orange-150
      `}
    >
      <h3 className="typo-body-sb-3 text-black">{place.title}</h3>
      <div className="h-50 w-full overflow-hidden rounded-lg bg-gray-100">
        {place.thumbnailUrl
          ? (
              <Image
                src={place.thumbnailUrl}
                alt={place.title}
                width={306}
                height={200}
                className="h-full w-full object-cover"
              />
            )
          : (
              <div className="h-full w-full bg-gray-200" />
            )}
      </div>
    </button>
  );
}

export function SidebarPanel({
  listScope,
  activeTab,
  places,
  focusedPlace,
  onTabClick,
  onListItemClick,
  onFocusedCloseClick,
}: SidebarPanelProps) {
  if (focusedPlace) {
    return (
      <DetailPanel
        place={focusedPlace}
        onCloseClick={onFocusedCloseClick}
      />
    );
  }

  const isClusterModeInPlacesTab = activeTab === 'places' && listScope === 'cluster';
  const isEmpty = places.length === 0;

  return (
    <section
      className={`
        flex h-full w-full flex-col overflow-hidden rounded-xl bg-white
        shadow-sidebar
      `}
    >
      <TabChips activeTab={activeTab} onTabClick={onTabClick} />
      <LineDivider className="w-full" />

      <div className="relative flex-1">
        <div
          className={`
            absolute inset-x-0 top-0 bottom-6
            ${isEmpty ? 'flex items-center justify-center' : 'overflow-y-auto'}
          `}
        >
          {isEmpty
            ? (
                <EmptyState
                  activeTab={activeTab}
                  isClusterModeInPlacesTab={isClusterModeInPlacesTab}
                />
              )
            : (
                <div className="flex w-full flex-col pb-4">
                  {places.map((place, index) => (
                    <div key={place.id}>
                      <PlaceCard place={place} onClick={() => onListItemClick(place.id)} />
                      {index < places.length - 1
                        ? (
                            <LineDivider width="84%" thickness={1} colorClassName="bg-gray-200" />
                          )
                        : null}
                    </div>
                  ))}
                </div>
              )}
        </div>
      </div>
    </section>
  );
}
