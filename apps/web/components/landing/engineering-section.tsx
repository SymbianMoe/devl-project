'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollReveal,
  TiltCard,
  TechBadge,
} from '@devlaunch/ui';
import {
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Palette,
  Zap,
} from 'lucide-react';

const techStack = [
  { label: 'TypeScript', variant: 'cyan' as const },
  { label: 'SSR / ISR / SSG / CSR', variant: 'purple' as const },
  { label: 'Zustand', variant: 'orange' as const },
  { label: 'React Query', variant: 'cyan' as const },
  { label: 'Tailwind CSS', variant: 'cyan' as const },
  { label: 'Shadcn UI', variant: 'default' as const },
];

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized for performance with server-side rendering, incremental static regeneration, and intelligent code splitting.',
    color: 'text-yellow-500',
  },
  {
    icon: Layers,
    title: 'Monorepo Architecture',
    description:
      'Built with pnpm workspaces for maximum code sharing, consistency, and developer experience across all apps.',
    color: 'text-purple-500',
  },
  {
    icon: Code2,
    title: 'Type-Safe Everything',
    description:
      'Strict TypeScript configuration ensures runtime safety and incredible developer experience with full intellisense.',
    color: 'text-cyan-500',
  },
  {
    icon: Database,
    title: 'Smart State Management',
    description:
      'Zustand for global state and React Query for server state create a seamless, performant data layer.',
    color: 'text-green-500',
  },
  {
    icon: Palette,
    title: 'Design System',
    description:
      'Shared component library built on Shadcn, Radix UI, and Tailwind CSS for consistent, accessible interfaces.',
    color: 'text-pink-500',
  },
  {
    icon: CheckCircle2,
    title: 'Production Ready',
    description:
      'Battle-tested patterns, comprehensive error handling, and optimized build configuration for real-world apps.',
    color: 'text-blue-500',
  },
];

/**
 * Engineering Section - Personal engineering story and tech stack showcase
 *
 * Displays the technical foundation with interactive cards and badges
 */
export function EngineeringSection() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal
          variant="fadeInUp"
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Engineering, but{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Personal
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            I&apos;ve spent the last few years crafting systems that scale —
            from AI-powered apps to immersive frontends. DevLaunch is where all
            that experience lives — a modular architecture using pnpm
            workspaces, shared UI components, and type-safe everything.
          </p>
        </ScrollReveal>

        {/* Tech Stack Badges */}
        <ScrollReveal variant="fadeInUp" delay={0.2} className="mb-16">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {techStack.map((tech) => (
              <TechBadge
                key={tech.label}
                label={tech.label}
                variant={tech.variant}
              />
            ))}
          </div>
        </ScrollReveal>

        {/* Features Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <ScrollReveal key={feature.title} variant="fadeInUp" delay={0.1}>
              <TiltCard tiltDegree={5} glow className="h-full">
                <Card className="h-full">
                  <CardHeader>
                    <div
                      className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-secondary`}
                    >
                      <feature.icon className={`h-6 w-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
