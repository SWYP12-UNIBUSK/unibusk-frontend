import { MainLayout } from '@/components/layout';

export function HomeFooter() {
  return (
    <footer className="w-full border-t border-gray-100 bg-white py-14">
      <MainLayout>
        <div className="flex items-start justify-between gap-12">
          <div className="flex items-center gap-3">
            <span className={`
              text-title-4 font-bold tracking-tight text-primary
            `}
            >
              UNIBUSK
            </span>
          </div>

          <div className="flex-1">
            <div className="mt-6 typo-caption-r-2 leading-[1.7] text-gray-500">
              <div>유니버스크 | 사업자 상가구분번호 000 0000 0000</div>
              <div>대표: 000 | TEL: 0507-1111-1111 | Email: unibusk@gmail.com</div>
              <div>사업자 번호: 000-00-00000 | 통신판매업 신고번호: 0000-XXXX-0000</div>
            </div>
          </div>
        </div>
      </MainLayout>
    </footer>
  );
}
