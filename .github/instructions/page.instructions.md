---
description: "Use when creating Next.js pages, routes, layouts. Guidelines for page structure, metadata, SEO, and internationalization with next-intl."
applyTo: "app/**/page.tsx"
---

# Next.js Page Guidelines

## Page Structure

Every page in `app/[locale]/` should follow this structure:

```tsx
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';

// Metadata for SEO
export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'weddings' });
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/images/og-weddings.jpg'],
    },
  };
}

interface PageProps {
  params: { locale: string };
}

export default function WeddingsPage({ params: { locale } }: PageProps) {
  const t = useTranslations('weddings');
  
  return (
    <main className="min-h-screen">
      <h1 className="text-4xl font-bold">{t('title')}</h1>
      {/* Page content */}
    </main>
  );
}
```

## Required Elements

### 1. Metadata Export
- Always export `generateMetadata()` async function
- Include `title`, `description`, and `openGraph`
- Use translations for multilingual metadata
- Add relevant `keywords` for SEO

### 2. Type Safety
- Define `PageProps` interface with `params: { locale: string }`
- Add other route params if using dynamic routes
- Type the component with `PageProps`

### 3. Translations
- Import `useTranslations` hook for client-side
- Import `getTranslations` for server-side (metadata)
- Namespace translations by page: `'home'`, `'weddings'`, `'travel'`
- Access nested keys: `t('hero.title')`

### 4. Layout
- Use semantic HTML: `<main>`, `<section>`, `<article>`
- Add `min-h-screen` to main container for full-height pages
- Consistent spacing between sections: `space-y-16` or `space-y-20`

## SEO Best Practices

### Metadata Fields
```tsx
export async function generateMetadata({ params: { locale } }: PageProps): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'page' });
  
  return {
    title: t('meta.title'), // 50-60 characters
    description: t('meta.description'), // 150-160 characters
    keywords: ['Saipan wedding', 'destination wedding', '塞班岛婚礼', 'サイパン ウェディング'],
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      images: [{
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: t('meta.imageAlt'),
      }],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('meta.title'),
      description: t('meta.description'),
      images: ['/images/og-image.jpg'],
    },
  };
}
```

### Content Optimization
- H1 tag once per page (main title)
- H2 for section headings
- Descriptive alt text for images
- Internal links to other pages
- Structured data when applicable (future enhancement)

## Translation Structure

Create corresponding keys in `messages/{locale}.json`:

```json
{
  "weddings": {
    "meta": {
      "title": "Saipan Destination Weddings | 塞班岛婚礼",
      "description": "Experience your dream wedding in paradise...",
      "imageAlt": "Beautiful Saipan beach wedding venue"
    },
    "title": "Weddings in Paradise",
    "hero": {
      "title": "Say 'I Do' in Saipan",
      "subtitle": "Create unforgettable memories"
    }
  }
}
```

## Static Generation

### Generate Static Params
For locale-based routing, add to layout or page:

```tsx
export function generateStaticParams() {
  return [
    { locale: 'zh' },
    { locale: 'en' },
    { locale: 'ja' },
  ];
}
```

### Loading States
Create `loading.tsx` for better UX:

```tsx
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" />
    </div>
  );
}
```

## Page Types

### Homepage (`app/[locale]/page.tsx`)
- Hero section with CTA
- Highlight key features (3-4 sections)
- Testimonials
- Final CTA

### Content Pages (`/weddings`, `/travel`)
- Hero with page title
- Main content sections
- Image gallery or cards
- Related links or CTA

### Contact Page
- Form component
- Contact information
- Map (optional)

## Common Patterns

### Section Layout
```tsx
<section className="py-16 md:py-24">
  <div className="container mx-auto px-4">
    <h2 className="mb-8 text-center text-3xl font-bold md:text-4xl">
      {t('section.title')}
    </h2>
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Content */}
    </div>
  </div>
</section>
```

### Responsive Container
```tsx
<div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
  {/* keeps content centered with consistent padding */}
</div>
```

## Don'ts
- Don't skip metadata - it's critical for SEO
- Don't hardcode text - use translations
- Don't forget to type `PageProps`
- Don't use server features (API routes) - this is a static site
- Don't create pages outside `app/[locale]/` structure
