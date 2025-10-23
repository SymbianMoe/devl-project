export const APP_NAME = 'DevLaunch';
export const APP_DESCRIPTION =
  'Production-grade Next.js 14 showcase';

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  BLOG: '/blog',
  PROFILE: '/profile',
  SETTINGS: '/settings',
} as const;

export const API_ROUTES = {
  USER: '/api/user',
  DASHBOARD: '/api/dashboard',
  POSTS: '/api/posts',
} as const;
