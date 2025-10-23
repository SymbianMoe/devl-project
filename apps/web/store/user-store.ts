import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserState } from '@/types/store';

interface UserStore extends UserState {
  setUser: (user: Partial<UserState>) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearUser: () => void;
}

const initialState: UserState = {
  id: null,
  email: null,
  name: null,
  avatar: null,
  isAuthenticated: false,
};

/**
 * User authentication store with persistence
 * Manages user session and authentication state
 */
export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user) => {
        set((state) => ({
          ...state,
          ...user,
          isAuthenticated: true,
        }));
      },

      login: async (email: string, password: string) => {
        // Mock login - in production, call your auth API
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Mock user data
        set({
          id: '1',
          email,
          name: 'John Doe',
          avatar: 'https://avatars.githubusercontent.com/u/1?v=4',
          isAuthenticated: true,
        });
      },

      logout: () => {
        set(initialState);
      },

      clearUser: () => {
        set(initialState);
      },
    }),
    {
      name: 'user-storage',
    }
  )
);
