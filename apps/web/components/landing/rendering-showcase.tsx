'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  ScrollReveal,
  CodeSnippet,
  Badge,
} from '@devlaunch/ui';
import { FileCode, Server, RefreshCw, Monitor } from 'lucide-react';

const renderingModes = [
  {
    icon: FileCode,
    title: 'SSG',
    subtitle: 'Static Generation',
    description:
      'Blazing-fast static pages, pre-built at deploy time. Perfect for SEO-heavy routes like landing pages and blogs.',
    color: 'text-green-500',
    badgeColor: 'bg-green-500/10 text-green-500',
    code: `export default function Page() {
  // Static at build time
  return <LandingPage />;
}`,
    benefits: ['Lightning fast', 'SEO optimized', 'CDN cacheable'],
  },
  {
    icon: Server,
    title: 'SSR',
    subtitle: 'Server Rendering',
    description:
      'Data-driven and dynamic — rendered on every request with minimal latency. Great for personalized content.',
    color: 'text-blue-500',
    badgeColor: 'bg-blue-500/10 text-blue-500',
    code: `export default async function Page() {
  const data = await fetchData();
  return <Dashboard data={data} />;
}`,
    benefits: ['Always fresh', 'Personalized', 'Server-side auth'],
  },
  {
    icon: RefreshCw,
    title: 'ISR',
    subtitle: 'Incremental Static',
    description:
      'The sweet spot between speed and freshness — revalidates on demand. Best for content that updates periodically.',
    color: 'text-purple-500',
    badgeColor: 'bg-purple-500/10 text-purple-500',
    code: `export const revalidate = 60;

export default async function Page() {
  const posts = await fetchPosts();
  return <BlogPage posts={posts} />;
}`,
    benefits: ['Static speed', 'Auto updates', 'Scalable'],
  },
  {
    icon: Monitor,
    title: 'CSR',
    subtitle: 'Client Rendering',
    description:
      'Pure client interactivity, optimized with React Query and Zustand. Perfect for highly interactive dashboards.',
    color: 'text-cyan-500',
    badgeColor: 'bg-cyan-500/10 text-cyan-500',
    code: `'use client'

export default function Page() {
  const { data } = useQuery('analytics');
  return <AnalyticsDashboard />;
}`,
    benefits: ['Interactive', 'Real-time', 'Optimistic updates'],
  },
];

/**
 * Rendering Showcase - Visual breakdown of SSG, SSR, ISR, and CSR
 *
 * Displays the 4 rendering strategies with code examples and explanations
 */
export function RenderingShowcase() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal
          variant="fadeInUp"
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Rendering{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Master all four rendering strategies in Next.js 15. Each has its
            perfect use case — choose wisely for maximum performance.
          </p>
        </ScrollReveal>

        {/* Rendering Modes Grid */}
        <div className="grid gap-8 lg:grid-cols-2">
          {renderingModes.map((mode, index) => (
            <ScrollReveal
              key={mode.title}
              variant="fadeInUp"
              delay={0.1 * index}
            >
              <Card className="overflow-hidden">
                <CardHeader className="border-b">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-lg bg-secondary`}
                      >
                        <mode.icon className={`h-5 w-5 ${mode.color}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <CardTitle className="text-xl">
                            {mode.title}
                          </CardTitle>
                          <Badge className={mode.badgeColor}>
                            {mode.subtitle}
                          </Badge>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  {/* Code Example */}
                  <CodeSnippet
                    code={mode.code}
                    language="typescript"
                    showLineNumbers={false}
                    showCopyButton={false}
                    animateReveal={false}
                  />

                  {/* Benefits */}
                  <div className="border-t p-4">
                    <div className="flex flex-wrap gap-2">
                      {mode.benefits.map((benefit) => (
                        <span
                          key={benefit}
                          className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
