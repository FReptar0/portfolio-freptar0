"use client";

import "./globals.css";
import Link from 'next/link';
import { useState, useEffect } from 'react';

function NotFoundContent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-0">
      {/* Animated gradient background */}
      <div className="absolute inset-0 apple-gradient-mesh opacity-50" />

      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl">
        <div
          className={`text-center space-y-8 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* 404 Number */}
          <div className="space-y-6">
            <h1 
              className="text-8xl md:text-9xl font-bold leading-none"
              style={{ 
                background: 'var(--gradient-hero)', 
                WebkitBackgroundClip: 'text', 
                backgroundClip: 'text', 
                WebkitTextFillColor: 'transparent', 
                color: 'transparent' 
              }}
            >
              404
            </h1>
            
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold">
                Page Not Found
              </h2>
              <p 
                className="text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
                style={{ color: 'var(--text-secondary)' }}
              >
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-8">
            <Link
              href="/en"
              className="inline-flex items-center justify-center px-8 py-4 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 text-lg shadow-lg"
              style={{ background: 'var(--primary-600)' }}
            >
              ← Back to Home
            </Link>

            {/* Quick Navigation */}
            <div className="glass rounded-3xl p-8 max-w-2xl mx-auto" style={{ background: 'var(--glass-bg)', backdropFilter: 'blur(var(--blur-lg)) saturate(150%)', border: '1px solid var(--glass-border)', boxShadow: 'var(--shadow-glass)' }}>
              <div className="text-center mb-8">
                <h3 className="text-lg font-semibold mb-2">Explore My Work</h3>
                <p 
                  className="text-sm" 
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Discover what I&apos;ve been building and my expertise
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Link 
                  href="/en#timeline" 
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--primary-100)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--primary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">About Me</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Career journey & experience</div>
                  </div>
                </Link>

                <Link 
                  href="/en#projects" 
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--accent-100)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--accent-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Projects</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Featured work & demos</div>
                  </div>
                </Link>

                <Link 
                  href="/en#skills" 
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--secondary-100)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--secondary-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Skills</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Technologies & expertise</div>
                  </div>
                </Link>

                <Link 
                  href="/en#contact" 
                  className="group glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl flex items-center gap-4"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110" style={{ background: 'var(--success-50)' }}>
                    <svg className="w-6 h-6" style={{ color: 'var(--success-600)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <div className="font-semibold text-base mb-1">Contact</div>
                    <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>Get in touch with me</div>
                  </div>
                </Link>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                <div className="flex items-center justify-center gap-6">
                  <a
                    href="https://github.com/freptar0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                    GitHub
                  </a>
                  <a
                    href="https://linkedin.com/in/fernando-rm"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm transition-colors hover:opacity-80"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function NotFound() {
  // Return only the content here; layout should provide html/body, fonts and providers.
  return <NotFoundContent />;
}