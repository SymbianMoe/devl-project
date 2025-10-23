/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode
  reactStrictMode: true,

  // Image optimization
  images: {
    domains: ['images.unsplash.com', 'avatars.githubusercontent.com'],
    formats: ['image/avif', 'image/webp'],
  },

  // MDX support will be configured by Agent 6
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],

  // Environment variables
  env: {
    NEXT_PUBLIC_APP_NAME: 'DevLaunch',
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  },

  // Experimental features
  experimental: {
    // Server Actions are enabled by default in Next.js 15
  },

  transpilePackages: [
    'next-mdx-remote'
  ],

  // Webpack configuration
  webpack: (config) => {
    // Fix for canvas/sharp issues
    config.externals.push({
      canvas: 'canvas',
    });
    return config;
  },
};

module.exports = nextConfig;
