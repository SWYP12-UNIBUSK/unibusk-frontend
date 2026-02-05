import type { VariantProps } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils/cn';

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
      size: {
        lg: 'h-15 min-w-87.5 typo-body-sb-1',
        md: 'h-11.25 min-w-37.5 px-7.5 py-2.5 typo-body-m-3',
        sm: 'h-7.5 min-w-25 typo-caption-r-1',
      },
    },
    compoundVariants: [
      // 1. Outline 상태일 때 사이즈별 테두리 두께 설정
      { appearance: 'outline', size: 'sm', className: 'border' },
      { appearance: 'outline', size: 'md', className: 'border-2' },
      { appearance: 'outline', size: 'lg', className: 'border-[3px]' },

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
      size: 'md',
    },
  },
);

interface ButtonProps
  extends React.ComponentProps<'button'>,
  VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  theme?: 'orange' | 'gray' | 'lightGray' | 'lightOrange';
  appearance?: 'filled' | 'outline';
  size?: 'lg' | 'md' | 'sm';
}

function Button({
  className,
  theme,
  appearance,
  size,
  asChild = false,
  disabled,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      data-slot="button"
      aria-disabled={disabled}
      disabled={disabled}
      className={cn(
        buttonVariants({ theme, appearance, size }),
        className,
      )}
      {...props}
    />
  );
}

export { Button, buttonVariants };
