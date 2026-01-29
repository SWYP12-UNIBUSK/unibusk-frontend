import React from 'react';

interface TypoItem {
  id: string; // H1, B1 등
  name: string; // 메인타이틀, 강조본문 등
  size: string; // 56px
  utility: string; // typo-title-1
  description: string;
}

interface TypoSection {
  group: string;
  items: TypoItem[];
}

const TYPO_DATA: TypoSection[] = [
  {
    group: 'Headline',
    items: [
      { id: 'H1', name: '메인타이틀', size: '56px', utility: 'typo-title-1', description: 'Pretendard 프리텐다드 56 px' },
      { id: 'H2', name: '섹션타이틀', size: '40px', utility: 'typo-title-2', description: 'Pretendard 프리텐다드 40 px' },
      { id: 'H3', name: '서브타이틀', size: '32px', utility: 'typo-title-3', description: 'Pretendard 프리텐다드 32 px' },
      { id: 'H4', name: '서브타이틀', size: '28px', utility: 'typo-title-4', description: 'Pretendard 프리텐다드 28 px' },
      { id: 'H5', name: '서브타이틀', size: '24px', utility: 'typo-title-5', description: 'Pretendard 프리텐다드 24 px' },
    ],
  },
  {
    group: 'Body',
    items: [
      { id: 'B1', name: '강조본문', size: '20px', utility: 'typo-body-1', description: 'Pretendard 프리텐다드 20 px' },
      { id: 'B2', name: '강조본문', size: '18px', utility: 'typo-body-2', description: 'Pretendard 프리텐다드 18 px' },
      { id: 'B3', name: '기본본문', size: '16px', utility: 'typo-body-3', description: 'Pretendard 프리텐다드 16 px' },
    ],
  },
  {
    group: 'Caption',
    items: [
      { id: 'C1', name: '보조텍스트', size: '14px', utility: 'typo-caption-1', description: 'Pretendard 프리텐다드 14 px' },
      { id: 'C2', name: '날짜, 시간, 캡션정보', size: '12px', utility: 'typo-caption-2', description: 'Pretendard 프리텐다드 12 px' },
    ],
  },
];

export default function TypographyTokenPage() {
  return (
    <main className={`
      min-h-dvh w-full bg-background px-6 py-10 font-sans text-foreground
    `}
    >
      <div className="mx-auto flex w-full max-w-275 flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Typography Guideline</h1>
          <p className="text-gray-600">
            디자인 시스템에 정의된 텍스트 스타일과 유틸리티 클래스 가이드라인입니다.
          </p>
        </header>

        <div className={`
          flex flex-col gap-12 rounded-xl border border-border bg-white p-8
          shadow-sm
        `}
        >
          {TYPO_DATA.map((section, sectionIdx) => (
            <div key={section.group} className="flex flex-col gap-6">
              <div className={`
                flex flex-col
                md:flex-row
              `}
              >
                {/* 왼쪽 그룹 라벨 (Headline, Body, Caption) */}
                <div className={`
                  mb-4 w-full
                  md:mb-0 md:w-40
                `}
                >
                  <span className="text-xl font-medium text-gray-400">
                    {section.group}
                  </span>
                </div>

                {/* 오른쪽 타이포 리스트 */}
                <div className="flex flex-1 flex-col gap-8">
                  {section.items.map(item => (
                    <div
                      key={item.id}
                      className="group relative flex flex-col gap-2"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="w-8 text-sm font-medium text-gray-400">
                          {item.id}
                        </span>

                        <div className={`
                          flex flex-1 flex-wrap items-baseline gap-x-4
                        `}
                        >
                          <p className={`
                            ${item.utility}
                            text-black transition-colors
                            group-hover:text-primary
                          `}
                          >
                            {item.description}
                          </p>
                          <span className="text-xs text-gray-400">
                            {item.name}
                          </span>
                        </div>
                      </div>

                      {/* 개발용 메타데이터 (Hover 시 더 명확히 보임) */}
                      <div className={`
                        ml-12 flex gap-4 font-mono text-[10px] text-gray-500
                        opacity-60
                        group-hover:opacity-100
                      `}
                      >
                        <span className="rounded bg-gray-100 px-1.5 py-0.5">
                          class:
                          {' '}
                          {item.utility}
                        </span>
                        <span>
                          size:
                          {item.size}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 섹션 구분선 (마지막 섹션 제외) */}
              {sectionIdx !== TYPO_DATA.length - 1 && (
                <hr className="my-4 border-gray-200" />
              )}
            </div>
          ))}
        </div>

        <section className="rounded-xl border border-dashed border-gray-300 p-6">
          <h2 className={`
            mb-4 text-sm font-semibold tracking-wider text-gray-500 uppercase
          `}
          >
            Usage Guide
          </h2>
          <pre className={`
            overflow-x-auto rounded-lg bg-gray-50 p-4 text-xs text-gray-700
          `}
          >
            <code>{`<p className="typo-title-1 text-primary">메인 타이틀 타이포그라피</p>\n<span className="typo-caption-2 text-gray-500">2024.05.22</span>`}</code>
          </pre>
        </section>
      </div>
    </main>
  );
}
