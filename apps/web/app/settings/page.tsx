'use client';

import { useSettingsStore } from '@/store/settings-store';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Label,
  Input,
  Button,
  Badge,
} from '@devlaunch/ui';
import { Settings as SettingsIcon, Save, RotateCcw } from 'lucide-react';
import { useState } from 'react';

/**
 * Settings Page - Client-Side Rendering with Zustand
 *
 * This page is rendered entirely on the client using Zustand
 * for state management. Settings are persisted to localStorage.
 *
 * Rendering Mode: CSR (Client-Side Rendering)
 * State Management: Zustand with persist middleware
 * Persistence: localStorage
 */
export default function SettingsPage() {
  const { settings, updateSettings, resetSettings } = useSettingsStore();
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleReset = () => {
    resetSettings();
    setSaved(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your preferences (CSR with Zustand state)
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Settings Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Display Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Display Preferences</CardTitle>
              <CardDescription>
                Customize how content is displayed
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <select
                  id="language"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.language}
                  onChange={(e) =>
                    updateSettings({ language: e.target.value })
                  }
                >
                  <option value="en">English</option>
                  <option value="es">Español</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="timezone">Timezone</Label>
                <select
                  id="timezone"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  value={settings.timezone}
                  onChange={(e) =>
                    updateSettings({ timezone: e.target.value })
                  }
                >
                  <option value="America/Los_Angeles">Pacific Time</option>
                  <option value="America/Denver">Mountain Time</option>
                  <option value="America/Chicago">Central Time</option>
                  <option value="America/New_York">Eastern Time</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="itemsPerPage">Items Per Page</Label>
                <Input
                  id="itemsPerPage"
                  type="number"
                  min="5"
                  max="100"
                  value={settings.itemsPerPage}
                  onChange={(e) =>
                    updateSettings({
                      itemsPerPage: parseInt(e.target.value),
                    })
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>
                Control how you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="emailNotifications">
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <input
                  id="emailNotifications"
                  type="checkbox"
                  checked={settings.emailNotifications}
                  onChange={(e) =>
                    updateSettings({
                      emailNotifications: e.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="pushNotifications">
                    Push Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive push notifications
                  </p>
                </div>
                <input
                  id="pushNotifications"
                  type="checkbox"
                  checked={settings.pushNotifications}
                  onChange={(e) =>
                    updateSettings({
                      pushNotifications: e.target.checked,
                    })
                  }
                  className="h-4 w-4"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="weeklyDigest">Weekly Digest</Label>
                  <p className="text-sm text-muted-foreground">
                    Get a weekly summary email
                  </p>
                </div>
                <input
                  id="weeklyDigest"
                  type="checkbox"
                  checked={settings.weeklyDigest}
                  onChange={(e) =>
                    updateSettings({ weeklyDigest: e.target.checked })
                  }
                  className="h-4 w-4"
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button onClick={handleSave} className="flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-4 w-4" />
              Reset to Defaults
            </Button>
          </div>

          {saved && (
            <div className="text-sm text-green-600 dark:text-green-400">
              ✓ Settings saved successfully!
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Current Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Language:</span>
                <Badge variant="secondary">{settings.language}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Timezone:</span>
                <Badge variant="secondary">
                  {settings.timezone.split('/')[1]}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Items/Page:</span>
                <Badge variant="secondary">{settings.itemsPerPage}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Rendering Mode Info */}
          <Card className="border-primary/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <SettingsIcon className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold mb-1">
                    Zustand State Management
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Settings are managed with Zustand and persisted to
                    localStorage. Changes are saved automatically and persist
                    across sessions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
