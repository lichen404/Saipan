# Saipan Wedding Travel Website

## Project Overview
Static Next.js website promoting Saipan destination weddings and travel experiences. Built with TypeScript, Tailwind CSS, and next-intl for Chinese/English/Japanese support. Deployed to GitHub Pages.

## Code Style

### TypeScript
- Use strict mode, explicit return types for functions
- Prefer interfaces over types for object shapes
- Use functional components with TypeScript generics
- Single quotes for strings, semicolons required

### React/Next.js
- Use App Router structure: `app/[locale]/...`
- Server Components by default, add `'use client'` only when needed
- Prefer named exports for utilities, default exports for pages/components
- Use Next.js Image component for all images

### Styling
- **Tailwind CSS only** - no custom CSS files
- Color palette:
  - Ocean: `blue-500`, `blue-600`, `cyan-400` (primary branding)
  - Sand: `amber-100`, `amber-200`, `stone-100` (backgrounds)
  - Sunset: `orange-400`, `rose-400`, `pink-300` (accents)
  - Wedding: `white`, `gray-50` (clean sections)
- Mobile-first: base styles for mobile, use `md:` and `lg:` for desktop
- Consistent spacing: use `space-y-8`, `gap-6`, `p-8` patterns

## File Naming Conventions

### Components
- PascalCase: `Hero.tsx`, `PackageCard.tsx`, `ContactForm.tsx`
- Co-locate with index: `components/Hero/Hero.tsx` + `components/Hero/index.ts`

### Images
- Lowercase with hyphens: `saipan-beach-sunset.jpg`
- Organize by category: `public/images/weddings/`, `public/images/activities/`
- Use WebP format when possible, keep originals under 500KB

### Translation Files
- `messages/zh.json`, `messages/zh-TW.json`, `messages/en.json`
- Nested keys by page: `{ "home": { "hero": { "title": "..." } } }`

## Architecture

### Static Export
- All pages pre-rendered at build time
- No server-side features (API routes, server actions)
- Configure `next.config.js` with `output: 'export'` and `images.unoptimized: true`
- Add `.nojekyll` to `public/` for GitHub Pages

### i18n with next-intl
- Middleware handles locale detection
- All routes prefixed with locale: `/zh/weddings`, `/zh-TW/weddings`, `/en/weddings`
- Use `useTranslations()` hook in components
- Default locale: `zh` (Simplified Chinese)

### Content Structure
```
/           → Homepage (hero, highlights, CTA)
/weddings   → Venues, packages, testimonials
/travel     → Itineraries, activities, attractions
/gallery    → Photo gallery
/contact    → Inquiry form
```

## Build and Test

```bash
# Install dependencies
pnpm install

# Development server
pnpm run dev

# Build for production (generates static files in out/)
pnpm run build

# Type checking
npx tsc --noEmit

# Preview production build locally
npx serve out
```

## Conventions

### Metadata and SEO
- Every page exports `generateMetadata()` with title, description, openGraph
- Use descriptive alt text for all images
- Include keywords: "Saipan wedding", "destination wedding", "婚礼摄影", "塞班岛"

### Responsive Design
- Test breakpoints: 375px (mobile), 768px (tablet), 1280px (desktop)
- Hero images: full viewport height on mobile, 70vh on desktop
- Gallery grid: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)

### Performance
- Lazy load images below the fold
- Use Next.js `loading.tsx` for page transitions
- Keep bundle size minimal - analyze with `pnpm run build`

### Accessibility
- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`
- ARIA labels for icon buttons and language switcher
- Keyboard navigation support for all interactive elements
- Color contrast meets WCAG AA standards

## Key Reference Files
- `next.config.js` - Static export configuration
- `i18n.ts` - Locale configuration
- `middleware.ts` - Locale detection and routing
