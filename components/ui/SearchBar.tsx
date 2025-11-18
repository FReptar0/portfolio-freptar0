"use client";

import { useState, useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

export default function SearchBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([]);
  const t = useTranslations();
  const tSearch = useTranslations('search');

  // Shortcuts mapping (single-letter) for desktop navigation and shown in the UI
  const sectionShortcuts: Record<string, string> = {
    timeline: 'A',
    projects: 'P',
    skills: 'S',
    process: 'O', // 'O' from prOcess
    contact: 'C',
  };

  // Contact / social quick actions (placeholders, update with real links)
  const contacts = [
    { id: 'linkedin', label: 'LinkedIn', href: 'https://linkedin.com', key: 'L' },
    { id: 'github', label: 'GitHub', href: 'https://github.com', key: 'G' },
    { id: 'email', label: 'Email', href: 'mailto:hi@fernandomemije.dev', key: 'E' },
  ];

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

  // Combined items for keyboard navigation when showing results/quick links
  const combinedResults = (searchQuery ? filteredSections : sections).map(s => ({
    type: 'section', id: s.id, label: s.label, href: `#${s.id}`, key: sectionShortcuts[s.id] || ''
  })).concat(contacts.map(c => ({ type: 'contact', ...c })));

  // Count how many section items are shown (used to render a separator before contacts)
  const sectionCount = (searchQuery ? filteredSections.length : sections.length);

  const handleContactClick = (href: string) => {
    window.open(href, '_blank');
    setIsOpen(false);
    setSearchQuery('');
  };

  const handleSectionClick = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setSearchQuery('');
    }
  };

  // Keyboard navigation inside the modal (Arrow keys + Enter)
  useEffect(() => {
    if (!isOpen) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev === null ? 0 : Math.min((prev ?? 0) + 1, combinedResults.length - 1);
          return next;
        });
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setActiveIndex((prev) => {
          const next = prev === null ? combinedResults.length - 1 : Math.max((prev ?? 0) - 1, 0);
          return next;
        });
      }

      if (e.key === 'Enter' && activeIndex !== null) {
        e.preventDefault();
        const item = combinedResults[activeIndex];
        if (item) {
          if (item.type === 'section') handleSectionClick(item.id);
          else if (item.type === 'contact') handleContactClick(item.href);
        }
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isOpen, combinedResults, activeIndex]);

  // Focus the active item when activeIndex changes
  useEffect(() => {
    if (activeIndex === null) return;
    const el = itemsRef.current[activeIndex];
    if (el) el.focus();
  }, [activeIndex]);

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
              onChange={(e) => { setSearchQuery(e.target.value); setActiveIndex(null); }}
              placeholder={tSearch('placeholder')}
              className="w-full pl-12 pr-20 py-4 bg-foreground/5 border border-foreground/10 rounded-2xl focus:border-primary-blue focus:outline-none transition-colors text-lg"
              onKeyDown={(e) => {
                // allow typing letters; also support pressing shortcut keys to immediately jump
                const key = e.key.toUpperCase();
                // If user presses a mapped shortcut while focused in input and there is no modifier, act on it
                const mapped = combinedResults.find(item => item.key === key);
                if (mapped && key.length === 1 && !e.metaKey && !e.ctrlKey && !e.altKey) {
                  e.preventDefault();
                  if (mapped.type === 'section') handleSectionClick(mapped.id);
                  else if (mapped.type === 'contact') handleContactClick(mapped.href);
                }
              }}
            />
            <kbd className="absolute right-4 top-1/2 -translate-y-1/2 px-3 py-1.5 text-xs font-semibold text-foreground/60 bg-foreground/5 border border-foreground/10 rounded-lg">
              ESC
            </kbd>
          </div>

          {/* Combined Results (sections + contacts) - keyboard navigable */}
          <div className="mt-4 space-y-2 max-h-96 overflow-y-auto" role="listbox" aria-activedescendant={activeIndex !== null ? `search-item-${activeIndex}` : undefined}>
            {combinedResults.length > 0 ? (
              combinedResults.map((item, idx) => (
                <div key={`${item.type}-${item.id || item.label}`} className="w-full">
                  {/* Render a separator + label before the contacts block for visual separation */}
                  {idx === sectionCount && idx > 0 && (
                    <div className="px-4 py-2">
                      <div className="border-t border-foreground/10 mt-1 mb-3" />
                      <div className="text-xs text-foreground/60 font-semibold">{tSearch('contactsLabel')}</div>
                    </div>
                  )}
                  {item.type === 'section' && (
                    <button
                      id={`search-item-${idx}`}
                      ref={(el) => { itemsRef.current[idx] = el; }}
                      onClick={() => handleSectionClick(item.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors flex items-center justify-between gap-3 ${activeIndex === idx ? 'ring-2 ring-primary-blue/30' : ''}`}
                      role="option"
                      aria-selected={activeIndex === idx}
                    >
                      <div className="flex items-center gap-3">
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
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <kbd className="px-2 py-1 text-xs font-semibold text-foreground/60 bg-foreground/5 border border-foreground/10 rounded">{item.key}</kbd>
                      </div>
                    </button>
                  )}

                  {item.type === 'contact' && (
                    <button
                      id={`search-item-${idx}`}
                      ref={(el) => { itemsRef.current[idx] = el; }}
                      onClick={() => handleContactClick(item.href)}
                      className={`w-full text-left px-4 py-3 rounded-xl hover:bg-foreground/5 transition-colors flex items-center justify-between gap-3 ${activeIndex === idx ? 'ring-2 ring-primary-blue/30' : ''}`}
                      role="option"
                      aria-selected={activeIndex === idx}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-primary-blue" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v20" />
                        </svg>
                        <span className="font-medium">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <kbd className="px-2 py-1 text-xs font-semibold text-foreground/60 bg-foreground/5 border border-foreground/10 rounded">{item.key}</kbd>
                      </div>
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="px-4 py-8 text-center text-foreground/60">{tSearch('noResults')}</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
