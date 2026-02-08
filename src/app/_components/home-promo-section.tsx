import Link from 'next/link';
import { cn } from '@/utils';
import { HomeContainer } from './home-container';
import { PromoStepCard } from './promo-step-card';

interface HomePromoSectionProps {
  ctaHref: string;
}

export function HomePromoSection({ ctaHref }: HomePromoSectionProps) {
  return (
    <section className="w-full bg-white py-20">
      <HomeContainer>
        <div className="text-center">
          <h2 className="typo-title-sb-2 leading-[1.3] font-bold text-gray-900">공연을 홍보해 보세요</h2>
          <p className="mt-4 typo-title-r-4 text-gray-500">나의 공연 정보를 등록하고 홍보 해 보세요</p>
        </div>

        <div
          className={cn(
            'mt-12',
            'w-full rounded-[28px]',
            'bg-[#FFF4F2]',
            'px-12 py-14',
          )}
        >
          <div className="grid grid-cols-4 gap-10">
            <PromoStepCard step="Step 1" title="Who you are" description="아티스트를 알려주세요" />
            <PromoStepCard step="Step 2" title="When &amp; Where" description="언제 어디서 진행하나요?" />
            <PromoStepCard step="Step 3" title="What's your Stage?" description="공연의 매력을 입력하세요" />
            <PromoStepCard step="Step 4" title="Ready to Go?" description="마지막으로 체크하면 끝!" />
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href={ctaHref}
              className={cn(
                'h-12 px-16',
                'inline-flex items-center justify-center',
                `
                  rounded-full bg-primary typo-caption-r-1 font-semibold
                  text-white
                `,
                'shadow-[0_14px_34px_rgba(255,99,71,0.26)]',
                `
                  transition-opacity
                  hover:opacity-90
                `,
              )}
            >
              내 공연 등록하기
            </Link>
          </div>
        </div>
      </HomeContainer>
    </section>
  );
}
