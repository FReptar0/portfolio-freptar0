"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { BarChart3, X, ChevronLeft, ChevronRight } from "lucide-react";

interface LiveResultsGalleryProps {
  slug: string;
}

export default function LiveResultsGallery({ slug }: LiveResultsGalleryProps) {
  const t = useTranslations("caseStudy");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  let gallery: {
    title: string;
    subtitle: string;
    charts: Array<{ src: string; label: string; description: string }>;
  };

  try {
    const raw = t.raw(`projects.${slug}.gallery`);
    if (raw && typeof raw === 'object' && !Array.isArray(raw) && Array.isArray((raw as typeof gallery).charts)) {
      gallery = raw as typeof gallery;
    } else {
      return null;
    }
  } catch {
    return null;
  }

  if (!gallery?.charts?.length) return null;

  const openLightbox = (i: number) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const prev = () =>
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + gallery.charts.length) % gallery.charts.length : null
    );
  const next = () =>
    setLightboxIndex((i) =>
      i !== null ? (i + 1) % gallery.charts.length : null
    );

  return (
    <>
      <section className="py-12">
        <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
          <div className="mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3 mb-2">
              <BarChart3 className="w-8 h-8 text-amber-500" />
              {gallery.title}
            </h2>
            <p className="text-foreground/60">{gallery.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {gallery.charts.map((chart, i) => (
              <button
                key={i}
                onClick={() => openLightbox(i)}
                className="group bg-[var(--color-surface-elevated)] border border-[var(--color-border)] rounded-2xl overflow-hidden text-left transition-colors duration-300 hover:border-[var(--color-accent)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              >
                <div className="relative w-full aspect-[16/10] bg-foreground/[0.03]">
                  <Image
                    src={chart.src}
                    alt={chart.label}
                    fill
                    className="object-contain p-2"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-1">{chart.label}</h3>
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {chart.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            className="absolute left-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <div
            className="relative max-w-[90vw] max-h-[85vh] w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-[70vh]">
              <Image
                src={gallery.charts[lightboxIndex].src}
                alt={gallery.charts[lightboxIndex].label}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </div>
            <div className="text-center mt-4">
              <h3 className="text-white font-semibold text-lg">
                {gallery.charts[lightboxIndex].label}
              </h3>
              <p className="text-white/60 text-sm mt-1 max-w-2xl mx-auto">
                {gallery.charts[lightboxIndex].description}
              </p>
              <p className="text-white/40 text-xs mt-2">
                {lightboxIndex + 1} / {gallery.charts.length}
              </p>
            </div>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
            className="absolute right-4 p-2 text-white/80 hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-10 h-10" />
          </button>
        </div>
      )}
    </>
  );
}
