'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { defaultLocale } from '../i18n';

// Root page redirects to default locale
export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check browser language preference
    const browserLang = navigator.language;
    const supportedLocales = ['zh', 'zh-TW', 'en'];
    // Match zh-TW first, then zh, then en
    let locale = 'zh';
    if (browserLang.startsWith('zh-TW') || browserLang.startsWith('zh-Hant')) {
      locale = 'zh-TW';
    } else if (browserLang.startsWith('zh')) {
      locale = 'zh';
    } else if (supportedLocales.includes(browserLang.split('-')[0])) {
      locale = browserLang.split('-')[0];
    }
    
    router.replace(`/${locale}`);
  }, [router]);

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <p>Redirecting...</p>
    </div>
  );
}
