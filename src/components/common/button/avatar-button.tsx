import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { cn } from '@/utils';
import { AvatarCircleIcon } from '../icon';

const avatarButtonVariants = cva('', {
  variants: {
    variant: {
      primary: 'bg-primary',
      secondary: 'bg-gray-300',
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
  size = 70,
  style,
  icon,
  disabled,
  type = 'button',
  'aria-label': ariaLabel = '사용자 아바타',
  ...props
}: AvatarButtonProps) {
  const containerSize = size + 20;
  const avatarRadius = size / 2;
  const containerRadius = 20;

  return (
    <button
      type={type}
      className={cn(
        `
          group relative m-0 flex cursor-pointer items-center justify-center
          overflow-visible border-none bg-transparent p-0 leading-none
          transition-all duration-100 ease-in-out outline-none
          focus-visible:ring-2 focus-visible:ring-primary
          focus-visible:ring-offset-2
          disabled:pointer-events-none disabled:opacity-50
        `,
        className,
      )}
      style={{
        width: containerSize,
        height: containerSize,
        borderRadius: containerRadius,
        ...style,
      }}
      aria-disabled={disabled}
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
        aria-hidden="true"
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
        aria-hidden="true"
      >
        <div className="flex size-full items-center justify-center">
          {icon
            ? (
                <span aria-hidden={true}>{icon}</span>
              )
            : (
                <AvatarCircleIcon
                  aria-hidden={true}
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
