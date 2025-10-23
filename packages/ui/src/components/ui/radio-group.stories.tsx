import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { Label } from './label';

const meta = {
  title: 'Components/RadioGroup',
  component: RadioGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="option-one" />
        <Label htmlFor="option-one">Option One</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="option-two" />
        <Label htmlFor="option-two">Option Two</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="option-three" />
        <Label htmlFor="option-three">Option Three</Label>
      </div>
    </RadioGroup>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="mb-3 text-sm font-medium">Select your plan</h3>
        <RadioGroup defaultValue="free">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="free" id="free" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="free" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Free
              </Label>
              <p className="text-sm text-muted-foreground">
                Perfect for getting started
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="pro" id="pro" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="pro" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Pro
              </Label>
              <p className="text-sm text-muted-foreground">
                For professional developers
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="enterprise" id="enterprise" />
            <div className="grid gap-1.5 leading-none">
              <Label htmlFor="enterprise" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Enterprise
              </Label>
              <p className="text-sm text-muted-foreground">
                For large organizations
              </p>
            </div>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="option-one">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-one" id="r1" />
        <Label htmlFor="r1">Option One (Active)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-two" id="r2" disabled />
        <Label htmlFor="r2" className="opacity-50">Option Two (Disabled)</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="option-three" id="r3" disabled />
        <Label htmlFor="r3" className="opacity-50">Option Three (Disabled)</Label>
      </div>
    </RadioGroup>
  ),
};

export const Inline: Story = {
  render: () => (
    <RadioGroup defaultValue="yes" className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="yes" id="inline-yes" />
        <Label htmlFor="inline-yes">Yes</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="no" id="inline-no" />
        <Label htmlFor="inline-no">No</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value="maybe" id="inline-maybe" />
        <Label htmlFor="inline-maybe">Maybe</Label>
      </div>
    </RadioGroup>
  ),
};

export const FormExample: Story = {
  render: () => {
    const [selectedValue, setSelectedValue] = React.useState('comfortable');

    return (
      <div className="space-y-4 w-[400px]">
        <div>
          <h3 className="mb-4 text-lg font-semibold">Notification Settings</h3>
          <div className="space-y-4">
            <div>
              <Label className="text-base font-medium">Email Notifications</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Choose how often you want to receive email notifications
              </p>
              <RadioGroup value={selectedValue} onValueChange={setSelectedValue}>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="all" id="all" />
                  <Label htmlFor="all" className="font-normal">All activity</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="mentions" id="mentions" />
                  <Label htmlFor="mentions" className="font-normal">Only mentions</Label>
                </div>
                <div className="flex items-center space-x-2 mb-2">
                  <RadioGroupItem value="none" id="none" />
                  <Label htmlFor="none" className="font-normal">None</Label>
                </div>
              </RadioGroup>
            </div>
            <div className="pt-4 border-t">
              <p className="text-sm">
                <span className="font-medium">Selected:</span>{' '}
                <span className="text-muted-foreground">{selectedValue}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  },
};

export const MultipleGroups: Story = {
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div>
        <Label className="text-base font-medium mb-3 block">Theme</Label>
        <RadioGroup defaultValue="light">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="light" id="theme-light" />
            <Label htmlFor="theme-light">Light</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="dark" id="theme-dark" />
            <Label htmlFor="theme-dark">Dark</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="system" id="theme-system" />
            <Label htmlFor="theme-system">System</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="border-t pt-6">
        <Label className="text-base font-medium mb-3 block">Language</Label>
        <RadioGroup defaultValue="english">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="english" id="lang-en" />
            <Label htmlFor="lang-en">English</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="spanish" id="lang-es" />
            <Label htmlFor="lang-es">Spanish</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="french" id="lang-fr" />
            <Label htmlFor="lang-fr">French</Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  ),
};

export const PaymentMethod: Story = {
  render: () => (
    <div className="w-[400px]">
      <h3 className="mb-4 text-lg font-semibold">Select Payment Method</h3>
      <RadioGroup defaultValue="card">
        <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
          <RadioGroupItem value="card" id="payment-card" className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-card" className="text-sm font-medium leading-none">
              Credit Card
            </Label>
            <p className="text-sm text-muted-foreground">
              Pay securely with your credit or debit card
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
          <RadioGroupItem value="paypal" id="payment-paypal" className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-paypal" className="text-sm font-medium leading-none">
              PayPal
            </Label>
            <p className="text-sm text-muted-foreground">
              Pay using your PayPal account
            </p>
          </div>
        </div>
        <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-accent">
          <RadioGroupItem value="bank" id="payment-bank" className="mt-1" />
          <div className="grid gap-1.5 leading-none">
            <Label htmlFor="payment-bank" className="text-sm font-medium leading-none">
              Bank Transfer
            </Label>
            <p className="text-sm text-muted-foreground">
              Direct bank transfer (takes 2-3 business days)
            </p>
          </div>
        </div>
      </RadioGroup>
    </div>
  ),
};
