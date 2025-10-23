'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  AnimatedContainer,
  AnimatedItem,
} from '@devlaunch/ui';
import { Boxes, Zap, Shield, Layers, Code2, Palette } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast Performance',
    description:
      'Optimized for speed with sub-second response times and real-time data updates.',
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description:
      'Bank-level encryption, SOC 2 compliance, and advanced access controls built-in.',
  },
  {
    icon: Boxes,
    title: 'Powerful Integrations',
    description:
      'Connect with 100+ tools including Slack, GitHub, Stripe, and more.',
  },
  {
    icon: Layers,
    title: 'Advanced Analytics',
    description:
      'Real-time dashboards with customizable reports and actionable insights.',
  },
  {
    icon: Code2,
    title: 'Developer-Friendly API',
    description:
      'RESTful and GraphQL APIs with comprehensive documentation and SDKs.',
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description:
      'White-label options, custom branding, and flexible theming for your brand.',
  },
];

/**
 * Features Section - Landing page features grid
 * Demonstrates static content rendering
 */
export function Features() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Everything You Need to Succeed
          </h2>
          <p className="text-lg text-muted-foreground">
            Powerful features designed to help your team collaborate better and
            achieve more together.
          </p>
        </div>

        {/* Features Grid */}
        <AnimatedContainer
          stagger
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <AnimatedItem key={feature.title}>
                <Card className="relative overflow-hidden h-full">
                  <CardHeader>
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </AnimatedItem>
            );
          })}
        </AnimatedContainer>
      </div>
    </section>
  );
}
