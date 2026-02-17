export interface BuskingPlace {
  id: string;
  title: string;
  lat: number;
  lng: number;
  thumbnailUrl?: string | null;
}

export type SidebarTab = 'places' | 'search';
export type ListScope = 'viewport' | 'cluster' | 'search';

export interface Bounds { north: number; south: number; east: number; west: number }
