import { createPageMetadata } from '@/utils';
import { LegalLayout } from '../_components/legal-layout';
import { TermsContent } from './_components';

export const metadata = createPageMetadata({
  title: 'UNIBUSK 서비스 약관',
  description: 'UNIBUSK 서비스 이용약관 전문입니다.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <LegalLayout title="UNIBUSK 서비스 약관">
      <TermsContent />
    </LegalLayout>
  );
}
