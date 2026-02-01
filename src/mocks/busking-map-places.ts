import type { BuskingPlace } from '@/types/busking-map';

interface PlaceCluster {
  label: string;
  lat: number;
  lng: number;
}

const SEED_PLACES: BuskingPlace[] = [
  { id: 'p1', title: '홍대 걷고 싶은 거리', lat: 37.5563, lng: 126.922, thumbnailUrl: null },
  { id: 'p2', title: '홍대 연트럴파크', lat: 37.5569, lng: 126.924, thumbnailUrl: null },
  { id: 'p3', title: '선유도 공원', lat: 37.5433, lng: 126.901, thumbnailUrl: null },
  { id: 'p4', title: '강남역 11번 출구', lat: 37.4981, lng: 127.0276, thumbnailUrl: null },
  { id: 'p5', title: '신사 가로수길', lat: 37.5206, lng: 127.023, thumbnailUrl: null },
  { id: 'p6', title: '여의도 한강공원', lat: 37.5284, lng: 126.9326, thumbnailUrl: null },
  { id: 'p7', title: '뚝섬 한강공원', lat: 37.5291, lng: 127.0667, thumbnailUrl: null },
  { id: 'p8', title: '서울숲', lat: 37.5444, lng: 127.0374, thumbnailUrl: null },
  { id: 'p9', title: '광화문 광장', lat: 37.5716, lng: 126.9769, thumbnailUrl: null },
  { id: 'p10', title: '대학로 마로니에공원', lat: 37.5814, lng: 127.003, thumbnailUrl: null },
];

const CLUSTERS: PlaceCluster[] = [
  { label: '홍대', lat: 37.5563, lng: 126.922 },
  { label: '망원', lat: 37.5552, lng: 126.8986 },
  { label: '여의도', lat: 37.5284, lng: 126.9326 },
  { label: '선유도', lat: 37.5433, lng: 126.901 },
  { label: '광화문', lat: 37.5716, lng: 126.9769 },
  { label: '시청', lat: 37.5665, lng: 126.978 },
  { label: '성수', lat: 37.5449, lng: 127.0565 },
  { label: '서울숲', lat: 37.5444, lng: 127.0374 },
  { label: '강남', lat: 37.4981, lng: 127.0276 },
  { label: '신사', lat: 37.5206, lng: 127.023 },
  { label: '이태원', lat: 37.5387, lng: 126.987 },
  { label: '잠실', lat: 37.5131, lng: 127.1026 },
  { label: '건대', lat: 37.5405, lng: 127.0719 },
  { label: '대학로', lat: 37.5814, lng: 127.003 },
];

const DEFAULT_MOCK_COUNT = 30;

export const BUSKING_MAP_PLACES_MOCK: BuskingPlace[] = createBuskingMapPlacesMock(DEFAULT_MOCK_COUNT);

function createBuskingMapPlacesMock(targetCount: number) {
  if (targetCount <= 0) {
    return [];
  }

  if (targetCount <= SEED_PLACES.length) {
    return SEED_PLACES.slice(0, targetCount);
  }

  const seed = 20260201;
  const random = createMulberry32(seed);

  const generatedCount = targetCount - SEED_PLACES.length;
  const generated = Array.from({ length: generatedCount }, (_, index) => {
    const globalIndex = SEED_PLACES.length + index;
    const cluster = CLUSTERS[globalIndex % CLUSTERS.length];

    const r1 = random();
    const r2 = random();
    const r3 = random();

    const jitter = 0.004 + r3 * 0.006;
    const lat = round6(cluster.lat + (r1 - 0.5) * jitter);
    const lng = round6(cluster.lng + (r2 - 0.5) * jitter);

    const id = `mp_${String(globalIndex + 1).padStart(4, '0')}`;
    const title = `${cluster.label} 버스킹 스팟 ${String(globalIndex + 1).padStart(4, '0')}`;

    return { id, title, lat, lng, thumbnailUrl: null };
  });

  return [...SEED_PLACES, ...generated];
}

function round6(value: number) {
  return Math.round(value * 1_000_000) / 1_000_000;
}

function createMulberry32(seed: number) {
  let t = seed;

  return () => {
    t += 0x6D2B79F5;
    let x = Math.imul(t ^ (t >>> 15), t | 1);
    x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}
