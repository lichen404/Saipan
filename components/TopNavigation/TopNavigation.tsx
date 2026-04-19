'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

/**
 * Responsive top navigation inspired by modern mobile-first brand websites.
 */
interface TopNavigationProps {
  locale: string;
}

export default function TopNavigation({ locale }: TopNavigationProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isLangOpen, setIsLangOpen] = useState<boolean>(false);
  const t = useTranslations('nav');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    if (!isMenuOpen) {
      setIsLangOpen(false);
    }
  }, [isMenuOpen]);

  const navItems = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/weddings`, label: t('weddings') },
    { href: `/${locale}/travel`, label: t('travel') },
    { href: `/${locale}/gallery`, label: t('gallery') },
    { href: `/${locale}/contact`, label: t('contact') },
  ];

  const languages = [
    { code: 'zh', label: '简体' },
    { code: 'zh-TW', label: '繁體' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3 md:py-4">
        <div className="flex items-center justify-between gap-3">
          <Link href={`/${locale}`} className="text-lg md:text-2xl font-bold text-ocean-600 tracking-tight leading-none">
            Saipan Wedding
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm lg:text-base">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className="text-gray-700 hover:text-ocean-600 transition-colors">
                {item.label}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={`/${language.code}`}
                  className={`px-2.5 py-1 rounded hover:bg-sand-50 ${
                    locale === language.code ? 'text-ocean-600 font-semibold' : 'text-gray-700'
                  }`}
                >
                  {language.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:hidden flex items-center gap-1.5 relative">
            <button
              type="button"
              aria-label="搜索"
              className="relative w-9 h-9 rounded-full hover:bg-gray-50"
            >
              <svg className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0z" />
              </svg>
            </button>

            <button
              type="button"
              aria-label="语言"
              aria-expanded={isLangOpen}
              onClick={() => setIsLangOpen((prev) => !prev)}
              className="relative w-9 h-9 rounded-full hover:bg-gray-50"
            >
              <svg className="absolute left-1/2 top-1/2 w-5 h-5 -translate-x-1/2 -translate-y-1/2 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9-9-4.03-9-9 4.03-9 9-9Z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3.4 9h17.2M3.4 15h17.2M12 3c2.3 2.35 3.6 5.53 3.6 9s-1.3 6.65-3.6 9c-2.3-2.35-3.6-5.53-3.6-9s1.3-6.65 3.6-9Z" />
              </svg>
            </button>

            <div
              className={`absolute right-10 top-11 z-50 w-36 rounded-lg border border-gray-100 bg-white shadow-lg transition-all duration-200 ${
                isLangOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
            >
              {languages.map((language) => (
                <Link
                  key={language.code}
                  href={`/${language.code}`}
                  onClick={() => setIsLangOpen(false)}
                  className={`block px-3 py-2 text-sm ${
                    locale === language.code ? 'text-ocean-700 font-semibold bg-sand-50' : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {language.label}
                </Link>
              ))}
            </div>

            <button
              type="button"
              aria-label={isMenuOpen ? '关闭菜单' : '打开菜单'}
              aria-expanded={isMenuOpen}
              onClick={() => {
                setIsLangOpen(false);
                setIsMenuOpen((prev) => !prev);
              }}
              className="relative w-9 h-9 bg-white"
            >
              <span className="sr-only">Menu</span>
              <span
                className={`absolute left-1/2 top-[12px] h-[1.5px] w-5 -translate-x-1/2 bg-gray-800 transition-transform duration-300 ${
                  isMenuOpen ? 'translate-y-[6px] rotate-45' : ''
                }`}
              />
              <span
                className={`absolute left-1/2 top-[18px] h-[1.5px] w-5 -translate-x-1/2 bg-gray-800 transition-opacity duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-1/2 top-[24px] h-[1.5px] w-5 -translate-x-1/2 bg-gray-800 transition-transform duration-300 ${
                  isMenuOpen ? '-translate-y-[6px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden fixed inset-0 z-40 transition-colors duration-300 ${
          isMenuOpen ? 'bg-black/35 pointer-events-auto' : 'bg-transparent pointer-events-none'
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <div
          className={`ml-auto h-full w-full max-w-[92vw] bg-white shadow-2xl p-6 pt-16 transition-transform duration-300 ease-out ${
            isMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="mb-4 flex justify-end">
            <button
              type="button"
              onClick={() => setIsMenuOpen(false)}
              aria-label="关闭菜单"
              className="w-9 h-9 relative"
            >
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-gray-700" />
              <span className="absolute left-1/2 top-1/2 h-[1.5px] w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-gray-700" />
            </button>
          </div>

          <div className="flex flex-col border-t border-gray-100">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="py-4 border-b border-gray-100 text-xl font-medium tracking-tight text-gray-800 transition-transform duration-300"
                style={{
                  transitionDelay: isMenuOpen ? `${index * 45}ms` : '0ms',
                  transform: isMenuOpen ? 'translateX(0)' : 'translateX(12px)',
                  opacity: isMenuOpen ? 1 : 0,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
