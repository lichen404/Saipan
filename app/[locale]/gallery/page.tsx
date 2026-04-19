import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import Image from 'next/image';
import type { Metadata } from 'next';
import { getAssetPath } from '@/lib/getAssetPath';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const messages = (await import(`../../../messages/${locale}.json`)).default;
  const t = (key: string) => messages?.gallery?.meta?.[key] ?? key;
  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      images: [getAssetPath('/images/venues/baegjins-saipan-2379093_1920.jpg')],
    },
  };
}

export default function GalleryPage({ params: { locale } }: PageProps) {
  setRequestLocale(locale);
  const t = useTranslations('gallery');
  const images = [
    {
      src: getAssetPath('/images/venues/baegjins-saipan-2379093_1920.jpg'),
      alt: t('items.blueGrotto.alt'),
      desc: t('items.blueGrotto.desc'),
    },
    {
      src: getAssetPath('/images/venues/ccpapa-cannon-175419_1920.jpg'),
      alt: t('items.cannonCoast.alt'),
      desc: t('items.cannonCoast.desc'),
    },
    {
      src: getAssetPath('/images/activities/horrors-saipan-2376481_1920.jpg'),
      alt: t('items.beachDay.alt'),
      desc: t('items.beachDay.desc'),
    },
    {
      src: getAssetPath('/images/pexels/weddings/beach-wedding-arch.webp'),
      alt: t('items.weddingArch.alt'),
      desc: t('items.weddingArch.desc'),
    },
    {
      src: getAssetPath('/images/pexels/weddings/tropical-wedding-setup.webp'),
      alt: t('items.tropicalSetup.alt'),
      desc: t('items.tropicalSetup.desc'),
    },
    {
      src: getAssetPath('/images/pexels/weddings/beach-wedding-sunset.webp'),
      alt: t('items.sunsetVows.alt'),
      desc: t('items.sunsetVows.desc'),
    },
    {
      src: getAssetPath('/images/pexels/weddings/beach-bride.webp'),
      alt: t('items.bridePortrait.alt'),
      desc: t('items.bridePortrait.desc'),
    },
    {
      src: getAssetPath('/images/pexels/scenery/tropical-sailboat-couple.webp'),
      alt: t('items.sailboatRomance.alt'),
      desc: t('items.sailboatRomance.desc'),
    },
    {
      src: getAssetPath('/images/pexels/scenery/tropical-beach-ceremony-view.webp'),
      alt: t('items.ceremonyView.alt'),
      desc: t('items.ceremonyView.desc'),
    },
  ];
  return (
    <main className="min-h-screen py-8 md:py-12 px-4 md:px-6 space-y-8 md:space-y-12">
      <h1 className="text-3xl md:text-4xl font-bold text-center">{t('title')}</h1>
      <section className="mx-auto w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
        {images.map((img, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow-md p-4 md:p-5 flex flex-col">
            <Image
              src={img.src}
              alt={img.alt}
              width={400}
              height={267}
              className="w-full h-auto aspect-[3/2] object-cover rounded-lg mb-4"
            />
            <p className="text-sm md:text-base text-gray-700 leading-relaxed">{img.desc}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
