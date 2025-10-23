import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '../src/components/ui/switch';
import { Label } from '../src/components/ui/label';

const meta = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Marketing emails</Label>
          <div className="text-sm text-muted-foreground">
            Receive emails about new products and features.
          </div>
        </div>
        <Switch />
      </div>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <Label>Security emails</Label>
          <div className="text-sm text-muted-foreground">
            Receive emails about account activity.
          </div>
        </div>
        <Switch defaultChecked />
      </div>
    </div>
  ),
};
