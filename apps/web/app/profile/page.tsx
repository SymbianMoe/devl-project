'use client';

import { useQuery } from '@tanstack/react-query';
import { Card, CardHeader, CardTitle, CardContent, LoadingSpinner, Badge } from '@devlaunch/ui';
import { User as UserIcon, MapPin, Globe, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';
import type { User } from '@/types/user';

/**
 * Fetch user data from API
 */
async function fetchUser(): Promise<User> {
  const res = await fetch('/api/user');
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
}

/**
 * Profile Page - Client-Side Rendering with React Query
 *
 * This page is rendered entirely on the client using React Query
 * for data fetching and caching. Perfect for user-specific data.
 *
 * Rendering Mode: CSR (Client-Side Rendering)
 * Data Fetching: Client-side with React Query
 * Cache: Managed by React Query (stale-while-revalidate)
 */
export default function ProfilePage() {
  const { data: user, isLoading, error } = useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <LoadingSpinner size="lg" label="Loading profile..." />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-destructive">
          Failed to load profile. Please try again.
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">
          Client-side rendered with React Query (CSR mode)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* User Info Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-start gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="h-20 w-20 rounded-full"
              />
              <div className="flex-1">
                <CardTitle className="text-2xl">{user.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-base">{user.bio}</p>

            <div className="space-y-2">
              {user.location && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{user.location}</span>
                </div>
              )}
              {user.website && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <a
                    href={user.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-primary transition-colors"
                  >
                    {user.website}
                  </a>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>
                  Joined {format(new Date(user.joinedAt), 'MMMM yyyy')}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Followers</span>
              <Badge variant="secondary">{user.stats.followers}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Following</span>
              <Badge variant="secondary">{user.stats.following}</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Posts</span>
              <Badge variant="secondary">{user.stats.posts}</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rendering Mode Info */}
      <Card className="mt-6 border-primary/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <UserIcon className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">Client-Side Rendering (CSR)</h3>
              <p className="text-sm text-muted-foreground">
                This page is rendered on the client using React Query for data
                fetching. Data is fetched after the page loads and cached
                efficiently for subsequent visits.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
