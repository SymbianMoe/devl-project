'use client';

import { X } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { cn } from '../lib/utils';

export interface FilterItem {
  id: string;
  label: string;
  value: string;
}

export interface FilterBarProps {
  filters: FilterItem[];
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  className?: string;
}

export function FilterBar({
  filters,
  onRemove,
  onClearAll,
  className,
}: FilterBarProps) {
  if (filters.length === 0) {
    return null;
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <span className="text-sm text-muted-foreground">Filters:</span>
      {filters.map((filter) => (
        <Badge
          key={filter.id}
          variant="secondary"
          className="gap-1 pr-1"
        >
          <span>
            {filter.label}: {filter.value}
          </span>
          <button
            onClick={() => onRemove(filter.id)}
            className="rounded-sm hover:bg-muted"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      {onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="h-7 px-2 text-xs"
        >
          Clear all
        </Button>
      )}
    </div>
  );
}

FilterBar.displayName = 'FilterBar';
