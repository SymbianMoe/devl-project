'use client';

import { Button } from '@devlaunch/ui';
import { useThemeStore, useUserStore, useSettingsStore } from '@/store';

/**
 * Example component demonstrating Zustand store usage
 * This can be removed after testing
 */
export function StoreExample() {
  const { theme, toggleTheme } = useThemeStore();
  const { isAuthenticated, name, login, logout } = useUserStore();
  const { notifications, toggleNotifications } = useSettingsStore();

  return (
    <div className="space-y-4 rounded-lg border p-6">
      <h3 className="text-lg font-semibold">Store Example</h3>

      {/* Theme Store */}
      <div className="space-y-2">
        <p className="text-sm">
          Theme: <strong>{theme}</strong>
        </p>
        <Button size="sm" onClick={toggleTheme}>
          Toggle Theme
        </Button>
      </div>

      {/* User Store */}
      <div className="space-y-2">
        <p className="text-sm">
          User: {isAuthenticated ? <strong>{name}</strong> : 'Not logged in'}
        </p>
        {isAuthenticated ? (
          <Button size="sm" variant="outline" onClick={logout}>
            Logout
          </Button>
        ) : (
          <Button
            size="sm"
            onClick={() => login('user@example.com', 'password')}
          >
            Login
          </Button>
        )}
      </div>

      {/* Settings Store */}
      <div className="space-y-2">
        <p className="text-sm">
          Notifications: <strong>{notifications ? 'On' : 'Off'}</strong>
        </p>
        <Button size="sm" variant="secondary" onClick={toggleNotifications}>
          Toggle Notifications
        </Button>
      </div>
    </div>
  );
}
