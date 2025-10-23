import type { Meta, StoryObj } from '@storybook/react';
import { TechBadge } from '../src/components/animated/tech-badge';
import { Code2, Zap, Database, Layers } from 'lucide-react';

const meta = {
  title: 'Animated/TechBadge',
  component: TechBadge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'purple', 'cyan', 'green', 'orange'],
    },
  },
} satisfies Meta<typeof TechBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'TypeScript',
    glow: true,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Next.js',
    icon: <Code2 className="h-4 w-4" />,
    glow: true,
  },
};

export const Purple: Story = {
  args: {
    label: 'React',
    variant: 'purple',
    glow: true,
  },
};

export const Cyan: Story = {
  args: {
    label: 'Tailwind CSS',
    variant: 'cyan',
    icon: <Zap className="h-4 w-4" />,
    glow: true,
  },
};

export const Green: Story = {
  args: {
    label: 'Node.js',
    variant: 'green',
    icon: <Database className="h-4 w-4" />,
    glow: true,
  },
};

export const Orange: Story = {
  args: {
    label: 'Zustand',
    variant: 'orange',
    icon: <Layers className="h-4 w-4" />,
    glow: true,
  },
};

export const NoGlow: Story = {
  args: {
    label: 'JavaScript',
    glow: false,
  },
};

export const TechStack: Story = {
  render: () => (
    <div className="flex flex-wrap gap-3">
      <TechBadge label="TypeScript" variant="cyan" />
      <TechBadge label="React" variant="purple" />
      <TechBadge label="Next.js" variant="default" />
      <TechBadge label="Tailwind" variant="cyan" />
      <TechBadge label="Zustand" variant="orange" />
      <TechBadge label="Framer Motion" variant="purple" />
    </div>
  ),
};
