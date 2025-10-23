'use client';

import Link from 'next/link';
import { ArrowRight, Github, Sparkles } from 'lucide-react';
import {
  Button,
  AnimatedFade,
  AnimatedContainer,
  AnimatedItem,
  GradientBackground,
} from '@devlaunch/ui';
import { motion } from 'framer-motion';

/**
 * Hero Section - Cinematic hero with gradient background and floating elements
 *
 * Personal engineering pitch with animated elements
 */
export function HeroNew() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-32 lg:py-40">
      {/* Animated gradient background */}
      <GradientBackground variant="mixed" showOrbs />

      {/* Floating elements - only in dark mode */}
      <div className="absolute inset-0 hidden overflow-hidden dark:block">
        <motion.div
          className="absolute top-1/4 left-10 h-2 w-2 rounded-full bg-purple-500/50"
          animate={{
            y: [0, -30, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/3 right-20 h-3 w-3 rounded-full bg-cyan-500/50"
          animate={{
            y: [0, 40, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-2 w-2 rounded-full bg-purple-400/40"
          animate={{
            y: [0, -20, 0],
            x: [0, 20, 0],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <AnimatedFade delay={0.1}>
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-purple-500/20 bg-purple-950/30 px-4 py-1.5 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-purple-400" />
              <span className="font-medium text-purple-300">
                Building the next generation of web
              </span>
            </div>
          </AnimatedFade>

          {/* Main Heading */}
          <AnimatedFade delay={0.2}>
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              I build{' '}
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent">
                next-gen
              </span>
              <br />
              web experiences
            </h1>
          </AnimatedFade>

          {/* Subheading */}
          <AnimatedFade delay={0.3}>
            <p className="mb-4 text-xl text-foreground sm:text-2xl">
              Fast. Scalable. Beautifully engineered.
            </p>
          </AnimatedFade>

          {/* Description */}
          <AnimatedFade delay={0.4}>
            <p className="mb-10 text-base text-muted-foreground sm:text-lg">
              <span className="font-semibold text-foreground">DevLaunch</span>{' '}
              is my personal production-grade Next.js playground — where I push
              the limits of SSR, ISR, SSG, and cutting-edge UI design.
            </p>
          </AnimatedFade>

          {/* CTA Buttons */}
          <AnimatedFade delay={0.5}>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="group w-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-500 hover:to-cyan-500 sm:w-auto"
                >
                  Explore the Dashboard
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="#">
                <Button
                  size="lg"
                  variant="outline"
                  className="group w-full sm:w-auto"
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Link>
            </div>
          </AnimatedFade>

          {/* Stats */}
          <AnimatedContainer
            stagger
            delay={0.7}
            className="mt-20 grid grid-cols-3 gap-8 border-t border-border pt-12"
          >
            <AnimatedItem>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                  99.9%
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Uptime SLA
                </div>
              </motion.div>
            </AnimatedItem>
            <AnimatedItem>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                  10K+
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Active Teams
                </div>
              </motion.div>
            </AnimatedItem>
            <AnimatedItem>
              <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
                <div className="bg-gradient-to-br from-purple-500 to-cyan-500 bg-clip-text text-4xl font-bold text-transparent lg:text-5xl">
                  24/7
                </div>
                <div className="mt-2 text-sm text-muted-foreground">
                  Expert Support
                </div>
              </motion.div>
            </AnimatedItem>
          </AnimatedContainer>
        </div>
      </div>
    </section>
  );
}
