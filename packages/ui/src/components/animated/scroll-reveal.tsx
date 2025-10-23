'use client';

import { motion, useInView, Variants } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export interface ScrollRevealProps {
  children: ReactNode;
  /**
   * Animation variant to use
   */
  variant?:
    | 'fadeIn'
    | 'fadeInUp'
    | 'fadeInDown'
    | 'fadeInLeft'
    | 'fadeInRight'
    | 'scaleIn';
  /**
   * Delay before animation starts (in seconds)
   */
  delay?: number;
  /**
   * Duration of animation (in seconds)
   */
  duration?: number;
  /**
   * Only animate once when element enters viewport
   */
  once?: boolean;
  /**
   * Percentage of element that must be visible to trigger (0-1)
   */
  threshold?: number;
  /**
   * Additional className
   */
  className?: string;
}

const variants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInDown: {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * ScrollReveal - Animates children when scrolled into view
 *
 * Uses Framer Motion's useInView hook to trigger animations
 * when element enters the viewport
 */
export function ScrollReveal({
  children,
  variant = 'fadeInUp',
  delay = 0,
  duration = 0.5,
  once = true,
  threshold = 0.2,
  className,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants[variant]}
      transition={{
        duration,
        delay,
        ease: [0.6, 0.01, 0.05, 0.95],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
