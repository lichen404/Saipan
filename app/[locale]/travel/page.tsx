import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TopNavigation from '@/components/TopNavigation';
import { getAssetPath } from '@/lib/getAssetPath';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = (key: string) => messages?.travel?.meta?.[key] ?? key;
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [getAssetPath('/images/activities/pexels-luis-contf-2970945-5868550.jpg')],
    },
  };
}

export default function TravelPage({ params: { locale } }: PageProps): JSX.Element {
  setRequestLocale(locale);
  const t = useTranslations('travel');

  const items = [
    {
      title: t('items.blue.title'),
      description: t('items.blue.description'),
    },
    {
      title: t('items.island.title'),
      description: t('items.island.description'),
    },
    {
      title: t('items.sunset.title'),
      description: t('items.sunset.description'),
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      <TopNavigation locale={locale} />

      <section className="bg-gradient-to-b from-sand-50 to-white py-10 md:py-14">
        <div className="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-[28px] shadow-xl ring-1 ring-sand-100">
            <Image
              src={getAssetPath('/images/activities/pexels-luis-contf-2970945-5868550.jpg')}
              alt={t('mainImageAlt')}
              width={1200}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean-600">
              {t('eyebrow')}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">{t('title')}</h1>
            <p className="text-lg font-medium text-ocean-700 md:text-xl">{t('subtitle')}</p>
            <p className="max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              {t('mainImageDesc')}
            </p>
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {items.map((item) => (
              <article key={item.title} className="rounded-3xl bg-sand-50 p-5 shadow-sm ring-1 ring-sand-100 md:p-6">
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[28px] bg-gray-900 px-6 py-8 text-white md:px-8">
            <h2 className="text-2xl font-bold md:text-3xl">{t('note.title')}</h2>
            <p className="mt-3 max-w-3xl leading-8 text-white/80">{t('note.description')}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-sand-50"
              >
                {t('cta.primary')}
              </Link>
              <Link
                href={`/${locale}/gallery`}
                className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
