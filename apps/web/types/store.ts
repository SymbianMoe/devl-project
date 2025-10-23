export type Theme = 'light' | 'dark' | 'system';

export interface UserState {
  id: string | null;
  email: string | null;
  name: string | null;
  avatar: string | null;
  isAuthenticated: boolean;
}

export interface AppSettings {
  language: string;
  timezone: string;
  itemsPerPage: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  weeklyDigest: boolean;
}
