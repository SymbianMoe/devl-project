import { Skeleton } from '@devlaunch/ui';

/**
 * Dashboard Loading State
 *
 * Displayed while the dashboard page is loading (SSR)
 */
export default function DashboardLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Skeleton */}
      <div className="mb-8">
        <Skeleton className="h-9 w-48 mb-2" />
        <Skeleton className="h-5 w-72" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <Skeleton className="h-4 w-24 mb-4" />
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-3 w-20" />
          </div>
        ))}
      </div>

      {/* Charts Skeleton */}
      <div className="mb-8 grid gap-4 lg:grid-cols-2">
        {Array.from({ length: 2 }).map((_, i) => (
          <div key={i} className="rounded-lg border p-6">
            <Skeleton className="h-6 w-40 mb-4" />
            <Skeleton className="h-[300px]" />
          </div>
        ))}
      </div>

      {/* Activity Table Skeleton */}
      <div className="rounded-lg border p-6">
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-full" />
          ))}
        </div>
      </div>
    </div>
  );
}
