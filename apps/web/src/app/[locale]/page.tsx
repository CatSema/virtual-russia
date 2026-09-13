import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { AppShell } from '../../widgets/app-shell';
import { PlatformStatus } from '../../features/platform-status/platform-status';
export default async function HomePage({
  params,
}: Readonly<{ params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <AppShell locale={locale}>
      <section className="mx-auto grid max-w-[88rem] gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.25fr_0.75fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.16em] text-primary">
            Virtual Russia
          </p>
          <HeroCopy />
        </div>
        <PlatformStatus />
      </section>
    </AppShell>
  );
}
function HeroCopy() {
  const t = useTranslations('Home');
  return (
    <>
      <h1 className="max-w-3xl text-balance text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-muted-foreground sm:text-xl">
        {t('description')}
      </p>
    </>
  );
}
