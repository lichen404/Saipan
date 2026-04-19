import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';

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
      images: ['/images/activities/atman-travel-1106306_1920.jpg'],
    },
  };
}

export default function TravelPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = useTranslations('travel');
  return (
    <main className="min-h-screen py-8 md:py-12 px-4 md:px-6 space-y-8 md:space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">{t('title')}</h1>
      <section className="max-w-3xl mx-auto w-full bg-white rounded-xl shadow-md p-4 md:p-6 flex flex-col items-center">
        <Image
          src="/images/activities/atman-travel-1106306_1920.jpg"
          alt={t('mainImageAlt')}
          width={800}
          height={533}
          className="w-full h-auto rounded-lg mb-4 md:mb-6"
        />
        <p className="text-base md:text-lg text-center leading-relaxed">{t('mainImageDesc')}</p>
      </section>
    </main>
  );
}
