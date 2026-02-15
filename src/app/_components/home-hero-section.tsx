import type { StaticImageData } from 'next/image';
import Image from 'next/image';
import { HomeContainer } from './home-container';

interface HomeHeroSectionProps {
  mapBgSrc: StaticImageData;
  heroIllustSrc: StaticImageData;
}

export function HomeHeroSection({ mapBgSrc, heroIllustSrc }: HomeHeroSectionProps) {
  return (
    <section className="w-full">
      <div className="relative mx-auto w-full max-w-480">
        <div className="relative pt-12.25 pb-26">
          <div
            className={`
              pointer-events-none absolute top-12.25 right-19.25 h-181.75
              w-262.5
            `}
          >
            <Image
              src={mapBgSrc}
              alt=""
              fill
              priority
              sizes="1050px"
              className={`
                translate-x-4 -translate-y-18 scale-[1.03] object-cover
                opacity-70
              `}
              aria-hidden
            />

            <Image
              src={heroIllustSrc}
              alt="UNIBUSK 지도 일러스트"
              fill
              priority
              sizes="1050px"
              className="object-contain"
            />
          </div>

          <HomeContainer className="relative z-10">
            <div className="grid min-h-181.75 grid-cols-12 items-center gap-6">
              <div className="col-span-5">
                <h1 className="typo-title-b-1 whitespace-nowrap text-black">
                  누구나 거리 위에서
                  <br />
                  공연을 시작할 수 있도록
                </h1>

                <p className="mt-6 typo-title-r-4 whitespace-nowrap text-black">
                  버스킹이 가능한 장소와 현장을 지도에서 바로 찾아보세요
                </p>
              </div>

              <div className="col-span-7" aria-hidden />
            </div>
          </HomeContainer>
        </div>
      </div>
    </section>
  );
}
