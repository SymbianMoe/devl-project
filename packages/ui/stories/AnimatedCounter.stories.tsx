import type { Meta, StoryObj } from '@storybook/react';
import { AnimatedCounter } from '../src/components/animated/animated-counter';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';

const meta = {
  title: 'Animated/AnimatedCounter',
  component: AnimatedCounter,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AnimatedCounter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 1234,
    duration: 2,
  },
};

export const WithPrefix: Story = {
  args: {
    value: 45231,
    prefix: '$',
    duration: 2,
  },
};

export const WithSuffix: Story = {
  args: {
    value: 99.9,
    suffix: '%',
    decimals: 1,
    duration: 2,
  },
};

export const WithDecimals: Story = {
  args: {
    value: 24.57,
    decimals: 2,
    duration: 2,
  },
};

export const Currency: Story = {
  args: {
    value: 89.5,
    prefix: '$',
    suffix: 'K',
    decimals: 1,
    duration: 2,
  },
};

export const Percentage: Story = {
  args: {
    value: 24.3,
    suffix: '%',
    decimals: 1,
    duration: 2,
  },
};

export const DashboardStats: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={45231} prefix="$" duration={1.5} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={2350} duration={1.5} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={24.3} suffix="%" decimals={1} duration={1.5} />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Growth</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            <AnimatedCounter value={89.5} prefix="$" suffix="K" decimals={1} duration={1.5} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};
