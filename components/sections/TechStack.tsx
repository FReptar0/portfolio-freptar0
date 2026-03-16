"use client";

import { useTranslations } from 'next-intl';
import TechCarousel from '@/components/ui/tech-carousel';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function TechStack() {
  const t = useTranslations('techStack');
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  // Technology logos with CDN URLs for better performance
  const techLogos = [
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
      alt: "React",
      title: "React",
      href: "https://reactjs.org"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
      alt: "Next.js",
      title: "Next.js",
      href: "https://nextjs.org"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
      alt: "TypeScript",
      title: "TypeScript",
      href: "https://www.typescriptlang.org"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
      alt: "Node.js",
      title: "Node.js",
      href: "https://nodejs.org"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
      alt: "Spring Boot",
      title: "Spring Boot",
      href: "https://spring.io/projects/spring-boot"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
      alt: "Java",
      title: "Java",
      href: "https://www.oracle.com/java"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
      alt: "PostgreSQL",
      title: "PostgreSQL",
      href: "https://www.postgresql.org"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
      alt: "Docker",
      title: "Docker",
      href: "https://www.docker.com"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg",
      alt: "AWS",
      title: "Amazon Web Services",
      href: "https://aws.amazon.com"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
      alt: "Google Cloud",
      title: "Google Cloud Platform",
      href: "https://cloud.google.com"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/kubernetes/kubernetes-plain.svg",
      alt: "Kubernetes",
      title: "Kubernetes",
      href: "https://kubernetes.io"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",
      alt: "Redis",
      title: "Redis",
      href: "https://redis.io"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
      alt: "Tailwind CSS",
      title: "Tailwind CSS",
      href: "https://tailwindcss.com"
    },
    {
      src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      alt: "Git",
      title: "Git",
      href: "https://git-scm.com"
    }
  ];

  return (
    <section ref={sectionRef} className="py-16 relative overflow-hidden">
      {/* Background removed -- clean surface */}

      <div className="container mx-auto px-6 lg:px-8 max-w-6xl relative z-10">
        {/* Section Header */}
        <div className={`text-center mb-12 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            {t('title')} <span className="text-[var(--color-accent)]">{t('titleAccent')}</span>
          </h2>
          <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Tech Carousel */}
        <div className={`relative transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '100ms' }}>
          <TechCarousel
            logos={techLogos}
            speed={40}
            className="py-8"
          />
        </div>

        {/* Additional info */}
        <div className={`text-center mt-16 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: '150ms' }}>
          <p className="text-base md:text-lg text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            {t('description')}
          </p>
        </div>
      </div>
    </section>
  );
}
