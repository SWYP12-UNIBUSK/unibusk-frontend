import Link from 'next/link';
import { Button } from '@/components/common/button';
import { MainLayout } from '@/components/layout';
import { cn } from '@/utils';
import { PromoStepCard } from './promo-step-card';

export const PROMO_STEP_ICONS = {
  step1: '/icons/noteHuman-white.svg',
  step2: '/icons/timerCalendar-white.svg',
  step3: '/icons/mic-white.svg',
  step4: '/icons/checkCircle-white.svg',
} as const;

interface HomePromoSectionProps {
  ctaHref: string;
}

export function HomePromoSection({ ctaHref }: HomePromoSectionProps) {
  return (
    <section className={`
      w-full bg-white py-14
      md:py-20
    `}
    >
      <MainLayout className={`
        px-5
        md:px-6
      `}
      >
        <div className="text-center">
          <h2 className={`
            typo-body-sb-1 text-black
            md:typo-title-sb-2
          `}
          >
            공연을 홍보해 보세요
          </h2>
          <p className={`
            mt-2 typo-caption-r-1 text-gray-600
            md:mt-3.75 md:typo-title-r-4
          `}
          >
            나의 공연 정보를 등록하고 홍보해 보세요
          </p>
        </div>
        <div
          className={cn(
            'mt-12.5',
            'lg:mt-7.5',
            'w-full rounded-xl',
            'bg-[linear-gradient(90deg,#FFF7ED_0%,#FEF2F2_50%,#FDF2F8F7_100%)]',
            'px-3 py-6',
            'md:px-10 md:py-12',
            'lg:px-26 lg:py-18.5',
          )}
        >

          <div className={`
            grid grid-cols-2 gap-2.5
            sm:gap-4
            md:gap-6
            lg:grid-cols-4
          `}
          >
            <PromoStepCard step="Step 1" title="Who you are" description="아티스트를 알려주세요" iconSrc={PROMO_STEP_ICONS.step1} />
            <PromoStepCard step="Step 2" title="When &amp; Where" description="언제 어디서 진행하나요?" iconSrc={PROMO_STEP_ICONS.step2} />
            <PromoStepCard step="Step 3" title="What's your Stage?" description="공연의 매력을 입력하세요" iconSrc={PROMO_STEP_ICONS.step3} />
            <PromoStepCard step="Step 4" title="Ready to Go?" description="마지막으로 체크하면 끝!" iconSrc={PROMO_STEP_ICONS.step4} />
          </div>

          <div className={`
            mt-10 flex justify-center
            md:mt-20
          `}
          >
            <Button
              asChild
              size="lg"
              className="typo-body-sb-1"

            >
              <Link href={ctaHref}>내 공연 등록하기</Link>
            </Button>
          </div>
        </div>
      </MainLayout>
    </section>
  );
}
