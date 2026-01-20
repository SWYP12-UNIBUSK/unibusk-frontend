interface LatLng { lat: number; lng: number }

export interface KakaoMarkerProps {
  id: string;
  position: LatLng;
  onClick?: () => void;
}
