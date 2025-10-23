import type { Meta, StoryObj } from '@storybook/react';
import {
  Home,
  LayoutDashboard,
  FileText,
  Settings,
  User,
} from 'lucide-react';
import { Sidebar } from '../src/components/sidebar';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Custom/Sidebar',
  component: Sidebar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleSections = [
  {
    title: 'Main',
    links: [
      {
        label: 'Home',
        href: '/',
        icon: <Home className="h-5 w-5" />,
        active: true,
      },
      {
        label: 'Dashboard',
        href: '/dashboard',
        icon: <LayoutDashboard className="h-5 w-5" />,
      },
      {
        label: 'Blog',
        href: '/blog',
        icon: <FileText className="h-5 w-5" />,
      },
    ],
  },
  {
    title: 'Settings',
    links: [
      {
        label: 'Profile',
        href: '/profile',
        icon: <User className="h-5 w-5" />,
      },
      {
        label: 'Settings',
        href: '/settings',
        icon: <Settings className="h-5 w-5" />,
      },
    ],
  },
];

export const Default: Story = {
  args: {
    sections: sampleSections,
    header: <span className="font-bold text-lg">DevLaunch</span>,
    onLinkClick: (href) => console.log('Navigate to:', href),
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Main Content</h1>
        <p>This is the main content area next to the sidebar.</p>
      </main>
    </div>
  ),
};

export const WithFooter: Story = {
  args: {
    sections: sampleSections,
    header: <span className="font-bold text-lg">DevLaunch</span>,
    footer: (
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-primary" />
        <div className="text-sm">
          <p className="font-medium">John Doe</p>
          <p className="text-xs text-muted-foreground">john@example.com</p>
        </div>
      </div>
    ),
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">With Footer</h1>
        <p>Sidebar includes a user profile in the footer.</p>
      </main>
    </div>
  ),
};

export const DefaultCollapsed: Story = {
  args: {
    sections: sampleSections,
    header: <div className="h-8 w-8 rounded bg-primary" />,
    defaultCollapsed: true,
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Collapsed by Default</h1>
        <p>Click the collapse button to expand the sidebar.</p>
      </main>
    </div>
  ),
};

export const NotCollapsible: Story = {
  args: {
    sections: sampleSections,
    header: <span className="font-bold text-lg">DevLaunch</span>,
    collapsible: false,
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">Not Collapsible</h1>
        <p>This sidebar cannot be collapsed.</p>
      </main>
    </div>
  ),
};

export const NoSectionTitles: Story = {
  args: {
    sections: [
      {
        links: [
          {
            label: 'Home',
            href: '/',
            icon: <Home className="h-5 w-5" />,
          },
          {
            label: 'Dashboard',
            href: '/dashboard',
            icon: <LayoutDashboard className="h-5 w-5" />,
          },
          {
            label: 'Blog',
            href: '/blog',
            icon: <FileText className="h-5 w-5" />,
          },
        ],
      },
    ],
    header: <span className="font-bold text-lg">DevLaunch</span>,
  },
  render: (args) => (
    <div className="flex h-screen">
      <Sidebar {...args} />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-4">No Section Titles</h1>
        <p>Sidebar without section headings.</p>
      </main>
    </div>
  ),
};
