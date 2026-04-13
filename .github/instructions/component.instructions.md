---
description: "Use when creating React components, building UI elements, writing component files. Guidelines for TypeScript React components with proper typing, JSDoc, and best practices."
applyTo: "components/**/*.tsx"
---

# React Component Guidelines

## Structure

Every component file should follow this structure:

```tsx
'use client'; // Only if client-side features needed

import { useState } from 'react';
import Image from 'next/image';

/**
 * Brief description of what this component does
 * @param {Object} props - Component props
 * @param {string} props.title - The main title text
 * @param {string} [props.subtitle] - Optional subtitle text
 */
interface HeroProps {
  title: string;
  subtitle?: string;
  imageSrc: string;
}

export default function Hero({ title, subtitle, imageSrc }: HeroProps) {
  return (
    <section className="relative h-screen w-full">
      {/* Component content */}
    </section>
  );
}
```

## Required Practices

### TypeScript
- Define interface for all props (even if empty)
- Interface name matches component name + `Props`
- Use explicit typing, avoid `any`
- Mark optional props with `?`

### JSDoc
- Brief description on first line
- Document all props with `@param`
- Include examples for complex components: `@example`

### Exports
- Default export for the component
- Named exports for types/interfaces if used externally
- Co-locate related utilities in same file

### Styling
- Use Tailwind classes directly, no custom CSS
- Extract repeated patterns to variants or separate components
- Mobile-first responsive classes: base → `md:` → `lg:`
- Use project color palette (ocean blues, sandy beiges, sunset oranges)

### Images
- Always use `next/image` component
- Specify `width` and `height` for static images
- Use `fill` for responsive images with `object-cover`
- Add descriptive `alt` text

### Accessibility
- Semantic HTML elements (`<button>`, `<nav>`, not `<div>` with onClick)
- ARIA labels for icon-only buttons
- Keyboard navigation support
- Focus states on interactive elements

## Component Patterns

### Client vs Server Components
- Server Component (default): Static content, no interactivity
- Client Component (`'use client'`): State, events, browser APIs

### Composition
- Break large components into smaller, reusable pieces
- Pass children via `children` prop
- Use render props for flexible customization

### State Management
- `useState` for local component state
- Props for shared state from parent
- Keep state minimal and close to where it's used

## Example Components

### Simple Display Component (Server)
```tsx
interface PackageCardProps {
  title: string;
  price: number;
  features: string[];
}

export default function PackageCard({ title, price, features }: PackageCardProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-blue-600">{title}</h3>
      <p className="mt-2 text-3xl font-bold">${price}</p>
      <ul className="mt-4 space-y-2">
        {features.map((feature, i) => (
          <li key={i} className="text-gray-600">✓ {feature}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Interactive Component (Client)
```tsx
'use client';

import { useState } from 'react';

interface ContactFormProps {
  onSubmit: (data: FormData) => void;
}

export default function ContactForm({ onSubmit }: ContactFormProps) {
  const [email, setEmail] = useState('');

  return (
    <form onSubmit={(e) => { e.preventDefault(); onSubmit(new FormData(e.currentTarget)); }}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full rounded border px-4 py-2"
        required
      />
      <button type="submit" className="mt-4 rounded bg-blue-600 px-6 py-2 text-white">
        Submit
      </button>
    </form>
  );
}
```

## Don'ts
- Don't use `any` type
- Don't create custom CSS files
- Don't use `div` with onClick - use `button`
- Don't forget alt text on images
- Don't add `'use client'` unless necessary
