'use client';

import { Badge } from './ui/badge';
import { cn } from '../lib/utils';

export type StatusType =
  | 'success'
  | 'warning'
  | 'error'
  | 'info'
  | 'pending'
  | 'active'
  | 'inactive'
  | 'draft';

export interface StatusBadgeProps {
  status: StatusType;
  label?: string;
  className?: string;
}

const statusConfig: Record<
  StatusType,
  { label: string; className: string }
> = {
  success: {
    label: 'Success',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300',
  },
  warning: {
    label: 'Warning',
    className: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-900 dark:text-yellow-300',
  },
  error: {
    label: 'Error',
    className: 'bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-900 dark:text-red-300',
  },
  info: {
    label: 'Info',
    className: 'bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-300',
  },
  pending: {
    label: 'Pending',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
  },
  active: {
    label: 'Active',
    className: 'bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-300',
  },
  inactive: {
    label: 'Inactive',
    className: 'bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300',
  },
  draft: {
    label: 'Draft',
    className: 'bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-300',
  },
};

export function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <Badge className={cn(config.className, className)}>
      {label || config.label}
    </Badge>
  );
}

StatusBadge.displayName = 'StatusBadge';
