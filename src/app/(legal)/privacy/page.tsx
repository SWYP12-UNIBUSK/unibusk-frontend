import { createPageMetadata } from '@/utils';
import { LegalLayout } from '../_components/legal-layout';
import { PrivacyContent } from './_components';

export const metadata = createPageMetadata({
  title: 'UNIBUSK 개인정보 처리방침',
  description: 'UNIBUSK 개인정보 처리방침 전문입니다.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalLayout title="UNIBUSK 개인정보 처리방침">
      <PrivacyContent />
    </LegalLayout>
  );
}
