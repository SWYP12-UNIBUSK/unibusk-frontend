import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { AvatarIcon } from '../icon';

const avatarButtonVariants = cva('', {
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'bg-gray-300 text-white',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

interface AvatarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
  VariantProps<typeof avatarButtonVariants> {
  'size'?: number;
  'icon'?: React.ReactNode;
  /**
   * 접근성을 위한 레이블 (스크린 리더용)
   * @default "사용자 아바타"
   */
  'aria-label'?: string;
}

export function AvatarButton({
  className,
  variant,
  size = 50,
  style,
  icon,
  disabled,
  type = 'button',
  'aria-label': ariaLabel = '유저 아바타',
  ...props
}: AvatarButtonProps) {
  const containerSize = size + 20;
  const avatarRadius = size / 2;
  const containerRadius = avatarRadius + 20;

  return (
    <button
      type={type}
      className={cn(
        `
          group relative m-0 flex items-center justify-center overflow-visible
          border-none bg-transparent p-0 leading-none transition-all
          duration-100 ease-in-out outline-none
        `,
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        className,
      )}
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: containerRadius,
        ...style,
      }}
      disabled={disabled}
      aria-label={ariaLabel}
      {...props}
    >
      {/* Hover Background Layer */}
      <div
        className={cn(
          `
            absolute inset-0 rounded-[inherit] bg-transparent transition-all
            duration-500 ease-in-out
          `,
          !disabled && 'group-hover:rounded-lg group-hover:bg-gray-200',
        )}
      />

      {/* Avatar Circle */}
      <div
        className={cn(
          avatarButtonVariants({ variant }),
          'pointer-events-none relative z-10 shadow-sm',
        )}
        style={{
          width: size,
          height: size,
          borderRadius: avatarRadius,
        }}
      >
        <div className="flex size-full items-center justify-center">
          {icon || (
            <AvatarIcon
              className={cn(
                'fill-current transition-colors duration-300',
                !disabled && 'group-hover:text-gray-600',
              )}
            />
          )}
        </div>
      </div>
    </button>
  );
}
