export function ClusterBadge({ count }: { count: number }) {
  return (
    <div className={`
      flex h-10 w-10 cursor-pointer items-center justify-center rounded-full
      bg-primary typo-caption-r-2 font-bold text-white shadow
    `}
    >
      {count}
    </div>
  );
}
