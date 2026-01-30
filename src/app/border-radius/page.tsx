import React from 'react';

interface RadiusItem {
  label: string; // 20%
  pixelValue: string; // 20px
  utility: string; // rounded-lg
}

const RADIUS_DATA: RadiusItem[] = [
  { label: '100%', pixelValue: 'Full', utility: 'rounded-full' },
  { label: '45px', pixelValue: '45px', utility: 'rounded-2xl' },
  { label: '30px', pixelValue: '30px', utility: 'rounded-xl' },
  { label: '20px', pixelValue: '20px', utility: 'rounded-lg' },
  { label: '15px', pixelValue: '15px', utility: 'rounded-md' },
  { label: '10px', pixelValue: '10px', utility: 'rounded-sm' },
];

export default function RadiusTokenPage() {
  return (
    <main className="min-h-dvh w-full bg-white px-8 py-12 font-sans text-black">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col gap-12">
        <header className="border-b border-gray-100 pb-8">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tighter">BORDER RADIUS</h1>
          </div>
          <p className="mt-2 text-gray-500">
            UNIBUSK 디자인 시스템의 곡률 토큰 (표기는 %이나 실제는 px 단위 적용)
          </p>
        </header>

        {/* 디자인 시스템 그리드 재현 */}
        <div className={`
          grid grid-cols-2 gap-x-20 gap-y-16
          md:grid-cols-3
        `}
        >
          {RADIUS_DATA.map(item => (
            <div key={item.label} className="flex items-center gap-6">
              {/* 시각적 박스 */}
              <div className={`
                h-25 w-25 bg-gray-200 shadow-inner
                ${item.utility}
              `}
              />

              {/* 텍스트 정보 */}
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold">{item.label}</span>
                <div className="flex flex-col text-[11px] text-gray-400">
                  <span className="font-mono">{item.pixelValue}</span>
                  <span className="font-mono text-primary">
                    .
                    {item.utility}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 사용 가이드 */}
        <section className={`
          mt-10 rounded-xl border border-dashed border-gray-200 bg-gray-50 p-6
        `}
        >
          <h2 className={`
            mb-4 text-xs font-semibold tracking-widest text-gray-400 uppercase
          `}
          >
            Implementation Note
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-sm text-gray-600">
            <li>디자인 가이드의 퍼센트 수치를 실제 픽셀 값으로 변환하여 적용했습니다.</li>
            <li>
              Tailwind v4의
              <code>@theme inline</code>
              을 통해 변수를 매핑하여 자동완성을 지원합니다.
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
