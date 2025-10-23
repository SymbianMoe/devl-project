'use client';

import { Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

export interface ThemeToggleProps {
  /**
   * Current theme ('light' | 'dark' | 'system')
   */
  theme?: string;
  /**
   * Callback when theme changes
   */
  onThemeChange?: (theme: string) => void;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * ThemeToggle - A button to toggle between light and dark themes
 *
 * Works with next-themes or any theme provider that manages theme state
 */
export function ThemeToggle({
  theme = 'light',
  onThemeChange,
  className,
}: ThemeToggleProps) {
  const handleToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    onThemeChange?.(newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      className={className}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}

ThemeToggle.displayName = 'ThemeToggle';
