"use client";

import { useEffect, useState } from "react";
import { useTranslations } from 'next-intl';

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const t = useTranslations('loading');

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsVisible(false), 300);
          return 100;
        }
        return prev + 10;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-background transition-opacity duration-300 ${
        progress === 100 ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="text-center space-y-6">
        {/* Logo or initials */}
        <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-2xl animate-pulse" style={{ background: 'var(--gradient-hero)' }}>
          FR
        </div>

        {/* Loading text */}
        <div className="space-y-2">
          <p className="text-lg font-semibold">{t('title')}</p>
          <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{progress}%</p>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-1 rounded-full overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
          <div
            className="h-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%`, background: 'var(--gradient-hero)' }}
          />
        </div>
      </div>
    </div>
  );
}
