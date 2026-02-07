import type { PerformanceRegisterRequestDto } from '@/apis/performance';

export const CHECKLIST_ITEMS = [
  { id: 'item-1', text: '버스킹 진행될 장소의 허가를 받은 공연인가요?' },
  { id: 'item-2', text: '작성해주신 공연 장소와 일시가 정확한가요?' },
  { id: 'item-3', text: '올바른 버스킹 문화를 만들어 갈 준비가 되셨나요?' },
];

export const STEP_HEADER_INFO = {
  1: { title: '공연자 정보', description: '공연하실 분의 정보가 필요해요.' },
  2: { title: '공연 기본 정보', description: '공연에 대한 기본 정보가 필요해요.' },
  3: { title: '공연 상세 정보', description: '공연에 대한 자세한 정보가 필요해요.' },
  4: { title: '체크리스트 확인', description: '공연을 등록하기 전에 확인해요!' },
} as const;

export const STEP_FIELDS: Record<1 | 2 | 3 | 4, (keyof PerformanceRegisterRequestDto)[]> = {
  1: ['teamName', 'contactNumber', 'email', 'instagramUrl'],
  2: [
    'performanceName',
    'performanceLocation',
    'performanceDate',
    'performanceDescription',
    'startTime',
    'endTime',
  ],
  3: ['posterImage', 'performanceDetail'],
  4: ['checklist'],
};

export const SEARCH_EXAMPLES = [
  {
    title: '장소명',
    example: '예) 신촌 스타광장',
  },
  {
    title: '도로명 + 건물번호',
    example: '예) 연세로 19',
  },
  {
    title: '지역명(동/리) + 지번',
    example: '예) 창천동 18-53',
  },
] as const;

// ! #116 Issue 작업에서 삭제 예정
export const SEARCH_RESULT_EXAMPLE = [
  { id: 1, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 2, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 3, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 4, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 5, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 6, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 7, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
  { id: 8, name: '홍익대학교 서울캠퍼스', address: '서울 마포구 상수동 72-1' },
] as const;

export const TIME_OPTIONS = (() => {
  const options = [];
  for (let i = 0; i < 24; i++) {
    const hour = i.toString().padStart(2, '0');
    options.push(`${hour}:00`);
    options.push(`${hour}:30`);
  }
  return options;
})();

export const PERFORMANCE_ERROR_MESSAGE = '필수 입력 사항입니다';
