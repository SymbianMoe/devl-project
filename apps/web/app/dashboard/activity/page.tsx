'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  ActivityItem,
  SearchInput,
  Button,
} from '@devlaunch/ui';
import { generateActivities, type Activity } from '@/lib/mock-data';
import { Filter } from 'lucide-react';

export default function ActivityPage() {
  const [activities, setActivities] = useState(() => generateActivities(50));
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'created' | 'updated' | 'deleted'>('all');

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.resource.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilter = filter === 'all' || activity.action === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Activity Log</h1>
        <p className="text-muted-foreground">
          Track all activities and changes in your workspace
        </p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <SearchInput
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search activities..."
          className="max-w-sm"
        />
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button
            variant={filter === 'created' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('created')}
          >
            Created
          </Button>
          <Button
            variant={filter === 'updated' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('updated')}
          >
            Updated
          </Button>
          <Button
            variant={filter === 'deleted' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('deleted')}
          >
            Deleted
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          {filteredActivities.length > 0 ? (
            <div className="space-y-4">
              {filteredActivities.map((activity, index) => (
                <ActivityItem
                  key={activity.id}
                  user={activity.user}
                  action={activity.action}
                  resource={activity.resource}
                  timestamp={activity.timestamp}
                  isLast={index === filteredActivities.length - 1}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No activities found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
