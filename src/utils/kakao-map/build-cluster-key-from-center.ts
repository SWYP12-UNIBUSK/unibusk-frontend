export function buildClusterKeyFromCenter(center: kakao.maps.LatLng) {
  return `${center.getLat().toFixed(5)},${center.getLng().toFixed(5)}`;
}
