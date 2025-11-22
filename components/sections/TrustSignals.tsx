"use client";

import { useTranslations } from 'next-intl';
import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export default function TrustSignals() {
  const t = useTranslations('trustSignals');
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [, setCount] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  // Define all available testimonials explicitly
  const testimonials = [
    {
      quote: t('testimonial0.quote'),
      author: t('testimonial0.author'),
      role: t('testimonial0.role'),
      company: t('testimonial0.company'),
    },
    {
      quote: t('testimonial1.quote'),
      author: t('testimonial1.author'),
      role: t('testimonial1.role'),
      company: t('testimonial1.company'),
    },
    {
      quote: t('testimonial2.quote'),
      author: t('testimonial2.author'),
      role: t('testimonial2.role'),
      company: t('testimonial2.company'),
    },
    {
      quote: t('testimonial3.quote'),
      author: t('testimonial3.author'),
      role: t('testimonial3.role'),
      company: t('testimonial3.company'),
    },
  ];

  // Track screen size
  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    // Set initial value
    checkDesktop();

    // Add event listener
    window.addEventListener('resize', checkDesktop);

    // Cleanup
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  // Calculate dots based on layout
  const totalDots = isDesktop ? Math.ceil(testimonials.length / 2) : testimonials.length;
  const currentDotIndex = isDesktop ? Math.floor(current / 2) : current;

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl">
        {/* Main Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {t('mainTitle')} <span className="bg-gradient-to-r from-primary-blue to-accent-purple bg-clip-text text-transparent">& Expertise</span>
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            {t('mainSubtitle')}
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="mb-24">
          <div className="relative max-w-7xl mx-auto px-4">
            <Carousel
              setApi={setApi}
              className="w-full"
              opts={{
                align: "start",
                loop: true,
                slidesToScroll: 1,
              }}
              plugins={[
                Autoplay({
                  delay: 6000,
                  stopOnInteraction: true,
                  stopOnMouseEnter: true,
                }),
              ]}
            >
              <CarouselContent className="-ml-2 md:-ml-4 mt-1">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-2 md:pl-4 md:basis-1/2">
                    <TestimonialCard
                      quote={testimonial.quote}
                      author={testimonial.author}
                      role={testimonial.role}
                      company={testimonial.company}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>

              {/* Navigation buttons with proper positioning */}
              <CarouselPrevious className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 h-10 w-10 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg" />
              <CarouselNext className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 h-10 w-10 border-0 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 hover:scale-110 shadow-lg" />
            </Carousel>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-8 space-x-3 mt-2">
              {Array.from({ length: totalDots }).map((_, index) => {
                const isActive = index === currentDotIndex;
                const targetSlide = isDesktop ? index * 2 : index;

                return (
                  <button
                    key={index}
                    onClick={() => api?.scrollTo(targetSlide)}
                    className={`h-2 rounded-full transition-all duration-300 ${isActive
                      ? 'w-8 bg-gradient-to-r from-primary-blue to-accent-purple'
                      : 'w-2 bg-foreground/20 hover:bg-foreground/40'
                      }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Certifications & Skills Badges */}
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-6" style={{ color: 'var(--text-secondary)' }}>
            {t('certificationsTitle')}
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {t.raw('certifications').map((cert: string, index: number) => (
              <CertBadge key={index} text={cert} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  quote,
  author,
  role,
  company,
}: {
  quote: string;
  author: string;
  role: string;
  company: string;
}) {
  return (
    <div className="glass-card rounded-2xl p-6 md:p-8 h-full min-h-[280px] flex flex-col relative overflow-hidden group hover:shadow-xl transition-all duration-500">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-primary-blue/10 to-accent-purple/10 rounded-full -translate-y-8 translate-x-8 group-hover:scale-150 transition-transform duration-700"></div>

      {/* Quote icon */}
      <div className="relative z-10">
        <svg className="w-8 h-8 text-primary-blue/60 mb-4" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-10zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
        </svg>
      </div>

      {/* Quote text */}
      <div className="flex-grow relative z-10">
        <p className="text-base md:text-lg leading-relaxed text-foreground/80 mb-6 italic">
          &quot;{quote}&quot;
        </p>
      </div>

      {/* Author info */}
      <div className="flex items-center gap-4 relative z-10 mt-auto">
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-primary-blue to-accent-purple flex items-center justify-center text-white font-bold text-sm md:text-base shadow-lg">
          {author.split(" ").map((n) => n[0]).join("")}
        </div>
        <div className="flex-1">
          <div className="font-semibold text-foreground text-sm md:text-base">{author}</div>
          <div className="text-xs md:text-sm text-foreground/60">{role}</div>
          <div className="text-xs md:text-sm font-medium text-primary-blue">{company}</div>
        </div>
      </div>
    </div>
  );
}

function CertBadge({ text }: { text: string }) {
  return (
    <div className="px-6 py-3 glass rounded-full text-sm font-medium border hover:scale-105 transition-all duration-300 cursor-default" style={{ borderColor: 'var(--accent-500)' }}>
      <CheckCircle className="w-4 h-4 mr-2 inline" style={{ color: 'var(--success-500)' }} />
      {text}
    </div>
  );
}
