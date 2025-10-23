# Phase 1: Package Preparation

> **Goal:** Configure the UI package for professional NPM publishing with optimized builds

**Duration:** 2-3 hours
**Dependencies:** None - can start immediately
**Agent-Ready:** ✅ Yes
**Priority:** 🔴 Critical (blocks Phase 2)

---

## 🎯 Objectives

1. ✅ Add comprehensive NPM metadata to package.json
2. ✅ Configure optimized build system with tsup
3. ✅ Set up proper package exports strategy
4. ✅ Create .npmignore for clean package
5. ✅ Prepare package for tree-shaking and bundle optimization

---

## 📋 Tasks

### Task 1.1: Update package.json with NPM Metadata

**File:** `packages/ui/package.json`

**Current Issues:**
- Missing NPM-specific fields
- No repository/bugs links
- No keywords for discoverability
- Missing publishConfig
- No prepublishOnly safety check

**Required Changes:**

```json
{
  "name": "@devlaunch/ui",
  "version": "1.0.0",
  "description": "Enterprise-grade React component library with beautiful animations, built on Radix UI and Tailwind CSS. Features 50+ production-ready components with TypeScript support, dark mode, and accessibility built-in.",

  "keywords": [
    "react",
    "components",
    "ui",
    "design-system",
    "component-library",
    "tailwindcss",
    "radix-ui",
    "framer-motion",
    "typescript",
    "animated-components",
    "enterprise-ui",
    "react-components",
    "ui-library",
    "dark-mode",
    "accessible",
    "a11y"
  ],

  "author": {
    "name": "Your Name",
    "email": "your.email@example.com",
    "url": "https://your-website.com"
  },

  "license": "MIT",

  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/devl-project.git",
    "directory": "packages/ui"
  },

  "bugs": {
    "url": "https://github.com/yourusername/devl-project/issues"
  },

  "homepage": "https://your-vercel-site.vercel.app",

  "publishConfig": {
    "access": "public",
    "registry": "https://registry.npmjs.org/"
  },

  "main": "./dist/index.js",
  "module": "./dist/index.mjs",
  "types": "./dist/index.d.ts",

  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.mjs",
      "require": "./dist/index.js"
    },
    "./styles": "./src/styles/globals.css",
    "./preset": "./dist/tailwind-preset.js",
    "./package.json": "./package.json"
  },

  "files": [
    "dist",
    "src/styles",
    "README.md",
    "LICENSE",
    "CHANGELOG.md"
  ],

  "sideEffects": [
    "*.css"
  ],

  "scripts": {
    "build": "tsup",
    "dev": "tsup --watch",
    "lint": "eslint src --ext .ts,.tsx --max-warnings 0",
    "typecheck": "tsc --noEmit",
    "clean": "rm -rf dist",
    "prepublishOnly": "pnpm run clean && pnpm run build && pnpm run typecheck && pnpm run lint",
    "storybook": "storybook dev -p 6006",
    "build-storybook": "storybook build"
  },

  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },

  "peerDependenciesMeta": {
    "framer-motion": {
      "optional": true
    }
  },

  "dependencies": {
    "@radix-ui/react-avatar": "^1.1.10",
    "@radix-ui/react-checkbox": "^1.3.3",
    "@radix-ui/react-dialog": "^1.1.15",
    "@radix-ui/react-dropdown-menu": "^2.1.16",
    "@radix-ui/react-label": "^2.1.7",
    "@radix-ui/react-popover": "^1.1.15",
    "@radix-ui/react-progress": "^1.1.7",
    "@radix-ui/react-select": "^2.2.6",
    "@radix-ui/react-separator": "^1.1.7",
    "@radix-ui/react-slot": "^1.2.3",
    "@radix-ui/react-switch": "^1.2.6",
    "@radix-ui/react-tabs": "^1.1.13",
    "@radix-ui/react-toast": "^1.2.15",
    "@tanstack/react-table": "^8.21.3",
    "class-variance-authority": "^0.7.0",
    "clsx": "^2.0.0",
    "date-fns": "^4.1.0",
    "framer-motion": "^12.23.24",
    "lucide-react": "^0.300.0",
    "react-day-picker": "^9.11.1",
    "tailwind-merge": "^2.2.0"
  },

  "devDependencies": {
    "@size-limit/preset-small-lib": "^11.0.0",
    "@storybook/addon-a11y": "^7.6.6",
    "@storybook/addon-essentials": "^7.6.6",
    "@storybook/addon-interactions": "^7.6.6",
    "@storybook/addon-links": "^7.6.6",
    "@storybook/addon-themes": "^7.6.6",
    "@storybook/blocks": "^7.6.6",
    "@storybook/react": "^7.6.6",
    "@storybook/react-vite": "^7.6.6",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "size-limit": "^11.0.0",
    "storybook": "^7.6.6",
    "tailwindcss": "^3.4.0",
    "tailwindcss-animate": "^1.0.7",
    "tsup": "^8.0.1",
    "typescript": "^5.3.0",
    "vite": "^5.0.0"
  },

  "engines": {
    "node": ">=18.0.0",
    "pnpm": ">=8.0.0"
  }
}
```

