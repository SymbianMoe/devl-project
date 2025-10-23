# DevLaunch 🚀

A modern, production-ready **Next.js 15** monorepo showcasing best practices in web development with TypeScript, React, and cutting-edge tools.

## ✨ Features

### 🎨 UI Component Library
- **25+ Storybook Stories** - Comprehensive component documentation
- **Animated Components** - Framer Motion powered animations (ScrollReveal, TiltCard, AnimatedCounter, etc.)
- **Radix UI Primitives** - Accessible, unstyled components
- **Dark Mode Support** - Built-in theme system with next-themes
- **TypeScript First** - Full type safety across all components

### 🏗️ Architecture
- **Monorepo Structure** - PNPM workspaces for efficient package management
- **Multiple Rendering Modes** - SSG, ISR, SSR, and CSR examples
- **Type-Safe APIs** - Full TypeScript coverage
- **State Management** - Zustand with persistence middleware
- **Data Fetching** - TanStack Query (React Query) integration

### 🛠️ Developer Experience
- **Storybook 7** - Interactive component development
- **ESLint + Prettier** - Consistent code formatting
- **Husky + lint-staged** - Pre-commit hooks for quality
- **TypeScript 5.3** - Latest TypeScript features
- **Hot Module Replacement** - Fast development iterations

### 📦 Tech Stack

#### Frontend
- **Next.js 15** - React framework with App Router
- **React 18** - Latest React features
- **TypeScript 5.3** - Type-safe JavaScript
- **Tailwind CSS 3.4** - Utility-first styling
- **Framer Motion** - Production-ready animations
- **Lucide React** - Beautiful, consistent icons

#### State & Data
- **Zustand** - Lightweight state management
- **TanStack Query** - Server state management
- **next-themes** - Theme management

#### UI Components
- **Radix UI** - Headless UI components
- **Recharts** - Chart library for analytics
- **TanStack Table** - Powerful data tables
- **shadcn/ui** - Re-usable components built on Radix

#### Content
- **MDX** - Markdown with React components
- **Gray Matter** - Front matter parsing
- **Rehype** - HTML processing (syntax highlighting, heading links)

#### Development
- **Storybook 7** - Component development & documentation
- **Vitest** - Unit testing framework
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Husky** - Git hooks

## 📁 Project Structure

```
devl-project/
├── apps/
│   └── web/                 # Next.js application
│       ├── app/             # App router pages
│       ├── components/      # App-specific components
│       ├── lib/             # Utilities and helpers
│       ├── store/           # Zustand stores
│       ├── types/           # TypeScript types
│       └── public/          # Static assets
│
├── packages/
│   └── ui/                  # Shared UI component library
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── hooks/       # Custom React hooks
│       │   ├── lib/         # Utilities
│       │   └── styles/      # Global styles
│       └── stories/         # Storybook stories (25+ stories)
│
├── .husky/                  # Git hooks configuration
├── package.json             # Root package configuration
└── pnpm-workspace.yaml      # PNPM workspace config
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.0.0
- **PNPM** >= 8.0.0

```bash
# Install PNPM globally if you haven't already
npm install -g pnpm
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd devl-project
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up Git hooks**
   ```bash
   pnpm run prepare
   ```

### Development

