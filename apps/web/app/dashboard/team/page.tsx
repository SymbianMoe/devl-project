'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  DataTable,
  DataTableColumnHeader,
  Avatar,
  StatusBadge,
  SearchInput,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateTeamMembers, type TeamMember } from '@/lib/mock-data';
import { Plus, Mail, MoreVertical } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

export default function TeamPage() {
  const [members] = useState(() => generateTeamMembers(25));
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const columns: ColumnDef<TeamMember>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Member" />
      ),
      cell: ({ row }) => {
        const member = row.original;
        return (
          <div className="flex items-center gap-3">
            <Avatar>
              <div className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground">
                {member.name.split(' ').map((n) => n[0]).join('')}
              </div>
            </Avatar>
            <div>
              <div className="font-medium">{member.name}</div>
              <div className="text-sm text-muted-foreground">{member.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: 'role',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Role" />
      ),
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue<TeamMember['status']>('status');
        const statusMap: Record<TeamMember['status'], 'success' | 'warning' | 'error'> = {
          online: 'success',
          away: 'warning',
          offline: 'error',
        };
        return (
          <StatusBadge
            status={statusMap[status]}
            label={status.charAt(0).toUpperCase() + status.slice(1)}
          />
        );
      },
    },
    {
      accessorKey: 'joinedAt',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Joined" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('joinedAt'));
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      cell: () => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Mail className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Team</h1>
          <p className="text-muted-foreground">
            Manage your team members and their roles
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Invite Member
        </Button>
      </div>

      <div className="mb-6">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search team members..."
          className="max-w-sm"
        />
      </div>

      <Card>
        <CardContent className="p-6">
          <DataTable columns={columns} data={filteredMembers} />
        </CardContent>
      </Card>
      </div>
    </AnimatedPage>
  );
}
