import type { ListScope } from '@/types/busking-map/busking-place';
import type { Coordinate } from '@/types/kakao/kakao-map';
import { create } from 'zustand';
import { isSameOrderedIds } from '@/utils/id-equals';

type SidebarTab = 'places' | 'search';

interface SidebarSnapshot {
  listScope: ListScope;
  clusterKey: string | null;
  clusterPlaceIds: string[];
  selectedPlaceId: string | null;
  focusedPlaceId: string | null;
  searchQuery: string;
  activeSidebarTab: SidebarTab;
  searchOrigin: Coordinate | null;
}

interface BuskingMapUiState {
  isSidebarOpen: boolean; // 사이드바 열림 여부
  lastOpenSnapshot: SidebarSnapshot | null; // 닫기 직전 스냅샷(재오픈 시 복원용)
  listScope: ListScope;
  clusterKey: string | null; // 어떤 클러스터인지 식별용
  clusterPlaceIds: string[]; // 클러스터 리스트에 포함된 place id들
  viewportPlaceIds: string[]; // viewport 모드에서 현재 지도에 보이는 place id들

  selectedPlaceId: string | null; // 2단 상세 패널에서 표시할 장소 id
  focusedPlaceId: string | null; // 1단 사이드바 상세 패널에서 표시할 장소 id
  searchQuery: string; // 검색 실행으로 확정된 검색어(빈 문자열이면 검색 결과 없음)
  activeSidebarTab: SidebarTab; // 공연 장소/검색 결과 탭 UI 상태
  searchOrigin: Coordinate | null; // 검색 실행 시점의 지도 기준 좌표(거리 정렬 기준)

  map: kakao.maps.Map | null; // 카카오 지도 인스턴스(뷰포트 bounds/이벤트 처리용)
  setMap: (map: kakao.maps.Map | null) => void;

  // Sidebar open&close
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

  // Viewport list
  setViewportPlaceIds: (placeIds: string[]) => void;
  clearViewportPlaceIds: () => void;

  // 2단 상세 DetailPanel
  selectPlace: (placeId: string) => void;
  clearSelectedPlace: () => void;

  // 1단 상세 Sidebar
  focusPlace: (placeId: string) => void;
  clearFocusedPlace: () => void;

  // Cluster list
  openClusterList: (clusterKey: string, clusterPlaceIds: string[]) => void;
  exitClusterList: () => void;

  // Search
  setActiveSidebarTab: (tab: SidebarTab) => void;
  openSearchResults: (query: string, origin: Coordinate | null) => void;
  setSearchQuery: (query: string) => void;
  clearSearchQuery: () => void;
}

// 닫기 직전 상태의 스냅샷
function makeSnapshot(state: BuskingMapUiState): SidebarSnapshot {
  return {
    listScope: state.listScope,
    clusterKey: state.clusterKey,
    clusterPlaceIds: state.clusterPlaceIds.slice(),
    selectedPlaceId: state.selectedPlaceId,
    focusedPlaceId: state.focusedPlaceId,
    searchQuery: state.searchQuery,
    activeSidebarTab: state.activeSidebarTab,
    searchOrigin: state.searchOrigin ? { ...state.searchOrigin } : null,
  };
}

