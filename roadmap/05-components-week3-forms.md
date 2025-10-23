# Phase 5: Form & Data Components (Week 3)

**Duration:** 14-18 hours
**Dependencies:** Phase 4 recommended (for consistency)
**Agent-Ready:** ✅ Yes (7 independent tasks)
**Priority:** High

---

## 🎯 Objectives

Build 7 form and data-focused components that complete the UI library's input and information display capabilities:

1. **Combobox** - Searchable select with filtering
2. **DatePicker** - Calendar-based date selection
3. **Form** - Flexible field wrapper with validation states
4. **Stepper** - Multi-step wizard navigation
5. **Timeline** - Vertical activity feed
6. **Menu** - Context and dropdown menus
7. **NumberInput** - Stepper input with increment/decrement

**Target:** Production-ready components with TypeScript, Storybook, accessibility, and animations.

---

## 📦 Component 1: Combobox

### Overview
A searchable select component combining an input with a filterable dropdown list.

**File:** `packages/ui/src/components/ui/combobox.tsx`

**Dependencies:**
```bash
pnpm add @radix-ui/react-popover cmdk
```

### Implementation

```typescript
"use client";

import * as React from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { Command as CommandPrimitive } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ComboboxOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface ComboboxProps {
  options: ComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  emptyText?: string;
  searchPlaceholder?: string;
  className?: string;
  disabled?: boolean;
}

export const Combobox = React.forwardRef<HTMLButtonElement, ComboboxProps>(
  (
    {
      options,
      value,
      onValueChange,
      placeholder = "Select option...",
      emptyText = "No option found.",
      searchPlaceholder = "Search...",
      className,
      disabled = false,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    const selectedOption = options.find((option) => option.value === value);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            disabled={disabled}
            className={cn(
              "w-full justify-between",
              !value && "text-muted-foreground",
              className
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[var(--radix-popover-trigger-width)] p-0">
          <Command>
            <CommandInput placeholder={searchPlaceholder} />
            <CommandEmpty>{emptyText}</CommandEmpty>
            <CommandGroup className="max-h-[300px] overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  onSelect={(currentValue) => {
                    onValueChange?.(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === option.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

Combobox.displayName = "Combobox";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/combobox.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Combobox } from "./combobox";
import { useState } from "react";

const meta: Meta<typeof Combobox> = {
  title: "Form/Combobox",
  component: Combobox,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof Combobox>;

const frameworks = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "angular", label: "Angular" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Combobox
          options={frameworks}
          value={value}
          onValueChange={setValue}
          placeholder="Select framework..."
        />
      </div>
    );
  },
};

export const WithDisabledOptions: Story = {
  render: () => {
    const [value, setValue] = useState("");
    return (
      <div className="w-[300px]">
        <Combobox
          options={[
            { value: "next", label: "Next.js" },
            { value: "react", label: "React", disabled: true },
            { value: "vue", label: "Vue" },
          ]}
          value={value}
          onValueChange={setValue}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    options: frameworks,
    disabled: true,
    placeholder: "Disabled combobox",
  },
};

export const LargeList: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const countries = Array.from({ length: 50 }, (_, i) => ({
      value: `country-${i}`,
      label: `Country ${i + 1}`,
    }));
    return (
      <div className="w-[300px]">
        <Combobox
          options={countries}
          value={value}
          onValueChange={setValue}
          placeholder="Select country..."
          searchPlaceholder="Search countries..."
        />
      </div>
    );
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { Combobox } from "./components/ui/combobox";
export type { ComboboxProps, ComboboxOption } from "./components/ui/combobox";
```

### Acceptance Criteria

- [ ] TypeScript implementation with proper types
- [ ] Searchable with keyboard navigation
- [ ] Supports disabled options
- [ ] Accessible (ARIA roles, keyboard support)
- [ ] Storybook story with 4+ variants
- [ ] Exports added to index.ts
- [ ] No console errors

---

## 📦 Component 2: DatePicker

### Overview
Enhanced date selection using Calendar component with popover.

**File:** `packages/ui/src/components/ui/date-picker.tsx`

**Dependencies:**
```bash
pnpm add date-fns
```

### Implementation

