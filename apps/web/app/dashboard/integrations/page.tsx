'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  StatusBadge,
  SearchInput,
  AnimatedContainer,
  AnimatedItem,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateIntegrations, type Integration } from '@/lib/mock-data';
import { Link as LinkIcon, ExternalLink } from 'lucide-react';

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState(() => generateIntegrations());
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'connected' | 'available'>('all');

  const filteredIntegrations = integrations.filter((integration) => {
    const matchesSearch =
      integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      integration.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'connected' && integration.connected) ||
      (filter === 'available' && !integration.connected);

    return matchesSearch && matchesFilter;
  });

  const toggleConnection = (id: string) => {
    setIntegrations((prev) =>
      prev.map((integration) =>
        integration.id === id
          ? { ...integration, connected: !integration.connected }
          : integration
      )
    );
  };

  const connectedCount = integrations.filter((i) => i.connected).length;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Integrations</h1>
        <p className="text-muted-foreground">
          Connect your favorite tools and services ({connectedCount} connected)
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search integrations..."
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All ({integrations.length})
          </Button>
          <Button
            variant={filter === 'connected' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('connected')}
          >
            Connected ({connectedCount})
          </Button>
          <Button
            variant={filter === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('available')}
          >
            Available ({integrations.length - connectedCount})
          </Button>
        </div>
      </div>

      <AnimatedContainer stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredIntegrations.map((integration) => (
          <AnimatedItem key={integration.id}>
            <Card
            key={integration.id}
            className={`hover:shadow-md transition-shadow ${
              integration.connected ? 'border-primary' : ''
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{integration.logo}</div>
                  <div>
                    <CardTitle className="text-lg">{integration.name}</CardTitle>
                    <CardDescription className="text-xs">
                      {integration.category}
                    </CardDescription>
                  </div>
                </div>
                {integration.connected && (
                  <StatusBadge status="success" label="Connected" />
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {integration.description}
              </p>
              <div className="flex gap-2">
                <Button
                  variant={integration.connected ? 'outline' : 'default'}
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleConnection(integration.id)}
                >
                  {integration.connected ? (
                    <>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Disconnect
                    </>
                  ) : (
                    <>
                      <LinkIcon className="mr-2 h-4 w-4" />
                      Connect
                    </>
                  )}
                </Button>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
          </AnimatedItem>
        ))}
      </AnimatedContainer>

      {filteredIntegrations.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No integrations found</p>
        </div>
      )}
      </div>
    </AnimatedPage>
  );
}
