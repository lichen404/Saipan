# Components Directory

This directory contains reusable React components for the Saipan Wedding website.

## Naming Conventions

- Use PascalCase for component names: `Hero.tsx`, `PackageCard.tsx`
- Co-locate components with their index files:
  ```
  components/
    Hero/
      Hero.tsx
      index.ts
  ```

## Planned Components

- **Hero** - Full-screen hero section with background image
- **Navigation** - Main navigation bar with language switcher
- **PackageCard** - Display wedding/travel package information
- **Gallery** - Photo gallery with lightbox
- **Testimonial** - Client testimonial cards
- **ContactForm** - Inquiry form with validation
- **Footer** - Site footer with links and copyright

## Usage Example

```tsx
import Hero from '@/components/Hero';

export default function Page() {
  return <Hero title="Welcome" subtitle="Your dream wedding" />;
}
```
