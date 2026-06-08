'use client';

import type { BuskingPlace, SidebarTab } from '@/types/busking-map';
import Image from 'next/image';
import { useEffect, useMemo, useReducer, useRef } from 'react';
import { useShallow } from 'zustand/react/shallow';

import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from '@/components/common/drawer';
import { LineDivider } from '@/components/common/line-divider';
import { useBuskingMapUiStore } from '@/stores/busking-map';
import { cn } from '@/utils';
import { DetailPanel } from './detail-panel';

const BUSKING_MAP_SHEET_SNAP = {
  collapsed: '116px',
  default: 0.48,
  detail: 1,
} as const;

const MOBILE_HEADER_HEIGHT_FALLBACK_PX = 96;

type BuskingMapSheetSnapPoint = number | string | null;

interface BuskingMapBottomSheetProps {
  activeTab: SidebarTab;
  places: BuskingPlace[];
  focusedPlace: BuskingPlace | null;
  selectedPlace: BuskingPlace | null;
  onTabClick: (tab: SidebarTab) => void;
  onListItemClick: (placeId: string) => void;
  onFocusedCloseClick: () => void;
  onDetailCloseClick: () => void;
}

function BottomSheetTabs({
  activeTab,
  onTabClick,
}: {
  activeTab: SidebarTab;
  onTabClick: (tab: SidebarTab) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="버스킹 장소 목록"
      className="flex h-11 items-end justify-center gap-9"
    >
      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'places'}
        onClick={() => onTabClick('places')}
        className={cn(
          'h-9 cursor-pointer border-b-2 px-2 typo-caption-m-2 font-semibold',
          activeTab === 'places'
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500',
        )}
      >
        공연 장소
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={activeTab === 'search'}
        onClick={() => onTabClick('search')}
        className={cn(
          'h-9 cursor-pointer border-b-2 px-2 typo-caption-m-2 font-semibold',
          activeTab === 'search'
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500',
        )}
      >
        검색 결과
      </button>
    </div>
  );
}

function PlacePreviewCard({
  place,
  onClick,
}: {
  place: BuskingPlace | null;
  onClick: () => void;
}) {
  if (!place) {
    return (
      <div className="px-5 pb-4 text-center">
        <p className="typo-caption-r-1 text-gray-600">표시할 공연 장소가 없습니다.</p>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        flex w-full cursor-pointer items-center gap-3 px-5 pb-4 text-left
        outline-none
        focus-visible:ring-2 focus-visible:ring-primary
        focus-visible:ring-offset-2
      `}
    >
      <div className={`
        relative size-15 shrink-0 overflow-hidden rounded-lg bg-gray-200
      `}
      >
        {place.thumbnailUrl
          ? (
              <Image
                src={place.thumbnailUrl}
                alt=""
                fill
                sizes="60px"
                className="object-cover"
              />
            )
          : null}
      </div>

      <div className="min-w-0 flex-1">
        <p className="line-clamp-1 typo-body-sb-3 text-black">{place.title}</p>
      </div>
    </button>
  );
}

function PlaceListItem({
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
        flex w-full cursor-pointer gap-3 px-5 py-3 text-left outline-none
        hover:bg-orange-150
        focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset
      `}
    >
      <div className={`
        relative h-20 w-27 shrink-0 overflow-hidden rounded-lg bg-gray-200
      `}
      >
        {place.thumbnailUrl
          ? (
              <Image
                src={place.thumbnailUrl}
                alt=""
                fill
                sizes="108px"
                className="object-cover"
              />
            )
          : null}
      </div>

      <div className="min-w-0 flex-1 py-1">
        <h3 className="line-clamp-2 typo-body-sb-3 text-black">{place.title}</h3>
      </div>
    </button>
  );
}

