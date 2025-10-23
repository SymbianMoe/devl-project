// ============================================================================
// Export Template for packages/ui/src/index.ts
// ============================================================================

// Add these lines to packages/ui/src/index.ts after creating a new component:

// 1. Simple Component Export (e.g., Button, Badge)
export { ComponentName } from "./components/ui/component-name";
export type { ComponentNameProps } from "./components/ui/component-name";

// 2. Component with Sub-components (e.g., Card, Dialog)
export {
  ComponentName,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameDescription,
  ComponentNameContent,
  ComponentNameFooter,
} from "./components/ui/component-name";
export type { ComponentNameProps } from "./components/ui/component-name";

// 3. Radix UI Wrapper with Multiple Exports (e.g., Dropdown Menu)
export {
  ComponentName,
  ComponentNameTrigger,
  ComponentNameContent,
  ComponentMenuItem,
  ComponentMenuCheckboxItem,
  ComponentMenuRadioItem,
  ComponentMenuLabel,
  ComponentMenuSeparator,
  ComponentMenuShortcut,
  ComponentMenuGroup,
  ComponentMenuPortal,
  ComponentMenuSub,
  ComponentMenuSubContent,
  ComponentMenuSubTrigger,
  ComponentMenuRadioGroup,
} from "./components/ui/component-name";

// 4. Component with Type Exports Only (e.g., Hooks, Utilities)
export type {
  ComponentNameProps,
  ComponentNameOption,
  ComponentNameValue,
} from "./components/ui/component-name";

// ============================================================================
// Export Organization in index.ts
// ============================================================================

/*
Group exports by category for better organization:

// ============================================================
// UI Primitives
// ============================================================
export { Button } from "./components/ui/button";
export { Input } from "./components/ui/input";
export { Card } from "./components/ui/card";

// ============================================================
// Form Components
// ============================================================
export { FormField } from "./components/ui/form-field";
export { Select } from "./components/ui/select";
export { Checkbox } from "./components/ui/checkbox";

// ============================================================
// Data Display
// ============================================================
export { Table } from "./components/ui/table";
export { Badge } from "./components/ui/badge";
export { Avatar } from "./components/ui/avatar";

// ============================================================
// Feedback
// ============================================================
export { Toast } from "./components/ui/toast";
export { Alert } from "./components/ui/alert";
export { Progress } from "./components/ui/progress";

// ============================================================
// Navigation
// ============================================================
export { Tabs } from "./components/ui/tabs";
export { Breadcrumb } from "./components/ui/breadcrumb";
export { Stepper } from "./components/ui/stepper";

// ============================================================
// Overlays
// ============================================================
export { Dialog } from "./components/ui/dialog";
export { Popover } from "./components/ui/popover";
export { Tooltip } from "./components/ui/tooltip";

// ============================================================
// Theming
// ============================================================
export { ThemeProvider, useTheme } from "./components/ui/theme-provider";
export { ThemeSwitcher } from "./components/ui/theme-switcher";

// ============================================================
// Utilities
// ============================================================
export { cn } from "./lib/utils";

*/

// ============================================================================
// TypeScript Type Re-exports
// ============================================================================

/*
Always export prop types for better DX:

// Component exports
export { Button } from "./components/ui/button";

// Type exports
export type { ButtonProps } from "./components/ui/button";

This allows users to:
1. Use types for custom wrappers
2. Extend components with TypeScript
3. Get full autocomplete support
*/

// ============================================================================
// Barrel Export Best Practices
// ============================================================================

/*
✅ DO:
- Export all public components
- Export prop types
- Group by category with comments
- Maintain alphabetical order within groups
- Use named exports (not default)

❌ DON'T:
- Export internal utilities
- Export test files
- Use default exports (breaks tree-shaking)
- Export everything from a wildcard (export * from ...)
*/

// ============================================================================
// Example: Complete Component Export
// ============================================================================

/*
// Component implementation (card.tsx)
export const Card = ...
export const CardHeader = ...
export const CardTitle = ...
export const CardContent = ...

export interface CardProps extends ... {}

// Index export (index.ts)
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./components/ui/card";
export type { CardProps } from "./components/ui/card";

// User usage
import { Card, CardHeader, type CardProps } from "@devlaunch/ui";
*/

// ============================================================================
// Tree-Shaking Verification
// ============================================================================

/*
After adding exports, verify tree-shaking works:

1. Create test file:
   import { Button } from "@devlaunch/ui";

2. Build and check bundle size:
   pnpm build
   pnpm size

3. Individual component should be <10KB:
   {
     "path": "dist/index.js",
     "import": "{ Button }",
     "limit": "5 KB"
   }
*/
