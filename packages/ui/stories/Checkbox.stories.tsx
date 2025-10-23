import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '../src/components/ui/checkbox';
import { Label } from '../src/components/ui/label';

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

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
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <Checkbox id="option1" />
        <Label htmlFor="option1">Enable notifications</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option2" defaultChecked />
        <Label htmlFor="option2">Enable auto-updates</Label>
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox id="option3" disabled />
        <Label htmlFor="option3" className="text-muted-foreground">
          Disabled option
        </Label>
      </div>
    </div>
  ),
};