```typescript
"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface DatePickerProps {
  date?: Date;
  onDateChange?: (date: Date | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  disabledDates?: (date: Date) => boolean;
  fromDate?: Date;
  toDate?: Date;
}

export const DatePicker = React.forwardRef<HTMLButtonElement, DatePickerProps>(
  (
    {
      date,
      onDateChange,
      placeholder = "Pick a date",
      disabled = false,
      className,
      disabledDates,
      fromDate,
      toDate,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(newDate) => {
              onDateChange?.(newDate);
              setOpen(false);
            }}
            disabled={disabledDates}
            fromDate={fromDate}
            toDate={toDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DatePicker.displayName = "DatePicker";

// Range variant
export interface DateRangePickerProps {
  dateRange?: { from: Date; to?: Date };
  onDateRangeChange?: (range: { from: Date; to?: Date } | undefined) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export const DateRangePicker = React.forwardRef<
  HTMLButtonElement,
  DateRangePickerProps
>(
  (
    {
      dateRange,
      onDateRangeChange,
      placeholder = "Pick a date range",
      disabled = false,
      className,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            variant="outline"
            disabled={disabled}
            className={cn(
              "w-full justify-start text-left font-normal",
              !dateRange && "text-muted-foreground",
              className
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {dateRange?.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "LLL dd, y")} -{" "}
                  {format(dateRange.to, "LLL dd, y")}
                </>
              ) : (
                format(dateRange.from, "LLL dd, y")
              )
            ) : (
              <span>{placeholder}</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="range"
            selected={dateRange}
            onSelect={onDateRangeChange}
            numberOfMonths={2}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    );
  }
);

DateRangePicker.displayName = "DateRangePicker";
```

### Storybook Story

**File:** `packages/ui/src/components/ui/date-picker.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { DatePicker, DateRangePicker } from "./date-picker";
import { useState } from "react";

const meta: Meta<typeof DatePicker> = {
  title: "Form/DatePicker",
  component: DatePicker,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof DatePicker>;

export const Default: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    );
  },
};

export const WithPreselectedDate: Story = {
  render: () => {
    const [date, setDate] = useState<Date>(new Date());
    return (
      <div className="w-[300px]">
        <DatePicker date={date} onDateChange={setDate} />
      </div>
    );
  },
};

export const WithDisabledDates: Story = {
  render: () => {
    const [date, setDate] = useState<Date>();
    return (
      <div className="w-[300px]">
        <DatePicker
          date={date}
          onDateChange={setDate}
          disabledDates={(date) => date < new Date()}
        />
      </div>
    );
  },
};

export const DateRange: Story = {
  render: () => {
    const [range, setRange] = useState<{ from: Date; to?: Date }>();
    return (
      <div className="w-[400px]">
        <DateRangePicker dateRange={range} onDateRangeChange={setRange} />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: "Disabled date picker",
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { DatePicker, DateRangePicker } from "./components/ui/date-picker";
export type { DatePickerProps, DateRangePickerProps } from "./components/ui/date-picker";
```

### Acceptance Criteria

- [ ] Single date and range variants
- [ ] date-fns for formatting
- [ ] Keyboard navigation support
- [ ] Disabled dates support
- [ ] Storybook story with 5+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with ARIA labels

---

## 📦 Component 3: Form Field

### Overview
Flexible form field wrapper with label, description, error message, and validation states.

**File:** `packages/ui/src/components/ui/form-field.tsx`

**Dependencies:** None (uses existing components)

### Implementation

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

