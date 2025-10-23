import type { Meta, StoryObj } from '@storybook/react';
import { Inbox, Search, Package } from 'lucide-react';
import { EmptyState } from '../src/components/empty-state';

const meta = {
  title: 'Custom/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof EmptyState>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: 'No items found',
    description: 'Get started by creating your first item.',
  },
};

export const WithAction: Story = {
  args: {
    title: 'No projects',
    description: 'You haven\'t created any projects yet. Create one to get started.',
    action: {
      label: 'Create Project',
      onClick: () => alert('Create project clicked'),
    },
  },
};

export const SearchEmpty: Story = {
  args: {
    icon: <Search className="h-10 w-10 text-muted-foreground" />,
    title: 'No results found',
    description: 'Try adjusting your search terms or filters.',
  },
};

export const PackageEmpty: Story = {
  args: {
    icon: <Package className="h-10 w-10 text-muted-foreground" />,
    title: 'No packages',
    description: 'Install your first package to get started.',
    action: {
      label: 'Browse Packages',
      onClick: () => alert('Browse clicked'),
    },
  },
};

export const Minimal: Story = {
  args: {
    title: 'Nothing here',
  },
};
