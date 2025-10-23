import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry points
  entry: ['src/index.ts', 'src/tailwind-preset.ts'],

  // Output formats
  format: ['cjs', 'esm'],

  // Generate TypeScript declarations
  dts: true,

  // Code splitting (better tree-shaking)
  splitting: false,

  // Generate sourcemaps for debugging
  sourcemap: true,

  // Clean dist folder before build
  clean: true,

  // External dependencies (don't bundle)
  external: [
    'react',
    'react-dom',
    'framer-motion',
    'tailwindcss',
    '@radix-ui/*',
    'lucide-react',
  ],

  // Minification for production
  minify: true,

  // Tree-shaking for smaller bundles
  treeshake: true,

  // Target modern browsers
  target: 'es2020',

  // esbuild options
  esbuildOptions(options) {
    // Add "use client" directive for Next.js App Router
    options.banner = {
      js: '"use client";',
    };

    // Ensure proper chunk naming
    options.chunkNames = '[name]-[hash]';
  },

  // Don't bundle CSS (users import it separately)
  // Users will: import '@devlaunch/ui/styles'
  noExternal: [],

  // Output to dist/
  outDir: 'dist',
});
