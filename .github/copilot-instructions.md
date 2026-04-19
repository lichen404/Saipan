# Saipan Wedding Travel Website

## Project Overview
Static Next.js website promoting Saipan destination weddings and travel experiences. Built with TypeScript, Tailwind CSS, and next-intl for Simplified Chinese / Traditional Chinese / English support. Deployed to GitHub Pages.

> **Implementation status**: Infrastructure (i18n, static export, Tailwind) is fully set up. Feature pages (`/weddings`, `/travel`, `/gallery`, `/contact`) and reusable components are still being built.

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
- Color palette uses custom semantic classes defined in `tailwind.config.ts`:
  - Ocean: `ocean-500`, `ocean-600`, `ocean-400` (primary branding)
  - Sand: `sand-50`, `sand-100`, `sand-200` (backgrounds)
  - Sunset: `sunset-300`, `sunset-400`, `sunset-500` (accents)
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
- **No middleware** — i18n uses the `app/[locale]/` route segment pattern
- Root `app/page.tsx` (client component) detects browser language and redirects to `/{locale}`
- `app/[locale]/layout.tsx` is **async** — imports messages at build time via dynamic `import()`. Do NOT use `headers()` or other runtime APIs; they break static export
- All routes prefixed with locale: `/zh/weddings`, `/zh-TW/weddings`, `/en/weddings`
- Locales: `['zh', 'zh-TW', 'en']` (defined in `i18n.ts`); default: `zh`
- Use `useTranslations()` hook in components

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
- `next.config.js` — Static export; **dynamic `basePath`** auto-set from `GITHUB_REPOSITORY` env var for GitHub Pages sub-path deployment
- `i18n.ts` — Locale list and message loader
- `app/[locale]/layout.tsx` — Async layout; sets i18n context with `setRequestLocale()` and `generateStaticParams()`
- `tailwind.config.ts` — Custom color scales: `ocean`, `sand`, `sunset`
- `.github/instructions/` — `component.instructions.md` and `page.instructions.md` with detailed patterns

在本项目的开发过程中，请始终通过 Context7 检索相关的最新文档和 API 用法，无需我额外声明。