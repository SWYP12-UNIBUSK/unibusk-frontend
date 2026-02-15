import { MainLayout } from '@/components/layout';
import { cn } from '@/utils';

interface MomentItem {
  title: string;
  description: string;
}

interface AboutUsMomentsSectionProps {
  heading: string;
  items: readonly MomentItem[];
}

export function AboutUsMomentsSection({ heading, items }: AboutUsMomentsSectionProps) {
  return (
    <section className={`
      flex h-full min-h-350 w-full flex-col items-center justify-center bg-white
    `}
    >
      <MainLayout
        className="px-6"
      >
        <h2 className="text-center typo-title-b-1 text-black">{heading}</h2>

        <div className="mt-33.25 flex w-full flex-col items-center">
          <div className="flex flex-col gap-16.5">
            {items.map((item, index) => (
              <div key={item.title} className="flex items-center gap-12">
                <TimelineDot
                  isLast={index === items.length - 1}
                  connectorVariant={index % 2 === 0 ? 'down-right' : 'down-left'}
                />

                <MomentCard
                  title={item.title}
                  description={item.description}
                  align={index % 2 === 1 ? 'right' : 'left'}
                />
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </section>
  );
}

function MomentCard({
  title,
  description,
  align,
}: {
  title: string;
  description: string;
  align: 'left' | 'right';
}) {
  const shiftClass = align === 'right' ? 'ml-20' : '';

  return (
    <div
      className={cn(
        'h-full min-h-46 w-full max-w-360 rounded-2xl bg-gray-200 px-12 py-10',
        'shadow-[0_6px_14px_rgba(0,0,0,0.10)] ring-1 ring-black/10',
        shiftClass,
      )}
    >
      <h3 className="typo-title-b-3 break-keep text-gray-800">{title}</h3>
      <p
        className={`
          mt-3.5 typo-title-r-4 break-keep whitespace-pre-line text-gray-700
        `}
      >
        {description}
      </p>
    </div>
  );
}

function TimelineDot({
  isLast,
  connectorVariant,
}: {
  isLast: boolean;
  connectorVariant: 'down-right' | 'down-left';
}) {
  const isDotLeft = connectorVariant === 'down-right';
  const justifyClass = isDotLeft ? 'justify-start' : 'justify-end';

  const leftDotX = 6;
  const rightDotX = 24;

  const leftShiftX = 1;
  const rightShiftX = 5;

  const shiftedLeftDotX = leftDotX - leftShiftX;
  const shiftedRightDotX = rightDotX + rightShiftX;

  const connectorPath = isDotLeft
    ? `M${shiftedLeftDotX} 0 L${shiftedRightDotX} 100`
    : `M${shiftedRightDotX} 0 L${shiftedLeftDotX} 100`;

  const dotShiftClass = isDotLeft ? '-translate-x-4' : 'translate-x-14';

  return (
    <div
      className={`
        relative flex h-46 w-30 items-center
        ${justifyClass}
      `}
      aria-hidden
    >
      {!isLast
        ? (
            <svg
              className="pointer-events-none absolute top-1/2 left-0 h-62 w-30"
              aria-hidden="true"
              viewBox="0 0 30 100"
              preserveAspectRatio="none"
            >
              <path
                d={connectorPath}
                fill="none"
                stroke="rgb(209,213,219)"
                strokeWidth="0.5"
              />
            </svg>
          )
        : null}

      <div
        className={`
          relative z-10 h-15.5 w-15.5 shrink-0 rounded-full bg-orange-400
          ${dotShiftClass}
        `}
      />
    </div>
  );
}
