import { cn } from '@/utils';

interface SidebarToggleButtonProps {
  isSidebarOpen: boolean;
  onClick: () => void;
  className?: string;
}

export function SidebarToggleButton({
  isSidebarOpen,
  onClick,
  className,
}: SidebarToggleButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'flex items-center justify-center',
        'h-11.75 w-6 py-4.5 pr-1.25 pl-0.5',
        'rounded-r-sm bg-white',
        className,
      )}
      aria-label={isSidebarOpen ? '사이드바 닫기' : '사이드바 열기'}
      aria-expanded={isSidebarOpen}
    >
      <span className="text-primary">{isSidebarOpen ? '‹' : '›'}</span>
    </button>
  );
}
