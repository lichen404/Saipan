import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({
  params: { locale },
}: HomePageProps): Promise<Metadata> {
  // Import messages directly to avoid headers() usage (required for static export)
  const messages = (await import(`../../messages/${locale}.json`)).default;
  const t = (key: string) => messages?.metadata?.[key] ?? key;

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  };
}

export default function HomePage({ params: { locale } }: HomePageProps): JSX.Element {
  // Required for static rendering
  setRequestLocale(locale);

  const t = useTranslations();

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-ocean-600">
              Saipan Wedding
            </h1>
            <ul className="flex gap-6">
              <li>
                <Link href={`/${locale}`} className="text-gray-700 hover:text-ocean-600">
                  {t('nav.home')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/weddings`} className="text-gray-700 hover:text-ocean-600">
                  {t('nav.weddings')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/travel`} className="text-gray-700 hover:text-ocean-600">
                  {t('nav.travel')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/gallery`} className="text-gray-700 hover:text-ocean-600">
                  {t('nav.gallery')}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/contact`} className="text-gray-700 hover:text-ocean-600">
                  {t('nav.contact')}
                </Link>
              </li>
            </ul>
            <div className="flex gap-2">
              <Link href="/zh" className="px-3 py-1 rounded hover:bg-gray-100">
                简体
              </Link>
              <Link href="/zh-TW" className="px-3 py-1 rounded hover:bg-gray-100">
                繁體
              </Link>
              <Link href="/en" className="px-3 py-1 rounded hover:bg-gray-100">
                EN
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gradient-to-r from-ocean-500 to-cyan-400 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">
            {t('home.hero.title')}
          </h2>
          <p className="text-xl md:text-2xl mb-8">
            {t('home.hero.subtitle')}
          </p>
          <Link
            href={`/${locale}/weddings`}
            className="bg-white text-ocean-600 px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
            {t('home.highlights.title')}
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Venues */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-ocean-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-ocean-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                {t('home.highlights.venues.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.highlights.venues.description')}
              </p>
            </div>

            {/* Photography */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-sunset-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-sunset-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                {t('home.highlights.photography.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.highlights.photography.description')}
              </p>
            </div>

            {/* Packages */}
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-4 mx-auto">
                <svg className="w-8 h-8 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold mb-3 text-center">
                {t('home.highlights.packages.title')}
              </h3>
              <p className="text-gray-600 text-center">
                {t('home.highlights.packages.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-2">{t('footer.slogan')}</p>
          <p className="text-sm text-gray-400">{t('footer.copyright')}</p>
        </div>
      </footer>
    </main>
  );
}
