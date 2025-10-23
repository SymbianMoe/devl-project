import { NextResponse } from 'next/server';
import { getDashboardData } from '@/lib/dashboard-data';

/**
 * Dashboard API Route
 *
 * GET /api/dashboard - Fetch dashboard data
 *
 * This route returns mock dashboard data including stats, charts, and activity.
 * In production, this would query a database or external API.
 *
 * Cache: No caching - always returns fresh data
 */
export async function GET() {
  try {
    const data = await getDashboardData();

    return NextResponse.json(data, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
}
