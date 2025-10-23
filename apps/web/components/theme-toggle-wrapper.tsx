'use client';

import { useTheme } from 'next-themes';
import { ThemeToggle } from '@devlaunch/ui';
import { useEffect, useState } from 'react';

/**
 * ThemeToggleWrapper - Connects ThemeToggle component to next-themes
 */
export function ThemeToggleWrapper() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-10 w-10" /> // Placeholder to prevent layout shift
    );
  }

  return (
    <ThemeToggle
      theme={theme}
      onThemeChange={setTheme}
    />
  );
}
