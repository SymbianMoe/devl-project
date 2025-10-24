import type { Meta, StoryObj } from '@storybook/react';
import { Pagination } from '../src/components/pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    pageSize: 10,
    totalItems: 100,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 2,
    totalPages: 3,
    pageSize: 20,
    totalItems: 50,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};

export const ManyPages: Story = {
  args: {
    currentPage: 42,
    totalPages: 100,
    pageSize: 20,
    totalItems: 2000,
    onPageChange: (page: number) => console.log('Page changed to:', page),
  },
};
