"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const t = useTranslations();

  // Handle keyboard shortcut (Cmd/Ctrl + K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }

      if (e.key === 'Escape') {
        setIsOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Search sections based on query
  const sections = [
    { id: 'timeline', label: t('navigation.about') || 'About' },
    { id: 'projects', label: t('navigation.projects') || 'Projects' },
    { id: 'skills', label: t('navigation.skills') || 'Skills' },
    { id: 'process', label: t('navigation.process') || 'Process' },
    { id: 'contact', label: t('navigation.contact') || 'Contact' }
  ];

  const filteredSections = sections.filter(section =>
    section.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 border border-foreground/10 hover:border-foreground/20"
        aria-label="Search"
      >
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
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <span className="text-sm text-foreground/60 hidden md:inline">
          Search
        </span>
        <kbd className="hidden md:inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold text-foreground/60 bg-foreground/5 border border-foreground/10 rounded">
          <span className="text-xs">⌘</span>K
        </kbd>
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[90]"
        onClick={() => {
          setIsOpen(false);
          setSearchQuery('');
        }}
      />

      {/* Search Modal */}
      <div className="fixed top-20 left-1/2 -translate-x-1/2 w-full max-w-2xl z-[100] px-4">
        <div className="apple-glass rounded-3xl p-6 shadow-2xl">
          {/* Search Input */}
          <div className="relative">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/40"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sections..."
              className="w-full pl-12 pr-20 py-4 bg-foreground/5 border border-foreground/10 rounded-2xl focus:border-primary-blue focus:outline-none transition-colors text-lg"
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold text-foreground/60 bg-foreground/5 border border-foreground/10 rounded-lg">
              ESC
            </kbd>
          </div>

          {/* Results */}
          {searchQuery && (
            <div className="mt-4 space-y-1 max-h-96 overflow-y-auto">
              {filteredSections.length > 0 ? (
                filteredSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors flex items-center gap-3"
                  >
                    <svg
                      className="w-5 h-5 text-primary-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))
              ) : (
                <div className="px-4 py-8 text-center text-foreground/60">
                  No results found
                </div>
              )}
            </div>
          )}

          {/* Quick Links (when no search query) */}
          {!searchQuery && (
            <div className="mt-4">
              <p className="text-sm text-foreground/60 mb-2 px-2">
                Quick Links
              </p>
              <div className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => handleSectionClick(section.id)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors flex items-center gap-3"
                  >
                    <svg
                      className="w-5 h-5 text-primary-blue"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                    <span className="font-medium">{section.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
