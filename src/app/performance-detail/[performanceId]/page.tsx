export default async function PerformanceDetailPage({ params }: { params: { performanceId: string } }) {
  const { performanceId } = await params;
  return (
    <div>
      <h1>{`${performanceId}번 공연 상세 페이지`}</h1>
    </div>
  );
}
