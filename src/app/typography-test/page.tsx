import React from 'react';

interface TypoItem {
  id: string; // H1, B1_B 등
  name: string; // 메인타이틀, 강조본문 등
  size: string; // 56px
  utility: string; // typo-title-b-1
  weight: string; // Bold, SemiBold 등
  lineHeight: string; // 130%, 150%
}

interface TypoSection {
  group: string;
  items: TypoItem[];
}

const TYPO_DATA: TypoSection[] = [
  {
    group: 'Headline',
    items: [
      { id: 'H1', name: '메인타이틀', size: '56px', utility: 'typo-title-b-1', weight: 'Bold', lineHeight: '130%' },
      { id: 'H2', name: '섹션타이틀', size: '40px', utility: 'typo-title-sb-2', weight: 'SemiBold', lineHeight: '150%' },
      { id: 'H3', name: '서브타이틀', size: '32px', utility: 'typo-title-b-3', weight: 'Bold', lineHeight: '150%' },
      { id: 'H4_SB', name: '서브타이틀', size: '28px', utility: 'typo-title-sb-4', weight: 'SemiBold', lineHeight: '150%' },
      { id: 'H4_R', name: '서브타이틀', size: '28px', utility: 'typo-title-r-4', weight: 'Regular', lineHeight: '150%' },
      { id: 'H5', name: '서브타이틀', size: '24px', utility: 'typo-title-b-5', weight: 'Bold', lineHeight: '150%' },
    ],
  },
  {
    group: 'Body',
    items: [
      { id: 'B1_B', name: '강조본문', size: '20px', utility: 'typo-body-b-1', weight: 'Bold', lineHeight: '150%' },
      { id: 'B1_SB', name: '강조본문', size: '20px', utility: 'typo-body-sb-1', weight: 'SemiBold', lineHeight: '150%' },
      { id: 'B1_M', name: '강조본문', size: '20px', utility: 'typo-body-m-1', weight: 'Medium', lineHeight: '150%' },
      { id: 'B2', name: '강조본문', size: '18px', utility: 'typo-body-sb-2', weight: 'SemiBold', lineHeight: '150%' },
      { id: 'B3', name: '기본본문', size: '16px', utility: 'typo-body-m-3', weight: 'Medium', lineHeight: '150%' },
    ],
  },
  {
    group: 'Caption',
    items: [
      { id: 'C1_SB', name: '보조텍스트', size: '14px', utility: 'typo-caption-sb-1', weight: 'SemiBold', lineHeight: '150%' },
      { id: 'C1_M', name: '보조텍스트', size: '14px', utility: 'typo-caption-m-1', weight: 'Medium', lineHeight: '150%' },
      { id: 'C1_R', name: '보조텍스트', size: '14px', utility: 'typo-caption-r-1', weight: 'Regular', lineHeight: '150%' },
      { id: 'C2', name: '날짜, 시간, 캡션정보', size: '12px', utility: 'typo-caption-r-2', weight: 'Regular', lineHeight: '150%' },
    ],
  },
];

export default function TypographyTokenPage() {
  return (
    <main className="min-h-dvh w-full bg-white px-8 py-12 font-sans text-black">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-12">
        <header className="border-b border-gray-100 pb-8">
          <h1 className="text-3xl font-bold tracking-tight">UNIBUSK Typography</h1>
          <p className="mt-2 text-gray-500">
            디자인 시스템 가이드라인에 따른 가중치 및 행간 세부 정의
          </p>
        </header>

        <div className="flex flex-col gap-16">
          {TYPO_DATA.map(section => (
            <section
              key={section.group}
              className={`
                flex flex-col gap-8
                md:flex-row
              `}
            >
              {/* 왼쪽 그룹 섹션 */}
              <div className={`
                w-full shrink-0
                md:w-48
              `}
              >
                <h2 className="text-2xl font-semibold text-gray-500">
                  {section.group}
                </h2>
              </div>

              {/* 오른쪽 타이포그래피 상세 리스트 */}
              <div className="flex flex-1 flex-col gap-10">
                {section.items.map(item => (
                  <div key={item.id} className="group flex flex-col gap-3">
                    <div className="flex items-baseline gap-6">
                      {/* ID 표시 (H1, B1_B 등) */}
                      <span className="w-12 text-sm font-medium text-gray-500">
                        {item.id}
                      </span>

                      <div className={`
                        flex flex-1 flex-wrap items-baseline justify-between
                        gap-4
                      `}
                      >
                        {/* 실제 폰트 렌더링 */}
                        <p className={`
                          ${item.utility}
                          text-black transition-colors
                          group-hover:text-primary
                        `}
                        >
                          Pretendard 프리텐다드
                          {' '}
                          {item.size}
                        </p>

                        {/* 우측 메타데이터 정의 (이미지 스타일 재현) */}
                        <div className="text-[11px] font-medium text-gray-500">
                          {item.weight}
                          /
                          {item.size}
                          / Line height:
                          {item.lineHeight}
                        </div>
                      </div>
                    </div>

                    {/* 개발용 클래스 정보 */}
                    <div className="ml-18 flex items-center gap-2">
                      <span className={`
                        rounded border border-gray-100 bg-gray-50 px-2 py-0.5
                        font-mono text-[10px] text-gray-500
                      `}
                      >
                        .
                        {item.utility}
                      </span>
                      <span className={`
                        text-[10px] tracking-widest text-gray-500 uppercase
                      `}
                      >
                        {item.name}
                      </span>
                    </div>
                  </div>
                ))}
                {/* 섹션 하단 구분선 */}
                <hr className="mt-4 border-gray-300" />
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
