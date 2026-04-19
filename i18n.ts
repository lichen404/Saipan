// Supported locales
export const locales = ['zh', 'zh-TW', 'en'] as const;
export const defaultLocale = 'zh' as const;

export type Locale = (typeof locales)[number];
