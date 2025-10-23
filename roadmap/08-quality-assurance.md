# Phase 8: Quality Assurance

**Duration:** 6-8 hours
**Dependencies:** All components complete (Phases 4, 5, 6)
**Agent-Ready:** ✅ Yes
**Priority:** Critical

---

## 🎯 Objectives

Implement comprehensive quality assurance tooling to ensure @devlaunch/ui meets enterprise standards:

1. **Bundle Size Monitoring** - Track and enforce bundle size limits
2. **Accessibility Testing** - WCAG 2.1 AA compliance
3. **Visual Regression Testing** - Prevent UI regressions
4. **Performance Benchmarks** - Measure render performance
5. **Type Safety** - 100% TypeScript coverage
6. **Linting** - Code quality enforcement

**Goal:** Automated quality gates that prevent regressions and ensure production readiness.

---

## 📦 Task 1: Bundle Size Monitoring

### Overview
Set up size-limit to track bundle size and prevent bloat.

**Dependencies:**
```bash
pnpm add -D @size-limit/preset-small-lib size-limit
```

### Configuration

**File:** `packages/ui/.size-limit.json`

```json
[
  {
    "name": "Full Bundle",
    "path": "dist/index.js",
    "limit": "50 KB",
    "gzip": true
  },
  {
    "name": "Button (Tree-shaken)",
    "path": "dist/index.js",
    "import": "{ Button }",
    "limit": "5 KB",
    "gzip": true
  },
  {
    "name": "Input (Tree-shaken)",
    "path": "dist/index.js",
    "import": "{ Input }",
    "limit": "3 KB",
    "gzip": true
  },
  {
    "name": "Dialog (Tree-shaken)",
    "path": "dist/index.js",
    "import": "{ Dialog }",
    "limit": "8 KB",
    "gzip": true
  },
  {
    "name": "Card (Tree-shaken)",
    "path": "dist/index.js",
    "import": "{ Card }",
    "limit": "4 KB",
    "gzip": true
  }
]
```

### Package.json Scripts

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "size": "size-limit",
    "size:why": "size-limit --why",
    "size:analyze": "size-limit --json"
  }
}
```

### CI Integration

Update `.github/workflows/ci.yml`:

```yaml
- name: Check bundle size
  run: |
    pnpm --filter @devlaunch/ui build
    pnpm --filter @devlaunch/ui size
```

### Acceptance Criteria

- [ ] size-limit installed and configured
- [ ] Bundle size limits defined
- [ ] Scripts added to package.json
- [ ] CI workflow checks bundle size
- [ ] Full bundle under 50KB gzipped
- [ ] Individual components properly tree-shaken

---

## 📦 Task 2: Accessibility Testing

### Overview
Implement automated accessibility testing using jest-axe and manual testing checklist.

**Dependencies:**
```bash
pnpm add -D @testing-library/react @testing-library/jest-dom jest-axe vitest @vitejs/plugin-react jsdom
```

### Vitest Configuration

**File:** `packages/ui/vitest.config.ts`

```typescript
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

### Test Setup

**File:** `packages/ui/src/test/setup.ts`

```typescript
import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  takeRecords() {
    return [];
  }
  unobserve() {}
} as any;

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;
```

### Accessibility Test Template

**File:** `packages/ui/src/components/ui/__tests__/button.test.tsx`

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import { Button } from "../button";

expect.extend(toHaveNoViolations);

