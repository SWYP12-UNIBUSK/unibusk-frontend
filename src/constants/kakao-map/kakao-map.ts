export const KAKAO_MAP_SCRIPT_ID = 'kakao-map-sdk'; // script 중복 삽입 방지

export const KAKAO_MAP_LIBRARIES = ['services'] as const; // 추가 라이브러리들 로드 목록

/**
 * Kakao Maps SDK를 수동 로드하기 위해 autoload=false를 강제한 URL 생성
 * @param appKey 카카오 지도 SDK 로딩에 필요한 자바스크립트 키
 * @param libraries 라이브러리 목록 배열(string[])
 * @returns 완성된 카카오 SDK 스크립트 URL
 */
export function buildKakaoMapSdkUrl(appKey: string, libraries: readonly string[]) {
  const libs = libraries.length > 0 ? `&libraries=${libraries.join(',')}` : '';
  return `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${appKey}&autoload=false${libs}`;
}
