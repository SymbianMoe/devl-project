# Phase 7: Theming System

**Duration:** 6-8 hours
**Dependencies:** None (can run independently)
**Agent-Ready:** ✅ Yes
**Priority:** High

---

## 🎯 Objectives

Build a comprehensive theming system that provides:

1. **Tailwind Preset** - Pre-configured Tailwind plugin for users
2. **CSS Variables System** - Flexible color and design token management
3. **Theme Switcher Component** - Dark/light mode toggle
4. **Multiple Themes** - Pre-built theme options (e.g., corporate, vibrant, minimal)
5. **Customization Guide** - Documentation for users to create custom themes

**Goal:** Enable users to customize @devlaunch/ui to match their brand with minimal effort.

---

## 📦 Task 1: Tailwind Preset

### Overview
Create a Tailwind preset that users can extend in their own projects.

**File:** `packages/ui/src/tailwind-preset.ts`

### Implementation

```typescript
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

const preset: Config = {
  darkMode: ["class"],
  content: [],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-out": {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        "slide-in-from-top": {
          from: { transform: "translateY(-100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-bottom": {
          from: { transform: "translateY(100%)" },
          to: { transform: "translateY(0)" },
        },
        "slide-in-from-left": {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(0)" },
        },
        "slide-in-from-right": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "zoom-in": {
          from: { transform: "scale(0.95)", opacity: "0" },
          to: { transform: "scale(1)", opacity: "1" },
        },
        "zoom-out": {
          from: { transform: "scale(1)", opacity: "1" },
          to: { transform: "scale(0.95)", opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.2s ease-out",
        "fade-out": "fade-out 0.2s ease-out",
        "slide-in-from-top": "slide-in-from-top 0.3s ease-out",
        "slide-in-from-bottom": "slide-in-from-bottom 0.3s ease-out",
        "slide-in-from-left": "slide-in-from-left 0.3s ease-out",
        "slide-in-from-right": "slide-in-from-right 0.3s ease-out",
        "zoom-in": "zoom-in 0.2s ease-out",
        "zoom-out": "zoom-out 0.2s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default preset;
```

### Update tsup Config

Modify `packages/ui/tsup.config.ts` to include the preset:

```typescript
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/tailwind-preset.ts"],
  format: ["cjs", "esm"],
  dts: true,
  minify: true,
  treeshake: true,
  splitting: false,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom", "framer-motion", "tailwindcss"],
  esbuildOptions(options) {
    options.banner = {
      js: '"use client";',
    };
  },
});
```

### Acceptance Criteria

- [ ] Tailwind preset created with design tokens
- [ ] All keyframes and animations included
- [ ] Build configuration updated
- [ ] Exported for users to import

---

## 📦 Task 2: CSS Variables System

### Overview
Define CSS variable themes for light, dark, and custom variants.

**File:** `packages/ui/src/styles/themes.css`

### Implementation

```css
@layer base {
  :root {
    /* Default Light Theme */
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }

  .dark {
    /* Dark Theme */
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
  }

  /* Corporate Theme */
  .theme-corporate {
    --primary: 221 83% 53%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --accent: 199 89% 48%;
    --accent-foreground: 210 40% 98%;

    --radius: 0.25rem;
  }

  .dark.theme-corporate {
    --primary: 217 91% 60%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --accent: 199 89% 48%;
    --accent-foreground: 210 40% 98%;
  }

  /* Vibrant Theme */
  .theme-vibrant {
    --primary: 262 83% 58%;
    --primary-foreground: 210 40% 98%;

    --secondary: 340 82% 52%;
    --secondary-foreground: 210 40% 98%;

    --accent: 45 93% 47%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --radius: 1rem;
  }

  .dark.theme-vibrant {
    --primary: 269 97% 85%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 340 75% 55%;
    --secondary-foreground: 210 40% 98%;

    --accent: 45 93% 47%;
    --accent-foreground: 222.2 47.4% 11.2%;
  }

  /* Minimal Theme */
  .theme-minimal {
    --primary: 0 0% 9%;
    --primary-foreground: 0 0% 98%;

    --secondary: 0 0% 96.1%;
    --secondary-foreground: 0 0% 9%;

    --accent: 0 0% 96.1%;
    --accent-foreground: 0 0% 9%;

    --border: 0 0% 89.8%;
    --input: 0 0% 89.8%;

    --radius: 0rem;
  }

  .dark.theme-minimal {
    --primary: 0 0% 98%;
    --primary-foreground: 0 0% 9%;

    --background: 0 0% 3.9%;
    --foreground: 0 0% 98%;

    --card: 0 0% 3.9%;
    --card-foreground: 0 0% 98%;

    --border: 0 0% 14.9%;
    --input: 0 0% 14.9%;
  }
}
```