const formFieldVariants = cva("space-y-2", {
  variants: {
    variant: {
      default: "",
      inline: "flex items-center space-x-4 space-y-0",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface FormFieldProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formFieldVariants> {
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
}

const FormField = React.forwardRef<HTMLDivElement, FormFieldProps>(
  (
    {
      label,
      description,
      error,
      required,
      htmlFor,
      variant,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const id = htmlFor || React.useId();

    return (
      <div
        ref={ref}
        className={cn(formFieldVariants({ variant }), className)}
        {...props}
      >
        {label && (
          <Label htmlFor={id} className={error ? "text-destructive" : ""}>
            {label}
            {required && <span className="ml-1 text-destructive">*</span>}
          </Label>
        )}
        {description && !error && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        <div className="relative">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child as React.ReactElement<any>, {
                id,
                "aria-invalid": !!error,
                "aria-describedby": error ? `${id}-error` : undefined,
              });
            }
            return child;
          })}
        </div>
        {error && (
          <p
            id={`${id}-error`}
            className="text-sm font-medium text-destructive"
            role="alert"
          >
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";

export { FormField };
```

### Storybook Story

**File:** `packages/ui/src/components/ui/form-field.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./form-field";
import { Input } from "./input";
import { Textarea } from "./textarea";
import { Select, SelectTrigger, SelectValue } from "./select";

const meta: Meta<typeof FormField> = {
  title: "Form/FormField",
  component: FormField,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof FormField>;

export const Default: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField label="Email" description="Enter your email address">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  ),
};

export const Required: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Username"
        description="Choose a unique username"
        required
      >
        <Input placeholder="john_doe" />
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Password"
        error="Password must be at least 8 characters"
        required
      >
        <Input type="password" placeholder="••••••••" />
      </FormField>
    </div>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Bio"
        description="Tell us about yourself"
      >
        <Textarea placeholder="I am a..." rows={4} />
      </FormField>
    </div>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        label="Country"
        description="Select your country"
        required
      >
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select a country" />
          </SelectTrigger>
        </Select>
      </FormField>
    </div>
  ),
};

export const InlineVariant: Story = {
  render: () => (
    <div className="w-[400px]">
      <FormField
        variant="inline"
        label="Subscribe to newsletter"
      >
        <Input type="checkbox" className="w-4 h-4" />
      </FormField>
    </div>
  ),
};

export const CompleteForm: Story = {
  render: () => (
    <div className="w-[400px] space-y-6">
      <FormField label="Full Name" required>
        <Input placeholder="John Doe" />
      </FormField>
      <FormField
        label="Email"
        description="We'll never share your email"
        required
      >
        <Input type="email" placeholder="john@example.com" />
      </FormField>
      <FormField
        label="Password"
        error="Password must contain special characters"
        required
      >
        <Input type="password" />
      </FormField>
      <FormField label="Bio">
        <Textarea rows={3} placeholder="Tell us about yourself..." />
      </FormField>
    </div>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { FormField } from "./components/ui/form-field";
export type { FormFieldProps } from "./components/ui/form-field";
```

### Acceptance Criteria

- [ ] Supports label, description, error states
- [ ] Clones children with proper ARIA attributes
- [ ] Required field indicator
- [ ] Inline variant for checkboxes/radios
- [ ] Storybook story with 7+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with proper ARIA roles

---

## 📦 Component 4: Stepper

### Overview
Multi-step wizard component for guiding users through sequential processes.

**File:** `packages/ui/src/components/ui/stepper.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const stepperVariants = cva("flex", {
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export interface Step {
  label: string;
  description?: string;
  optional?: boolean;
}

export interface StepperProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof stepperVariants> {
  steps: Step[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  clickable?: boolean;
}

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  (
    {
      steps,
      currentStep,
      onStepClick,
      clickable = false,
      orientation = "horizontal",
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(stepperVariants({ orientation }), className)}
        {...props}
      >
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isClickable = clickable && (isCompleted || isCurrent);

          return (
            <React.Fragment key={index}>
              <div
                className={cn(
                  "flex items-center",
                  orientation === "vertical" && "flex-col items-start"
                )}
              >
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(index)}
                  className={cn(
                    "flex items-center gap-3 group",
                    isClickable && "cursor-pointer hover:opacity-80",
                    !isClickable && "cursor-default"
                  )}
                >
                  {/* Step Circle */}
                  <div
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold transition-colors",
                      isCompleted &&
                        "border-primary bg-primary text-primary-foreground",
                      isCurrent &&
                        "border-primary bg-background text-primary",
                      !isCompleted &&
                        !isCurrent &&
                        "border-muted bg-background text-muted-foreground"
                    )}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      stepNumber
                    )}
                  </div>

                  {/* Step Content */}
                  <div
                    className={cn(
                      "text-left",
                      orientation === "horizontal" && "hidden sm:block"
                    )}
                  >
                    <div
                      className={cn(
                        "text-sm font-medium",
                        isCurrent && "text-foreground",
                        !isCurrent && "text-muted-foreground"
                      )}
                    >
                      {step.label}
                      {step.optional && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          (Optional)
                        </span>
                      )}
                    </div>
                    {step.description && (
                      <div className="text-xs text-muted-foreground">
                        {step.description}
                      </div>
                    )}
                  </div>
                </button>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "bg-border transition-colors",
                    orientation === "horizontal"
                      ? "mx-4 h-[2px] flex-1"
                      : "ml-5 my-2 w-[2px] h-8",
                    isCompleted && "bg-primary"
                  )}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }
);

