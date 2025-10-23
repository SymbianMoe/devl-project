'use client';

import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  FolderKanban,
  UsersRound,
  FileText,
  Activity,
  Key,
  Puzzle,
  Bell,
  Settings,
  HelpCircle,
} from 'lucide-react';
import { Sidebar } from '@devlaunch/ui';
import { ThemeToggleWrapper } from '../theme-toggle-wrapper';

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const sections = [
    {
      title: 'Main',
      links: [
        {
          label: 'Overview',
          href: '/dashboard',
          icon: <LayoutDashboard className="h-5 w-5" />,
          active: pathname === '/dashboard',
        },
        {
          label: 'Analytics',
          href: '/dashboard/analytics',
          icon: <TrendingUp className="h-5 w-5" />,
          active: pathname === '/dashboard/analytics',
        },
      ],
    },
    {
      title: 'Management',
      links: [
        {
          label: 'Users',
          href: '/dashboard/users',
          icon: <Users className="h-5 w-5" />,
          active: pathname.startsWith('/dashboard/users'),
        },
        {
          label: 'Projects',
          href: '/dashboard/projects',
          icon: <FolderKanban className="h-5 w-5" />,
          active: pathname.startsWith('/dashboard/projects'),
        },
        {
          label: 'Team',
          href: '/dashboard/team',
          icon: <UsersRound className="h-5 w-5" />,
          active: pathname === '/dashboard/team',
        },
      ],
    },
    {
      title: 'Data',
      links: [
        {
          label: 'Reports',
          href: '/dashboard/reports',
          icon: <FileText className="h-5 w-5" />,
          active: pathname === '/dashboard/reports',
        },
        {
          label: 'Activity Log',
          href: '/dashboard/activity',
          icon: <Activity className="h-5 w-5" />,
          active: pathname === '/dashboard/activity',
        },
      ],
    },
    {
      title: 'Developer',
      links: [
        {
          label: 'API Keys',
          href: '/dashboard/api-keys',
          icon: <Key className="h-5 w-5" />,
          active: pathname === '/dashboard/api-keys',
        },
        {
          label: 'Integrations',
          href: '/dashboard/integrations',
          icon: <Puzzle className="h-5 w-5" />,
          active: pathname === '/dashboard/integrations',
        },
      ],
    },
    {
      title: 'Settings',
      links: [
        {
          label: 'Notifications',
          href: '/dashboard/notifications',
          icon: <Bell className="h-5 w-5" />,
          active: pathname === '/dashboard/notifications',
        },
        {
          label: 'Settings',
          href: '/dashboard/settings',
          icon: <Settings className="h-5 w-5" />,
          active: pathname === '/dashboard/settings',
        },
        {
          label: 'Help',
          href: '/dashboard/help',
          icon: <HelpCircle className="h-5 w-5" />,
          active: pathname === '/dashboard/help',
        },
      ],
    },
  ];

  return (
    <Sidebar
      sections={sections}
      header={
        <Link href="/dashboard" className="font-bold text-lg">
          Dashboard
        </Link>
      }
      footer={
        <div className="border-t pt-4 pb-2">
          <div className="flex items-center justify-between px-3">
            <span className="text-sm text-muted-foreground">Theme</span>
            <ThemeToggleWrapper />
          </div>
        </div>
      }
      onLinkClick={(href) => {
        router.push(href);
      }}
      collapsible
      defaultCollapsed={false}
    />
  );
}
