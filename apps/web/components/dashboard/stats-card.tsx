'use client';

import { Card, CardHeader, CardTitle, CardContent, AnimatedCounter } from '@devlaunch/ui';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  iconColor?: string;
}

/**
 * StatsCard - Display a KPI metric with animated counter
 */
export function StatsCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor = 'text-primary',
}: StatsCardProps) {
  const isPositive = change >= 0;

  // Parse numeric value from string (e.g., "$45,000" => 45000)
  const numericValue = typeof value === 'number'
    ? value
    : parseFloat(value.toString().replace(/[^0-9.]/g, ''));

  // Extract prefix and suffix
  const valueStr = value.toString();
  const prefix = valueStr.match(/^[^0-9]*/)?.[0] || '';
  const suffix = valueStr.match(/[^0-9.]*$/)?.[0] || '';

  // Determine decimal places
  const decimals = valueStr.includes('.')
    ? valueStr.split('.')[1]?.replace(/\D/g, '').length || 0
    : 0;

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className={cn('h-4 w-4', iconColor)} />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          <AnimatedCounter
            value={numericValue}
            prefix={prefix}
            suffix={suffix}
            decimals={decimals}
            duration={1.5}
          />
        </div>
        <p className="text-xs text-muted-foreground">
          <span
            className={cn(
              'font-medium',
              isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
            )}
          >
            {isPositive ? '+' : ''}
            {change}%
          </span>{' '}
          from last month
        </p>
      </CardContent>
    </Card>
  );
}
