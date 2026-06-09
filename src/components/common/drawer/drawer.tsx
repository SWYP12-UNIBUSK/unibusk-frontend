import { cva } from 'class-variance-authority';
import * as React from 'react';
import { Drawer as DrawerPrimitive } from 'vaul';

import { cn } from '@/utils/index';

function Drawer({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />;
}

function DrawerTrigger({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Trigger>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />;
}

function DrawerPortal({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Portal>) {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />;
}

function DrawerClose({
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Close>) {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />;
}

function DrawerOverlay({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={cn(
        `
          fixed inset-0 z-50 bg-black/50
          data-[state=closed]:animate-out data-[state=closed]:fade-out-0
          data-[state=open]:animate-in data-[state=open]:fade-in-0
        `,
        className,
      )}
      {...props}
    />
  );
}

interface DrawerContentProps extends React.ComponentProps<typeof DrawerPrimitive.Content> {
  showOverlay?: boolean;
  overlayClassName?: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}

const drawerContentVariants = cva(`
  group/drawer-content fixed z-50 flex h-auto flex-col bg-background
`, {
  variants: {
    direction: {
      top: 'inset-x-0 top-0 mb-24 max-h-[80vh] rounded-b-lg border-b',
      bottom: 'inset-x-0 bottom-0 mt-24 max-h-[80vh] rounded-t-lg border-t',
      right: `
        inset-y-0 right-0 w-3/4 border-l
        sm:max-w-sm
      `,
      left: `
        inset-y-0 left-0 w-3/4 border-r
        sm:max-w-sm
      `,
    },
  },
  defaultVariants: {
    direction: 'bottom',
  },
});

function DrawerContent({
  className,
  children,
  showOverlay = true,
  overlayClassName,
  direction = 'bottom',
  ...props
}: DrawerContentProps) {
  return (
    <DrawerPortal data-slot="drawer-portal">
      {showOverlay ? <DrawerOverlay className={overlayClassName} /> : null}
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        data-vaul-drawer-direction={direction}
        className={cn(drawerContentVariants({ direction }), className)}
        {...props}
      >
        <div
          data-slot="drawer-handle"
          className={`
            mx-auto mt-4 hidden h-2 w-[100px] shrink-0 cursor-pointer
            rounded-full bg-muted
            group-data-[vaul-drawer-direction=bottom]/drawer-content:block
          `}
        />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
}

function DrawerHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        `
          flex flex-col gap-0.5 p-4
          group-data-[vaul-drawer-direction=bottom]/drawer-content:text-center
          group-data-[vaul-drawer-direction=top]/drawer-content:text-center
          md:gap-1.5 md:text-left
        `,
        className,
      )}
      {...props}
    />
  );
}

function DrawerFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn('mt-auto flex flex-col gap-2 p-4', className)}
      {...props}
    />
  );
}

function DrawerTitle({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={cn('typo-body-sb-2 text-foreground', className)}
      {...props}
    />
  );
}

function DrawerDescription({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={cn('typo-caption-r-1 text-muted-foreground', className)}
      {...props}
    />
  );
}

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
};