describe("Button Accessibility", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<Button>Click me</Button>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have accessible name", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("should support aria-label", () => {
    render(<Button aria-label="Close dialog">×</Button>);
    expect(screen.getByLabelText("Close dialog")).toBeInTheDocument();
  });

  it("should be keyboard accessible", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("should indicate disabled state", () => {
    render(<Button disabled>Disabled</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

### Manual Testing Checklist

**File:** `packages/ui/ACCESSIBILITY.md`

```markdown
# ♿ Accessibility Testing Checklist

All components must pass these manual tests before release.

---

## Keyboard Navigation

- [ ] **Tab Key:** All interactive elements are reachable via Tab
- [ ] **Shift+Tab:** Reverse tab order works correctly
- [ ] **Enter/Space:** Activates buttons and toggles
- [ ] **Arrow Keys:** Navigate within components (menus, tabs, radio groups)
- [ ] **Escape:** Closes dialogs, dropdowns, and popovers
- [ ] **Home/End:** Navigate to first/last item in lists

---

## Screen Reader Support

Test with NVDA (Windows) or VoiceOver (Mac):

- [ ] **Labels:** All form inputs have associated labels
- [ ] **ARIA Roles:** Components use correct roles (button, dialog, menu, etc.)
- [ ] **ARIA States:** Dynamic states announced (expanded, selected, disabled)
- [ ] **ARIA Live Regions:** Updates announced (toasts, alerts)
- [ ] **Focus Management:** Focus moves logically after interactions
- [ ] **Headings:** Proper heading hierarchy (h1 → h2 → h3)

---

## Visual Accessibility

- [ ] **Color Contrast:** Text meets WCAG AA (4.5:1 normal, 3:1 large)
- [ ] **Focus Indicators:** Visible focus ring on all interactive elements
- [ ] **Text Resize:** Layout works at 200% zoom
- [ ] **Motion:** Respects `prefers-reduced-motion`
- [ ] **Dark Mode:** All components readable in dark mode

---

## Component-Specific Tests

### Dialogs
- [ ] Focus trapped within dialog when open
- [ ] Escape closes dialog
- [ ] Focus returns to trigger after close
- [ ] Background content inert (aria-hidden)

### Tooltips
- [ ] Accessible via keyboard focus
- [ ] Content announced by screen readers
- [ ] Dismissible with Escape

### Dropdowns/Menus
- [ ] Arrow keys navigate items
- [ ] Type-ahead search works
- [ ] Selected item announced

### Forms
- [ ] Error messages associated with inputs (aria-describedby)
- [ ] Required fields indicated
- [ ] Validation errors announced

---

## Testing Tools

- **Browser:** Chrome DevTools Lighthouse
- **Screen Readers:** NVDA (Windows), VoiceOver (Mac)
- **Contrast:** WebAIM Contrast Checker
- **Automated:** axe DevTools extension

---

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
```

### Package.json Scripts

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Acceptance Criteria

- [ ] Vitest configured
- [ ] jest-axe integrated
- [ ] Test template created
- [ ] Manual checklist documented
- [ ] All components have accessibility tests
- [ ] Zero axe violations
- [ ] Keyboard navigation tested

---

## 📦 Task 3: Visual Regression Testing

### Overview
Use Storybook's visual testing addon to catch UI regressions.

**Dependencies:**
```bash
pnpm add -D @storybook/addon-a11y @storybook/test-runner playwright
```

### Storybook Configuration

Update `packages/ui/.storybook/main.ts`:

```typescript
import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-a11y", // Add accessibility addon
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
};

export default config;
```

### Test Runner Configuration

**File:** `packages/ui/.storybook/test-runner.ts`

```typescript
import type { TestRunnerConfig } from "@storybook/test-runner";
import { checkA11y, injectAxe } from "axe-playwright";

const config: TestRunnerConfig = {
  async preVisit(page) {
    await injectAxe(page);
  },
  async postVisit(page) {
    await checkA11y(page, "#storybook-root", {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};

export default config;
```

### Package.json Scripts

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "test:storybook": "test-storybook",
    "test:storybook:ci": "concurrently -k -s first -n \"SB,TEST\" -c \"magenta,blue\" \"pnpm storybook --no-open --quiet\" \"wait-on tcp:6006 && pnpm test:storybook\""
  }
}
```

### CI Integration

Add to `.github/workflows/ci.yml`:

```yaml
- name: Install Playwright
  run: npx playwright install --with-deps

- name: Build Storybook
  run: pnpm --filter @devlaunch/ui build-storybook

- name: Run Storybook tests
  run: pnpm --filter @devlaunch/ui test:storybook:ci
```

### Acceptance Criteria

- [ ] Storybook accessibility addon configured
- [ ] Test runner set up
- [ ] Playwright installed
- [ ] All stories pass accessibility tests
- [ ] CI runs visual tests
- [ ] No accessibility violations in Storybook

---

## 📦 Task 4: Performance Benchmarks

### Overview
Measure component render performance and identify bottlenecks.

**Dependencies:**
```bash
pnpm add -D @testing-library/react-hooks benchmark
```

### Performance Test Template

**File:** `packages/ui/src/test/performance.bench.ts`

```typescript
import { describe, bench } from "vitest";
import { render } from "@testing-library/react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Card } from "../components/ui/card";

describe("Component Render Performance", () => {
  bench("Button render", () => {
    render(<Button>Click me</Button>);
  });

  bench("Button with icon render", () => {
    render(
      <Button>
        <span>Icon</span> Click me
      </Button>
    );
  });

  bench("Input render", () => {
    render(<Input placeholder="Enter text" />);
  });

  bench("Card render", () => {
    render(
      <Card>
        <div>Content</div>
      </Card>
    );
  });

  bench("Multiple Buttons render (100)", () => {
    render(
      <div>
        {Array.from({ length: 100 }, (_, i) => (
          <Button key={i}>Button {i}</Button>
        ))}
      </div>
    );
  });
});
```

### Performance Metrics Document

**File:** `packages/ui/PERFORMANCE.md`

```markdown
# ⚡ Performance Metrics

Target benchmarks for @devlaunch/ui components.

---

## Render Performance

| Component | Target (First Render) | Target (Re-render) |
|-----------|----------------------|-------------------|
| Button | <5ms | <2ms |
| Input | <8ms | <3ms |
| Dialog | <20ms | <10ms |
| Table (100 rows) | <100ms | <50ms |
| Dropdown Menu | <15ms | <5ms |

---

## Bundle Size

| Metric | Target | Current |
|--------|--------|---------|
| Full Bundle (gzipped) | <50KB | TBD |
| Button (tree-shaken) | <5KB | TBD |
| Dialog (tree-shaken) | <8KB | TBD |
| Form components | <15KB | TBD |

---

## Accessibility

| Metric | Target | Current |
|--------|--------|---------|
| Lighthouse Score | ≥95 | TBD |
| Axe Violations | 0 | TBD |
| Keyboard Navigation | 100% | TBD |

---

## Running Benchmarks

\`\`\`bash
# Run performance tests
pnpm test:bench

# Analyze bundle
pnpm size:why

# Check accessibility
pnpm test:storybook
\`\`\`

---

## Optimization Techniques

1. **Memoization:** Use `React.memo` for expensive components
2. **Lazy Loading:** Code-split large components
3. **Tree Shaking:** Export individual components
4. **CSS-in-JS:** Use Tailwind (no runtime cost)
5. **Animation:** Use CSS/Tailwind over JS animations

---

## Regression Prevention

- Bundle size checked in CI
- Performance tests run on every commit
- Lighthouse CI for web app
- Size limit enforced (<50KB)
```

### Package.json Scripts

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "test:bench": "vitest bench",
    "test:bench:ui": "vitest bench --ui"
  }
}
```

### Acceptance Criteria

- [ ] Performance benchmarks written
- [ ] Baseline metrics documented
- [ ] All components meet render targets
- [ ] Bundle size within limits
- [ ] CI tracks performance regressions

---

## 📦 Task 5: Type Safety Verification

### Overview
Ensure 100% TypeScript coverage and proper type exports.

### Type Check Script

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "typecheck": "tsc --noEmit",
    "typecheck:watch": "tsc --noEmit --watch"
  }
}
```

