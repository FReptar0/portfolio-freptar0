"use client";

import { useEffect, useRef } from 'react';

interface TechLogo {
  src: string;
  alt: string;
  title: string;
  href?: string;
}

interface TechCarouselProps {
  logos: TechLogo[];
  speed?: number;
  className?: string;
}

export default function TechCarousel({ logos, speed = 50, className = "" }: TechCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationId: number;
    let scrollPosition = 0;

    const animate = () => {
      scrollPosition += speed / 60; // 60fps
      
      const maxScroll = scrollContainer.scrollWidth / 2;
      if (scrollPosition >= maxScroll) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      cancelAnimationFrame(animationId);
    };

    const handleMouseLeave = () => {
      animationId = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [speed]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div 
        ref={scrollRef}
        className="flex overflow-hidden whitespace-nowrap"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* First set of logos */}
        {logos.map((logo, index) => (
          <div 
            key={`first-${index}`}
            className="flex-shrink-0 mx-12 flex items-center justify-center"
            style={{ width: '64px', height: '64px' }}
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full flex items-center justify-center group"
                aria-label={logo.title}
              >
                <img
                  src={logo.src}
                  alt={logo.alt}
                  title={logo.title}
                  className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  loading="lazy"
                  draggable={false}
                />
              </a>
            ) : (
              <img
                src={logo.src}
                alt={logo.alt}
                title={logo.title}
                className="max-w-full max-h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                loading="lazy"
                draggable={false}
              />
            )}
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {logos.map((logo, index) => (
          <div 
            key={`second-${index}`}
            className="flex-shrink-0 mx-12 flex items-center justify-center"
            style={{ width: '64px', height: '64px' }}
            aria-hidden="true"
          >
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full h-full flex items-center justify-center group"
                tabIndex={-1}
              >
                <img
                  src={logo.src}
                  alt=""
                  className="max-w-full max-h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                  loading="lazy"
                  draggable={false}
                />
              </a>
            ) : (
              <img
                src={logo.src}
                alt=""
                className="max-w-full max-h-full object-contain filter grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all duration-300 hover:scale-110"
                loading="lazy"
                draggable={false}
              />
            )}
          </div>
        ))}
      </div>
      
      {/* Reduced motion support */}
      <style jsx>{`
        @media (prefers-reduced-motion: reduce) {
          .flex {
            animation: none !important;
          }
        }
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}