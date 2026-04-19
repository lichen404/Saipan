import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TopNavigation from '@/components/TopNavigation';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = (key: string) => messages?.weddings?.meta?.[key] ?? key;
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: ['/images/pexels/weddings/beach-wedding-arch.jpg'],
    },
  };
}

export default function WeddingsPage({ params: { locale } }: PageProps): JSX.Element {
  setRequestLocale(locale);
  const t = useTranslations('weddings');

  const highlights = [
    {
      title: t('highlights.chapel.title'),
      description: t('highlights.chapel.description'),
    },
    {
      title: t('highlights.photo.title'),
      description: t('highlights.photo.description'),
    },
    {
      title: t('highlights.hosting.title'),
      description: t('highlights.hosting.description'),
    },
  ];

  return (
    <main className="min-h-screen bg-sand-50">
      <TopNavigation locale={locale} />

      <section className="py-10 md:py-14">
        <div className="container mx-auto grid items-center gap-8 px-4 lg:grid-cols-2">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean-600">
              {t('eyebrow')}
            </p>
            <h1 className="text-3xl font-bold text-gray-900 md:text-5xl">{t('title')}</h1>
            <p className="text-lg font-medium text-ocean-700 md:text-xl">{t('subtitle')}</p>
            <p className="max-w-2xl text-base leading-8 text-gray-600 md:text-lg">
              {t('mainImageDesc')}
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/contact`}
                className="inline-flex items-center rounded-full bg-ocean-600 px-5 py-3 text-sm font-semibold text-white hover:bg-ocean-700"
              >
                {t('cta.primary')}
              </Link>
              <Link
                href={`/${locale}/gallery`}
                className="inline-flex items-center rounded-full border border-ocean-200 px-5 py-3 text-sm font-semibold text-ocean-700 hover:bg-white"
              >
                {t('cta.secondary')}
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-[28px] bg-white shadow-xl ring-1 ring-sand-100">
            <Image
              src="/images/pexels/weddings/beach-wedding-arch.jpg"
              alt={t('mainImageAlt')}
              width={1200}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map((item) => (
              <article key={item.title} className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-sand-100 md:p-6">
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="mt-3 leading-7 text-gray-600">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 grid items-center gap-6 rounded-[28px] bg-white p-5 shadow-sm ring-1 ring-sand-100 md:p-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">{t('note.title')}</h2>
              <p className="mt-3 leading-8 text-gray-600">{t('note.description')}</p>
            </div>
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="/images/pexels/weddings/beach-bride.jpg"
                alt={t('highlights.photo.title')}
                width={900}
                height={700}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