Stepper.displayName = "Stepper";

export { Stepper };
```

### Storybook Story

**File:** `packages/ui/src/components/ui/stepper.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Stepper } from "./stepper";
import { useState } from "react";
import { Button } from "./button";

const meta: Meta<typeof Stepper> = {
  title: "Navigation/Stepper",
  component: Stepper,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Stepper>;

const steps = [
  { label: "Account", description: "Create your account" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Preferences", description: "Configure settings", optional: true },
  { label: "Complete", description: "Review and finish" },
];

export const Default: Story = {
  args: {
    steps,
    currentStep: 1,
  },
};

export const Interactive: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <div className="space-y-8">
        <Stepper steps={steps} currentStep={currentStep} />
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const Clickable: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(2);
    return (
      <Stepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        clickable
      />
    );
  },
};

export const Vertical: Story = {
  render: () => {
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <div className="flex gap-8">
        <Stepper
          steps={steps}
          currentStep={currentStep}
          orientation="vertical"
        />
        <div className="flex flex-col gap-2">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>
          <Button
            onClick={() =>
              setCurrentStep(Math.min(steps.length - 1, currentStep + 1))
            }
            disabled={currentStep === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    );
  },
};

export const Completed: Story = {
  args: {
    steps,
    currentStep: 4,
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { Stepper } from "./components/ui/stepper";
export type { StepperProps, Step } from "./components/ui/stepper";
```

### Acceptance Criteria

- [ ] Horizontal and vertical orientations
- [ ] Completed/current/upcoming states
- [ ] Optional steps support
- [ ] Clickable navigation option
- [ ] Storybook story with 5+ variants
- [ ] Exports added to index.ts
- [ ] Keyboard navigation support

---

## 📦 Component 5: Timeline

### Overview
Vertical timeline component for displaying chronological events and activities.

**File:** `packages/ui/src/components/ui/timeline.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const timelineVariants = cva("relative space-y-4", {
  variants: {
    variant: {
      default: "",
      compact: "space-y-2",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface TimelineProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineVariants> {}

const Timeline = React.forwardRef<HTMLDivElement, TimelineProps>(
  ({ variant, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineVariants({ variant }), className)}
        {...props}
      />
    );
  }
);

Timeline.displayName = "Timeline";

// Timeline Item
const timelineItemVariants = cva("relative flex gap-4 pb-8 last:pb-0", {
  variants: {
    status: {
      default: "",
      success: "",
      warning: "",
      error: "",
    },
  },
  defaultVariants: {
    status: "default",
  },
});

export interface TimelineItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof timelineItemVariants> {
  icon?: React.ReactNode;
}

const TimelineItem = React.forwardRef<HTMLDivElement, TimelineItemProps>(
  ({ status, icon, className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(timelineItemVariants({ status }), "group", className)}
        {...props}
      >
        {/* Vertical Line */}
        <div className="absolute left-[15px] top-8 h-full w-[2px] bg-border group-last:hidden" />

        {/* Icon/Dot */}
        <div
          className={cn(
            "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 bg-background",
            status === "default" && "border-border",
            status === "success" && "border-green-500 bg-green-50 dark:bg-green-950",
            status === "warning" && "border-yellow-500 bg-yellow-50 dark:bg-yellow-950",
            status === "error" && "border-red-500 bg-red-50 dark:bg-red-950"
          )}
        >
          {icon || (
            <div
              className={cn(
                "h-3 w-3 rounded-full",
                status === "default" && "bg-muted-foreground",
                status === "success" && "bg-green-500",
                status === "warning" && "bg-yellow-500",
                status === "error" && "bg-red-500"
              )}
            />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 pt-0.5">{children}</div>
      </div>
    );
  }
);

TimelineItem.displayName = "TimelineItem";

// Timeline Content Components
const TimelineHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2", className)}
    {...props}
  />
));
TimelineHeader.displayName = "TimelineHeader";

const TimelineTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h4
    ref={ref}
    className={cn("text-sm font-semibold leading-none", className)}
    {...props}
  />
));
TimelineTitle.displayName = "TimelineTitle";

const TimelineTime = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-xs text-muted-foreground", className)}
    {...props}
  />
));
TimelineTime.displayName = "TimelineTime";

const TimelineDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("mt-2 text-sm text-muted-foreground", className)}
    {...props}
  />
));
TimelineDescription.displayName = "TimelineDescription";

