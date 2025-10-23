import type { Meta, StoryObj } from '@storybook/react';
import { GradientBackground } from '../src/components/animated/gradient-background';

const meta = {
  title: 'Animated/GradientBackground',
  component: GradientBackground,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'purple', 'cyan', 'mixed'],
    },
  },
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full">
        <Story />
        <div className="relative z-10 flex h-full items-center justify-center">
          <div className="rounded-lg border bg-card/80 backdrop-blur-sm p-8 max-w-md">
            <h2 className="text-2xl font-bold mb-2">Gradient Background</h2>
            <p className="text-muted-foreground">
              This animated gradient background creates depth and visual
              interest. It automatically adjusts for light and dark themes.
            </p>
          </div>
        </div>
      </div>
    ),
  ],
} satisfies Meta<typeof GradientBackground>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    variant: 'default',
    showOrbs: true,
  },
};

export const Purple: Story = {
  args: {
    variant: 'purple',
    showOrbs: true,
  },
};

export const Cyan: Story = {
  args: {
    variant: 'cyan',
    showOrbs: true,
  },
};

export const Mixed: Story = {
  args: {
    variant: 'mixed',
    showOrbs: true,
  },
};

export const NoOrbs: Story = {
  args: {
    variant: 'default',
    showOrbs: false,
  },
};

export const WithLongContent: Story = {
  decorators: [
    (Story) => (
      <div className="relative min-h-screen w-full">
        <Story />
        <div className="relative z-10 container mx-auto py-20 space-y-8">
          <div className="rounded-lg border bg-card/80 backdrop-blur-sm p-8">
            <h2 className="text-2xl font-bold mb-4">Scrollable Content</h2>
            <p className="text-muted-foreground mb-4">
              The gradient background extends across the entire viewport. Scroll
              to see how it behaves with longer content.
            </p>
            <div className="space-y-4 text-sm text-muted-foreground">
              {Array.from({ length: 10 }).map((_, i) => (
                <p key={i}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris.
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  args: {
    variant: 'mixed',
    showOrbs: true,
  },
};

export const HeroSection: Story = {
  decorators: [
    (Story) => (
      <div className="relative h-screen w-full">
        <Story />
        <div className="relative z-10 flex h-full items-center justify-center text-center px-4">
          <div className="max-w-3xl space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
              Build Amazing Products
            </h1>
            <p className="text-xl text-muted-foreground">
              Create stunning user interfaces with our collection of animated
              components and beautiful gradient backgrounds.
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors">
                Get Started
              </button>
              <button className="px-6 py-3 border border-border rounded-lg font-medium hover:bg-accent transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    ),
  ],
  args: {
    variant: 'mixed',
    showOrbs: true,
  },
};

export const VariantComparison: Story = {
  decorators: [
    (Story) => (
      <div className="grid grid-cols-2 gap-px bg-border">
        {(['default', 'purple', 'cyan', 'mixed'] as const).map((variant) => (
          <div key={variant} className="relative h-64 w-full">
            <GradientBackground variant={variant} showOrbs={true} />
            <div className="relative z-10 flex h-full items-center justify-center">
              <div className="rounded-lg border bg-card/80 backdrop-blur-sm px-6 py-3">
                <p className="font-medium capitalize">{variant}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ),
  ],
  args: {},
};
