'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export interface TechBadgeProps {
  /**
   * Icon component or element
   */
  icon?: ReactNode;
  /**
   * Badge label text
   */
  label: string;
  /**
   * Enable glow effect on hover
   */
  glow?: boolean;
  /**
   * Color variant
   */
  variant?: 'default' | 'purple' | 'cyan' | 'green' | 'orange';
  /**
   * Additional className
   */
  className?: string;
}

/**
 * TechBadge - Animated badge for tech stack items
 *
 * Displays technology/skill badges with icon, label,
 * and optional glow effect on hover
 */
export function TechBadge({
  icon,
  label,
  glow = true,
  variant = 'default',
  className = '',
}: TechBadgeProps) {
  const variants = {
    default: {
      border: 'border-zinc-700',
      bg: 'bg-zinc-900/50',
      glow: 'from-zinc-600 to-zinc-700',
      text: 'text-zinc-300',
      iconColor: 'text-zinc-400',
    },
    purple: {
      border: 'border-purple-900/50',
      bg: 'bg-purple-950/30',
      glow: 'from-purple-600 to-purple-700',
      text: 'text-purple-300',
      iconColor: 'text-purple-400',
    },
    cyan: {
      border: 'border-cyan-900/50',
      bg: 'bg-cyan-950/30',
      glow: 'from-cyan-600 to-cyan-700',
      text: 'text-cyan-300',
      iconColor: 'text-cyan-400',
    },
    green: {
      border: 'border-green-900/50',
      bg: 'bg-green-950/30',
      glow: 'from-green-600 to-green-700',
      text: 'text-green-300',
      iconColor: 'text-green-400',
    },
    orange: {
      border: 'border-orange-900/50',
      bg: 'bg-orange-950/30',
      glow: 'from-orange-600 to-orange-700',
      text: 'text-orange-300',
      iconColor: 'text-orange-400',
    },
  };

  const style = variants[variant];

  return (
    <motion.div
      className={`relative inline-flex items-center gap-2 rounded-lg border ${style.border} ${style.bg} px-4 py-2 backdrop-blur-sm ${className}`}
      whileHover={{ scale: 1.05, y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Glow effect */}
      {glow && (
        <motion.div
          className={`absolute -inset-px rounded-lg bg-gradient-to-r ${style.glow} opacity-0`}
          whileHover={{ opacity: 0.3 }}
          transition={{ duration: 0.3 }}
          style={{
            filter: 'blur(8px)',
            zIndex: -1,
          }}
        />
      )}

      {/* Icon */}
      {icon && <div className={`flex-shrink-0 ${style.iconColor}`}>{icon}</div>}

      {/* Label */}
      <span className={`text-sm font-medium ${style.text}`}>{label}</span>
    </motion.div>
  );
}