### Update Main Styles

Modify `packages/ui/src/styles/globals.css` to import themes:

```css
@import "tailwindcss/base";
@import "tailwindcss/components";
@import "tailwindcss/utilities";
@import "./themes.css";

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}
```

### Acceptance Criteria

- [ ] Light and dark themes defined
- [ ] Multiple theme variants (corporate, vibrant, minimal)
- [ ] CSS variables properly scoped
- [ ] Imported in main globals.css

---

## 📦 Task 3: Theme Switcher Component

### Overview
Build a theme switcher component for users to toggle themes.

**File:** `packages/ui/src/components/ui/theme-provider.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system";
type ThemeVariant = "default" | "corporate" | "vibrant" | "minimal";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  defaultVariant?: ThemeVariant;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  variant: ThemeVariant;
  setTheme: (theme: Theme) => void;
  setVariant: (variant: ThemeVariant) => void;
};

const ThemeProviderContext = React.createContext<ThemeProviderState | undefined>(
  undefined
);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  defaultVariant = "default",
  storageKey = "ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = React.useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );
  const [variant, setVariantState] = React.useState<ThemeVariant>(
    () =>
      (localStorage.getItem(`${storageKey}-variant`) as ThemeVariant) ||
      defaultVariant
  );

  React.useEffect(() => {
    const root = window.document.documentElement;

    // Remove all theme classes
    root.classList.remove("light", "dark");
    root.classList.remove(
      "theme-default",
      "theme-corporate",
      "theme-vibrant",
      "theme-minimal"
    );

    // Apply theme
    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Apply variant
    if (variant !== "default") {
      root.classList.add(`theme-${variant}`);
    }
  }, [theme, variant]);

  const value = {
    theme,
    variant,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setThemeState(newTheme);
    },
    setVariant: (newVariant: ThemeVariant) => {
      localStorage.setItem(`${storageKey}-variant`, newVariant);
      setVariantState(newVariant);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = React.useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
```

**File:** `packages/ui/src/components/ui/theme-switcher.tsx`

```typescript
"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "./theme-provider";
import { Button } from "./button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./dropdown-menu";

export function ThemeSwitcher() {
  const { theme, setTheme, variant, setVariant } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Theme Mode</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 h-4 w-4" />
          <span>System</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Theme Variant</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={variant} onValueChange={(v) => setVariant(v as any)}>
          <DropdownMenuRadioItem value="default">Default</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="corporate">Corporate</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="vibrant">Vibrant</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="minimal">Minimal</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

### Storybook Story

**File:** `packages/ui/src/components/ui/theme-switcher.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./theme-switcher";
import { ThemeProvider } from "./theme-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Theming/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <p className="text-sm text-muted-foreground">
          Click to change theme
        </p>
      </div>
    </ThemeProvider>
  ),
};

