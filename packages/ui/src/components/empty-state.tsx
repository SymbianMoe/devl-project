import type { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export interface EmptyStateProps {
  /**
   * Icon to display (defaults to Inbox)
   */
  icon?: ReactNode;
  /**
   * Title text
   */
  title: string;
  /**
   * Description text
   */
  description?: string;
  /**
   * Optional action button
   */
  action?: {
    label: string;
    onClick: () => void;
  };
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * EmptyState - Display a placeholder when no data is available
 *
 * Shows an icon, title, description, and optional action button
 */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      <div className="rounded-full bg-muted p-3 mb-4">
        {icon || <Inbox className="h-10 w-10 text-muted-foreground" />}
      </div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
          {description}
        </p>
      )}
      {action && (
        <Button onClick={action.onClick} variant="default">
          {action.label}
        </Button>
      )}
    </div>
  );
}

EmptyState.displayName = 'EmptyState';
