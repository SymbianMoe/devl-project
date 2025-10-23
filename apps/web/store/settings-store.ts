import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AppSettings } from '@/types/store';

interface SettingsStore {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
  resetSettings: () => void;
}

const defaultSettings: AppSettings = {
  language: 'en',
  timezone: 'America/Los_Angeles',
  itemsPerPage: 10,
  emailNotifications: true,
  pushNotifications: false,
  weeklyDigest: true,
};

/**
 * App settings store with persistence
 * Manages user preferences and application settings
 */
export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,

      updateSettings: (updates) => {
        set((state) => ({
          settings: {
            ...state.settings,
            ...updates,
          },
        }));
      },

      resetSettings: () => {
        set({ settings: defaultSettings });
      },
    }),
    {
      name: 'settings-storage',
    }
  )
);