export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
};
```

### Storybook Story

**File:** `packages/ui/src/components/ui/timeline.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
} from "./timeline";
import { CheckCircle2, GitCommit, AlertCircle, XCircle } from "lucide-react";

const meta: Meta<typeof Timeline> = {
  title: "Data Display/Timeline",
  component: Timeline,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
  },
};

export default meta;
type Story = StoryObj<typeof Timeline>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>Project Created</TimelineTitle>
          <TimelineTime>2 hours ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          New project "DevLaunch UI" was created and initialized
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>First Commit</TimelineTitle>
          <TimelineTime>1 hour ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Initial commit with project structure
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>CI/CD Setup</TimelineTitle>
          <TimelineTime>30 minutes ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Configured GitHub Actions workflows
        </TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <Timeline>
      <TimelineItem icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}>
        <TimelineHeader>
          <TimelineTitle>Deployment Successful</TimelineTitle>
          <TimelineTime>10 minutes ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Application deployed to production successfully
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem icon={<GitCommit className="h-4 w-4 text-blue-500" />}>
        <TimelineHeader>
          <TimelineTitle>Code Merged</TimelineTitle>
          <TimelineTime>1 hour ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Pull request #42 merged to main branch
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem icon={<AlertCircle className="h-4 w-4 text-yellow-500" />}>
        <TimelineHeader>
          <TimelineTitle>Warning Detected</TimelineTitle>
          <TimelineTime>2 hours ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          High memory usage detected in worker process
        </TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const WithStatus: Story = {
  render: () => (
    <Timeline>
      <TimelineItem status="success">
        <TimelineHeader>
          <TimelineTitle>Tests Passed</TimelineTitle>
          <TimelineTime>5 minutes ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>All 125 tests passed successfully</TimelineDescription>
      </TimelineItem>
      <TimelineItem status="warning">
        <TimelineHeader>
          <TimelineTitle>Build Warning</TimelineTitle>
          <TimelineTime>15 minutes ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Build completed with 3 warnings
        </TimelineDescription>
      </TimelineItem>
      <TimelineItem status="error">
        <TimelineHeader>
          <TimelineTitle>Deployment Failed</TimelineTitle>
          <TimelineTime>30 minutes ago</TimelineTime>
        </TimelineHeader>
        <TimelineDescription>
          Deployment failed due to timeout error
        </TimelineDescription>
      </TimelineItem>
    </Timeline>
  ),
};

export const Compact: Story = {
  render: () => (
    <Timeline variant="compact">
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>Login</TimelineTitle>
          <TimelineTime>Now</TimelineTime>
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>Profile Updated</TimelineTitle>
          <TimelineTime>5m ago</TimelineTime>
        </TimelineHeader>
      </TimelineItem>
      <TimelineItem>
        <TimelineHeader>
          <TimelineTitle>Password Changed</TimelineTitle>
          <TimelineTime>1h ago</TimelineTime>
        </TimelineHeader>
      </TimelineItem>
    </Timeline>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export {
  Timeline,
  TimelineItem,
  TimelineHeader,
  TimelineTitle,
  TimelineTime,
  TimelineDescription,
} from "./components/ui/timeline";
export type { TimelineProps, TimelineItemProps } from "./components/ui/timeline";
```

### Acceptance Criteria

- [ ] Composition pattern (Timeline + TimelineItem + sub-components)
- [ ] Status variants (default, success, warning, error)
- [ ] Custom icon support
- [ ] Compact variant
- [ ] Storybook story with 4+ variants
- [ ] Exports added to index.ts
- [ ] Semantic HTML structure

---

## 📦 Component 6: Menu

### Overview
Context menus and dropdown menus using Radix UI primitives.

**File:** `packages/ui/src/components/ui/context-menu.tsx`

**Dependencies:**
```bash
pnpm add @radix-ui/react-context-menu
```

### Implementation

```typescript
"use client";

import * as React from "react";
import * as ContextMenuPrimitive from "@radix-ui/react-context-menu";
import { Check, ChevronRight, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuPrimitive.Root;
const ContextMenuTrigger = ContextMenuPrimitive.Trigger;
const ContextMenuGroup = ContextMenuPrimitive.Group;
const ContextMenuPortal = ContextMenuPrimitive.Portal;
const ContextMenuSub = ContextMenuPrimitive.Sub;
const ContextMenuRadioGroup = ContextMenuPrimitive.RadioGroup;

const ContextMenuSubTrigger = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubTrigger>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubTrigger> & {
    inset?: boolean;
  }
>(({ className, inset, children, ...props }, ref) => (
  <ContextMenuPrimitive.SubTrigger
    ref={ref}
    className={cn(
      "flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[state=open]:bg-accent data-[state=open]:text-accent-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  >
    {children}
    <ChevronRight className="ml-auto h-4 w-4" />
  </ContextMenuPrimitive.SubTrigger>
));
ContextMenuSubTrigger.displayName = ContextMenuPrimitive.SubTrigger.displayName;

const ContextMenuSubContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.SubContent>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.SubContent>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.SubContent
    ref={ref}
    className={cn(
      "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg",
      "data-[state=open]:animate-in data-[state=closed]:animate-out",
      "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
      className
    )}
    {...props}
  />
));
ContextMenuSubContent.displayName = ContextMenuPrimitive.SubContent.displayName;

const ContextMenuContent = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Portal>
    <ContextMenuPrimitive.Content
      ref={ref}
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md",
        "animate-in fade-in-80 data-[state=open]:animate-in data-[state=closed]:animate-out",
        "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
        "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
        className
      )}
      {...props}
    />
  </ContextMenuPrimitive.Portal>
));
ContextMenuContent.displayName = ContextMenuPrimitive.Content.displayName;

const ContextMenuItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Item> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuItem.displayName = ContextMenuPrimitive.Item.displayName;

const ContextMenuCheckboxItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.CheckboxItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.CheckboxItem>
>(({ className, children, checked, ...props }, ref) => (
  <ContextMenuPrimitive.CheckboxItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    checked={checked}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.CheckboxItem>
));
ContextMenuCheckboxItem.displayName =
  ContextMenuPrimitive.CheckboxItem.displayName;

const ContextMenuRadioItem = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.RadioItem>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.RadioItem>
>(({ className, children, ...props }, ref) => (
  <ContextMenuPrimitive.RadioItem
    ref={ref}
    className={cn(
      "relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none",
      "focus:bg-accent focus:text-accent-foreground",
      "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <ContextMenuPrimitive.ItemIndicator>
        <Circle className="h-2 w-2 fill-current" />
      </ContextMenuPrimitive.ItemIndicator>
    </span>
    {children}
  </ContextMenuPrimitive.RadioItem>
));
ContextMenuRadioItem.displayName = ContextMenuPrimitive.RadioItem.displayName;

const ContextMenuLabel = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Label> & {
    inset?: boolean;
  }
>(({ className, inset, ...props }, ref) => (
  <ContextMenuPrimitive.Label
    ref={ref}
    className={cn(
      "px-2 py-1.5 text-sm font-semibold text-foreground",
      inset && "pl-8",
      className
    )}
    {...props}
  />
));
ContextMenuLabel.displayName = ContextMenuPrimitive.Label.displayName;

const ContextMenuSeparator = React.forwardRef<
  React.ElementRef<typeof ContextMenuPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof ContextMenuPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <ContextMenuPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-border", className)}
    {...props}
  />
));
ContextMenuSeparator.displayName = ContextMenuPrimitive.Separator.displayName;

const ContextMenuShortcut = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
      {...props}
    />
  );
};
ContextMenuShortcut.displayName = "ContextMenuShortcut";

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
};
```

### Storybook Story

**File:** `packages/ui/src/components/ui/context-menu.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
} from "./context-menu";

const meta: Meta<typeof ContextMenu> = {
  title: "Navigation/ContextMenu",
  component: ContextMenu,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          Back
          <ContextMenuShortcut>⌘[</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem disabled>
          Forward
          <ContextMenuShortcut>⌘]</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>
          Reload
          <ContextMenuShortcut>⌘R</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          More Tools
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem>
          Save Page As...
          <ContextMenuShortcut>⌘S</ContextMenuShortcut>
        </ContextMenuItem>
        <ContextMenuItem>Print...</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithCheckboxes: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>View</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuCheckboxItem checked>
          Status Bar
        </ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem>Activity Bar</ContextMenuCheckboxItem>
        <ContextMenuCheckboxItem checked>Panel</ContextMenuCheckboxItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithRadioGroup: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuLabel>Layout</ContextMenuLabel>
        <ContextMenuSeparator />
        <ContextMenuRadioGroup value="grid">
          <ContextMenuRadioItem value="grid">Grid View</ContextMenuRadioItem>
          <ContextMenuRadioItem value="list">List View</ContextMenuRadioItem>
          <ContextMenuRadioItem value="compact">
            Compact View
          </ContextMenuRadioItem>
        </ContextMenuRadioGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
};