function PlaceList({
  activeTab,
  places,
  onTabClick,
  onListItemClick,
}: {
  activeTab: SidebarTab;
  places: BuskingPlace[];
  onTabClick: (tab: SidebarTab) => void;
  onListItemClick: (placeId: string) => void;
}) {
  const isEmpty = places.length === 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col" data-vaul-no-drag>
      <BottomSheetTabs activeTab={activeTab} onTabClick={onTabClick} />

      <div
        className={cn(
          'min-h-0 flex-1',
          isEmpty
            ? 'flex items-center justify-center'
            : 'overflow-y-auto',
        )}
      >
        {isEmpty
          ? (
              <p className="px-5 text-center typo-body-m-3 text-gray-600">
                {activeTab === 'search' ? '검색 결과가 없습니다.' : '표시할 공연 장소가 없습니다.'}
              </p>
            )
          : (
              <div className="pb-8">
                {places.map((place, index) => (
                  <div key={place.id}>
                    <PlaceListItem place={place} onClick={() => onListItemClick(place.id)} />
                    {index < places.length - 1
                      ? <LineDivider width="89%" thickness={1} colorClassName="bg-gray-200" />
                      : null}
                  </div>
                ))}
              </div>
            )}
      </div>
    </div>
  );
}

export function BuskingMapBottomSheet({
  activeTab,
  places,
  focusedPlace,
  selectedPlace,
  onTabClick,
  onListItemClick,
  onFocusedCloseClick,
  onDetailCloseClick,
}: BuskingMapBottomSheetProps) {
  const [headerHeightPx, setHeaderHeightPx] = useReducer(
    (_current: number, next: number) => next,
    MOBILE_HEADER_HEIGHT_FALLBACK_PX,
  );
  const [activeSnapPoint, setActiveSnapPoint] = useReducer(
    (_current: BuskingMapSheetSnapPoint, next: BuskingMapSheetSnapPoint) => next,
    BUSKING_MAP_SHEET_SNAP.collapsed,
  );

  const mapState = useBuskingMapUiStore(
    useShallow(state => ({
      listScope: state.listScope,
      searchQuery: state.searchQuery,
      focusedPlaceId: state.focusedPlaceId,
      selectedPlaceId: state.selectedPlaceId,
    })),
  );

  const interactionKey = `${mapState.listScope}:${mapState.searchQuery}:${mapState.focusedPlaceId ?? ''}:${mapState.selectedPlaceId ?? ''}`;
  const previousInteractionKeyRef = useRef(interactionKey);

  const expandedSnapPoint = useMemo(() => {
    if (typeof window === 'undefined') {
      return `${MOBILE_HEADER_HEIGHT_FALLBACK_PX}px`;
    }

    return `${Math.max(window.innerHeight - headerHeightPx, 0)}px`;
  }, [headerHeightPx]);

  const snapPoints = useMemo(() => {
    return [
      BUSKING_MAP_SHEET_SNAP.collapsed,
      BUSKING_MAP_SHEET_SNAP.default,
      expandedSnapPoint,
      BUSKING_MAP_SHEET_SNAP.detail,
    ];
  }, [expandedSnapPoint]);

  useEffect(() => {
    const header = document.querySelector('header');
    if (!header) {
      return;
    }

    const updateHeaderHeight = () => {
      const nextHeight = Math.round(header.getBoundingClientRect().height);
      if (nextHeight > 0) {
        setHeaderHeightPx(nextHeight);
      }
    };

    updateHeaderHeight();

    const resizeObserver = new ResizeObserver(updateHeaderHeight);
    resizeObserver.observe(header);
    window.addEventListener('resize', updateHeaderHeight);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateHeaderHeight);
    };
  }, []);

  useEffect(() => {
    if (previousInteractionKeyRef.current === interactionKey) {
      return;
    }

    previousInteractionKeyRef.current = interactionKey;

    if (mapState.selectedPlaceId) {
      setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.detail);
      return;
    }

    if (mapState.focusedPlaceId) {
      setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.detail);
      return;
    }

    if (mapState.listScope === 'cluster' || mapState.searchQuery.trim() !== '') {
      setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.default);
    }
  }, [expandedSnapPoint, interactionKey, mapState.focusedPlaceId, mapState.listScope, mapState.searchQuery, mapState.selectedPlaceId]);

  const previewPlace = useMemo(() => {
    return selectedPlace ?? focusedPlace ?? places[0] ?? null;
  }, [focusedPlace, places, selectedPlace]);

  const isDetailOpen = Boolean(selectedPlace || focusedPlace);
  const isCollapsed = activeSnapPoint === BUSKING_MAP_SHEET_SNAP.collapsed;
  const isDetailFullscreen = isDetailOpen && activeSnapPoint === BUSKING_MAP_SHEET_SNAP.detail;
  const isExpanded = !isDetailFullscreen && !isCollapsed && activeSnapPoint !== BUSKING_MAP_SHEET_SNAP.default;
  const isExpandedSnapPoint = activeSnapPoint !== BUSKING_MAP_SHEET_SNAP.collapsed
    && activeSnapPoint !== BUSKING_MAP_SHEET_SNAP.default
    && activeSnapPoint !== BUSKING_MAP_SHEET_SNAP.detail;

  useEffect(() => {
    if (!isExpandedSnapPoint) {
      return;
    }

    setActiveSnapPoint(expandedSnapPoint);
  }, [expandedSnapPoint, isExpandedSnapPoint]);

  const handlePreviewClick = () => {
    if (!previewPlace) {
      return;
    }

    onListItemClick(previewPlace.id);
    setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.detail);
  };

  const handleListItemClick = (placeId: string) => {
    onListItemClick(placeId);
    setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.detail);
  };

  const handleDetailCloseClick = () => {
    if (selectedPlace) {
      onDetailCloseClick();
    }
    else {
      onFocusedCloseClick();
    }

    setActiveSnapPoint(BUSKING_MAP_SHEET_SNAP.default);
  };

  return (
    <Drawer
      open={true}
      modal={false}
      dismissible={false}
      direction="bottom"
      snapPoints={snapPoints}
      activeSnapPoint={activeSnapPoint}
      setActiveSnapPoint={setActiveSnapPoint}
      snapToSequentialPoint={true}
      shouldScaleBackground={false}
      setBackgroundColorOnScale={false}
      autoFocus={false}
    >
      <DrawerContent
        direction="bottom"
        showOverlay={false}
        className={cn(
          'z-sidebar mt-0! h-dvh! max-h-dvh! border-none! bg-white',
          isExpanded || isDetailFullscreen ? 'shadow-none' : 'shadow-sidebar',
          isExpanded || isDetailFullscreen
            ? `
              rounded-none
              data-[vaul-drawer-direction=bottom]:rounded-none
            `
            : 'rounded-t-[20px]',
          isDetailFullscreen
            ? `
              *:data-[slot=drawer-handle]:absolute
              *:data-[slot=drawer-handle]:top-4
              *:data-[slot=drawer-handle]:left-1/2
              *:data-[slot=drawer-handle]:z-10
              *:data-[slot=drawer-handle]:-translate-x-1/2
            `
            : '',
        )}
      >
        <DrawerTitle className="sr-only">버스킹 장소 목록</DrawerTitle>

        {isExpanded && !isDetailFullscreen
          ? (
              <div
                aria-hidden={true}
                className="h-6 w-full shrink-0 bg-white"
              />
            )
          : null}

        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          {isDetailOpen && !isCollapsed
            ? (
                <div
                  className={cn(
                    'min-h-0 flex-1',
                    isDetailFullscreen
                      ? 'px-0 pb-0'
                      : 'px-2 pb-2',
                  )}
                >
                  <DetailPanel
                    place={selectedPlace ?? focusedPlace}
                    onCloseClick={handleDetailCloseClick}
                    variant={isDetailFullscreen ? 'detail' : 'focused'}
                  />
                </div>
              )
            : (
                <>
                  {isCollapsed
                    ? (
                        <PlacePreviewCard place={previewPlace} onClick={handlePreviewClick} />
                      )
                    : null}
                  {!isCollapsed
                    ? (
                        <PlaceList
                          activeTab={activeTab}
                          places={places}
                          onTabClick={onTabClick}
                          onListItemClick={handleListItemClick}
                        />
                      )
                    : null}
                </>
              )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
