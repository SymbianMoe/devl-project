import type { Meta, StoryObj } from '@storybook/react';
import { Navbar } from '../src/components/navbar';
import { ThemeToggle } from '../src/components/theme-toggle';
import { Button } from '../src/components/ui/button';

const meta = {
  title: 'Custom/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleLinks = [
  { label: 'Home', href: '/', active: true },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Blog', href: '/blog' },
  { label: 'About', href: '/about' },
];

export const Default: Story = {
  args: {
    brand: <span className="font-bold text-lg">DevLaunch</span>,
    links: sampleLinks,
    onLinkClick: (href) => console.log('Navigate to:', href),
  },
};

export const WithActions: Story = {
  args: {
    brand: <span className="font-bold text-lg">DevLaunch</span>,
    links: sampleLinks,
    actions: (
      <>
        <ThemeToggle theme="light" />
        <Button size="sm">Sign In</Button>
      </>
    ),
    onLinkClick: (href) => console.log('Navigate to:', href),
  },
};

export const Sticky: Story = {
  args: {
    brand: <span className="font-bold text-lg">DevLaunch</span>,
    links: sampleLinks,
    sticky: true,
    actions: <ThemeToggle theme="light" />,
  },
  render: (args) => (
    <div>
      <Navbar {...args} />
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Content Below Navbar</h1>
        <div className="space-y-4">
          {Array.from({ length: 20 }, (_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scroll
              down to see the sticky navbar.
            </p>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const MinimalBrand: Story = {
  args: {
    brand: <div className="h-8 w-8 rounded bg-primary" />,
    links: sampleLinks,
  },
};

export const NoLinks: Story = {
  args: {
    brand: <span className="font-bold text-lg">DevLaunch</span>,
    actions: <Button>Get Started</Button>,
  },
};