export const WithSubmenu: Story = {
  render: () => (
    <ContextMenu>
      <ContextMenuTrigger className="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
        Right click here
      </ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>Edit</ContextMenuItem>
        <ContextMenuItem>Copy</ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger>Share</ContextMenuSubTrigger>
          <ContextMenuSubContent className="w-48">
            <ContextMenuItem>Email link</ContextMenuItem>
            <ContextMenuItem>Messages</ContextMenuItem>
            <ContextMenuItem>Notes</ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuSeparator />
        <ContextMenuItem>Delete</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  ),
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
} from "./components/ui/context-menu";
```

### Acceptance Criteria

- [ ] Radix UI ContextMenu primitive
- [ ] Checkbox and radio item variants
- [ ] Submenu support
- [ ] Keyboard shortcuts display
- [ ] Storybook story with 4+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with ARIA attributes

---

## 📦 Component 7: NumberInput

### Overview
Numeric input with increment/decrement buttons and keyboard support.

**File:** `packages/ui/src/components/ui/number-input.tsx`

### Implementation

```typescript
"use client";

import * as React from "react";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface NumberInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  value?: number;
  onChange?: (value: number | undefined) => void;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  showButtons?: boolean;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      value,
      onChange,
      min,
      max,
      step = 1,
      precision = 0,
      showButtons = true,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      value?.toFixed(precision) ?? ""
    );

    React.useEffect(() => {
      if (value !== undefined) {
        setInternalValue(value.toFixed(precision));
      }
    }, [value, precision]);

    const clamp = (num: number): number => {
      let result = num;
      if (min !== undefined) result = Math.max(min, result);
      if (max !== undefined) result = Math.min(max, result);
      return Number(result.toFixed(precision));
    };

    const handleIncrement = () => {
      const currentValue = value ?? 0;
      const newValue = clamp(currentValue + step);
      onChange?.(newValue);
    };

    const handleDecrement = () => {
      const currentValue = value ?? 0;
      const newValue = clamp(currentValue - step);
      onChange?.(newValue);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value;
      setInternalValue(inputValue);

      if (inputValue === "" || inputValue === "-") {
        onChange?.(undefined);
        return;
      }

      const numValue = parseFloat(inputValue);
      if (!isNaN(numValue)) {
        onChange?.(clamp(numValue));
      }
    };

    const handleBlur = () => {
      if (value !== undefined) {
        setInternalValue(value.toFixed(precision));
      } else {
        setInternalValue("");
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        handleIncrement();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        handleDecrement();
      }
    };

    const isMinDisabled = min !== undefined && value !== undefined && value <= min;
    const isMaxDisabled = max !== undefined && value !== undefined && value >= max;

    return (
      <div className={cn("relative flex items-center", className)}>
        <Input
          ref={ref}
          type="text"
          inputMode="decimal"
          value={internalValue}
          onChange={handleInputChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          className={cn(
            showButtons && "pr-16",
            "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          )}
          {...props}
        />
        {showButtons && (
          <div className="absolute right-1 flex gap-0.5">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleDecrement}
              disabled={disabled || isMinDisabled}
              tabIndex={-1}
            >
              <Minus className="h-3 w-3" />
              <span className="sr-only">Decrease</span>
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-7 w-7"
              onClick={handleIncrement}
              disabled={disabled || isMaxDisabled}
              tabIndex={-1}
            >
              <Plus className="h-3 w-3" />
              <span className="sr-only">Increase</span>
            </Button>
          </div>
        )}
      </div>
    );
  }
);

NumberInput.displayName = "NumberInput";

