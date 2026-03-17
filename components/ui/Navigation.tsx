"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import SearchBar from "./SearchBar";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const t = useTranslations('navigation');
  const locale = useLocale();
  const pathname = usePathname();
  const isHomePage = pathname === `/${locale}` || pathname === `/${locale}/`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const prefix = isHomePage ? '' : `/${locale}/`;
  const navLinks = [
    { label: t('about'), href: `${prefix}#timeline` },
    { label: t('projects'), href: `${prefix}#projects` },
    { label: t('caseStudies'), href: `/${locale}/projects` },
    { label: t('skills'), href: `${prefix}#skills` },
    { label: t('process'), href: `${prefix}#process` },
    { label: t('contact'), href: `${prefix}#contact` },
  ];

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Desktop single-letter shortcuts (only when not focused in an input)
    const desktopShortcuts: Record<string, string> = {
      a: 'timeline', // About / Timeline
      p: 'projects',
      s: 'skills',
      o: 'process', // 'o' from prOcess
      c: 'contact',
    };

    // Only on desktop sizes
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    // Ignore if modifiers present
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    // Ignore when focusing inputs or contentEditable
    const active = document.activeElement as HTMLElement | null;
    if (!active) return;
    const tag = active.tagName?.toLowerCase();
    const isInput = tag === 'input' || tag === 'textarea' || active.isContentEditable;
    if (isInput) return;

    const key = e.key.toLowerCase();
    const target = desktopShortcuts[key];
    if (target) {
      const el = document.getElementById(target);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      {/* Background overlay when mobile menu is open to improve contrast */}
      {isMobileMenuOpen && (
        <div
          aria-hidden="true"
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        />
      )}

      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[var(--color-bg)] border-b border-[var(--color-border)] py-3"
            : "bg-transparent py-4"
        }`}
      >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href={isHomePage ? "#" : `/${locale}`}
            className="text-xl font-heading font-bold text-foreground hover:text-[var(--color-accent)] transition-colors"
          >
            Fernando Rodriguez
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="hover:text-foreground font-medium transition-colors relative group"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-300" style={{ background: 'var(--accent-500)' }} />
              </a>
            ))}
            <SearchBar />
            <LanguageToggle />
            <ThemeToggle />
            <a
              href="#contact"
              className="px-6 py-2 text-[var(--color-on-accent)] font-semibold rounded-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: 'var(--color-accent)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-accent-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-accent)'}
            >
              {t('hireMe')}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-foreground transition-all ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-xl p-4 sm:p-6 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block hover:text-foreground font-medium transition-colors"
                style={{ color: 'var(--text-secondary)' }}
              >
                {link.label}
              </a>
            ))}
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-sm font-medium">Search</span>
              <SearchBar />
            </div>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-sm font-medium">Language</span>
              <LanguageToggle />
            </div>
            <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
              <span className="text-sm font-medium">Theme</span>
              <ThemeToggle />
            </div>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block text-center px-6 py-3 text-[var(--color-on-accent)] font-semibold rounded-lg transition-colors"
              style={{ background: 'var(--color-accent)' }}
            >
              {t('hireMe')}
            </a>
          </div>
        )}
      </div>
    </nav>
    </>
  );
}
