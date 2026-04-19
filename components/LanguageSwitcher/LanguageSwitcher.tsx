'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/**
 * Language switcher with a mobile dropdown that closes on outside click.
 */
interface LanguageSwitcherProps {
  currentLocale: string;
}

export default function LanguageSwitcher({ currentLocale }: LanguageSwitcherProps): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const wrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent): void => {
      if (!wrapperRef.current) {
        return;
      }

      if (!wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const languages = [
    { code: 'zh', label: '简体' },
    { code: 'zh-TW', label: '繁體' },
    { code: 'en', label: 'EN' },
  ];

  return (
    <div ref={wrapperRef} className="self-start md:self-auto text-sm relative">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-label="切换语言"
        onClick={() => setIsOpen((prev) => !prev)}
        className="md:hidden select-none rounded-xl border border-ocean-200 bg-gradient-to-b from-white to-sand-50 px-3.5 py-2 text-ocean-700 font-medium shadow-sm transition-all duration-200 hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean-400"
      >
        <span className="inline-flex items-center gap-2">
          <svg className="w-4 h-4 text-ocean-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.6 9h16.8M3.6 15h16.8M12 3a15 15 0 010 18M12 3a15 15 0 000 18" />
          </svg>
          <span>语言</span>
          <svg
            className={`w-4 h-4 text-ocean-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      <div
        className={`absolute left-0 z-20 mt-2 w-48 rounded-xl border border-sand-200 bg-white/95 p-2 shadow-lg backdrop-blur md:hidden origin-top transition-all duration-200 ease-out ${
          isOpen ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 -translate-y-1 scale-95 pointer-events-none'
        }`}
      >
        {languages.map((language, index) => (
          <div
            key={language.code}
            className={`transition-all duration-200 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
            }`}
            style={{ transitionDelay: `${isOpen ? index * 40 : 0}ms` }}
          >
            <Link
              href={`/${language.code}`}
              onClick={() => setIsOpen(false)}
              className={`block rounded-lg px-3 py-2 font-medium hover:bg-sand-50 hover:text-ocean-600 ${
                currentLocale === language.code ? 'text-ocean-600 bg-sand-50' : 'text-gray-700'
              }`}
            >
              {language.label}
            </Link>
          </div>
        ))}
      </div>

      <div className="hidden md:flex gap-2">
        {languages.map((language) => (
          <Link
            key={language.code}
            href={`/${language.code}`}
            className={`px-2.5 py-1 rounded hover:bg-gray-100 ${
              currentLocale === language.code ? 'text-ocean-600 font-semibold' : ''
            }`}
          >
            {language.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
