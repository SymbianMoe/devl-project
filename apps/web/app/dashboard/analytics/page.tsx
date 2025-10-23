'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  AnimatedContainer,
  AnimatedItem,
  AnimatedPage,
  AnimatedCounter,
} from '@devlaunch/ui';
import { generateAnalyticsData } from '@/lib/mock-data';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { TrendingUp, Users, DollarSign, Eye, ArrowUpRight } from 'lucide-react';

export default function AnalyticsPage() {
  const [data] = useState(() => generateAnalyticsData(30));

  const totalUsers = data.reduce((sum, d) => sum + d.users, 0);
  const totalRevenue = data.reduce((sum, d) => sum + d.revenue, 0);
  const totalPageViews = data.reduce((sum, d) => sum + d.pageViews, 0);
  const totalConversions = data.reduce((sum, d) => sum + d.conversions, 0);

  const stats = [
    {
      title: 'Total Users',
      value: totalUsers,
      displayValue: totalUsers.toLocaleString(),
      change: '+12.5%',
      icon: Users,
      color: 'text-blue-600',
      prefix: '',
      suffix: '',
    },
    {
      title: 'Revenue',
      value: totalRevenue / 1000,
      displayValue: `$${(totalRevenue / 1000).toFixed(1)}k`,
      change: '+23.1%',
      icon: DollarSign,
      color: 'text-green-600',
      prefix: '$',
      suffix: 'k',
      decimals: 1,
    },
    {
      title: 'Page Views',
      value: totalPageViews / 1000,
      displayValue: (totalPageViews / 1000).toFixed(1) + 'k',
      change: '+8.2%',
      icon: Eye,
      color: 'text-purple-600',
      prefix: '',
      suffix: 'k',
      decimals: 1,
    },
    {
      title: 'Conversions',
      value: totalConversions,
      displayValue: totalConversions.toLocaleString(),
      change: '+15.3%',
      icon: TrendingUp,
      color: 'text-orange-600',
      prefix: '',
      suffix: '',
    },
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">
            Track your performance metrics and trends
          </p>
        </div>

        {/* Stats Grid */}
        <AnimatedContainer stagger className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <AnimatedItem key={stat.title}>
              <Card className="h-full">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      decimals={stat.decimals || 0}
                      duration={1.5}
                    />
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <ArrowUpRight className="mr-1 h-3 w-3 text-green-600" />
                    <span className="text-green-600">{stat.change}</span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            </AnimatedItem>
          ))}
        </AnimatedContainer>

        {/* Charts Grid */}
        <AnimatedContainer stagger className="grid gap-4 lg:grid-cols-2">
          {/* User Growth Chart */}
          <AnimatedItem>
            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>Daily active users over time</CardDescription>
              </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="users" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </AnimatedItem>

          {/* Revenue Chart */}
          <AnimatedItem>
            <Card>
              <CardHeader>
                <CardTitle>Revenue</CardTitle>
                <CardDescription>Daily revenue trends</CardDescription>
              </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </AnimatedItem>

          {/* Page Views Chart */}
          <AnimatedItem>
            <Card>
              <CardHeader>
                <CardTitle>Page Views</CardTitle>
                <CardDescription>Traffic analytics</CardDescription>
              </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="pageViews" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </AnimatedItem>

          {/* Conversions Chart */}
          <AnimatedItem>
            <Card>
              <CardHeader>
                <CardTitle>Conversions</CardTitle>
                <CardDescription>Conversion rate over time</CardDescription>
              </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" tickFormatter={(val) => new Date(val).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="conversions" stroke="#f97316" fill="#f97316" fillOpacity={0.3} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
          </AnimatedItem>
        </AnimatedContainer>
      </div>
    </AnimatedPage>
  );
}
