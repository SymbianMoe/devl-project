'use client';

import Link from 'next/link';
import { Button, AnimatedFade } from '@devlaunch/ui';
import { ArrowRight, Sparkles } from 'lucide-react';

/**
 * CTA Section - Call to action
 */
export function CTA() {
  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        <AnimatedFade>
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-primary/10 via-background to-background p-8 sm:p-12">
            {/* Content */}
            <div className="relative z-10 mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Ready to Transform Your Workflow?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join thousands of teams already using our platform to streamline
                operations, boost productivity, and drive growth. Start your
                free trial today—no credit card required.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/dashboard">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    <Sparkles className="mr-2 h-4 w-4" />
                    Schedule Demo
                  </Button>
                </Link>
              </div>

              <p className="mt-6 text-sm text-muted-foreground">
                Free 14-day trial • No credit card required • Cancel anytime
              </p>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
          </div>
        </AnimatedFade>
      </div>
    </section>
  );
}
