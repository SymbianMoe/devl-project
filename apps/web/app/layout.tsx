import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import { Navigation } from '@/components/layout/navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'DevLaunch | Production-Grade Next.js Showcase',
    template: '%s | DevLaunch',
  },
  description:
    'A production-grade Next.js 15 monorepo demonstrating SSR, SSG, ISR, and CSR rendering strategies with a reusable component library.',
  keywords: [
    'Next.js',
    'React',
    'TypeScript',
    'Tailwind CSS',
    'Monorepo',
    'Component Library',
  ],
  authors: [
    {
      name: 'DevLaunch Team',
    },
  ],
  creator: 'DevLaunch',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://devlaunch.example.com',
    title: 'DevLaunch',
    description: 'Production-Grade Next.js Showcase',
    siteName: 'DevLaunch',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevLaunch',
    description: 'Production-Grade Next.js Showcase',
    creator: '@devlaunch',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <Navigation />
          {children}
        </Providers>
      </body>
    </html>
  );
}
