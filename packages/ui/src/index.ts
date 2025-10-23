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
export * from './components/ui/tooltip';
export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './components/ui/tooltip';
export * from './components/ui/alert';
export { Alert, AlertTitle, AlertDescription } from './components/ui/alert';
export * from './components/ui/alert-dialog';
export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from './components/ui/alert-dialog';
export * from './components/ui/accordion';
export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from './components/ui/accordion';
export * from './components/ui/breadcrumb';
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './components/ui/breadcrumb';
export * from './components/ui/slider';
export { Slider } from './components/ui/slider';
export * from './components/ui/radio-group';
export { RadioGroup, RadioGroupItem } from './components/ui/radio-group';
export * from './components/ui/command';
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
  CommandShortcut,
} from './components/ui/command';
export * from './components/ui/sheet';
export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
} from './components/ui/sheet';

// Theming System
export { ThemeProvider, useTheme } from './components/ui/theme-provider';
export { ThemeSwitcher } from './components/ui/theme-switcher';

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
export * from './lib/animation-presets';
export { cn, formatDate, truncate } from './lib/utils';

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

// Component prop types (UI Primitives)
export type { ButtonProps } from './components/ui/button';
export type { BadgeProps } from './components/ui/badge';
export type { AlertProps } from './components/ui/alert';

// Component prop types (Custom Components)
export type { LoadingSpinnerProps } from './components/loading-spinner';
export type { PaginationProps } from './components/pagination';
export type { StatusBadgeProps } from './components/status-badge';
export type { SearchInputProps } from './components/search-input';
export type { DataTableProps } from './components/data-table';
export type { ThemeToggleProps } from './components/theme-toggle';
export type { NavbarProps } from './components/navbar';
export type { SidebarProps } from './components/sidebar';
export type { EmptyStateProps } from './components/empty-state';
export type { ActivityItemProps } from './components/activity-item';
export type { FilterBarProps } from './components/filter-bar';

// Animated component types
export type { TechBadgeProps } from './components/animated/tech-badge';
export type { CodeSnippetProps } from './components/animated/code-snippet';
export type { ScrollRevealProps } from './components/animated/scroll-reveal';
export type { TiltCardProps } from './components/animated/tilt-card';
export type { GradientBackgroundProps } from './components/animated/gradient-background';
export type {
  AnimatedContainerProps,
  AnimatedItemProps,
  AnimatedCardProps,
  AnimatedFadeProps,
  AnimatedButtonProps,
  AnimatedListItemProps,
  AnimatedPageProps,
} from './components/animated/animated-components';