// 버스킹맵 로딩 직후: sidebar 열림상태 + viewport 모드 + 장소 선택 없음
export const useBuskingMapUiStore = create<BuskingMapUiState>((set, get) => ({
  isSidebarOpen: true,
  lastOpenSnapshot: null,
  listScope: 'viewport',

  clusterKey: null,
  clusterPlaceIds: [],
  viewportPlaceIds: [],

  selectedPlaceId: null,
  focusedPlaceId: null,
  searchQuery: '',
  activeSidebarTab: 'places',
  searchOrigin: null,

  map: null,
  setMap: (map) => {
    set({ map });
  },

  // sidebar open: 스냅샷 없으면 일반적인 open / 있으면 닫기 직전 상태 복원 후 스냅샷 상태 null로 변경
  openSidebar: () => {
    const { lastOpenSnapshot } = get();

    if (!lastOpenSnapshot) {
      set({ isSidebarOpen: true });
      return;
    }

    set({
      isSidebarOpen: true,
      listScope: lastOpenSnapshot.listScope,
      clusterKey: lastOpenSnapshot.clusterKey,
      clusterPlaceIds: lastOpenSnapshot.clusterPlaceIds,
      selectedPlaceId: lastOpenSnapshot.selectedPlaceId,
      focusedPlaceId: lastOpenSnapshot.focusedPlaceId,
      searchQuery: lastOpenSnapshot.searchQuery,
      activeSidebarTab: lastOpenSnapshot.activeSidebarTab,
      searchOrigin: lastOpenSnapshot.searchOrigin,
      lastOpenSnapshot: null,
    });
  },

  // sidebar close: 닫기 직전 상태 스냅샷 저장 + selected/focused 초기화
  closeSidebar: () => {
    const current = get();

    if (!current.isSidebarOpen) {
      return;
    }

    set({
      isSidebarOpen: false,
      lastOpenSnapshot: makeSnapshot(current),
      selectedPlaceId: null,
      focusedPlaceId: null,
    });
  },

  toggleSidebar: () => {
    const { isSidebarOpen, closeSidebar, openSidebar } = get();

    if (isSidebarOpen) {
      closeSidebar();
      return;
    }

    openSidebar();
  },

  setViewportPlaceIds: (placeIds) => {
    const { viewportPlaceIds } = get();

    if (isSameOrderedIds(viewportPlaceIds, placeIds)) {
      return;
    }

    set({ viewportPlaceIds: placeIds });
  },

  clearViewportPlaceIds: () => {
    const { viewportPlaceIds } = get();

    if (viewportPlaceIds.length === 0) {
      return;
    }

    set({ viewportPlaceIds: [] });
  },

  // 2단 상세: selected만 활성화(focused는 해제)
  selectPlace: (placeId) => {
    set({
      isSidebarOpen: true,
      selectedPlaceId: placeId,
      focusedPlaceId: null,
    });
  },

  clearSelectedPlace: () => {
    set({ selectedPlaceId: null });
  },

  // 1단 상세: focused만 활성화(selected는 해제)
  focusPlace: (placeId) => {
    set({
      isSidebarOpen: true,
      focusedPlaceId: placeId,
      selectedPlaceId: null,
    });
  },

  clearFocusedPlace: () => {
    set({ focusedPlaceId: null });
  },

  // 클러스터 모드 진입: listScope=cluster + clusterKey/ids 저장 + focused 해제(선택은 유지)
  openClusterList: (clusterKey, clusterPlaceIds) => {
    set(state => ({
      isSidebarOpen: true,
      listScope: 'cluster',
      clusterKey,
      clusterPlaceIds,
      selectedPlaceId: state.selectedPlaceId,
      focusedPlaceId: null,
      activeSidebarTab: 'places',
    }));
  },

  // 클러스터 모드 종료: searchQuery 유무에 따라 viewport/search 복귀
  exitClusterList: () => {
    const { searchQuery } = get();

    set({
      listScope: searchQuery ? 'search' : 'viewport',
      clusterKey: null,
      clusterPlaceIds: [],
      activeSidebarTab: searchQuery ? 'search' : 'places',
    });
  },

  setActiveSidebarTab: (tab) => {
    set({ activeSidebarTab: tab });
  },

  openSearchResults: (query, origin) => {
    if (!query) {
      set({
        searchQuery: '',
        listScope: 'viewport',
        clusterKey: null,
        clusterPlaceIds: [],
        activeSidebarTab: 'places',
        searchOrigin: null,
      });
      return;
    }

    set(state => ({
      isSidebarOpen: true,
      searchQuery: query,
      listScope: 'search',
      clusterKey: null,
      clusterPlaceIds: [],
      selectedPlaceId: state.selectedPlaceId,
      focusedPlaceId: null,
      activeSidebarTab: 'search',
      searchOrigin: origin,
    }));
  },

  setSearchQuery: (query) => {
    if (!query) {
      set({
        searchQuery: '',
        listScope: 'viewport',
        clusterKey: null,
        clusterPlaceIds: [],
        activeSidebarTab: 'places',
        searchOrigin: null,
      });
      return;
    }

    set(state => ({
      isSidebarOpen: true,
      searchQuery: query,
      listScope: 'search',
      clusterKey: null,
      clusterPlaceIds: [],
      selectedPlaceId: state.selectedPlaceId,
      focusedPlaceId: null,
      activeSidebarTab: 'search',
      searchOrigin: state.searchOrigin,
    }));
  },

  clearSearchQuery: () => {
    set({
      searchQuery: '',
      listScope: 'viewport',
      clusterKey: null,
      clusterPlaceIds: [],
      activeSidebarTab: 'places',
      searchOrigin: null,
    });
  },
}));
