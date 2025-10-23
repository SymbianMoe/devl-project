import { Variants } from 'framer-motion';

// Easing curves
export const easings = {
  smooth: [0.6, 0.01, 0.05, 0.95] as const,
  bounce: [0.68, -0.55, 0.265, 1.55] as const,
  sharp: [0.4, 0, 0.2, 1] as const,
};

// Duration presets
export const durations = {
  fast: 0.2,
  normal: 0.3,
  slow: 0.5,
};

// Fade animations
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: durations.normal },
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

// Scale animations
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const scaleInBounce: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: durations.slow, ease: easings.bounce },
  },
};

// Stagger container variants
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.02,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: durations.normal },
  },
};

// Page transition variants
export const pageTransition: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    x: 20,
    transition: { duration: durations.fast },
  },
};

// Hover and tap animations
export const hoverScale = {
  scale: 1.02,
  transition: { duration: durations.fast },
};

export const hoverScaleLarge = {
  scale: 1.05,
  transition: { duration: durations.fast },
};

export const tapScale = {
  scale: 0.98,
};

// Slide animations
export const slideInFromBottom: Variants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

export const slideInFromTop: Variants = {
  hidden: { y: '-100%', opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

// Number counter animation helper
export const createCounterAnimation = (
  from: number,
  to: number,
  duration = 1
) => ({
  from,
  to,
  transition: { duration, ease: easings.smooth },
});

// Skeleton loader
export const skeletonPulse: Variants = {
  pulse: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Notification/Toast animations
export const notificationSlide: Variants = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: durations.fast },
  },
};

// Modal/Dialog animations
export const modalBackdrop: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const modalContent: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: durations.fast },
  },
};

// Sidebar/Menu animations
export const menuItem: Variants = {
  hidden: { x: -10, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
  },
};

export const expandCollapse: Variants = {
  collapsed: { height: 0, opacity: 0 },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { duration: durations.normal, ease: easings.smooth },
  },
};

// Gradient animations
export const gradientShift: Variants = {
  initial: {
    backgroundPosition: '0% 50%',
  },
  animate: {
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

// Glow/Pulse effects
export const glowPulse: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.6, 0.3],
    scale: [1, 1.05, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Parallax scroll effect values
export const parallaxScroll = {
  slow: { y: [0, -50] },
  medium: { y: [0, -100] },
  fast: { y: [0, -200] },
};

// 3D Tilt hover values
export const tiltHover = {
  light: { rotateX: 5, rotateY: 5 },
  medium: { rotateX: 10, rotateY: 10 },
  strong: { rotateX: 15, rotateY: 15 },
};

// Code reveal animation
export const codeReveal: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.05,
      duration: 0.3,
      ease: easings.smooth,
    },
  }),
};

// Floating animation for orbs/elements
export const floatingOrb: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    scale: [1, 1.1, 1],
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};
