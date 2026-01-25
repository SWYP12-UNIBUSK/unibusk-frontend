import type { Coordinate } from './geography';

export interface KakaoMarkerInputs {
  id: string;
  position: Coordinate;
  onClick?: () => void;
}