export { NumberInput };
```

### Storybook Story

**File:** `packages/ui/src/components/ui/number-input.stories.tsx`

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { NumberInput } from "./number-input";
import { useState } from "react";

const meta: Meta<typeof NumberInput> = {
  title: "Form/NumberInput",
  component: NumberInput,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof NumberInput>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="w-[200px]">
        <NumberInput value={value} onChange={(v) => setValue(v ?? 0)} />
      </div>
    );
  },
};

export const WithMinMax: Story = {
  render: () => {
    const [value, setValue] = useState<number>(5);
    return (
      <div className="w-[200px] space-y-2">
        <NumberInput
          value={value}
          onChange={(v) => setValue(v ?? 0)}
          min={0}
          max={10}
          placeholder="Value (0-10)"
        />
        <p className="text-sm text-muted-foreground">Min: 0, Max: 10</p>
      </div>
    );
  },
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="w-[200px] space-y-2">
        <NumberInput
          value={value}
          onChange={(v) => setValue(v ?? 0)}
          step={5}
          placeholder="Step by 5"
        />
        <p className="text-sm text-muted-foreground">Step: 5</p>
      </div>
    );
  },
};

export const WithPrecision: Story = {
  render: () => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="w-[200px] space-y-2">
        <NumberInput
          value={value}
          onChange={(v) => setValue(v ?? 0)}
          step={0.1}
          precision={2}
          placeholder="Decimal value"
        />
        <p className="text-sm text-muted-foreground">Precision: 2 decimals</p>
      </div>
    );
  },
};

export const WithoutButtons: Story = {
  render: () => {
    const [value, setValue] = useState<number>(0);
    return (
      <div className="w-[200px]">
        <NumberInput
          value={value}
          onChange={(v) => setValue(v ?? 0)}
          showButtons={false}
          placeholder="Keyboard only"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  args: {
    value: 42,
    disabled: true,
  },
};

export const Currency: Story = {
  render: () => {
    const [value, setValue] = useState<number>(99.99);
    return (
      <div className="w-[200px] space-y-2">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
            $
          </span>
          <NumberInput
            value={value}
            onChange={(v) => setValue(v ?? 0)}
            min={0}
            step={0.01}
            precision={2}
            className="pl-7"
            placeholder="0.00"
          />
        </div>
        <p className="text-sm text-muted-foreground">Price: ${value.toFixed(2)}</p>
      </div>
    );
  },
};
```

### Export Addition

Add to `packages/ui/src/index.ts`:
```typescript
export { NumberInput } from "./components/ui/number-input";
export type { NumberInputProps } from "./components/ui/number-input";
```

### Acceptance Criteria

- [ ] Increment/decrement buttons
- [ ] Min/max constraints
- [ ] Step and precision support
- [ ] Keyboard arrow key support
- [ ] Optional button display
- [ ] Storybook story with 7+ variants
- [ ] Exports added to index.ts
- [ ] Accessible with ARIA labels

---

## ✅ Phase 5 Checklist

### Pre-Implementation
- [ ] Review existing component patterns
- [ ] Verify dependencies installed
- [ ] Check export structure in index.ts

### Component Implementation (2 hours each)
- [ ] Combobox - Searchable select
- [ ] DatePicker - Calendar with range support
- [ ] FormField - Flexible field wrapper
- [ ] Stepper - Multi-step wizard
- [ ] Timeline - Activity feed
- [ ] ContextMenu - Right-click menus
- [ ] NumberInput - Numeric input with controls

### Quality Assurance
- [ ] All components exported from index.ts
- [ ] TypeScript compilation successful
- [ ] Storybook builds without errors
- [ ] No console warnings
- [ ] Accessibility tested (keyboard navigation)
- [ ] Dark mode verified
- [ ] Responsive design tested

### Documentation
- [ ] All Storybook stories complete
- [ ] API props documented
- [ ] Usage examples provided
- [ ] Component descriptions clear

---

## 🔧 Verification Commands

```bash
# Install dependencies
pnpm --filter @devlaunch/ui install

# Type check
pnpm --filter @devlaunch/ui typecheck

# Build library
pnpm --filter @devlaunch/ui build

# Start Storybook
pnpm --filter @devlaunch/ui storybook

# Lint
pnpm --filter @devlaunch/ui lint
```

---

## 📊 Success Metrics

- ✅ All 7 components implemented
- ✅ 28+ Storybook stories (4 per component)
- ✅ 100% TypeScript coverage
- ✅ WCAG 2.1 AA compliant
- ✅ Tree-shakeable exports
- ✅ No build errors

---

## 🚀 Next Steps

After completing Phase 5:
- **Phase 6:** Advanced Components (Week 4)
- **Phase 8:** Quality Assurance
- **Phase 9:** Release Process

---

**Estimated Completion:** 14-18 hours (2 hours per component)
**Agent Distribution:** 7 independent tasks (can run in parallel)
