import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Theme } from '@/types/store';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

/**
 * Theme store with persistence
 * Manages light/dark/system theme preference
 */
export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'system',

      setTheme: (theme) => {
        set({ theme });
        // Apply theme to document if not using next-themes
        // document.documentElement.classList.toggle('dark', theme === 'dark');
      },

      toggleTheme: () => {
        const current = get().theme;
        const next = current === 'dark' ? 'light' : 'dark';
        get().setTheme(next);
      },
    }),
    {
      name: 'theme-storage',
    }
  )
);