**Key Changes Explained:**
- `keywords`: 16 searchable terms for NPM discovery
- `author`: Your identity (update with real info)
- `repository.directory`: Points to monorepo package location
- `publishConfig`: Ensures public access (scoped packages default to private)
- `exports`: Modern package exports (ESM + CJS + types)
- `files`: Only ship necessary files (reduces package size)
- `sideEffects`: Helps bundlers with tree-shaking
- `prepublishOnly`: Safety check before publishing
- `engines`: Document required Node/pnpm versions

**Acceptance Criteria:**
- [ ] All metadata fields filled with real information
- [ ] Package name is `@devlaunch/ui` (scoped)
- [ ] Version is `1.0.0`
- [ ] License is MIT
- [ ] Repository URL points to your GitHub
- [ ] Homepage URL points to live Storybook/docs
- [ ] `prepublishOnly` script exists

---

### Task 1.2: Create tsup Configuration

**File:** `packages/ui/tsup.config.ts` (NEW FILE)

**Purpose:** Configure build system for optimized, tree-shakeable output

**Create this file:**

```typescript
import { defineConfig } from 'tsup';

export default defineConfig({
  // Entry point
  entry: ['src/index.ts'],

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
```

**What This Does:**
- ✅ Generates both ESM (`index.mjs`) and CJS (`index.js`)
- ✅ Creates TypeScript definitions (`index.d.ts`)
- ✅ Minifies code for smaller bundle
- ✅ Enables tree-shaking (users only import what they use)
- ✅ Adds "use client" for Next.js compatibility
- ✅ Keeps React/Radix external (peer dependencies)
- ✅ Generates source maps for debugging

**Acceptance Criteria:**
- [ ] File created at `packages/ui/tsup.config.ts`
- [ ] All external deps listed (React, Radix, etc.)
- [ ] Minify and treeshake enabled
- [ ] Sourcemaps enabled
- [ ] "use client" banner added

---

### Task 1.3: Create .npmignore

**File:** `packages/ui/.npmignore` (NEW FILE)

**Purpose:** Exclude unnecessary files from NPM package (reduces download size)

**Create this file:**

```
# Source files (users get compiled dist/)
src/
tsconfig.json
tsup.config.ts

# Stories (users access via Storybook URL)
stories/
.storybook/
storybook-static/

# Tests
__tests__/
*.test.ts
*.test.tsx
*.spec.ts
*.spec.tsx

# Development
.vscode/
.idea/
*.log
node_modules/

# Build artifacts
*.tsbuildinfo
.turbo/

# Git
.git/
.gitignore
.gitattributes

# CI/CD
.github/
.gitlab-ci.yml
.travis.yml

# Linting
.eslintrc
.eslintrc.json
.eslintignore
.prettierrc
.prettierignore

# Other configs
.editorconfig
.nvmrc
.npmrc

# Docs (served elsewhere)
docs/
examples/
```

