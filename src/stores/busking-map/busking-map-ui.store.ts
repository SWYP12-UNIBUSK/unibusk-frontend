import type { ListScope } from '@/types/busking-map/busking-place';
import { create } from 'zustand';

interface SidebarSnapshot {
  listScope: ListScope;
  clusterKey: string | null;
  clusterPlaceIds: string[];
  selectedPlaceId: string | null;
  focusedPlaceId: string | null;
  searchQuery: string;
}

interface BuskingMapUiState {
  isSidebarOpen: boolean; // 사이드바 열림 여부
  lastOpenSnapshot: SidebarSnapshot | null; // 닫기 직전 상태(re-open시 복원용)
  listScope: ListScope;
  clusterKey: string | null; // 어떤 클러스터인지 식별용
  clusterPlaceIds: string[]; // 클러스터 리스트에 포함된 place id들
  selectedPlaceId: string | null; // 2단 상세 패널에서 표시할 장소 id
  focusedPlaceId: string | null; // 1단 사이드바 상세 패널에서 표시할 장소 id
  searchQuery: string;

  // Sidebar open&close
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;

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
  };
}

// 버스킹맵 로딩 직후: sidebar 열림상태 + viewport 모드 + 장소 선택 없음
export const useBuskingMapUiStore = create<BuskingMapUiState>((set, get) => ({
  isSidebarOpen: true,
  lastOpenSnapshot: null,
  listScope: 'viewport',

  clusterKey: null,
  clusterPlaceIds: [],
  selectedPlaceId: null,
  focusedPlaceId: null,
  searchQuery: '',

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
      lastOpenSnapshot: null,
    });
  },

  // 닫기 직전 상태를 스냅샷으로 저장
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

  // 2단 상세 패널 open
  selectPlace: (placeId) => {
    set({
      isSidebarOpen: true,
      selectedPlaceId: placeId,
      focusedPlaceId: null, // 1단 사이드바 상세보기 guard 용도
    });
  },

  // 2단 상세 패널 close
  clearSelectedPlace: () => {
    set({ selectedPlaceId: null });
  },

  // 1단 사이드바 상세보기
  focusPlace: (placeId) => {
    set({
      isSidebarOpen: true,
      focusedPlaceId: placeId,
      selectedPlaceId: null,
    });
  },

  // 1단 사이드바 상세보기 해제
  clearFocusedPlace: () => {
    set({ focusedPlaceId: null });
  },

  openClusterList: (clusterKey, clusterPlaceIds) => {
    set(state => ({
      isSidebarOpen: true,
      listScope: 'cluster',
      clusterKey,
      clusterPlaceIds,
      selectedPlaceId: state.selectedPlaceId, // 2단 상세 유지
      focusedPlaceId: null, // 1단 요약 해제
    }));
  },

  exitClusterList: () => {
    const { searchQuery } = get();

    set({
      listScope: searchQuery ? 'search' : 'viewport',
      clusterKey: null,
      clusterPlaceIds: [],
    });
  },

  // 검색어 설정: query 없으면 viewport로 복귀, 있으면 search 모드로 전환(선택/요약/클러스터 초기화)
  setSearchQuery: (query) => {
    if (!query) {
      set({
        searchQuery: '',
        listScope: 'viewport',
        clusterKey: null,
        clusterPlaceIds: [],
      });
      return;
    }

    set(state => ({
      isSidebarOpen: true,
      searchQuery: query,
      listScope: 'search',
      clusterKey: null,
      clusterPlaceIds: [],
      selectedPlaceId: state.selectedPlaceId, // 2단 상세 유지
      focusedPlaceId: null, // 1단 요약 해제
    }));
  },

  // 검색어 초기화
  clearSearchQuery: () => {
    set({
      searchQuery: '',
      listScope: 'viewport',
      clusterKey: null,
      clusterPlaceIds: [],
    });
  },
}));
