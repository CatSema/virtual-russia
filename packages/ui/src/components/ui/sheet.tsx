'use client';
import { Dialog } from '@base-ui/react/dialog';
import type { ComponentProps } from 'react';
import { cn } from '../../lib/utils';
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export function SheetContent({
  className,
  children,
  ...props
}: ComponentProps<typeof Dialog.Popup>) {
  return (
    <Dialog.Portal>
      <Dialog.Backdrop className="fixed inset-0 bg-black/45" />
      <Dialog.Viewport className="fixed inset-0 flex justify-end">
        <Dialog.Popup
          className={cn(
            'flex h-full w-[min(22rem,calc(100vw-1rem))] flex-col overflow-y-auto bg-card p-6 shadow-2xl outline-none',
            className,
          )}
          {...props}
        >
          {children}
        </Dialog.Popup>
      </Dialog.Viewport>
    </Dialog.Portal>
  );
}
export const SheetTitle = Dialog.Title;
export const SheetClose = Dialog.Close;
