'use client';

import Link from 'next/link';
import {
  Button,
  AnimatedFade,
  AnimatedContainer,
  AnimatedItem,
} from '@devlaunch/ui';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * Hero Section - Landing page hero with animations
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-background to-background" />

      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <AnimatedFade delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-background/50 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium">Trusted by 10,000+ teams</span>
            </div>
          </AnimatedFade>

          {/* Heading */}
          <AnimatedFade delay={0.2}>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Scale Your Business
              <span className="block bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
                With Confidence
              </span>
            </h1>
          </AnimatedFade>

          {/* Description */}
          <AnimatedFade delay={0.3}>
            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              The all-in-one platform for modern teams. Powerful analytics,
              seamless collaboration, and enterprise-grade security to help you
              grow faster.
            </p>
          </AnimatedFade>

          {/* CTA Buttons */}
          <AnimatedFade delay={0.4}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  View Live Demo
                </Button>
              </Link>
            </div>
          </AnimatedFade>

          {/* Stats */}
          <AnimatedContainer
            stagger
            delay={0.6}
            className="mt-16 grid grid-cols-3 gap-8 border-t pt-8"
          >
            <AnimatedItem>
              <div>
                <div className="text-3xl font-bold">99.9%</div>
                <div className="text-sm text-muted-foreground">Uptime SLA</div>
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-sm text-muted-foreground">
                  Active Teams
                </div>
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <div>
                <div className="text-3xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">
                  Expert Support
                </div>
              </div>
            </AnimatedItem>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
