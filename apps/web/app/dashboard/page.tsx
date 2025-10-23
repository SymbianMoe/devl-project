'use client';

import { useEffect, useState } from 'react';
import { DollarSign, Users, Activity, TrendingUp } from 'lucide-react';
import { AnimatedContainer, AnimatedItem, AnimatedPage } from '@devlaunch/ui';
import {
  StatsCard,
  RevenueChart,
  UserChart,
  RecentActivity,
} from '@/components/dashboard';

/**
 * Dashboard Page - Client-Side with animations
 *
 * This page fetches data on mount and displays with smooth animations.
 */
export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    const fetchData = async () => {
      // Generate mock data for charts
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

      const mockData = {
        stats: {
          totalRevenue: 45231,
          revenueChange: 20.1,
          totalUsers: 2350,
          usersChange: 15.3,
          activeUsers: 573,
          activeUsersChange: 12.5,
          conversionRate: 24.3,
          conversionRateChange: 8.2,
        },
        revenueData: months.map((month, i) => ({
          month,
          revenue: 30000 + Math.random() * 20000 + i * 5000,
          profit: 15000 + Math.random() * 10000 + i * 2500,
        })),
        userGrowthData: months.map((month, i) => ({
          month,
          users: 1500 + Math.random() * 500 + i * 200,
        })),
        recentActivity: [
          {
            id: '1',
            user: 'John Doe',
            action: 'Created new project',
            status: 'success' as const,
            timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
          },
          {
            id: '2',
            user: 'Jane Smith',
            action: 'Updated user settings',
            status: 'success' as const,
            timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
          },
          {
            id: '3',
            user: 'Bob Johnson',
            action: 'Uploaded documents',
            status: 'pending' as const,
            timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          },
          {
            id: '4',
            user: 'Alice Williams',
            action: 'Invited team member',
            status: 'success' as const,
            timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
          },
          {
            id: '5',
            user: 'Charlie Brown',
            action: 'Failed to sync data',
            status: 'failed' as const,
            timestamp: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
          },
        ],
      };
      setData(mockData);
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const { stats, revenueData, userGrowthData, recentActivity } = data;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Real-time analytics and insights
          </p>
        </div>

        {/* Stats Grid */}
        <AnimatedContainer stagger className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedItem>
            <StatsCard
              title="Total Revenue"
              value={`$${stats.totalRevenue.toLocaleString()}`}
              change={stats.revenueChange}
              icon={DollarSign}
              iconColor="text-green-600"
            />
          </AnimatedItem>
          <AnimatedItem>
            <StatsCard
              title="Total Users"
              value={stats.totalUsers.toLocaleString()}
              change={stats.usersChange}
              icon={Users}
              iconColor="text-blue-600"
            />
          </AnimatedItem>
          <AnimatedItem>
            <StatsCard
              title="Active Users"
              value={stats.activeUsers.toLocaleString()}
              change={stats.activeUsersChange}
              icon={Activity}
              iconColor="text-purple-600"
            />
          </AnimatedItem>
          <AnimatedItem>
            <StatsCard
              title="Conversion Rate"
              value={`${stats.conversionRate}%`}
              change={stats.conversionRateChange}
              icon={TrendingUp}
              iconColor="text-orange-600"
            />
          </AnimatedItem>
        </AnimatedContainer>

        {/* Charts Grid */}
        <AnimatedContainer stagger className="mb-8 grid gap-4 lg:grid-cols-2">
          <AnimatedItem>
            <RevenueChart data={revenueData} />
          </AnimatedItem>
          <AnimatedItem>
            <UserChart data={userGrowthData} />
          </AnimatedItem>
        </AnimatedContainer>

        {/* Recent Activity */}
        <AnimatedItem>
          <RecentActivity activities={recentActivity} />
        </AnimatedItem>
      </div>
    </AnimatedPage>
  );
}
