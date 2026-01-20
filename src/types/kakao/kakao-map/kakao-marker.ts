interface LatLng { lat: number; lng: number }

export interface KakaoMarkerInputs {
  id: string;
  position: LatLng;
  onClick?: () => void;
}