**Why This Matters:**
- Reduces package download size by ~70%
- Users don't need source TypeScript files
- Users don't need Storybook stories
- Faster `npm install` for consumers

**What Users WILL Get:**
```
@devlaunch/ui/
├── dist/           # Compiled code
├── src/styles/     # CSS (they import this)
├── README.md       # Documentation
├── LICENSE         # Legal
├── CHANGELOG.md    # Version history
└── package.json    # Package info
```

**Acceptance Criteria:**
- [ ] File created at `packages/ui/.npmignore`
- [ ] All dev-only files excluded
- [ ] dist/ folder NOT excluded
- [ ] src/styles/ NOT excluded (users need CSS)

---

### Task 1.4: Enhance src/index.ts Exports

**File:** `packages/ui/src/index.ts`

**Current State:**
```typescript
'use client';

export * from './components';
export * from './lib';
export * from './hooks';
export type { ClassValue } from 'clsx';
```

**Enhanced Version:**

```typescript
'use client';

// ============================================================================
// COMPONENTS
// ============================================================================

// UI Primitives
export * from './components/ui/button';
export * from './components/ui/card';
export * from './components/ui/input';
export * from './components/ui/label';
export * from './components/ui/badge';
export * from './components/ui/dialog';
export * from './components/ui/table';
export * from './components/ui/skeleton';
export * from './components/ui/select';
export * from './components/ui/textarea';
export * from './components/ui/checkbox';
export * from './components/ui/switch';
export * from './components/ui/tabs';
export * from './components/ui/dropdown-menu';
export * from './components/ui/popover';
export * from './components/ui/toast';
export * from './components/ui/toaster';
export * from './components/ui/avatar';
export * from './components/ui/progress';
export * from './components/ui/separator';
export * from './components/ui/calendar';

// Custom Components
export * from './components/theme-toggle';
export * from './components/loading-spinner';
export * from './components/navbar';
export * from './components/empty-state';
export * from './components/sidebar';
export * from './components/status-badge';
export * from './components/pagination';
export * from './components/activity-item';
export * from './components/filter-bar';
export * from './components/data-table';
export * from './components/search-input';

// Animated Components
export * from './components/animated/tech-badge';
export * from './components/animated/animated-components';
export * from './components/animated/animated-counter';
export * from './components/animated/code-snippet';
export * from './components/animated/scroll-reveal';
export * from './components/animated/tilt-card';
export * from './components/animated/gradient-background';

// ============================================================================
// UTILITIES
// ============================================================================

export * from './lib/utils';
export { cn } from './lib/utils';

// ============================================================================
// HOOKS
// ============================================================================

export * from './hooks/use-toast';
export { useToast, toast } from './hooks/use-toast';

// ============================================================================
// TYPES
// ============================================================================

// Re-export commonly used types
export type { ClassValue } from 'clsx';
export type { VariantProps } from 'class-variance-authority';

// Component prop types
export type { ButtonProps } from './components/ui/button';
export type { CardProps } from './components/ui/card';
export type { InputProps } from './components/ui/input';
export type { BadgeProps } from './components/ui/badge';
export type { LoadingSpinnerProps } from './components/loading-spinner';
export type { PaginationProps } from './components/pagination';
export type { StatusBadgeProps } from './components/status-badge';
export type { SearchInputProps } from './components/search-input';
export type { DataTableProps, DataTableColumnHeaderProps } from './components/data-table';

// Animated component types
export type { TechBadgeProps } from './components/animated/tech-badge';
export type { AnimatedCounterProps } from './components/animated/animated-counter';
export type { CodeSnippetProps } from './components/animated/code-snippet';
export type { ScrollRevealProps } from './components/animated/scroll-reveal';
export type { TiltCardProps } from './components/animated/tilt-card';
export type { GradientBackgroundProps } from './components/animated/gradient-background';
```

**Why This Matters:**
- ✅ Explicit exports = better tree-shaking
- ✅ IDE autocomplete shows all available components
- ✅ Users know exactly what's exported
- ✅ Types exported for TypeScript users
- ✅ Utilities like `cn()` easily accessible

