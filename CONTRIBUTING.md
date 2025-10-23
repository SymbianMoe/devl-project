# Contributing to DevLaunch UI

Thank you for your interest in contributing! 🎉

This document provides guidelines for contributing to the `@devlaunch/ui` component library.

---

## 📋 Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **pnpm** >= 8.0.0

### Setup

1. **Fork the repository**
   ```bash
   # Click "Fork" on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/devl-project.git
   cd devl-project
   ```

3. **Install dependencies**
   ```bash
   pnpm install
   ```

4. **Start development**
   ```bash
   # Start Storybook
   pnpm --filter @devlaunch/ui storybook

   # Start web app (in another terminal)
   pnpm dev
   ```

---

## 🏗️ Project Structure

```
devl-project/
├── packages/
│   └── ui/                    # Component library
│       ├── src/
│       │   ├── components/    # React components
│       │   ├── hooks/         # Custom hooks
│       │   ├── lib/           # Utilities
│       │   └── styles/        # Global styles
│       └── stories/           # Storybook stories
│
└── apps/
    └── web/                   # Documentation site
```

---

## 🔨 Development Workflow

### 1. Create a Branch

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-description
```

**Branch Naming:**
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation
- `refactor/` - Code refactoring
- `test/` - Tests
- `chore/` - Maintenance

### 2. Make Your Changes

**For New Components:**
1. Create component in `packages/ui/src/components/`
2. Create Storybook story in `packages/ui/stories/`
3. Export from `packages/ui/src/index.ts`
4. Add usage example in `apps/web/`

**Component Checklist:**
- [ ] TypeScript with full type definitions
- [ ] Forwarded refs for composition
- [ ] Accessible (keyboard navigation, ARIA)
- [ ] Responsive design
- [ ] Dark mode support
- [ ] Storybook story with 5+ variants
- [ ] Usage example in web app
- [ ] No console errors/warnings

### 3. Write Tests (if applicable)

```bash
pnpm --filter @devlaunch/ui test
```

### 4. Lint and Format

```bash
# Lint
pnpm --filter @devlaunch/ui lint

# Format
pnpm format

# Type check
pnpm --filter @devlaunch/ui typecheck
```

### 5. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/):

```bash
git commit -m "feat(button): add loading state"
git commit -m "fix(card): padding in dark mode"
git commit -m "docs(readme): add installation steps"
```

**Commit Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (no logic change)
- `refactor:` - Code refactoring
- `test:` - Tests
- `chore:` - Maintenance

### 6. Push and Create PR

```bash
git push origin feat/your-feature-name
```

Then create a Pull Request on GitHub.

---

## 📝 Pull Request Guidelines

### PR Title Format

Use conventional commit format:
```
feat(tooltip): add tooltip component with 4 placements
fix(button): loading spinner alignment
docs(readme): add dark mode instructions
```

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] New feature
- [ ] Bug fix
- [ ] Documentation
- [ ] Refactoring

## Checklist
- [ ] Code follows project style
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
- [ ] Tests added/updated (if applicable)
- [ ] Storybook story added (for components)

## Screenshots (if applicable)
[Add screenshots]

## Related Issues
Closes #123
```

---

## 🎨 Component Guidelines

### File Structure

```
packages/ui/src/components/ui/tooltip.tsx
packages/ui/stories/Tooltip.stories.tsx
```

### Component Template

```tsx
'use client';

import * as React from 'react';
import { cn } from '../../lib/utils';

export interface TooltipProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Tooltip = React.forwardRef<HTMLDivElement, TooltipProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          // Base styles
          'rounded-md',
          // Variant styles
          variant === 'default' && 'bg-primary',
          // Size styles
          size === 'md' && 'px-4 py-2',
          className
        )}
        {...props}
      />
    );
  }
);

Tooltip.displayName = 'Tooltip';
```

### Story Template

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '../src/components/ui/tooltip';

const meta = {
  title: 'Components/Tooltip',
  component: Tooltip,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Tooltip content',
  },
};
```

---

## 🧪 Testing

### Run Tests

```bash
pnpm --filter @devlaunch/ui test
```

### Run Storybook

```bash
pnpm --filter @devlaunch/ui storybook
```

---

## 📦 Release Process

Releases are automated via GitHub Actions. Only maintainers can publish.

1. Update `packages/ui/package.json` version
2. Update `CHANGELOG.md`
3. Commit: `git commit -m "chore: release v1.1.0"`
4. Tag: `git tag v1.1.0`
5. Push: `git push && git push --tags`
6. GitHub Actions automatically publishes to NPM

---

## ❓ Questions?

- Open a [Discussion](https://github.com/devlaunch/devl-project/discussions)
- Email: support@devlaunch.dev

---

## 🙏 Recognition

Contributors are listed in our [README](./README.md) and on our [website](https://devlaunch.dev).

Thank you for contributing to DevLaunch UI! 🎉
