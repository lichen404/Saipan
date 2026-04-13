# Images Directory

Store all static images for the Saipan Wedding website here.

## Directory Structure

- **weddings/** - Wedding ceremony and couple photos
- **activities/** - Saipan activities (diving, snorkeling, tours)
- **venues/** - Wedding venue photos (beaches, chapels, gardens)

## Guidelines

- Use WebP format for better performance when possible
- Keep original files under 500KB
- Use descriptive filenames with hyphens: `saipan-beach-sunset.jpg`
- Optimize images before adding to the repository

## Recommended Image Sizes

- **Hero images**: 1920x1080px (16:9 ratio)
- **Gallery thumbnails**: 800x600px (4:3 ratio)
- **Package cards**: 600x400px (3:2 ratio)
- **Venue photos**: 1200x800px (3:2 ratio)

## Usage with Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/images/weddings/beach-ceremony.jpg"
  alt="Beach wedding ceremony in Saipan"
  width={1200}
  height={800}
  className="rounded-lg"
/>
```

Note: Images are set to `unoptimized: true` in next.config.js for GitHub Pages compatibility.
