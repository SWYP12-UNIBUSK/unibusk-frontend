import type { SVGProps } from 'react';
import { useId } from 'react';
import { cn } from '@/utils';

function XIcon({
  className,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  const titleId = useId();
  const hasLabel = Boolean(title || ariaLabel || ariaLabelledBy);

  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      className={cn(`block`, className)}
    >
      {title && <title id={titleId}>{title}</title>}

      <path
        fill="#111"
        d="M18.97 3.97a.75.75 0 1 1 1.06 1.06L13.06 12l6.97 6.97a.75.75 0 0 1-1.06 1.06L12 13.06l-6.97 6.97a.75.75 0 0 1-1.06-1.06L10.94 12 3.97 5.03a.75.75 0 1 1 1.06-1.06L12 10.94l6.97-6.97Z"
      />
    </svg>
  );
}
export { XIcon };
