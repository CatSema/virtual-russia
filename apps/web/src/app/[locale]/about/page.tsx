import { AppShell } from '../../../widgets/app-shell';
import { getTranslations, setRequestLocale } from 'next-intl/server';
export default async function About({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Pages');
  return (
    <AppShell locale={locale}>
      <div className="mx-auto max-w-[88rem] px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold">{t('aboutTitle')}</h1>
      </div>
    </AppShell>
  );
}
