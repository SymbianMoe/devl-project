'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  DataTable,
  DataTableColumnHeader,
} from '@devlaunch/ui';
import { generateAPIKeys, type APIKey } from '@/lib/mock-data';
import { Plus, Copy, RefreshCw, Trash2 } from 'lucide-react';
import type { ColumnDef } from '@tanstack/react-table';

export default function APIKeysPage() {
  const [keys, setKeys] = useState(() => generateAPIKeys(5));

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const deleteKey = (id: string) => {
    setKeys((prev) => prev.filter((k) => k.id !== id));
  };

  const columns: ColumnDef<APIKey>[] = [
    {
      accessorKey: 'name',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    {
      accessorKey: 'key',
      header: 'API Key',
      cell: ({ row }) => {
        const key = row.getValue('key') as string;
        const masked = key.substring(0, 12) + '•'.repeat(20);
        return (
          <div className="flex items-center gap-2">
            <code className="text-sm">{masked}</code>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => copyToClipboard(key)}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        );
      },
    },
    {
      accessorKey: 'requests',
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Requests" />
      ),
      cell: ({ row }) => (
        <span>{row.getValue<number>('requests').toLocaleString()}</span>
      ),
    },
    {
      accessorKey: 'lastUsed',
      header: 'Last Used',
      cell: ({ row }) => {
        const date = new Date(row.getValue('lastUsed'));
        return date.toLocaleDateString();
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => deleteKey(row.original.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="text-muted-foreground">
            Manage your API keys and access tokens
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create API Key
        </Button>
      </div>

      <Card>
        <CardContent className="p-6">
          <DataTable columns={columns} data={keys} />
        </CardContent>
      </Card>
    </div>
  );
}
