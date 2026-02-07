export interface BuskingPlace {
  id: string;
  title: string;
  lat: number;
  lng: number;
  thumbnailUrl?: string | null;
}

export type ListScope = 'viewport' | 'cluster' | 'search';
