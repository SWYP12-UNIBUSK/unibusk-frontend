import { Card, CardContent } from '@/components/common/card';
import { Skeleton } from '@/components/common/skeleton';
import { cn } from '@/utils';

interface PerformanceCardSkeletonProps {
  className?: string;
}

export function PerformanceCardSkeleton({ className }: PerformanceCardSkeletonProps) {
  return (
    <Card
      className={cn(
        `
          h-full w-full overflow-hidden border-transparent bg-transparent py-0
          shadow-none
        `,
        className,
      )}
    >
      <CardContent className="flex h-full flex-col p-2.5">
        <Skeleton className="aspect-5/8 w-full shrink-0 rounded-lg" />
        <div className={`
          flex flex-1 flex-col gap-1.5 p-1.5
          sm:p-2.5
        `}
        >
          <Skeleton className="h-3.5 w-3/4 rounded" />
          <Skeleton className="h-3.5 w-1/2 rounded" />
          <Skeleton className="mt-0.75 h-4 w-full rounded" />
          <Skeleton className="h-4 w-4/5 rounded" />
        </div>
      </CardContent>
    </Card>
  );
}
