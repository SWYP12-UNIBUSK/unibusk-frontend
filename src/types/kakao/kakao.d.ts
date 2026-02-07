export {};

declare global {
  namespace kakao {
    namespace maps {
      class LatLng {
        constructor(lat: number, lng: number);

        // 클러스터 center 등에서 lat/lng 추출용
        getLat(): number;
        getLng(): number;
      }

      // 지도 생성 옵션 (center, level)
      interface MapOptions {
        center: LatLng; // 지도 중심 좌표
        level: number; // 줌 레벨: 3(가까움) ~ 9(멀리)
      }

      class Map {
        constructor(container: HTMLElement, options: MapOptions);

        setLevel(level: number): void;
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

        // 현재 붙어있는 map 조회
        getMap(): Map | null;
      }

      // 클러스터 마커 콘텐츠 교체용
      class CustomOverlay {
        setContent(content: string | HTMLElement): void;
      }

      // 클러스터 단위 정보
      interface Cluster {
        getSize: () => number;
        getClusterMarker: () => CustomOverlay;
        getMarkers: () => Marker[];
        getCenter: () => LatLng;
      }

      interface MarkerClustererOptions {
        map: Map;
        averageCenter?: boolean;
        minLevel?: number;
        disableClickZoom?: boolean;
        gridSize?: number;
        minClusterSize?: number;
        calculator?: number[];
        styles?: Array<Record<string, string>>;
      }

      class MarkerClusterer {
        constructor(options: MarkerClustererOptions);

        addMarkers(markers: Marker[], redraw?: boolean): void;
        addMarker(marker: Marker, redraw?: boolean): void;

        removeMarkers(markers: Marker[], redraw?: boolean): void;
        removeMarker(marker: Marker, redraw?: boolean): void;

        clear(): void;
        redraw(): void;
      }

      /**
       * 카카오맵 객체에 이벤트 리스너를 등록
       * - target: 이벤트를 붙일 대상
       * - type: 이벤트 타입
       * - handler: 이벤트 발생 시 실행될 콜백
       */
      namespace event {
        interface MapMouseEvent { latLng: LatLng };

        function addListener(target: Map, type: 'click', handler: (mouseEvent: MapMouseEvent) => void): void;
        function removeListener(target: Map, type: 'click', handler: (mouseEvent: MapMouseEvent) => void): void;

        function addListener(target: Marker, type: 'click', handler: () => void): void;
        function removeListener(target: Marker, type: 'click', handler: () => void): void;

        function addListener(target: MarkerClusterer, type: 'clustered', handler: (clusters: Cluster[]) => void): void;
        function removeListener(target: MarkerClusterer, type: 'clustered', handler: (clusters: Cluster[]) => void): void;

        function addListener(target: MarkerClusterer, type: 'clusterclick', handler: (cluster: Cluster) => void): void;
        function removeListener(target: MarkerClusterer, type: 'clusterclick', handler: (cluster: Cluster) => void): void;
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
         * - result는 배열이며, 첫 번째 결과(result[0])를 대표 좌표로 쓰는 경우가 많음
         * - x/y는 문자열로 내려오므로 실제 사용 시 number로 변환해서 사용
         */
        class Geocoder {
          addressSearch(
            address: string,
            callback: (result: Array<{ x: string; y: string }>, status: Status) => void,
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
