import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

const SIZE_BASE_CLASSES: Record<ButtonSize, string> = {
  lg: 'h-15 min-w-87.5 typo-body-sb-1',
  md: 'h-11.25 min-w-37.5 px-7.5 py-2.5 typo-body-m-3',
  sm: 'h-9 min-w-30 typo-caption-m-1',
  xs: 'h-7.5 min-w-25 typo-caption-r-1',
};

const SIZE_SM_CLASSES: Record<ButtonSize, string> = {
  lg: 'sm:h-15 sm:min-w-87.5 sm:typo-body-sb-1',
  md: 'sm:h-11.25 sm:min-w-37.5 sm:px-7.5 sm:py-2.5 sm:typo-body-m-3',
  sm: 'sm:h-9 sm:min-w-30 sm:typo-caption-m-1',
  xs: 'sm:h-7.5 sm:min-w-25 sm:typo-caption-r-1',
};

const OUTLINE_BORDER_BASE: Record<ButtonSize, string> = {
  lg: 'border-[3px]',
  md: 'border-2',
  sm: 'border',
  xs: 'border',
};

const OUTLINE_BORDER_SM: Record<ButtonSize, string> = {
  lg: 'sm:border-[3px]',
  md: 'sm:border-2',
  sm: 'sm:border',
  xs: 'sm:border',
};

const buttonVariants = cva(
  `
    inline-flex shrink-0 cursor-pointer items-center justify-center gap-2
    rounded-full whitespace-nowrap transition-all duration-300 ease-in-out
    outline-none
    focus-visible:border-ring focus-visible:ring-[3px]
    focus-visible:ring-ring/50
    disabled:pointer-events-none disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
  `,
  {
    variants: {
      theme: {
        orange: '',
        gray: '',
        lightGray: '',
        lightOrange: '',
      },
      appearance: {
        filled: '',
        outline: 'bg-transparent',
      },
    },
    compoundVariants: [
      // Orange 조합
      {
        theme: 'orange',
        appearance: 'filled',
        className: `
          bg-primary text-white
          hover:bg-primary/90
        `,
      },
      {
        theme: 'orange',
        appearance: 'outline',
        className: `
          border-primary text-primary
          hover:bg-orange-150
        `,
      },

      // Light Orange 조합
      {
        theme: 'lightOrange',
        appearance: 'filled',
        className: `
          bg-orange-150 text-primary
          hover:bg-orange-150/90
        `,
      },
      {
        theme: 'lightOrange',
        appearance: 'outline',
        className: `
          border-orange-200 text-orange-300
          hover:bg-orange-150
        `,
      },

      // Gray 조합
      {
        theme: 'gray',
        appearance: 'filled',
        className: `
          bg-gray-500 text-white
          hover:bg-gray-500/80
        `,
      },
      {
        theme: 'gray',
        appearance: 'outline',
        className: `
          border-gray-500 text-gray-500
          hover:bg-gray-100
        `,
      },

      // Light Gray 조합
      {
        theme: 'lightGray',
        appearance: 'filled',
        className: `
          bg-gray-300 text-gray-800
          hover:bg-gray-300/80
        `,
      },
      {
        theme: 'lightGray',
        appearance: 'outline',
        className: `
          border-gray-300 text-gray-500
          hover:bg-gray-50
        `,
      },

    ],
    defaultVariants: {
      theme: 'orange',
      appearance: 'filled',
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  theme?: 'orange' | 'gray' | 'lightGray' | 'lightOrange';
  appearance?: 'filled' | 'outline';
  size?: ButtonSize;
  mobileSize?: ButtonSize;
}

function Button({
  className,
  theme,
  appearance,
  size = 'md',
  mobileSize,
  asChild = false,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  const sizeClasses = mobileSize
    ? cn(SIZE_BASE_CLASSES[mobileSize], SIZE_SM_CLASSES[size])
    : SIZE_BASE_CLASSES[size];

  const borderClasses
    = appearance === 'outline'
      ? mobileSize
        ? cn(OUTLINE_BORDER_BASE[mobileSize], OUTLINE_BORDER_SM[size])
        : OUTLINE_BORDER_BASE[size]
      : '';

  return (
    <Comp
      data-slot="button"
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(
        buttonVariants({ theme, appearance }),
        sizeClasses,
        borderClasses,
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
