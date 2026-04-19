import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import TopNavigation from '@/components/TopNavigation';
import { getAssetPath } from '@/lib/getAssetPath';

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
  const quickFacts = [
    {
      value: t('home.hero.facts.visa.value'),
      label: t('home.hero.facts.visa.label'),
    },
    {
      value: t('home.hero.facts.chapel.value'),
      label: t('home.hero.facts.chapel.label'),
    },
    {
      value: t('home.hero.facts.honeymoon.value'),
      label: t('home.hero.facts.honeymoon.label'),
    },
  ];
  const featuredCards = [
    {
      href: `/${locale}/weddings`,
      imageSrc: getAssetPath('/images/weddings/ioa8320-bride-and-groom-483223_1920.jpg'),
      imageAlt: t('weddings.mainImageAlt'),
      title: t('weddings.title'),
      description: t('weddings.mainImageDesc'),
    },
    {
      href: `/${locale}/travel`,
      imageSrc: getAssetPath('/images/activities/atman-travel-1106306_1920.jpg'),
      imageAlt: t('travel.mainImageAlt'),
      title: t('travel.title'),
      description: t('travel.mainImageDesc'),
    },
    {
      href: `/${locale}/gallery`,
      imageSrc: getAssetPath('/images/venues/baegjins-saipan-2379093_1920.jpg'),
      imageAlt: t('gallery.venue1Alt'),
      title: t('gallery.title'),
      description: t('gallery.venue1Desc'),
    },
  ];
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
    <main className="min-h-screen bg-white">
      <TopNavigation locale={locale} />

      <section className="relative overflow-hidden bg-gradient-to-br from-ocean-700 via-ocean-600 to-cyan-500">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.18),transparent_38%)]" />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-10 md:py-14 lg:grid-cols-2 lg:py-16">
          <div className="space-y-6 text-white">
            <span className="inline-flex rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur">
              {t('home.hero.kicker')}
            </span>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
                {t('home.hero.title')}
              </h1>
              <p className="max-w-xl text-base leading-7 text-white/90 md:text-xl">
                {t('home.hero.subtitle')}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={`/${locale}/weddings`}
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-ocean-700 transition hover:bg-sand-50 md:text-base"
              >
                {t('home.hero.cta')}
              </Link>
              <Link
                href={`/${locale}/gallery`}
                className="inline-flex items-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10 md:text-base"
              >
                {t('home.hero.secondaryCta')}
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div key={fact.value} className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
                  <p className="text-base font-semibold md:text-lg">{fact.value}</p>
                  <p className="mt-1 text-sm text-white/80">{fact.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="col-span-2 overflow-hidden rounded-[28px] border border-white/15 shadow-2xl">
              <Image
                src={getAssetPath('/images/pexels/weddings/beach-wedding-sunset.webp')}
                alt={t('gallery.items.sunsetVows.alt')}
                width={1200}
                height={800}
                className="h-[240px] w-full object-cover md:h-[320px]"
              />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-white/15 shadow-xl">
              <Image
                src={getAssetPath('/images/pexels/weddings/beach-bride.webp')}
                alt={t('gallery.items.bridePortrait.alt')}
                width={800}
                height={533}
                className="h-[150px] w-full object-cover md:h-[200px]"
              />
            </div>
            <div className="overflow-hidden rounded-[24px] border border-white/15 shadow-xl">
              <Image
                src={getAssetPath('/images/pexels/scenery/tropical-sailboat-couple.webp')}
                alt={t('gallery.items.sailboatRomance.alt')}
                width={800}
                height={533}
                className="h-[150px] w-full object-cover md:h-[200px]"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand-50 py-14 md:py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean-600">
              {t('home.featured.eyebrow')}
            </p>
            <h2 className="mt-3 text-3xl font-bold text-gray-900 md:text-4xl">
              {t('home.featured.title')}
            </h2>
            <p className="mt-4 text-gray-600 md:text-lg">
              {t('home.featured.subtitle')}
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {featuredCards.map((card) => (
              <article key={card.href} className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-sand-100 transition hover:-translate-y-1 hover:shadow-lg">
                <Image
                  src={card.imageSrc}
                  alt={card.imageAlt}
                  width={800}
                  height={533}
                  className="h-52 w-full object-cover"
                />
                <div className="space-y-3 p-5 md:p-6">
                  <h3 className="text-xl font-semibold text-gray-900">{card.title}</h3>
                  <p className="text-sm leading-7 text-gray-600 md:text-base">{card.description}</p>
                  <Link href={card.href} className="inline-flex items-center font-semibold text-ocean-600 hover:text-ocean-700">
                    {t('home.featured.link')} →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl space-y-8">
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

            <div className="grid gap-5 lg:grid-cols-3">
              {storyItems.map((item) => (
                <article key={item.title} className="rounded-2xl border border-sand-100 bg-sand-50 p-5 md:p-6">
                  <div className="space-y-3">
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

            <div className="rounded-3xl bg-ocean-600 text-white p-6 md:p-8 text-center shadow-lg">
              <p className="text-base md:text-lg leading-8 whitespace-pre-line">
                {t('home.story.closing')}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl rounded-[28px] bg-gray-900 px-6 py-8 text-white md:px-10 md:py-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-2xl">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {t('home.cta.title')}
                </h2>
                <p className="mt-3 text-white/80 leading-7">
                  {t('home.cta.description')}
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-gray-900 hover:bg-sand-50"
                >
                  {t('home.cta.primary')}
                </Link>
                <Link
                  href={`/${locale}/travel`}
                  className="inline-flex items-center rounded-full border border-white/30 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {t('home.cta.secondary')}
                </Link>
              </div>
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
