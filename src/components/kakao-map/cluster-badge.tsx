export function ClusterBadge({ count, isActive }: { count: number; isActive: boolean }) {
  return (
    <div className={`
      flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
      bg-primary typo-caption-r-2 font-bold text-white shadow
      ${isActive
      ? `
        scale-105 shadow-lg ring-4 ring-primary/35 ring-offset-2
        ring-offset-white
      `
      : ''}
    `}
    >
      {count}
    </div>
  );
}
