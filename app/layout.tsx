import type { Metadata } from 'next';
import './globals.css';
import { getAssetPath } from '@/lib/getAssetPath';
import { getMetadataBase } from '@/lib/getMetadataBase';

const defaultSocialImage = getAssetPath('/images/social/og-default.webp');

export const metadata: Metadata = {
  title: 'Saipan Wedding Travel',
  description: 'Destination weddings and travel experiences in beautiful Saipan',
  metadataBase: getMetadataBase(),
  openGraph: {
    title: 'Saipan Wedding Travel',
    description: 'Destination weddings and travel experiences in beautiful Saipan',
    type: 'website',
    siteName: 'Saipan Wedding Travel',
    images: [
      {
        url: defaultSocialImage,
        width: 1200,
        height: 630,
        alt: 'Saipan destination wedding and travel experiences',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Saipan Wedding Travel',
    description: 'Destination weddings and travel experiences in beautiful Saipan',
    images: [defaultSocialImage],
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
