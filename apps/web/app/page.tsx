import type { Metadata } from 'next';
import {
  HeroNew,
  EngineeringSection,
  RenderingShowcase,
  DesignSystemSection,
  AboutSection,
} from '@/components/landing';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'Mohamed Shawky - Full-Stack Developer & AI Engineer | DevLaunch',
  description:
    'Personal engineering portfolio showcasing production-grade Next.js architecture, SSR/ISR/SSG/CSR rendering strategies, and modern web development by Mohamed Shawky.',
  keywords: [
    'Next.js',
    'TypeScript',
    'Full-Stack Developer',
    'AI Engineer',
    'React',
    'Mohamed Shawky',
    'DevLaunch',
    'Web Development',
  ],
  authors: [{ name: 'Mohamed Shawky' }],
  creator: 'Mohamed Shawky',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Mohamed Shawky - Full-Stack Developer & AI Engineer',
    description:
      'Personal engineering portfolio showcasing production-grade Next.js architecture and modern web development.',
    siteName: 'DevLaunch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohamed Shawky - Full-Stack Developer & AI Engineer',
    description:
      'Personal engineering portfolio showcasing production-grade Next.js architecture.',
  },
};

/**
 * Landing Page - Personal Portfolio & Engineering Showcase
 *
 * Static Site Generation (SSG) - Pre-rendered at build time
 * Showcases: Next.js 15, Framer Motion animations, TypeScript, and modern web architecture
 *
 * Rendering Mode: SSG (Static Site Generation)
 * Cache: Static - served from CDN
 * Regeneration: Only on rebuild
 */
export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroNew />
      <EngineeringSection />
      <RenderingShowcase />
      <DesignSystemSection />
      <AboutSection />
      <Footer />
    </main>
  );
}
