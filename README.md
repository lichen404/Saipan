# Saipan Wedding Travel Website

A static Next.js website promoting Saipan destination weddings and travel experiences. Built with TypeScript, Tailwind CSS, and next-intl for multilingual support (Chinese, English, Japanese).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- pnpm package manager (install with `npm install -g pnpm`)

### Installation

```bash
# Install dependencies
pnpm install

# Run development server
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website. The default locale is Chinese (`/zh`).

### Available Routes
- `/zh` - Chinese homepage
- `/en` - English homepage
- `/ja` - Japanese homepage

## 📁 Project Structure

```
saipan-wedding-website/
├── app/
│   └── [locale]/           # Internationalized pages
│       ├── layout.tsx      # Root layout with i18n provider
│       ├── page.tsx        # Homepage
│       └── globals.css     # Global styles
├── components/             # Reusable React components
├── messages/               # Translation files
│   ├── zh.json            # Chinese translations
│   ├── en.json            # English translations
│   └── ja.json            # Japanese translations
├── public/
│   ├── images/            # Static images
│   │   ├── weddings/
│   │   ├── activities/
│   │   └── venues/
│   └── .nojekyll          # GitHub Pages configuration
├── i18n.ts                # Internationalization config
├── middleware.ts          # Locale detection middleware
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🛠️ Development

### Available Scripts

```bash
# Development
pnpm run dev              # Start development server

# Production
pnpm run build           # Build static site (outputs to /out folder)
pnpm run export          # Alias for pnpm run build

# Linting
pnpm run lint            # Run ESLint

# Type checking
npx tsc --noEmit        # Check TypeScript types
```

### Adding New Pages

1. Create a new page in `app/[locale]/` directory:
   ```tsx
   // app/[locale]/weddings/page.tsx
   export default function WeddingsPage() {
     return <div>Weddings page</div>;
   }
   ```

2. Add translations in `messages/*.json`:
   ```json
   // messages/zh.json
   {
     "weddings": {
       "title": "婚礼服务"
     }
   }
   ```

### Adding New Components

1. Create a component in `components/` directory:
   ```tsx
   // components/Hero/Hero.tsx
   export default function Hero() {
     return <div>Hero component</div>;
   }
   ```

2. Export from index file:
   ```tsx
   // components/Hero/index.ts
   export { default } from './Hero';
   ```

## 🎨 Styling

This project uses **Tailwind CSS** for all styling. Custom color palette:

- **Ocean**: `blue-500`, `blue-600`, `cyan-400` (primary branding)
- **Sand**: `amber-100`, `amber-200`, `stone-100` (backgrounds)
- **Sunset**: `orange-400`, `rose-400`, `pink-300` (accents)
- **Wedding**: `white`, `gray-50` (clean sections)

### Mobile-First Approach
Use responsive modifiers:
```tsx
<div className="text-sm md:text-base lg:text-lg">
  Responsive text
</div>
```

## 🌍 Internationalization (i18n)

This project uses `next-intl` for internationalization.

### Supported Locales
- `zh` - Chinese (default)
- `en` - English
- `ja` - Japanese

### Using Translations

```tsx
import { useTranslations } from 'next-intl';

export default function Component() {
  const t = useTranslations('home');
  return <h1>{t('hero.title')}</h1>;
}
```

### Server Components

```tsx
import { getTranslations } from 'next-intl/server';

export default async function ServerComponent() {
  const t = await getTranslations('home');
  return <h1>{t('hero.title')}</h1>;
}
```

## 🚀 Deployment to GitHub Pages

### Build Configuration

The project is pre-configured for GitHub Pages deployment:

- `output: 'export'` in `next.config.js` generates static files
- `images.unoptimized: true` for GitHub Pages compatibility
- `.nojekyll` file prevents Jekyll processing

### Deployment Steps

1. **Build the static site:**
   ```bash
   pnpm run build
   ```
   This generates static files in the `/out` directory.

2. **Deploy to GitHub Pages:**
   
   **Option A: Using GitHub Actions (Recommended)**
   
   Create `.github/workflows/deploy.yml`:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [main]

   jobs:
     deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         - uses: pnpm/action-setup@v2
           with:
             version: 8
         - uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'pnpm'
         - run: pnpm install --frozen-lockfile
         - run: pnpm run build
         - uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./out
   ```

   **Option B: Manual Deployment**
   ```bash
   # Build the site
   pnpm run build
   
   # Push the /out directory to gh-pages branch
   cd out
   git init
   git add -A
   git commit -m 'Deploy to GitHub Pages'
   git push -f git@github.com:username/repo.git main:gh-pages
   ```

3. **Configure GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "gh-pages" branch as the source
   - Save and wait for deployment

### Custom Domain (Optional)

If using a custom domain, add `CNAME` file:
```bash
echo "yourdomain.com" > public/CNAME
```

### Project Pages Configuration

If deploying to `username.github.io/repo-name`, uncomment these lines in `next.config.js`:
```js
basePath: '/repo-name',
assetPrefix: '/repo-name/',
```

## 📝 Content Guidelines

### Images
- Use WebP format when possible
- Keep file sizes under 500KB
- Use descriptive filenames: `saipan-beach-sunset.jpg`
- Organize by category: `weddings/`, `activities/`, `venues/`

### Translations
- Use nested keys: `home.hero.title`
- Keep translations consistent across all locales
- Add new keys to all three language files

### SEO
- Every page should export `generateMetadata()`
- Include descriptive alt text for images
- Use semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`

## 🔧 Troubleshooting

### Module not found errors
```bash
pnpm install
pnpm run dev
```

### Build fails
```bash
# Clear Next.js cache
rm -rf .next
pnpm run build
```

### i18n not working
Check that:
- Locale exists in `i18n.ts` locales array
- Translation keys exist in all `messages/*.json` files
- Middleware is properly configured

## 📄 License

This project is private and proprietary.

## 🤝 Support

For questions or support, please contact the development team.
