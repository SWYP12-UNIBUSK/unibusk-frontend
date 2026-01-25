export {};

declare global {
  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);
      }

      // 지도 생성 옵션 (center, level)
      interface MapOptions {
        center: LatLng; // 지도 중심 좌표
        level: number; // 줌 레벨: 3(가까움) ~ 9(멀리)
      }

      class Map {
        // 지도 인스턴스 생성
        constructor(container: HTMLElement, options: MapOptions);

        // 지도 중심 이동
        setCenter(center: LatLng): void;
      }

      interface MarkerOptions {
        position: LatLng; // 마커 위치
      }

      class Marker {
        constructor(options: MarkerOptions);

        // map 설정: 표시 / null: 제거
        setMap(map: Map | null): void;

        // 마커 위치 이동
        setPosition(position: LatLng): void;
      }

      namespace event {
        /**
         * 카카오맵 객체에 이벤트 리스너를 등록합니다.
         *
         * - target: 이벤트를 붙일 대상 (현재는 Marker만 지원)
         * - type: 이벤트 타입 (현재는 'click'만 최소 선언)
         * - handler: 이벤트 발생 시 실행될 콜백
         *
         * 사용 예시:
         * kakao.maps.event.addListener(marker, 'click', () => {
         *   // 마커 클릭 시 동작
         * });
         *
         * 참고:
         * 실제 SDK는 Map에도 'idle', 'dragend' 같은 이벤트를 달 수 있지만,
         * 현재 타입은 "마커 클릭"만 필요한 상황을 가정해서 최소 범위로 선언했습니다.
         */
        function addListener(
          target: Marker,
          type: 'click',
          handler: () => void,
        ): void;
      }

      // SDK 로드 완료 후 콜백 실행 (autoload=false 환경)
      function load(callback: () => void): void;

      namespace services {
        // 서비스 응답 상태 (OK 하나만 최소 선언된 상태)
        enum Status {
          OK = 'OK',
        }

        /**
         * 주소 → 좌표 변환 API
         * - addressSearch는 주소 문자열을 받아 좌표 후보 목록을 반환
         * - result는 배열이며, 첫 번째 결과(result[0])를 대표 좌표로 쓰는 경우가 많습니다.
         * - x/y는 문자열로 내려오므로 실제 사용 시 number로 변환해서 사용
         */
        class Geocoder {
          addressSearch(
            address: string,
            callback: (
              result: Array<{ x: string; y: string }>,
              status: Status,
            ) => void,
          ): void;
        }
      }
    }
  }

  interface Window {
    // 스크립트 로딩 전에는 undefined일 수 있음
    kakao?: typeof kakao;
  }
}
