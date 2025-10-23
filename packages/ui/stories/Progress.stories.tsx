import type { Meta, StoryObj } from '@storybook/react';
import { Progress } from '../src/components/ui/progress';

const meta = {
  title: 'UI/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: 50,
  },
};

export const Empty: Story = {
  args: {
    value: 0,
  },
};

export const Full: Story = {
  args: {
    value: 100,
  },
};

export const Loading: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Uploading...</span>
          <span>33%</span>
        </div>
        <Progress value={33} />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Processing...</span>
          <span>66%</span>
        </div>
        <Progress value={66} />
      </div>
      <div>
        <div className="mb-2 flex justify-between text-sm">
          <span>Complete</span>
          <span>100%</span>
        </div>
        <Progress value={100} />
      </div>
    </div>
  ),
};
