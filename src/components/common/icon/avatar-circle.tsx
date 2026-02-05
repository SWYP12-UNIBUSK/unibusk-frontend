import type { SVGProps } from 'react';
import { useId } from 'react';

export function AvatarCircleIcon({
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
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 50"
      fill="none"
      role="img"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}

      className={`
        block
        ${className ?? ''}
      `}
      {...props}
    >
      {title ? <title id={titleId}>{title}</title> : null}

      <path
        fill="#ffffff"
        d="M25 11.5a7.19 7.19 0 0 0-4.476 1.568 7.475 7.475 0 0 0-2.594 4.045 7.619 7.619 0 0 0 .378 4.823 7.401 7.401 0 0 0 3.192 3.571 12.507 12.507 0 0 0-6.389 4.453 12.979 12.979 0 0 0-2.61 7.441 1.086 1.086 0 0 0 .282.764 1.042 1.042 0 0 0 .728.335H36.49c.404 0 .79-.12 1.01-.335.22-.214.282-.486.282-.764a12.979 12.979 0 0 0-2.61-7.441 12.507 12.507 0 0 0-6.389-4.453 7.401 7.401 0 0 0 3.192-3.571 7.619 7.619 0 0 0 .378-4.823 7.475 7.475 0 0 0-2.594-4.045A7.19 7.19 0 0 0 25 11.5z"
      />
    </svg>
  );
}
