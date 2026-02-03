import type { SVGProps } from 'react';
import { useId } from 'react';

export function ChevronLeftIcon({
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
        d="M16.6163 20.6983C16.3234 20.9912 15.8486 20.9912 15.5557 20.6983L7.38775 12.5303C7.09486 12.2374 7.09486 11.7627 7.38775 11.4698L15.5557 3.30182C15.8486 3.00892 16.3234 3.00892 16.6163 3.30182C16.9092 3.59471 16.9092 4.06947 16.6163 4.36236L8.97857 12.0001L16.6163 19.6378C16.9092 19.9306 16.9092 20.4054 16.6163 20.6983Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ChevronRightIcon({
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
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
        d="M7.38373 3.3017C7.67663 3.00881 8.15139 3.00881 8.44428 3.3017L16.6122 11.4697C16.9051 11.7626 16.9051 12.2373 16.6122 12.5302L8.44428 20.6982C8.15139 20.9911 7.67663 20.9911 7.38373 20.6982C7.09084 20.4053 7.09084 19.9305 7.38373 19.6376L15.0214 11.9999L7.38373 4.36225C7.09084 4.06935 7.09084 3.59459 7.38373 3.3017Z"
        fill="currentColor"
      />
    </svg>
  );
}
