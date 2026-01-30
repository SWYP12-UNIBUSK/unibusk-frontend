interface ColorItem {
  name: string;
  bgClass: string;
  textClass?: string;
};

const BGCOLORS: ColorItem[] = [
  { name: 'primary', bgClass: 'bg-primary', textClass: 'text-white' },
  { name: 'orange-100', bgClass: 'bg-orange-100', textClass: 'text-gray-800' },
  { name: 'orange-150', bgClass: 'bg-orange-150', textClass: 'text-gray-800' },
  { name: 'orange-200', bgClass: 'bg-orange-200', textClass: 'text-gray-800' },
  { name: 'orange-300', bgClass: 'bg-orange-300', textClass: 'text-white' },
  { name: 'orange-400', bgClass: 'bg-orange-400', textClass: 'text-white' },

  { name: 'gray-100', bgClass: 'bg-gray-100', textClass: 'text-gray-800' },
  { name: 'gray-200', bgClass: 'bg-gray-200', textClass: 'text-gray-800' },
  { name: 'gray-300', bgClass: 'bg-gray-300', textClass: 'text-gray-800' },
  { name: 'gray-400', bgClass: 'bg-gray-400', textClass: 'text-gray-800' },
  { name: 'gray-500', bgClass: 'bg-gray-500', textClass: 'text-white' },
  { name: 'gray-550', bgClass: 'bg-gray-550', textClass: 'text-white' },
  { name: 'gray-600', bgClass: 'bg-gray-600', textClass: 'text-white' },
  { name: 'gray-700', bgClass: 'bg-gray-700', textClass: 'text-white' },
  { name: 'gray-800', bgClass: 'bg-gray-800', textClass: 'text-white' },

  { name: 'error', bgClass: 'bg-error', textClass: 'text-white' },
  { name: 'kakao', bgClass: 'bg-kakao', textClass: 'text-black' },

  { name: 'white', bgClass: 'bg-white', textClass: 'text-black' },
  { name: 'black', bgClass: 'bg-black', textClass: 'text-white' },
];

const TEXTCOLORS = [
  'text-primary',
  'text-orange-100',
  'text-orange-150',
  'text-orange-200',
  'text-orange-300',
  'text-orange-400',
  'text-gray-100',
  'text-gray-200',
  'text-gray-300',
  'text-gray-400',
  'text-gray-500',
  'text-gray-550',
  'text-gray-600',
  'text-gray-700',
  'text-gray-800',
  'text-error',
  'text-kakao',
  'text-white',
  'text-black',
] as const;

export default function ColorTokenTestPage() {
  return (
    <main className={`
      min-h-dvh w-full bg-background px-6 py-10 font-sans text-foreground
    `}
    >
      <div className="mx-auto flex w-full max-w-[1100px] flex-col gap-10">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold">Color Token Test</h1>
          <p className="text-gray-700">
            bg-*, text-* 토큰이 실제로 적용되는지 확인하는 페이지입니다.
          </p>
        </header>

        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold">Background Tokens</h2>
            <span className="text-sm text-gray-600">bg-* + 대비 텍스트 확인</span>
          </div>

          <div className={`
            grid grid-cols-1 gap-4
            sm:grid-cols-2
            lg:grid-cols-4
          `}
          >
            {BGCOLORS.map(({ name, bgClass, textClass }) => (
              <div
                key={name}
                className="overflow-hidden rounded-xl border border-border"
              >
                <div className={`
                  ${bgClass}
                  ${textClass ?? 'text-white'}
                  p-5
                `}
                >
                  <div className="text-sm opacity-90">{name}</div>
                  <div className="mt-2 text-xl font-bold">Aa</div>
                </div>

                <div className="bg-card px-4 py-3 text-sm text-card-foreground">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-gray-600">class</span>
                    <span className="font-mono text-xs">{bgClass}</span>
                  </div>
                  {textClass && (
                    <div className={`
                      mt-1 flex items-center justify-between gap-2
                    `}
                    >
                      <span className="text-gray-600">text</span>
                      <span className="font-mono text-xs">{textClass}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="flex flex-col gap-4">
          <div className="flex items-end justify-between gap-3">
            <h2 className="text-lg font-semibold">Text Tokens</h2>
            <span className="text-sm text-gray-600">text-* 단독 확인</span>
          </div>

          <div className={`
            grid grid-cols-1 gap-4
            lg:grid-cols-2
          `}
          >
            <div className={`
              flex flex-col gap-3 rounded-xl border border-border p-5
            `}
            >
              <div className="text-sm text-gray-600">Light Background</div>
              <div className={`
                flex flex-col gap-2 rounded-lg border border-gray-300 bg-white
                p-4
              `}
              >
                {TEXTCOLORS.map(cls => (
                  <div key={cls} className="flex items-center justify-between">
                    <span className={`
                      text-base font-semibold
                      ${cls}
                    `}
                    >
                      Aa Pretendard
                    </span>
                    <span className="font-mono text-xs text-gray-600">{cls}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`
              flex flex-col gap-3 rounded-xl border border-border p-5
            `}
            >
              <div className="text-sm text-gray-600">Dark Background</div>
              <div className={`
                flex flex-col gap-2 rounded-lg border border-gray-700
                bg-gray-800 p-4
              `}
              >
                {TEXTCOLORS.map(cls => (
                  <div key={cls} className="flex items-center justify-between">
                    <span className={`
                      text-base font-semibold
                      ${cls}
                    `}
                    >
                      Aa Pretendard
                    </span>
                    <span className="font-mono text-xs text-gray-300">{cls}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className={`
          flex flex-col gap-3 rounded-xl border border-border p-5
        `}
        >
          <h2 className="text-lg font-semibold">Quick Checks</h2>

          <div className={`
            grid grid-cols-1 gap-3
            md:grid-cols-3
          `}
          >
            <div className={`
              rounded-lg border border-border bg-background p-4 text-foreground
            `}
            >
              <div className="text-sm text-gray-600">background/foreground</div>
              <div className="mt-1 text-base font-semibold">Bg + Text</div>
            </div>

            <div className={`
              rounded-lg border border-border bg-card p-4 text-card-foreground
            `}
            >
              <div className="text-sm text-gray-600">card/card-foreground</div>
              <div className="mt-1 text-base font-semibold">Card</div>
            </div>

            <div className={`
              rounded-lg border border-border p-4 outline-1 outline-ring/40
            `}
            >
              <div className="text-sm text-gray-600">border/ring</div>
              <div className="mt-1 text-base font-semibold">Border + Ring</div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
