"use client";

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '@/i18n';

export default function LanguageToggle() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';

    // Remove the current locale from the pathname and add the new one
    const pathWithoutLocale = pathname.replace(`/${locale}`, '');
    const newPath = `/${newLocale}${pathWithoutLocale}`;

    router.push(newPath);
  };

  return (
    <button
      onClick={switchLocale}
      className="relative flex items-center gap-2 px-3 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 border border-foreground/10 hover:border-foreground/20"
      aria-label="Toggle language"
    >
      <div className="flex items-center gap-1 text-sm font-medium">
        {locales.map((loc, index) => (
          <React.Fragment key={loc}>
            <span
              className={`uppercase transition-all duration-300 ${
                locale === loc
                  ? 'text-foreground font-bold'
                  : 'text-foreground/40 hover:text-foreground/60'
              }`}
            >
              {loc}
            </span>
            {index < locales.length - 1 && (
              <span className="text-foreground/30 mx-1">/</span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Language icon */}
      <svg
        className="w-4 h-4 text-foreground/60"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
        />
      </svg>
    </button>
  );
}
