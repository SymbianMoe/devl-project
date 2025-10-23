'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ReactNode, useRef } from 'react';

export interface TiltCardProps {
  children: ReactNode;
  /**
   * Maximum tilt rotation in degrees
   */
  tiltDegree?: number;
  /**
   * Enable glow effect on hover
   */
  glow?: boolean;
  /**
   * Additional className
   */
  className?: string;
  /**
   * Scale on hover
   */
  scaleOnHover?: boolean;
}

/**
 * TiltCard - 3D tilt effect on mouse movement
 *
 * Creates an interactive card that tilts based on mouse position
 * Optional glow effect and scale on hover
 */
export function TiltCard({
  children,
  tiltDegree = 10,
  glow = false,
  className = '',
  scaleOnHover = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [`${tiltDegree}deg`, `-${tiltDegree}deg`]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [`-${tiltDegree}deg`, `${tiltDegree}deg`]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={scaleOnHover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.2 }}
      className={`relative ${className}`}
    >
      {glow && (
        <motion.div
          className="absolute -inset-px rounded-lg bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0"
          whileHover={{ opacity: 0.5 }}
          transition={{ duration: 0.3 }}
          style={{
            filter: 'blur(10px)',
            zIndex: -1,
          }}
        />
      )}
      <div style={{ transform: 'translateZ(20px)' }}>{children}</div>
    </motion.div>
  );
}
