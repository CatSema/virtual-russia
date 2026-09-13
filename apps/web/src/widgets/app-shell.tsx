'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@virtual-russia/ui/sheet';
export function AppShell({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: string }>) {
  const t = useTranslations();
  const links = [
    { href: `/${locale}`, label: t('Navigation.home') },
    { href: `/${locale}/tours`, label: t('Navigation.tours') },
    { href: `/${locale}/about`, label: t('Navigation.about') },
  ];
  return (
    <div className="flex min-h-dvh flex-col overflow-x-clip">
      <header className="border-b bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur">
        <div className="mx-auto flex min-h-16 max-w-[88rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="font-semibold tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href={`/${locale}`}
          >
            Virtual Russia
          </Link>
          <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
            {links.map((link) => (
              <Link
                className="rounded-md px-3 py-2 text-sm hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger
                aria-label={t('Common.menu')}
                className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Menu size={21} />
              </SheetTrigger>
              <SheetContent aria-describedby={undefined}>
                <div className="mb-8 flex items-center justify-between">
                  <SheetTitle className="font-semibold">Virtual Russia</SheetTitle>
                  <SheetClose
                    aria-label={t('Common.close')}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-md hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <X size={21} />
                  </SheetClose>
                </div>
                <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                  {links.map((link) => (
                    <Link
                      href={link.href}
                      className="rounded-md px-3 py-3 text-base hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      key={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto max-w-[88rem] px-4 py-6 text-sm text-muted-foreground sm:px-6 lg:px-8">
          {t('Home.footer')}
        </div>
      </footer>
    </div>
  );
}
