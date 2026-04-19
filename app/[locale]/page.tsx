import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';

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
  const storyItems = [
    {
      title: t('home.story.reason1.title'),
      description: t('home.story.reason1.description'),
    },
    {
      title: t('home.story.reason2.title'),
      description: t('home.story.reason2.description'),
    },
    {
      title: t('home.story.reason3.title'),
      description: t('home.story.reason3.description'),
    },
  ];

  return (
    <main className="min-h-screen">
      <TopNavigation locale={locale} />

      {/* Hero Section */}
      <section className="relative h-[62vh] md:h-[70vh] bg-gradient-to-r from-ocean-500 to-cyan-400 flex items-center justify-center">
        <div className="text-center text-white px-4">
          <h2 className="text-3xl md:text-6xl font-bold mb-4">
            {t('home.hero.title')}
          </h2>
          <p className="text-base md:text-2xl mb-6 md:mb-8">
            {t('home.hero.subtitle')}
          </p>
          <Link
            href={`/${locale}/weddings`}
            className="bg-white text-ocean-600 px-6 md:px-8 py-2.5 md:py-3 rounded-full text-base md:text-lg font-semibold hover:bg-gray-100 inline-block"
          >
            {t('home.hero.cta')}
          </Link>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                {t('home.story.title')}
              </h2>
              <p className="text-lg md:text-xl text-ocean-600 font-medium">
                {t('home.story.subtitle')}
              </p>
              <p className="text-gray-600 leading-8 whitespace-pre-line max-w-4xl mx-auto">
                {t('home.story.intro')}
              </p>
            </div>

            <div className="space-y-5">
              {storyItems.map((item) => (
                <article key={item.title} className="bg-white rounded-2xl shadow-sm p-5 md:p-7 border border-sand-100">
                  <div className="space-y-2">
                    <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 leading-8 whitespace-pre-line">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <div className="rounded-2xl bg-ocean-600 text-white p-6 md:p-8 text-center">
              <p className="text-base md:text-lg leading-8 whitespace-pre-line">
                {t('home.story.closing')}
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