### tsconfig.json

Ensure strict mode is enabled in `packages/ui/tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "strictNullChecks": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

### Type Export Verification

**File:** `packages/ui/src/test/type-exports.test.ts`

```typescript
import { describe, it, expectTypeOf } from "vitest";
import type { ButtonProps } from "../components/ui/button";
import type { InputProps } from "../components/ui/input";
import type { CardProps } from "../components/ui/card";

describe("Type Exports", () => {
  it("should export ButtonProps", () => {
    expectTypeOf<ButtonProps>().toMatchTypeOf<{
      variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    }>();
  });

  it("should export InputProps", () => {
    expectTypeOf<InputProps>().toMatchTypeOf<{
      type?: string;
      placeholder?: string;
    }>();
  });

  it("should export CardProps", () => {
    expectTypeOf<CardProps>().toMatchTypeOf<{
      className?: string;
    }>();
  });
});
```

### Acceptance Criteria

- [ ] TypeScript strict mode enabled
- [ ] All components have exported prop types
- [ ] No `any` types (except necessary cases)
- [ ] Type check passes in CI
- [ ] IDE autocomplete works for all components

---

## 📦 Task 6: Linting & Code Quality

### Overview
Enforce code quality with ESLint and Prettier.

**Dependencies:**
```bash
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser prettier eslint-config-prettier
```

### ESLint Configuration

**File:** `packages/ui/.eslintrc.json`

```json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "prettier"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "ecmaVersion": 2021,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "plugins": ["@typescript-eslint", "react", "react-hooks"],
  "rules": {
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_" }]
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
```

### Prettier Configuration

**File:** `packages/ui/.prettierrc`

```json
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": false,
  "printWidth": 90,
  "tabWidth": 2,
  "useTabs": false
}
```

### Package.json Scripts

Add to `packages/ui/package.json`:

```json
{
  "scripts": {
    "lint": "eslint src --ext .ts,.tsx",
    "lint:fix": "eslint src --ext .ts,.tsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,json,md}\"",
    "format:check": "prettier --check \"src/**/*.{ts,tsx,json,md}\""
  }
}
```

### Pre-commit Hook

**File:** `.husky/pre-commit`

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm --filter @devlaunch/ui lint
pnpm --filter @devlaunch/ui typecheck
```

