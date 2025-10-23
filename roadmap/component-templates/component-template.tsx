"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Define component variants using CVA
const componentNameVariants = cva(
  // Base classes (always applied)
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Variant styles
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      // Size styles
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

// Component props interface
export interface ComponentNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof componentNameVariants> {
  /**
   * Additional description for this prop
   */
  customProp?: string;
  /**
   * Whether the component is disabled
   * @default false
   */
  disabled?: boolean;
}

/**
 * ComponentName - Component Description
 *
 * @example
 * ```tsx
 * <ComponentName variant="default" size="md">
 *   Content
 * </ComponentName>
 * ```
 */
export const ComponentName = React.forwardRef<
  HTMLDivElement,
  ComponentNameProps
>(({ className, variant, size, disabled, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(componentNameVariants({ variant, size, className }))}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
});

ComponentName.displayName = "ComponentName";

// If using composition pattern, add sub-components:

/**
 * ComponentNameHeader - Header section
 */
export const ComponentNameHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
));
ComponentNameHeader.displayName = "ComponentNameHeader";

/**
 * ComponentNameTitle - Title text
 */
export const ComponentNameTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
ComponentNameTitle.displayName = "ComponentNameTitle";

/**
 * ComponentNameDescription - Description text
 */
export const ComponentNameDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
ComponentNameDescription.displayName = "ComponentNameDescription";

/**
 * ComponentNameContent - Main content area
 */
export const ComponentNameContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
ComponentNameContent.displayName = "ComponentNameContent";

/**
 * ComponentNameFooter - Footer section
 */
export const ComponentNameFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
ComponentNameFooter.displayName = "ComponentNameFooter";
