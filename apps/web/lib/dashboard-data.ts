/**
 * Mock Dashboard Data Generator
 *
 * Generates realistic mock data for the dashboard
 * In production, this would fetch from a real database/API
 */

export interface DashboardStats {
  totalRevenue: number;
  revenueChange: number;
  totalUsers: number;
  usersChange: number;
  activeUsers: number;
  activeUsersChange: number;
  conversionRate: number;
  conversionRateChange: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
  profit: number;
}

export interface UserGrowthData {
  month: string;
  users: number;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: string;
  status: 'success' | 'pending' | 'failed';
}

/**
 * Generate dashboard statistics
 */
export function generateDashboardStats(): DashboardStats {
  return {
    totalRevenue: 45231.89,
    revenueChange: 20.1,
    totalUsers: 2350,
    usersChange: 180.1,
    activeUsers: 573,
    activeUsersChange: 19.5,
    conversionRate: 24.3,
    conversionRateChange: -4.3,
  };
}

/**
 * Generate revenue chart data
 */
export function generateRevenueData(): RevenueData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    revenue: 2000 + index * 1000 + Math.random() * 500,
    profit: 800 + index * 400 + Math.random() * 200,
  }));
}

/**
 * Generate user growth chart data
 */
export function generateUserGrowthData(): UserGrowthData[] {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  return months.map((month, index) => ({
    month,
    users: 100 + index * 50 + Math.random() * 30,
  }));
}

/**
 * Generate recent activity data
 */
export function generateRecentActivity(): Activity[] {
  const users = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince'];
  const actions = [
    'Created new project',
    'Updated profile',
    'Completed task',
    'Invited team member',
    'Published article',
  ];
  const statuses: Array<'success' | 'pending' | 'failed'> = [
    'success',
    'pending',
    'failed',
  ];

  return Array.from({ length: 8 }, (_, i) => ({
    id: `activity-${i}`,
    user: users[Math.floor(Math.random() * users.length)],
    action: actions[Math.floor(Math.random() * actions.length)],
    timestamp: new Date(
      Date.now() - Math.random() * 3600000 * 24
    ).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
  }));
}

/**
 * Main function to fetch all dashboard data
 * Simulates API delay
 */
export async function getDashboardData() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  return {
    stats: generateDashboardStats(),
    revenueData: generateRevenueData(),
    userGrowthData: generateUserGrowthData(),
    recentActivity: generateRecentActivity(),
  };
}
