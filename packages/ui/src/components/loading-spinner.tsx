import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

export interface LoadingSpinnerProps {
  /**
   * Size of the spinner
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Optional label text
   */
  label?: string;
}

const sizeClasses = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

/**
 * LoadingSpinner - An animated loading spinner
 *
 * Uses lucide-react's Loader2 icon with rotation animation
 */
export function LoadingSpinner({
  size = 'md',
  className,
  label,
}: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2
        className={cn('animate-spin text-muted-foreground', sizeClasses[size], className)}
        aria-label={label || 'Loading'}
      />
      {label && (
        <p className="text-sm text-muted-foreground">{label}</p>
      )}
    </div>
  );
}

LoadingSpinner.displayName = 'LoadingSpinner';
