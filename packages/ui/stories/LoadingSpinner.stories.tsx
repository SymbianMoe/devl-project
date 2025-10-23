import type { Meta, StoryObj } from '@storybook/react';
import { LoadingSpinner } from '../src/components/loading-spinner';

const meta = {
  title: 'Custom/LoadingSpinner',
  component: LoadingSpinner,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof LoadingSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Loading data...',
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex gap-8 items-end">
      <LoadingSpinner size="sm" label="Small" />
      <LoadingSpinner size="md" label="Medium" />
      <LoadingSpinner size="lg" label="Large" />
    </div>
  ),
};
