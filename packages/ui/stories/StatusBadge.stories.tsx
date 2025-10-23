import type { Meta, StoryObj } from '@storybook/react';
import { StatusBadge } from '../src/components/status-badge';

const meta = {
  title: 'Components/StatusBadge',
  component: StatusBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    status: {
      control: 'select',
      options: ['success', 'error', 'warning', 'info', 'pending'],
    },
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {
  args: {
    status: 'success',
    children: 'Active',
  },
};

export const Error: Story = {
  args: {
    status: 'error',
    children: 'Failed',
  },
};

export const Warning: Story = {
  args: {
    status: 'warning',
    children: 'Pending Review',
  },
};

export const Info: Story = {
  args: {
    status: 'info',
    children: 'Processing',
  },
};

export const Pending: Story = {
  args: {
    status: 'pending',
    children: 'Waiting',
  },
};

export const AllStatuses: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="success">Active</StatusBadge>
      <StatusBadge status="error">Failed</StatusBadge>
      <StatusBadge status="warning">Pending</StatusBadge>
      <StatusBadge status="info">Processing</StatusBadge>
      <StatusBadge status="pending">Waiting</StatusBadge>
    </div>
  ),
};
