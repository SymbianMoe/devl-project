'use client';

import { motion } from 'framer-motion';

export interface GradientBackgroundProps {
  /**
   * Show floating orbs/shapes
   */
  showOrbs?: boolean;
  /**
   * Variant of gradient style
   */
  variant?: 'default' | 'purple' | 'cyan' | 'mixed';
  /**
   * Additional className
   */
  className?: string;
}

/**
 * GradientBackground - Animated gradient backdrop with optional floating orbs
 *
 * Creates a dark gradient background optimized for dark theme
 * with purple/cyan accents and optional animated floating shapes
 */
export function GradientBackground({
  showOrbs = true,
  variant = 'default',
  className = '',
}: GradientBackgroundProps) {
  const gradients = {
    default: 'from-zinc-950 via-zinc-900 to-neutral-950',
    purple: 'from-zinc-950 via-purple-950/20 to-zinc-900',
    cyan: 'from-zinc-950 via-cyan-950/20 to-zinc-900',
    mixed: 'from-purple-950/20 via-zinc-900 to-cyan-950/20',
  };

  return (
    <div className={`absolute inset-0 -z-10 overflow-hidden ${className}`}>
      {/* Base gradient - hidden in light mode */}
      <div
        className={`absolute inset-0 hidden bg-gradient-to-b dark:block ${gradients[variant]}`}
      />

      {/* Light mode subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-50/30 to-transparent dark:hidden" />

      {/* Animated gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 dark:from-purple-500/5 dark:to-cyan-500/5"
        animate={{
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Floating orbs - only visible in dark mode */}
      {showOrbs && (
        <div className="hidden dark:block">
          {/* Purple orb - top right */}
          <motion.div
            className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-purple-600/20 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Cyan orb - bottom left */}
          <motion.div
            className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.25, 0.2],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />

          {/* Small purple orb - center */}
          <motion.div
            className="absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-2xl"
            animate={{
              scale: [1, 1.4, 1],
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      )}

      {/* Noise texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