export const WithPreview: Story = {
  render: () => (
    <ThemeProvider>
      <div className="space-y-4">
        <div className="flex justify-end">
          <ThemeSwitcher />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card demonstrates the current theme colors.
              </p>
              <div className="mt-4 space-x-2">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-primary" title="Primary" />
                <div className="h-12 rounded bg-secondary" title="Secondary" />
                <div className="h-12 rounded bg-accent" title="Accent" />
                <div className="h-12 rounded bg-muted" title="Muted" />
                <div className="h-12 rounded bg-destructive" title="Destructive" />
                <div className="h-12 rounded border bg-card" title="Card" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { ThemeProvider, useTheme } from "./components/ui/theme-provider";
export { ThemeSwitcher } from "./components/ui/theme-switcher";
```

### Acceptance Criteria

- [ ] ThemeProvider context created
- [ ] ThemeSwitcher component built
- [ ] Supports light/dark/system modes
- [ ] Supports theme variants
- [ ] LocalStorage persistence
- [ ] Storybook story with preview
- [ ] Exports added to index.ts

---

## 📦 Task 4: Customization Documentation

### Overview
Create comprehensive documentation for theme customization.

**File:** `packages/ui/THEMING.md`

### Implementation

```markdown
# 🎨 Theming Guide

@devlaunch/ui provides a flexible theming system based on CSS variables and Tailwind CSS.

---

## 📦 Installation

After installing the package:

\`\`\`bash
npm install @devlaunch/ui
\`\`\`

---

## 🚀 Quick Start

### 1. Import Styles

Import the global styles in your root layout:

\`\`\`tsx
// app/layout.tsx
import "@devlaunch/ui/styles";
\`\`\`

### 2. Add ThemeProvider

Wrap your app with the ThemeProvider:

\`\`\`tsx
import { ThemeProvider } from "@devlaunch/ui";

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider defaultTheme="system" defaultVariant="default">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
\`\`\`

### 3. Use ThemeSwitcher

Add the theme switcher component:

\`\`\`tsx
import { ThemeSwitcher } from "@devlaunch/ui";

export function Header() {
  return (
    <header>
      <ThemeSwitcher />
    </header>
  );
}
\`\`\`

---

## 🎨 Built-in Themes

@devlaunch/ui includes 4 pre-built theme variants:

### Default
Clean, professional design with balanced colors.

\`\`\`tsx
<ThemeProvider defaultVariant="default">
\`\`\`

### Corporate
Enterprise-focused with blue tones and minimal border radius.

\`\`\`tsx
<ThemeProvider defaultVariant="corporate">
\`\`\`

### Vibrant
Colorful design with purple and pink accents.

\`\`\`tsx
<ThemeProvider defaultVariant="vibrant">
\`\`\`

### Minimal
Monochrome design with no border radius.

\`\`\`tsx
<ThemeProvider defaultVariant="minimal">
\`\`\`

---

## ⚙️ Tailwind Configuration

Extend your Tailwind config with our preset:

\`\`\`javascript
// tailwind.config.js
import devlaunchPreset from "@devlaunch/ui/preset";

export default {
  presets: [devlaunchPreset],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./node_modules/@devlaunch/ui/dist/**/*.{js,mjs}",
  ],
};
\`\`\`

---

## 🎨 Creating Custom Themes

### Method 1: CSS Variables

Override CSS variables in your global CSS:

\`\`\`css
/* app/globals.css */
@layer base {
  .theme-custom {
    /* Primary color */
    --primary: 142 76% 36%;
    --primary-foreground: 355.7 100% 97.3%;

    /* Secondary color */
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;

    /* Accent color */
    --accent: 142 76% 36%;
    --accent-foreground: 355.7 100% 97.3%;

    /* Border radius */
    --radius: 0.75rem;
  }

  .dark.theme-custom {
    --primary: 142 86% 28%;
    --primary-foreground: 356 29% 98%;

    --background: 20 14.3% 4.1%;
    --foreground: 60 9.1% 97.8%;
  }
}
\`\`\`

Apply the theme:

\`\`\`tsx
<ThemeProvider defaultVariant="custom">
\`\`\`

### Method 2: Programmatic API

Create a custom variant programmatically:

\`\`\`tsx
import { useTheme } from "@devlaunch/ui";

function CustomThemeButton() {
  const { setVariant } = useTheme();

  return (
    <button onClick={() => setVariant("custom")}>
      Apply Custom Theme
    </button>
  );
}
\`\`\`

---

## 🌈 Color System

@devlaunch/ui uses HSL colors for maximum flexibility:

| Token | Purpose | Light Example | Dark Example |
|-------|---------|---------------|--------------|
| `--background` | Page background | `0 0% 100%` (white) | `222.2 84% 4.9%` (dark blue) |
| `--foreground` | Text color | `222.2 84% 4.9%` (dark) | `210 40% 98%` (light) |
| `--primary` | Primary actions | `222.2 47.4% 11.2%` | `210 40% 98%` |
| `--secondary` | Secondary actions | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--accent` | Highlights | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--muted` | Disabled states | `210 40% 96.1%` | `217.2 32.6% 17.5%` |
| `--destructive` | Errors/Delete | `0 84.2% 60.2%` | `0 62.8% 30.6%` |
| `--border` | Borders | `214.3 31.8% 91.4%` | `217.2 32.6% 17.5%` |
| `--ring` | Focus rings | `222.2 84% 4.9%` | `212.7 26.8% 83.9%` |

---

## 🔧 Advanced Customization

### Custom Animations

Add custom keyframes to the preset:

\`\`\`javascript
// tailwind.config.js
import devlaunchPreset from "@devlaunch/ui/preset";

export default {
  presets: [devlaunchPreset],
  theme: {
    extend: {
      keyframes: {
        "custom-bounce": {
          "0%, 100%": { transform: "translateY(-25%)" },
          "50%": { transform: "translateY(0)" },
        },
      },
      animation: {
        "custom-bounce": "custom-bounce 1s infinite",
      },
    },
  },
};
\`\`\`

### Custom Fonts

Override font families:

\`\`\`css
@layer base {
  :root {
    --font-sans: "Inter", ui-sans-serif, system-ui;
    --font-mono: "JetBrains Mono", ui-monospace;
  }
}
\`\`\`

---

## 💡 Best Practices

1. **Use Semantic Tokens:** Always use `--primary`, `--secondary`, etc. instead of hardcoded colors
2. **Test in Dark Mode:** Ensure your theme works in both light and dark modes
3. **Maintain Contrast:** Follow WCAG 2.1 AA guidelines (4.5:1 for text)
4. **Border Radius Consistency:** Use `--radius` and its variants (`rounded-lg`, `rounded-md`, `rounded-sm`)
5. **Animation Performance:** Prefer `transform` and `opacity` for smooth animations

---

## 📚 Examples

### Brand Color Override

\`\`\`css
:root {
  --primary: 221 83% 53%; /* Your brand blue */
  --primary-foreground: 210 40% 98%;
}
\`\`\`

### Accessible High Contrast

\`\`\`css
.theme-high-contrast {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --border: 0 0% 0%;
  --primary: 0 0% 0%;
  --primary-foreground: 0 0% 100%;
}
\`\`\`

### Rounded Design

\`\`\`css
:root {
  --radius: 1rem; /* More rounded */
}
\`\`\`

---

## 🔗 Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HSL Color Picker](https://hslpicker.com/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [@devlaunch/ui Storybook](https://your-storybook-url.com)

---

## 🆘 Troubleshooting

### Theme not applying

Ensure you:
1. Imported styles: `import "@devlaunch/ui/styles"`
2. Added ThemeProvider wrapper
3. Set `suppressHydrationWarning` on `<html>` tag

### Colors not updating

Check:
1. CSS variables are properly scoped (`:root` or `.theme-name`)
2. HSL format is correct: `H S% L%` (spaces required)
3. CSS is being imported in correct order

---

**Questions?** Open an issue on [GitHub](https://github.com/yourusername/devlaunch-ui)
\`\`\`

### Acceptance Criteria

- [ ] Comprehensive theming documentation
- [ ] Quick start guide
- [ ] Custom theme examples
- [ ] Color system reference
- [ ] Best practices section
- [ ] Troubleshooting guide

---

## ✅ Phase 7 Checklist

### Implementation
- [ ] Tailwind preset created
- [ ] CSS variables system defined
- [ ] ThemeProvider component built
- [ ] ThemeSwitcher component built
- [ ] 4 theme variants implemented (default, corporate, vibrant, minimal)
- [ ] THEMING.md documentation written

### Quality Assurance
- [ ] All themes tested in light and dark modes
- [ ] TypeScript compilation successful
- [ ] Storybook stories for theme switcher
- [ ] Theme persistence works (localStorage)
- [ ] System preference detection works
- [ ] Exports added to index.ts

### Testing
- [ ] Test theme switching in browser
- [ ] Verify CSS variables apply correctly
- [ ] Check contrast ratios (WCAG AA)
- [ ] Test in multiple browsers
- [ ] Verify no FOUC (Flash of Unstyled Content)

---

## 🔧 Verification Commands

```bash
# Build preset
pnpm --filter @devlaunch/ui build

# Type check
pnpm --filter @devlaunch/ui typecheck

# Start Storybook
pnpm --filter @devlaunch/ui storybook

# Test in web app
pnpm --filter web dev
```

---

## 📊 Success Metrics

- ✅ 4+ theme variants available
- ✅ Dark mode fully supported
- ✅ Theme switching is instant (<100ms)
- ✅ LocalStorage persistence works
- ✅ Documentation is comprehensive
- ✅ All components respect theme variables

---

## 🚀 Next Steps

After completing Phase 7:
- **Phase 8:** Quality Assurance
- **Phase 9:** Release Process

---

**Estimated Completion:** 6-8 hours
**Can run in parallel with:** Component phases (4, 5, 6)
