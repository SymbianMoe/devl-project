'use client';

import { useState } from 'react';
import {
  DataTable,
  DataTableColumnHeader,
  Button,
  SearchInput,
  StatusBadge,
  EmptyState,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateUsers, type User } from '@/lib/mock-data';
import { Users as UsersIcon, Plus } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

export default function UsersPage() {
  const [users] = useState(() => generateUsers(50));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: 'email',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
      cell: ({ row }) => (
        <span className="capitalize">{row.getValue('role')}</span>
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string;
        return (
          <StatusBadge
            status={status === 'active' ? 'success' : 'inactive'}
            label={status}
          />
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return date.toLocaleDateString();
      },
    },
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">
            Manage your users and their permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      <div className="mb-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search users..."
          className="max-w-sm"
        />
      </div>

      {filteredUsers.length > 0 ? (
        <DataTable columns={columns} data={filteredUsers} enableSorting />
      ) : (
        <EmptyState
          icon={<UsersIcon className="h-10 w-10" />}
          title="No users found"
          description="Try adjusting your search query"
        />
      )}
      </div>
    </AnimatedPage>
  );
}
