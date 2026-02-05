'use client';

import type { SVGProps } from 'react';
import * as React from 'react';

function SearchIcon({
  className,
  title,
  'aria-label': ariaLabel,
  'aria-labelledby': ariaLabelledBy,
  ...props
}: SVGProps<SVGSVGElement> & { title?: string }) {
  const titleId = React.useId();
  const hasLabel = Boolean(title || ariaLabel || ariaLabelledBy);

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden={hasLabel ? undefined : true}
      aria-label={ariaLabel}
      aria-labelledby={title ? titleId : ariaLabelledBy}
      className={`
        block
        ${className ?? ''}
      `}
      {...props}
    >
      {title && <title id={titleId}>{title}</title>}

      <path
        fill="currentColor"
        d="M11.111 3.25a7.862 7.862 0 0 1 6.064 12.864l3.355 3.356a.75.75 0 0 1-1.06 1.06l-3.356-3.355A7.862 7.862 0 1 1 11.111 3.25Zm0 1.5a6.362 6.362 0 0 0 0 12.724 6.338 6.338 0 0 0 4.421-1.791.765.765 0 0 1 .15-.15 6.338 6.338 0 0 0 1.792-4.422A6.362 6.362 0 0 0 11.11 4.75Z"
      />
    </svg>
  );
}
export { SearchIcon };
