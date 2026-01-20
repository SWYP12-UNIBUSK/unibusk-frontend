import { buildKakaoMapSdkUrl, KAKAO_MAP_LIBRARIES, KAKAO_MAP_SCRIPT_ID } from '@/constants';

let loaderPromise: Promise<void> | null = null;

// script 태그 로딩확인
function ensureScript(url: string) {
  return new Promise<void>((resolve, reject) => {
    // 1. script 존재시 로딩 완료 이벤트를 기다림
    const existing = document.getElementById(KAKAO_MAP_SCRIPT_ID) as HTMLScriptElement | null;

    if (existing) {
      existing.addEventListener('load', () => resolve(), { once: true });
      existing.addEventListener('error', () => reject(new Error('KAKAO_SDK 로딩에 실패했습니다.')), { once: true });
      return;
    }

    // 2. script가 존재하지 않을시 생성
    const script = document.createElement('script');
    script.id = KAKAO_MAP_SCRIPT_ID;
    script.src = url;
    script.async = true;

    script.addEventListener('load', () => resolve(), { once: true });
    script.addEventListener('error', () => reject(new Error('KAKAO_SDK 로딩에 실패했습니다.')), { once: true });

    document.head.appendChild(script);
  });
}

export async function loadKakaoSdk(appKey: string) {
  // SSR에서 kakao_map_sdk 실행 차단
  if (typeof window === 'undefined') {
    throw new TypeError('KAKAO_SDK 실행은 오직 브라우저에서 작동해야 합니다.');
  }

  // 이미 SDK가 준비된 상태라면 즉시 종료
  if (window.kakao?.maps) {
    return;
  }

  // 최초 호출시 로딩 / 재호출이라면 기존 Promise 재사용 (Singleton)
  if (!loaderPromise) {
    const kakaoMapUrl = buildKakaoMapSdkUrl(appKey, KAKAO_MAP_LIBRARIES);

    loaderPromise = ensureScript(kakaoMapUrl).then(
      () =>
      // autoload=false → 스크립트 로드 완료 ≠ API 준비 완료
      // kakao.maps.load 콜백에서 준비 완료 보장
        new Promise<void>((resolve) => {
          window.kakao.maps.load(() => resolve());
        }),
    );
  }

  // “SDK 사용 가능”을 보장
  await loaderPromise;
}
