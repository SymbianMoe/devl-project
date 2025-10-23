'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { ReactNode } from 'react';
import {
  fadeInUp,
  fadeIn,
  scaleIn,
  staggerContainer,
  staggerItem,
  hoverScale,
  tapScale,
} from '../../lib/animation-presets';

// Animated container for staggered children
export interface AnimatedContainerProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  delay?: number;
  stagger?: boolean;
}

export function AnimatedContainer({
  children,
  delay = 0,
  stagger = true,
  ...props
}: AnimatedContainerProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger ? staggerContainer : undefined}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated item for use within stagger containers
export interface AnimatedItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
}

export function AnimatedItem({ children, ...props }: AnimatedItemProps) {
  return (
    <motion.div variants={staggerItem} {...props}>
      {children}
    </motion.div>
  );
}

// Animated card with fade and scale
export interface AnimatedCardProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  hover?: boolean;
}

export function AnimatedCard({
  children,
  hover = true,
  ...props
}: AnimatedCardProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={scaleIn}
      whileHover={hover ? hoverScale : undefined}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated fade in wrapper
export interface AnimatedFadeProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  delay?: number;
}

export function AnimatedFade({
  children,
  direction = 'up',
  delay = 0,
  ...props
}: AnimatedFadeProps) {
  const variants = direction === 'up' ? fadeInUp : fadeIn;

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated button with tap effect
export interface AnimatedButtonProps extends HTMLMotionProps<'button'> {
  children: ReactNode;
}

export function AnimatedButton({ children, ...props }: AnimatedButtonProps) {
  return (
    <motion.button whileHover={hoverScale} whileTap={tapScale} {...props}>
      {children}
    </motion.button>
  );
}

// Animated list item
export interface AnimatedListItemProps extends HTMLMotionProps<'div'> {
  children: ReactNode;
  index?: number;
}

export function AnimatedListItem({
  children,
  index = 0,
  ...props
}: AnimatedListItemProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeInUp}
      transition={{ delay: index * 0.05 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

// Animated page wrapper
export interface AnimatedPageProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedPage({ children, className }: AnimatedPageProps) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInUp}
      className={className}
    >
      {children}
    </motion.div>
  );
}