### Acceptance Criteria

- [ ] ESLint configured
- [ ] Prettier configured
- [ ] Lint script passes
- [ ] Format check passes
- [ ] Pre-commit hook runs linting
- [ ] CI enforces linting

---

## ✅ Phase 8 Checklist

### Setup
- [ ] Install all testing dependencies
- [ ] Configure Vitest
- [ ] Configure ESLint & Prettier
- [ ] Set up size-limit
- [ ] Install Playwright for Storybook tests

### Implementation
- [ ] Bundle size monitoring configured
- [ ] Accessibility tests written
- [ ] Visual regression tests set up
- [ ] Performance benchmarks created
- [ ] Type safety verified
- [ ] Linting rules enforced

### Testing
- [ ] All components pass accessibility tests
- [ ] Zero axe violations
- [ ] Bundle size under 50KB
- [ ] Performance targets met
- [ ] Type check passes
- [ ] Lint passes

### CI Integration
- [ ] Bundle size checked in CI
- [ ] Accessibility tests run in CI
- [ ] Type check in CI
- [ ] Lint check in CI
- [ ] Storybook tests in CI

### Documentation
- [ ] ACCESSIBILITY.md created
- [ ] PERFORMANCE.md created
- [ ] Testing guidelines documented

---

## 🔧 Verification Commands

```bash
# Run all quality checks
pnpm --filter @devlaunch/ui test
pnpm --filter @devlaunch/ui test:bench
pnpm --filter @devlaunch/ui typecheck
pnpm --filter @devlaunch/ui lint
pnpm --filter @devlaunch/ui size

# Storybook accessibility
pnpm --filter @devlaunch/ui test:storybook

# Coverage report
pnpm --filter @devlaunch/ui test:coverage
```

---

## 📊 Success Metrics

- ✅ 100% TypeScript coverage
- ✅ 0 accessibility violations
- ✅ Bundle size <50KB gzipped
- ✅ All components <20ms render time
- ✅ Lighthouse score ≥95
- ✅ All tests passing
- ✅ Zero lint errors

---

## 🚀 Next Steps

After completing Phase 8:
- **Phase 9:** Release Process
- Final review and launch preparation

---

**Estimated Completion:** 6-8 hours
**Dependencies:** Phases 4, 5, 6 (all components)
**Can run after:** All component implementation complete
