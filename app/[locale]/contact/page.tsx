import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import TopNavigation from '@/components/TopNavigation';
import { getAssetPath } from '@/lib/getAssetPath';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = (key: string) => messages?.contact?.meta?.[key] ?? key;
  const shareImage = getAssetPath('/images/social/og-default.webp');

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      images: [shareImage],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
      images: [shareImage],
    },
  };
}

export default function ContactPage({ params: { locale } }: PageProps): JSX.Element {
  setRequestLocale(locale);
  const t = useTranslations('contact');

  return (
    <main className="min-h-screen bg-sand-50">
      <TopNavigation locale={locale} />

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean-600">
              {t('eyebrow')}
            </p>
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900">
              {t('title')}
            </h1>
            <p className="text-base md:text-lg text-gray-600 leading-8 whitespace-pre-line">
              {t('description')}
            </p>
          </div>

          <div className="mx-auto mt-10 grid max-w-5xl gap-6 md:grid-cols-2">
            <article className="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-sand-100 text-center">
              <div className="mx-auto flex h-56 w-56 items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 text-sm leading-6">
                {t('wechat.placeholder')}
              </div>
              <h2 className="mt-5 text-xl font-semibold text-gray-900">{t('wechat.title')}</h2>
              <p className="mt-2 text-gray-600 leading-7">{t('wechat.description')}</p>
            </article>

            <article className="rounded-3xl bg-white p-6 md:p-8 shadow-sm ring-1 ring-sand-100 text-center">
              <div className="mx-auto h-56 w-56 overflow-hidden rounded-2xl border border-ocean-100 bg-white shadow-sm">
                <Image
                  src={getAssetPath('/images/qrcode/wenjuanwang-qrcode.jpg')}
                  alt={t('survey.title')}
                  width={224}
                  height={224}
                  className="h-full w-full object-cover"
                />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-gray-900">{t('survey.title')}</h2>
              <p className="mt-2 text-gray-600 leading-7 whitespace-pre-line">{t('survey.description')}</p>
            </article>
          </div>

          <div className="mx-auto mt-8 max-w-3xl rounded-3xl bg-ocean-600 px-6 py-6 text-center text-white shadow-lg">
            <p className="text-base md:text-lg leading-8 whitespace-pre-line">{t('notice')}</p>
          </div>
        </div>
      </section>
    </main>
  );
}
