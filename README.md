# Saipan Wedding Travel Website

A static multilingual Next.js website for promoting Saipan destination weddings, honeymoon travel, and island experiences.

The project is built with React, TypeScript, Tailwind CSS, and next-intl, and is designed for static export to GitHub Pages.

## ✨ Current Features

- multilingual homepage and content pages
- wedding service page
- travel package page
- photo gallery page
- contact page with QR code section
- responsive top navigation for desktop and mobile
- GitHub Pages compatible static export
- image size optimization for faster loading

## 🌍 Supported Locales

- `zh` — 简体中文
- `zh-TW` — 繁體中文
- `en` — English

Default locale: `zh`

## 📁 Current Project Structure

```text
Saipan/
├── app/
│   ├── page.tsx
│   ├── layout.tsx
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       ├── weddings/page.tsx
│       ├── travel/page.tsx
│       ├── gallery/page.tsx
│       └── contact/page.tsx
├── components/
│   ├── TopNavigation/
│   └── LanguageSwitcher/
├── i18n/
│   └── request.ts
├── lib/
│   └── getAssetPath.ts
├── messages/
│   ├── zh.json
│   ├── zh-TW.json
│   └── en.json
├── public/
│   └── images/
│       ├── activities/
│       ├── venues/
│       ├── weddings/
│       ├── pexels/
│       └── qrcode/
├── next.config.js
├── tailwind.config.ts
└── .github/workflows/deploy.yml
```

## 🚀 Development

### Prerequisites

- Node.js 18+
- pnpm

### Install and run

```bash
pnpm install
pnpm run dev
```

Open the site at:

- [http://localhost:3000/zh](http://localhost:3000/zh)
- [http://localhost:3000/zh-TW](http://localhost:3000/zh-TW)
- [http://localhost:3000/en](http://localhost:3000/en)

### Useful commands

```bash
pnpm run dev        # start development server
pnpm run build      # build static export
pnpm run export     # alias of build
npx tsc --noEmit    # type check
```

## 🧱 Tech Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- next-intl
- GitHub Pages static deployment

## 🌐 i18n Notes

This project uses the route segment pattern with [app/[locale]](app/[locale]) instead of middleware.

Key files:
- [i18n.ts](i18n.ts) — locale definitions
- [i18n/request.ts](i18n/request.ts) — next-intl request config
- [app/[locale]/layout.tsx](app/[locale]/layout.tsx) — locale layout and provider setup

When adding new content:
1. add translation keys to all locale files
2. keep the same nesting structure across languages
3. call `setRequestLocale(locale)` in locale pages using server-side i18n

## 🎨 Design and Content Guidelines

- use Tailwind CSS only
- prefer semantic colors such as `ocean`, `sand`, and `sunset`
- keep layouts mobile-first
- use descriptive alt text for all images
- prefer optimized WebP images when practical

## 🖼️ Image Handling

The site uses local static assets from [public/images](public/images).

Recent optimizations:
- large JPG files were recompressed
- several main visuals were switched to WebP
- shared asset paths now work correctly on GitHub Pages subpaths

If you add new images:
- keep file size as low as possible
- prefer `.webp` for decorative content
- group files by topic under the existing image folders

## 🚀 Deployment

This project is configured for GitHub Pages via [deploy.yml](.github/workflows/deploy.yml).

Important deployment behavior:
- static export is enabled via `output: 'export'`
- image optimization is disabled in Next.js for Pages compatibility
- the repository subpath is automatically handled in [next.config.js](next.config.js)

### Production build

```bash
pnpm run build
```

The generated static site will be output to [out](out).

## 🔧 Troubleshooting

### If development shows a strange module or vendor chunk error

On Windows, clear the cache and restart:

```bash
rm -rf .next
pnpm run dev
```

### If deployed images do not load

Check:
- GitHub Pages is serving the latest build
- the repository name matches the deployed subpath
- image references are using the shared asset path helper in [lib/getAssetPath.ts](lib/getAssetPath.ts)

## 📌 Current Status

Implemented:
- homepage redesign
- wedding, travel, gallery, contact pages
- mobile navigation improvements
- multilingual content
- image path fixes for GitHub Pages
- basic performance optimization

Still recommended:
- add ESLint to remove build warning
- set `metadataBase` for cleaner SEO metadata
- replace all remaining placeholder content with final business assets

## 📄 License

Private project. Internal use only.
