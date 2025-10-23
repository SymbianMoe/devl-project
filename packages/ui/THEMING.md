# Theming Guide

@devlaunch/ui provides a flexible theming system based on CSS variables and Tailwind CSS.

---

## Installation

After installing the package:

```bash
npm install @devlaunch/ui
```

---

## Quick Start

### 1. Import Styles

Import the global styles in your root layout:

```tsx
// app/layout.tsx
import "@devlaunch/ui/styles";
```

### 2. Add ThemeProvider

Wrap your app with the ThemeProvider:

```tsx
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
```

### 3. Use ThemeSwitcher

Add the theme switcher component:

```tsx
import { ThemeSwitcher } from "@devlaunch/ui";

export function Header() {
  return (
    <header>
      <ThemeSwitcher />
    </header>
  );
}
```

---

## Built-in Themes

@devlaunch/ui includes 4 pre-built theme variants:

### Default
Clean, professional design with balanced colors.

```tsx
<ThemeProvider defaultVariant="default">
```

### Corporate
Enterprise-focused with blue tones and minimal border radius.

```tsx
<ThemeProvider defaultVariant="corporate">
```

### Vibrant
Colorful design with purple and pink accents.

```tsx
<ThemeProvider defaultVariant="vibrant">
```

### Minimal
Monochrome design with no border radius.

```tsx
<ThemeProvider defaultVariant="minimal">
```

---

## Tailwind Configuration

Extend your Tailwind config with our preset:

```javascript
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
```

---

## Creating Custom Themes

### Method 1: CSS Variables

Override CSS variables in your global CSS:

```css
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
```

Apply the theme:

```tsx
<ThemeProvider defaultVariant="custom">
```

### Method 2: Programmatic API

Create a custom variant programmatically:

```tsx
import { useTheme } from "@devlaunch/ui";

function CustomThemeButton() {
  const { setVariant } = useTheme();

  return (
    <button onClick={() => setVariant("custom")}>
      Apply Custom Theme
    </button>
  );
}
```

---

## Color System

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

## Advanced Customization

### Custom Animations

Add custom keyframes to the preset:

```javascript
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
```

### Custom Fonts

Override font families:

```css
@layer base {
  :root {
    --font-sans: "Inter", ui-sans-serif, system-ui;
    --font-mono: "JetBrains Mono", ui-monospace;
  }
}
```

---

## Best Practices

1. **Use Semantic Tokens:** Always use `--primary`, `--secondary`, etc. instead of hardcoded colors
2. **Test in Dark Mode:** Ensure your theme works in both light and dark modes
3. **Maintain Contrast:** Follow WCAG 2.1 AA guidelines (4.5:1 for text)
4. **Border Radius Consistency:** Use `--radius` and its variants (`rounded-lg`, `rounded-md`, `rounded-sm`)
5. **Animation Performance:** Prefer `transform` and `opacity` for smooth animations

---

## Examples

### Brand Color Override

```css
:root {
  --primary: 221 83% 53%; /* Your brand blue */
  --primary-foreground: 210 40% 98%;
}
```

### Accessible High Contrast

```css
.theme-high-contrast {
  --background: 0 0% 100%;
  --foreground: 0 0% 0%;
  --border: 0 0% 0%;
  --primary: 0 0% 0%;
  --primary-foreground: 0 0% 100%;
}
```

### Rounded Design

```css
:root {
  --radius: 1rem; /* More rounded */
}
```

---

## Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [HSL Color Picker](https://hslpicker.com/)
- [WCAG Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [@devlaunch/ui Storybook](https://your-storybook-url.com)

---

## Troubleshooting

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
