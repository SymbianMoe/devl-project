// Mock data generators for dashboard

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'member' | 'viewer';
  status: 'active' | 'inactive';
  createdAt: string;
  lastActive: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'archived' | 'draft';
  owner: string;
  members: number;
  progress: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: 'info' | 'warning' | 'success' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface Activity {
  id: string;
  user: string;
  action: string;
  resource: string;
  timestamp: string;
}

const firstNames = ['John', 'Jane', 'Mike', 'Sarah', 'Tom', 'Emma', 'Chris', 'Lisa'];
const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];

export function generateUsers(count: number): User[] {
  const roles: User['role'][] = ['admin', 'member', 'member', 'member', 'viewer'];
  const statuses: User['status'][] = ['active', 'active', 'active', 'inactive'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    return {
      id: `user-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      createdAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      lastActive: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export function generateProjects(count: number): Project[] {
  const projectNames = [
    'Website Redesign',
    'Mobile App',
    'API Integration',
    'Dashboard Analytics',
    'E-commerce Platform',
  ];
  const statuses: Project['status'][] = ['active', 'active', 'draft', 'archived'];

  return Array.from({ length: count }, (_, i) => ({
    id: `proj-${i + 1}`,
    name: projectNames[i % projectNames.length],
    description: `Description for project ${i + 1}`,
    status: statuses[i % statuses.length],
    owner: `User ${(i % 10) + 1}`,
    members: Math.floor(Math.random() * 10) + 1,
    progress: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export function generateNotifications(count: number): Notification[] {
  const notifications = [
    { type: 'info' as const, title: 'New user', message: 'A new user signed up' },
    { type: 'success' as const, title: 'Project complete', message: 'Project completed' },
    { type: 'warning' as const, title: 'Low storage', message: 'Storage running low' },
    { type: 'error' as const, title: 'Build failed', message: 'Build failed' },
  ];

  return Array.from({ length: count }, (_, i) => ({
    id: `notif-${i + 1}`,
    ...notifications[i % notifications.length],
    read: Math.random() > 0.5,
    createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString(),
  }));
}

export function generateActivities(count: number): Activity[] {
  const actions = ['created', 'updated', 'deleted', 'viewed'];
  const resources = ['user', 'project', 'document', 'api-key'];

  return Array.from({ length: count }, (_, i) => ({
    id: `activity-${i + 1}`,
    user: `User ${(i % 10) + 1}`,
    action: actions[i % actions.length],
    resource: resources[i % resources.length],
    timestamp: new Date(Date.now() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
  }));
}

export interface APIKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  lastUsed: string;
  requests: number;
}

export function generateAPIKeys(count: number): APIKey[] {
  return Array.from({ length: count }, (_, i) => ({
    id: `key-${i + 1}`,
    name: `API Key ${i + 1}`,
    key: `sk_live_${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`,
    createdAt: new Date(Date.now() - Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString(),
    lastUsed: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
    requests: Math.floor(Math.random() * 100000),
  }));
}

export interface Integration {
  id: string;
  name: string;
  description: string;
  connected: boolean;
  logo: string;
  category: string;
}

export function generateIntegrations(): Integration[] {
  return [
    { id: '1', name: 'Slack', description: 'Team communication', connected: true, logo: '💬', category: 'Communication' },
    { id: '2', name: 'GitHub', description: 'Code repository', connected: true, logo: '🐙', category: 'Development' },
    { id: '3', name: 'Stripe', description: 'Payment processing', connected: false, logo: '💳', category: 'Payment' },
    { id: '4', name: 'Google Analytics', description: 'Web analytics', connected: true, logo: '📊', category: 'Analytics' },
    { id: '5', name: 'SendGrid', description: 'Email delivery', connected: false, logo: '📧', category: 'Email' },
    { id: '6', name: 'Vercel', description: 'Deployment', connected: true, logo: '▲', category: 'Hosting' },
    { id: '7', name: 'Figma', description: 'Design tool', connected: false, logo: '🎨', category: 'Design' },
    { id: '8', name: 'Jira', description: 'Project management', connected: false, logo: '📋', category: 'Management' },
  ];
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  status: 'online' | 'away' | 'offline';
  joinedAt: string;
}

export function generateTeamMembers(count: number): TeamMember[] {
  const roles = ['Engineering', 'Design', 'Product', 'Marketing', 'Sales'];
  const statuses: TeamMember['status'][] = ['online', 'online', 'away', 'offline'];

  return Array.from({ length: count }, (_, i) => {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[i % lastNames.length];
    return {
      id: `member-${i + 1}`,
      name: `${firstName} ${lastName}`,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@company.com`,
      role: roles[i % roles.length],
      status: statuses[i % statuses.length],
      joinedAt: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
  });
}

export interface Report {
  id: string;
  name: string;
  type: 'sales' | 'users' | 'performance' | 'analytics';
  status: 'completed' | 'processing' | 'failed';
  generatedAt: string;
  size: string;
}

export function generateReports(count: number): Report[] {
  const names = ['Monthly Sales Report', 'User Analytics', 'Performance Metrics', 'Traffic Analysis'];
  const types: Report['type'][] = ['sales', 'users', 'performance', 'analytics'];
  const statuses: Report['status'][] = ['completed', 'completed', 'completed', 'processing', 'failed'];

  return Array.from({ length: count }, (_, i) => ({
    id: `report-${i + 1}`,
    name: names[i % names.length],
    type: types[i % types.length],
    status: statuses[i % statuses.length],
    generatedAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    size: `${Math.floor(Math.random() * 5) + 1}.${Math.floor(Math.random() * 9)} MB`,
  }));
}

export interface AnalyticsData {
  date: string;
  users: number;
  revenue: number;
  pageViews: number;
  conversions: number;
}

export function generateAnalyticsData(days: number): AnalyticsData[] {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date(Date.now() - (days - i - 1) * 24 * 60 * 60 * 1000);
    return {
      date: date.toISOString().split('T')[0],
      users: Math.floor(Math.random() * 1000) + 500,
      revenue: Math.floor(Math.random() * 10000) + 5000,
      pageViews: Math.floor(Math.random() * 5000) + 2000,
      conversions: Math.floor(Math.random() * 100) + 50,
    };
  });
}