**Acceptance Criteria:**
- [ ] All 38 current components explicitly exported
- [ ] All prop types exported
- [ ] Hooks exported (both named and default)
- [ ] Utilities exported
- [ ] Organized by category with comments

---

### Task 1.5: Add .size-limit.json

**File:** `packages/ui/.size-limit.json` (NEW FILE)

**Purpose:** Monitor bundle size, prevent bloat

```json
[
  {
    "name": "ESM Bundle",
    "path": "dist/index.mjs",
    "limit": "50 KB",
    "gzip": true
  },
  {
    "name": "CJS Bundle",
    "path": "dist/index.js",
    "limit": "50 KB",
    "gzip": true
  },
  {
    "name": "TypeScript Declarations",
    "path": "dist/index.d.ts",
    "limit": "20 KB",
    "gzip": false
  }
]
```

**Install size-limit:**

```bash
cd packages/ui
pnpm add -D @size-limit/preset-small-lib size-limit
```

**Add to package.json scripts:**

```json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why"
  }
}
```

**Acceptance Criteria:**
- [ ] `.size-limit.json` created
- [ ] Limits set to 50KB gzipped
- [ ] Scripts added to package.json
- [ ] Dependencies installed

---

## ✅ Verification Steps

After completing all tasks, verify:

### 1. Build Works
```bash
cd packages/ui
pnpm run clean
pnpm run build
```

**Expected Output:**
```
dist/
├── index.js        # CJS format
├── index.mjs       # ESM format
├── index.d.ts      # TypeScript types
├── index.js.map    # Source map
└── index.mjs.map   # Source map
```

### 2. Bundle Size Check
```bash
pnpm run size
```

**Expected:** ✅ All bundles under 50KB gzipped

### 3. Package Validation
```bash
npm pack --dry-run
```

**Expected:**
- ✅ Only includes dist/, src/styles/, README, LICENSE, CHANGELOG
- ✅ No src/*.ts files
- ✅ No stories/
- ✅ Total size < 500KB

### 4. TypeScript Check
```bash
pnpm run typecheck
```

**Expected:** ✅ No errors

### 5. Lint Check
```bash
pnpm run lint
```

**Expected:** ✅ No warnings or errors

---

## 📊 Acceptance Criteria

**Before marking this phase complete, ensure:**

- [ ] `package.json` has all required metadata
- [ ] `tsup.config.ts` created with optimization settings
- [ ] `.npmignore` created
- [ ] `src/index.ts` has explicit, organized exports
- [ ] `.size-limit.json` created with limits
- [ ] Build produces dist/ with .js, .mjs, .d.ts
- [ ] Bundle size < 50KB gzipped
- [ ] No TypeScript errors
- [ ] No lint errors
- [ ] Package size < 500KB total
- [ ] `prepublishOnly` script runs successfully

---

## 🚨 Common Issues & Solutions

### Issue: "Module not found" errors during build
**Solution:** Ensure all imports use correct paths, check for circular dependencies

### Issue: Bundle size exceeds 50KB
**Solution:**
- Check if Radix/React accidentally bundled (should be external)
- Run `pnpm run size:why` to see what's large
- Verify treeshaking is enabled

### Issue: TypeScript can't find types
**Solution:**
- Ensure `dts: true` in tsup.config.ts
- Run `pnpm run build` fully
- Check dist/index.d.ts was generated

### Issue: "use client" missing in output
**Solution:** Check `esbuildOptions.banner` in tsup.config.ts

---

## 📚 Resources

- [tsup Documentation](https://tsup.egoist.dev/)
- [NPM package.json Fields](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [Package Exports](https://nodejs.org/api/packages.html#exports)
- [size-limit](https://github.com/ai/size-limit)

---

## ⏭️ Next Phase

Once complete, proceed to:
- **Phase 2: CI/CD Pipeline** (requires this phase complete)

---

**Estimated Time:** 2-3 hours
**Difficulty:** ⭐⭐ Moderate
**Impact:** 🔥 Critical - Foundation for everything
