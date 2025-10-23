'use client';

import Link from 'next/link';
import { Button, ScrollReveal, AnimatedFade } from '@devlaunch/ui';
import { Linkedin, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * About Section - Personal profile and bio
 *
 * Introduces Mohamed Shawky with current role and CTAs
 */
export function AboutSection() {
  return (
    <section className="relative py-20 sm:py-32">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/10 to-transparent" />
        <motion.div
          className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <div className="container mx-auto px-4">
        <ScrollReveal variant="fadeInUp" className="mx-auto max-w-4xl">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background via-secondary/50 to-background p-8 backdrop-blur-sm sm:p-12">
            {/* Decorative corner accent */}
            <div className="absolute right-0 top-0 h-32 w-32 bg-gradient-to-br from-purple-500/20 to-transparent blur-2xl" />
            <div className="absolute bottom-0 left-0 h-32 w-32 bg-gradient-to-tr from-cyan-500/20 to-transparent blur-2xl" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <AnimatedFade delay={0.1}>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/30 px-4 py-1.5 text-sm backdrop-blur-sm">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="font-medium text-purple-300">
                    The Engineer
                  </span>
                </div>
              </AnimatedFade>

              {/* Main heading */}
              <AnimatedFade delay={0.2}>
                <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                  I&apos;m{' '}
                  <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    Mohamed Shawky
                  </span>
                </h2>
              </AnimatedFade>

              {/* Subtitle */}
              <AnimatedFade delay={0.3}>
                <p className="mb-6 text-xl text-foreground sm:text-2xl">
                  Full-Stack Developer & AI Engineer
                </p>
              </AnimatedFade>

              {/* Bio */}
              <AnimatedFade delay={0.4}>
                <div className="mx-auto mb-8 max-w-2xl space-y-3 text-base text-muted-foreground sm:text-lg">
                  <p>
                    I build modern applications using Next.js, TypeScript, and
                    machine learning tools, combining clean architecture with
                    powerful AI capabilities.
                  </p>
                  <p className="flex items-center justify-center gap-2 text-foreground">
                    <Briefcase className="h-5 w-5 text-purple-500 dark:text-purple-400" />
                    Currently engineering at{' '}
                    <span className="font-semibold">Lazulite</span>, crafting
                    scalable AI and web solutions.
                  </p>
                </div>
              </AnimatedFade>

              {/* CTA Buttons */}
              <AnimatedFade delay={0.5}>
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                  <Link href="#">
                    <Button
                      size="lg"
                      className="group w-full gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 sm:w-auto"
                    >
                      <Linkedin className="h-4 w-4" />
                      Connect on LinkedIn
                    </Button>
                  </Link>
                  <Link href="/blog">
                    <Button
                      size="lg"
                      variant="outline"
                      className="group w-full gap-2 border-zinc-700 bg-zinc-900/50 text-zinc-300 hover:border-zinc-600 hover:bg-zinc-800/50 sm:w-auto"
                    >
                      <BookOpen className="h-4 w-4" />
                      Read My Blog
                    </Button>
                  </Link>
                </div>
              </AnimatedFade>

              {/* Footer note */}
              <AnimatedFade delay={0.6}>
                <p className="mt-8 text-sm text-muted-foreground">
                  Open to collaboration on innovative projects and AI-powered
                  solutions
                </p>
              </AnimatedFade>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