#### Start the Next.js development server
```bash
pnpm dev
```
Visit [http://localhost:3000](http://localhost:3000)

#### Start Storybook for component development
```bash
pnpm --filter @devlaunch/ui storybook
```
Visit [http://localhost:6006](http://localhost:6006)

#### Run all dev servers concurrently
```bash
pnpm dev          # Next.js app
pnpm --filter @devlaunch/ui storybook  # Storybook (in another terminal)
```

### Build

#### Build all packages and apps
```bash
pnpm build
```

#### Build specific package
```bash
pnpm --filter web build           # Build Next.js app
pnpm --filter @devlaunch/ui build # Build UI library
```

### Code Quality

#### Linting
```bash
pnpm lint              # Lint all packages
pnpm --filter web lint # Lint specific package
```

#### Type Checking
```bash
pnpm typecheck              # Check all packages
pnpm --filter web typecheck # Check specific package
```

#### Formatting
```bash
pnpm format       # Format all files
pnpm format:check # Check formatting without writing
```

#### Testing
```bash
pnpm test              # Run all tests
pnpm --filter web test # Run tests for specific package
```

## 📚 Documentation

### Storybook
Comprehensive component documentation with interactive examples:
- **25 Story Files** covering all UI components
- **Interactive Controls** - Modify props in real-time
- **Dark Mode Toggle** - Test components in both themes
- **Accessibility Notes** - Built-in a11y testing

Categories:
- **UI Components** - Base components (Button, Card, Input, etc.)
- **Animated Components** - Motion-powered components
- **Custom Components** - Application-specific components

### Key Pages

#### Landing Page (`/`)
- Modern hero section with gradient background
- Animated feature cards with 3D tilt effects
- Technology stack showcase with animated badges
- Responsive design with dark mode support

#### Dashboard (`/dashboard`)
- Real-time analytics with animated charts
- Multiple dashboard views (Activity, Analytics, Team, etc.)
- Data tables with sorting and filtering
- Notification system

#### Blog (`/blog`)
- MDX-powered blog with syntax highlighting
- Static generation with ISR (10-minute revalidation)
- Reading time estimation
- Auto-generated table of contents

## 🎨 Component Highlights

### Animated Components
- **ScrollReveal** - Scroll-triggered animations (6 variants)
- **TiltCard** - 3D tilt effect on mouse movement
- **AnimatedCounter** - Number animations with formatting
- **GradientBackground** - Animated gradient with floating orbs
- **CodeSnippet** - Syntax-highlighted code with copy button
- **TechBadge** - Animated technology badges with glow effects

### UI Components
- **DataTable** - Powerful tables with TanStack Table
- **SearchInput** - Debounced search with icon
- **StatusBadge** - Status indicators (success, error, warning, etc.)
- **Pagination** - Page navigation component
- **LoadingSpinner** - Animated loading states
- **ThemeToggle** - Dark/light mode switcher
- And 30+ more components...

## 🏪 State Management

### Zustand Stores
- **Theme Store** - Theme preferences with persistence
- **User Store** - Authentication state
- **Settings Store** - Application settings

All stores include:
- TypeScript types
- Persistence middleware
- Dev tools integration

## 🎯 Rendering Strategies

### Static Site Generation (SSG)
- Blog listing page with ISR
- Blog post pages with `generateStaticParams`
- 10-minute revalidation for fresh content

### Server-Side Rendering (SSR)
- Dynamic dashboard data
- User-specific content

### Client-Side Rendering (CSR)
- Interactive components
- Real-time updates with React Query

### Incremental Static Regeneration (ISR)
- Blog pages revalidate every 10 minutes
- Balance between static and dynamic content

## 📦 Package Scripts

### Root Level
```bash
pnpm dev           # Start Next.js dev server
pnpm build         # Build all packages
pnpm lint          # Lint all packages
pnpm format        # Format all files
pnpm typecheck     # Type check all packages
pnpm test          # Run all tests
pnpm clean         # Clean all build outputs
```

### UI Package
```bash
pnpm --filter @devlaunch/ui dev        # Watch mode for library
pnpm --filter @devlaunch/ui build      # Build library
pnpm --filter @devlaunch/ui storybook  # Start Storybook
pnpm --filter @devlaunch/ui lint       # Lint UI package
```

### Web App
```bash
pnpm --filter web dev        # Start Next.js dev server
pnpm --filter web build      # Build Next.js app
pnpm --filter web start      # Start production server
pnpm --filter web lint       # Lint web app
pnpm --filter web typecheck  # Type check web app
```

## 🚢 Deployment

### Vercel (Recommended)
The project is optimized for Vercel deployment:

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push
   ```

2. **Import to Vercel**
   - Connect your GitHub repository
   - Vercel auto-detects Next.js configuration
   - Deploy with one click

3. **Environment Variables** (if needed)
   - Set in Vercel dashboard
   - Examples: API keys, database URLs, etc.

### Other Platforms
The build output is compatible with:
- **Netlify** - Static export or SSR
- **AWS Amplify** - Full Next.js support
- **Railway** - Container deployment
- **Self-hosted** - Docker or Node.js server

## 🔧 Configuration Files

- **`pnpm-workspace.yaml`** - Workspace configuration
- **`tsconfig.json`** - TypeScript configuration
- **`.eslintrc.json`** - ESLint rules
- **`.prettierrc`** - Prettier formatting
- **`tailwind.config.ts`** - Tailwind CSS configuration
- **`.storybook/`** - Storybook configuration

## 🤝 Contributing

### Code Style
- Use TypeScript for all new files
- Follow existing naming conventions
- Write meaningful commit messages
- Add Storybook stories for new components

### Pre-commit Hooks
Git hooks automatically run on commit:
- **ESLint** - Lint staged files
- **Prettier** - Format staged files
- **Type Check** - Ensure type safety

### Pull Request Process
1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit PR with clear description

## 📝 License

This project is private and proprietary.

## 🙏 Acknowledgments

Built with amazing open-source tools:
- [Next.js](https://nextjs.org/) - The React Framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Storybook](https://storybook.js.org/) - Component development
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [TanStack Query](https://tanstack.com/query) - Data fetching

---

**Built with ❤️ using Next.js, TypeScript, and modern web technologies**

For questions or support, please open an issue on GitHub.
