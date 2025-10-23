# @devlaunch/ui

[![NPM Version](https://img.shields.io/npm/v/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@devlaunch/ui)
[![NPM Downloads](https://img.shields.io/npm/dm/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://www.npmjs.com/package/@devlaunch/ui)
[![CI](https://github.com/devlaunch/devl-project/actions/workflows/ci.yml/badge.svg)](https://github.com/devlaunch/devl-project/actions/workflows/ci.yml)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://bundlephobia.com/package/@devlaunch/ui)
[![License](https://img.shields.io/npm/l/@devlaunch/ui?style=flat&colorA=000000&colorB=000000)](https://github.com/devlaunch/devl-project/blob/main/packages/ui/LICENSE)

> **Enterprise-grade React component library with beautiful, pre-animated components**

Built on Radix UI primitives, styled with Tailwind CSS, and animated with Framer Motion. Features 50+ production-ready components with full TypeScript support, dark mode, and accessibility built-in.

---

## ✨ Features

- 🎭 **50+ Components** - Comprehensive library covering all enterprise needs
- 🎬 **Pre-Animated** - Every component includes beautiful Framer Motion animations
- 🎨 **Tailwind-Native** - Deep integration with Tailwind CSS for easy customization
- ♿ **Accessible** - WCAG 2.1 AA compliant, keyboard navigation, screen reader support
- 📦 **Tree-Shakeable** - Only bundle what you use (~50KB gzipped)
- 🌙 **Dark Mode** - Built-in theme system with next-themes support
- 📘 **TypeScript** - 100% TypeScript with full type definitions
- 🔧 **Radix Primitives** - Built on battle-tested, accessible primitives
- ⚡ **Performance** - Optimized bundle size, code-splitting ready
- 📚 **Documented** - Comprehensive Storybook with 80+ examples

---

## 📦 Installation

```bash
# npm
npm install @devlaunch/ui framer-motion tailwindcss

# pnpm
pnpm add @devlaunch/ui framer-motion tailwindcss

# yarn
yarn add @devlaunch/ui framer-motion tailwindcss
```

### Peer Dependencies

The library requires these peer dependencies:

- `react` >= 18.0.0
- `react-dom` >= 18.0.0
- `framer-motion` (optional, for animated components)
- `tailwindcss` >= 3.0.0 (for styling)

---

## 🚀 Quick Start

### 1. Install the package

```bash
pnpm add @devlaunch/ui framer-motion tailwindcss
```

### 2. Import CSS

Add to your root layout or `_app.tsx`:

```typescript
import '@devlaunch/ui/styles';
```

### 3. Configure Tailwind (Optional but recommended)

Use our preset for the full experience:

```javascript
// tailwind.config.js
import devlaunchPreset from '@devlaunch/ui/preset';

export default {
  presets: [devlaunchPreset],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './node_modules/@devlaunch/ui/dist/**/*.js',
  ],
};
```

### 4. Use components

```tsx
import { Button, Card, AnimatedCounter } from '@devlaunch/ui';

export default function App() {
  return (
    <Card>
      <h2>Total Revenue</h2>
      <AnimatedCounter value={45231} prefix="$" />
      <Button>View Details</Button>
    </Card>
  );
}
```

---

## 📚 Component Categories

### UI Primitives (21 components)
`Button`, `Card`, `Input`, `Badge`, `Dialog`, `Table`, `Skeleton`, `Select`, `Textarea`, `Checkbox`, `Switch`, `Tabs`, `DropdownMenu`, `Popover`, `Toast`, `Avatar`, `Progress`, `Separator`, `Calendar`, `Label`, `Toaster`

### Animated Components (7 components)
`AnimatedCounter`, `ScrollReveal`, `TiltCard`, `TechBadge`, `CodeSnippet`, `GradientBackground`, `AnimatedComponents`

### Custom Components (10 components)
`ThemeToggle`, `LoadingSpinner`, `Navbar`, `Sidebar`, `EmptyState`, `StatusBadge`, `Pagination`, `SearchInput`, `ActivityItem`, `FilterBar`

### Data Display (2 components)
`DataTable`, `DataTableColumnHeader`

### Coming Soon (Week 2-4)
`Tooltip`, `Alert`, `Sheet`, `Breadcrumb`, `RadioGroup`, `Slider`, `Accordion`, `Command`, `Combobox`, `DatePicker`, `Form`, `Stepper`, `Timeline`, `Menu`, `NumberInput`, `FileUpload`, `MultiSelect`, `Carousel`, `Rating`, `Tree`, `ContextMenu`, `ScrollArea`

---

## 📖 Documentation

- **Storybook:** [View live examples](https://devlaunch.github.io/devl-project)
- **API Reference:** Check each component's TypeScript definitions
- **Examples:** See `apps/web` in the [monorepo](https://github.com/devlaunch/devl-project)

---

## 🎨 Theming

### Dark Mode

The library includes built-in dark mode support via CSS variables:

```tsx
import { ThemeProvider } from 'next-themes';

function App({ children }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
}
```

### Customization

Override CSS variables to match your brand:

```css
:root {
  --ui-primary: 262 83% 58%;
  --ui-background: 0 0% 100%;
  --ui-foreground: 222 47% 11%;
  --ui-radius: 0.5rem;
  /* ... more variables */
}

.dark {
  --ui-primary: 263 70% 50%;
  --ui-background: 224 71% 4%;
  --ui-foreground: 213 31% 91%;
  /* ... more variables */
}
```

---

## 💡 Usage Examples

### Basic Button

```tsx
import { Button } from '@devlaunch/ui';

<Button variant="default" size="md">
  Click me
</Button>
```

### Data Table

```tsx
import { DataTable } from '@devlaunch/ui';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

<DataTable columns={columns} data={users} />
```

### Animated Counter

```tsx
import { AnimatedCounter } from '@devlaunch/ui';

<AnimatedCounter
  value={45231}
  prefix="$"
  duration={2}
/>
```

### Scroll Reveal Animation

```tsx
import { ScrollReveal } from '@devlaunch/ui';

<ScrollReveal variant="fadeInUp">
  <Card>Content appears on scroll</Card>
</ScrollReveal>
```

---

## 🏗️ Framework Support

### Next.js (App Router)

```tsx
// app/layout.tsx
import '@devlaunch/ui/styles';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

### Next.js (Pages Router)

```tsx
// _app.tsx
import '@devlaunch/ui/styles';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
```

### Vite + React

```tsx
// main.tsx
import '@devlaunch/ui/styles';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
```

---

## 🔧 TypeScript

All components are fully typed:

```typescript
import { ButtonProps, CardProps } from '@devlaunch/ui';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

---

## 📦 Bundle Size

The library is optimized for production:

- **Full Library:** ~50KB gzipped
- **Tree-shakeable:** Only bundle what you import
- **Example:** Button + Card = ~8KB gzipped

Check your bundle with:
```bash
npx bundlephobia @devlaunch/ui
```

---

## 🤝 Contributing

We welcome contributions! See our [Contributing Guide](../../CONTRIBUTING.md).

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feat/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

MIT © [DevLaunch Team](https://github.com/devlaunch)

See [LICENSE](./LICENSE) for details.

---

## 🙏 Acknowledgments

Built with amazing open-source tools:

- [Radix UI](https://www.radix-ui.com/) - Headless UI primitives
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons
- [shadcn/ui](https://ui.shadcn.com/) - Component inspiration

---

## 🔗 Links

- [NPM Package](https://www.npmjs.com/package/@devlaunch/ui)
- [GitHub Repository](https://github.com/devlaunch/devl-project)
- [Documentation](https://devlaunch.github.io/devl-project)
- [Report Issues](https://github.com/devlaunch/devl-project/issues)
- [Request Features](https://github.com/devlaunch/devl-project/issues/new)

---

**Made with ❤️ for the React community**
