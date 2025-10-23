import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeToggle } from '../src/components/theme-toggle';

const meta = {
  title: 'Custom/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    theme: 'light',
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
  },
};

export const Interactive: Story = {
  render: () => {
    const [theme, setTheme] = useState('light');
    return (
      <div>
        <p className="mb-4 text-sm text-muted-foreground">
          Current theme: <strong>{theme}</strong>
        </p>
        <ThemeToggle theme={theme} onThemeChange={setTheme} />
      </div>
    );
  },
};
