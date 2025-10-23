'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  Button,
  StatusBadge,
  EmptyState,
  AnimatedContainer,
  AnimatedItem,
  AnimatedPage,
} from '@devlaunch/ui';
import { generateNotifications, type Notification } from '@/lib/mock-data';
import { Bell, Check, Trash2 } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(() => generateNotifications(30));
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter((n) =>
    filter === 'all' ? true : !n.read
  );

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <AnimatedPage>
      <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <Button onClick={markAllAsRead} disabled={unreadCount === 0}>
          <Check className="mr-2 h-4 w-4" />
          Mark All Read
        </Button>
      </div>

      <div className="mb-6 flex gap-2">
        <Button
          variant={filter === 'all' ? 'default' : 'outline'}
          onClick={() => setFilter('all')}
        >
          All ({notifications.length})
        </Button>
        <Button
          variant={filter === 'unread' ? 'default' : 'outline'}
          onClick={() => setFilter('unread')}
        >
          Unread ({unreadCount})
        </Button>
      </div>

      {filteredNotifications.length > 0 ? (
        <AnimatedContainer stagger className="space-y-3">
          {filteredNotifications.map((notification) => (
            <AnimatedItem key={notification.id}>
              <Card
              key={notification.id}
              className={!notification.read ? 'border-l-4 border-l-primary' : ''}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <StatusBadge status={notification.type} />
                      <h3 className="font-semibold">{notification.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <span className="text-xs text-muted-foreground">
                      {new Date(notification.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markAsRead(notification.id)}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteNotification(notification.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            </AnimatedItem>
          ))}
        </AnimatedContainer>
      ) : (
        <EmptyState
          icon={<Bell className="h-10 w-10" />}
          title="No notifications"
          description="You're all caught up!"
        />
      )}
      </div>
    </AnimatedPage>
  );
}
