import type { Meta, StoryObj } from '@storybook/react';
import { SearchInput } from '../src/components/search-input';

const meta = {
  title: 'Components/SearchInput',
  component: SearchInput,
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
} satisfies Meta<typeof SearchInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Search...',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Search...',
    defaultValue: 'Next.js',
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: 'Search users, projects, or documents...',
  },
};

export const WithHandler: Story = {
  args: {
    placeholder: 'Type to search...',
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Search value:', e.target.value);
    },
  },
};
