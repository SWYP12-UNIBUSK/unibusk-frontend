import type { VariantProps } from 'class-variance-authority';
import * as SelectPrimitive from '@radix-ui/react-select';
import { cva } from 'class-variance-authority';
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react';
import * as React from 'react';
import { cn } from '@/utils/index';

const SelectContext = React.createContext<{
  variant?: 'default' | 'time';
}>({ variant: 'default' });

function useSelectVariant(localVariant?: 'default' | 'time' | null) {
  const context = React.use(SelectContext);
  return localVariant || context.variant || 'default';
}

function Select({
  children,
  variant = 'default',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root> & {
  variant?: 'default' | 'time';
}) {
  return (
    <SelectContext value={{ variant }}>
      <SelectPrimitive.Root {...props}>{children}</SelectPrimitive.Root>
    </SelectContext>
  );
}

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const selectTriggerVariants = cva(
  `
    flex items-center border whitespace-nowrap outline-none
    disabled:cursor-not-allowed disabled:opacity-50
    aria-invalid:border-destructive aria-invalid:ring-destructive/20
    *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex
    *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2
    dark:bg-input/30 dark:hover:bg-input/50
    dark:aria-invalid:ring-destructive/40
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
    [&_svg:not([class*='text-'])]:text-muted-foreground
  `,
  {
    variants: {
      variant: {
        default:
          `
            w-fit justify-between gap-2 rounded-md border-input bg-transparent
            px-3 py-2 text-sm shadow-xs transition-[color,box-shadow]
            focus-visible:border-ring focus-visible:ring-[3px]
            focus-visible:ring-ring/50
            data-placeholder:text-muted-foreground
          `,
        time: `
          min-w-27.5 justify-center rounded-full border-gray-300 bg-gray-100 p-5
          typo-body-m-3 text-black transition-colors
          data-placeholder:typo-caption-r-1 data-placeholder:text-gray-550
        `,
      },
      size: {
        default: '',
        sm: 'h-8',
      },
    },
    compoundVariants: [
      {
        variant: 'default',
        size: 'default',
        class: 'h-9',
      },
      {
        variant: 'time',
        size: 'default',
        class: 'h-15',
      },
    ],
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

function SelectTrigger({
  ref,
  className,
  children,
  variant,
  size,
  showIcon = true,
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
  & VariantProps<typeof selectTriggerVariants> & {
    showIcon?: boolean;
  } & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Trigger> | null> }) {
  const finalVariant = useSelectVariant(variant);

  return (
    <SelectPrimitive.Trigger
      ref={ref}
      className={cn(selectTriggerVariants({ variant: finalVariant, size }), className)}
      {...props}
    >
      {children}
      {showIcon && (
        <SelectPrimitive.Icon asChild>
          <ChevronDownIcon className="size-4 opacity-50" />
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  );
}

function SelectScrollUpButton({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollUpButton> | null> }) {
  return (
    <SelectPrimitive.ScrollUpButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

function SelectScrollDownButton({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.ScrollDownButton> | null> }) {
  return (
    <SelectPrimitive.ScrollDownButton
      ref={ref}
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

const selectContentVariants = cva(
  `
    relative max-h-(--radix-select-content-available-height)
    origin-(--radix-select-content-transform-origin) overflow-x-hidden
    overflow-y-auto
    data-[side=bottom]:slide-in-from-top-2
    data-[side=left]:slide-in-from-right-2
    data-[side=right]:slide-in-from-left-2
    data-[side=top]:slide-in-from-bottom-2
    data-[state=closed]:animate-out data-[state=closed]:fade-out-0
    data-[state=closed]:zoom-out-95
    data-[state=open]:animate-in data-[state=open]:fade-in-0
    data-[state=open]:zoom-in-95
  `,
  {
    variants: {
      variant: {
        default:
          `
            z-50 min-w-32 rounded-md border bg-popover text-popover-foreground
            shadow-md
          `,
        time: `
          z-popup flex w-16.5 items-center bg-white typo-body-m-3 text-black
          shadow-elevate-1
        `,
      },
      position: {
        'popper':
          `
            data-[side=bottom]:translate-y-1
            data-[side=left]:-translate-x-1
            data-[side=right]:translate-x-1
            data-[side=top]:-translate-y-1
          `,
        'item-aligned': '',
      },
    },
    defaultVariants: {
      variant: 'default',
      position: 'popper',
    },
  },
);

function SelectContent({
  ref,
  className,
  children,
  position = 'popper',
  showIcon = true,
  variant,
  align = 'center',
  ...props
}: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
  & VariantProps<typeof selectContentVariants> & { showIcon?: boolean; ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Content> | null> }) {
  const finalVariant = useSelectVariant(variant);

  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        ref={ref}
        className={cn(
          selectContentVariants({ variant: finalVariant, position }),
          // Radix UI variables for height
          'max-h-(--radix-select-content-available-height)',
          className,
        )}
        position={position}
        align={align}
        {...props}
      >
        {showIcon && <SelectScrollUpButton />}
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper'
            && `w-full min-w-(--radix-select-trigger-width)`,
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        {showIcon && <SelectScrollDownButton />}
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectLabel({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Label> | null> }) {
  return (
    <SelectPrimitive.Label
      ref={ref}
      className={cn('px-2 py-1.5 text-xs text-muted-foreground', className)}
      {...props}
    />
  );
}

const selectItemVariants = cva(
  `
    relative flex w-full cursor-default items-center outline-hidden select-none
    data-disabled:pointer-events-none data-disabled:opacity-50
    [&_svg]:pointer-events-none [&_svg]:shrink-0
    [&_svg:not([class*='size-'])]:size-4
    [&_svg:not([class*='text-'])]:text-muted-foreground
  `,
  {
    variants: {
      variant: {
        default:
          `
            gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm
            focus:bg-accent focus:text-accent-foreground
          `,
        time: `
          my-1.25 justify-center
          focus:bg-gray-200 focus:text-black
        `,
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function SelectItem({ ref, className, children, variant, showIcon = true, showCheck = true, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
  & VariantProps<typeof selectItemVariants> & {
    showCheck?: boolean;
    showIcon?: boolean;
  } & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Item> | null> }) {
  const finalVariant = useSelectVariant(variant);

  return (
    <SelectPrimitive.Item
      ref={ref}
      className={cn(selectItemVariants({ variant: finalVariant, className }))}
      {...props}
    >
      {showCheck && (
        <span className={`
          absolute right-2 flex size-3.5 items-center justify-center
        `}
        >
          {showIcon && (
            <SelectPrimitive.ItemIndicator>
              <CheckIcon className="size-4" />
            </SelectPrimitive.ItemIndicator>
          )}
        </span>
      )}
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

function SelectSeparator({ ref, className, ...props }: React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator> & { ref?: React.RefObject<React.ComponentRef<typeof SelectPrimitive.Separator> | null> }) {
  return (
    <SelectPrimitive.Separator
      ref={ref}
      className={cn('pointer-events-none -mx-1 my-1 h-px bg-border', className)}
      {...props}
    />
  );
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
