'use client';

import type { ReactNode } from 'react';
import { cn } from '../lib/utils';

export interface ActivityItemProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  timestamp: string;
  className?: string;
}

export function ActivityItem({
  icon,
  title,
  description,
  timestamp,
  className,
}: ActivityItemProps) {
  return (
    <div className={cn('flex gap-4', className)}>
      {icon && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted">
          {icon}
        </div>
      )}
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium leading-none">{title}</p>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <p className="text-xs text-muted-foreground">{timestamp}</p>
      </div>
    </div>
  );
}

ActivityItem.displayName = 'ActivityItem';
