import type { Meta, StoryObj } from "@storybook/react";
import {
  ComponentName,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameDescription,
  ComponentNameContent,
  ComponentNameFooter,
} from "./component-name";
import { Button } from "./button"; // If needed
import { useState } from "react"; // If interactive

/**
 * ComponentName is a [brief description of what the component does].
 *
 * ## Features
 * - Feature 1
 * - Feature 2
 * - Feature 3
 *
 * ## When to use
 * - Use case 1
 * - Use case 2
 *
 * ## Accessibility
 * - Keyboard accessible
 * - Screen reader friendly
 * - ARIA compliant
 */
const meta: Meta<typeof ComponentName> = {
  title: "Components/ComponentName", // Category/ComponentName
  component: ComponentName,
  tags: ["autodocs"],
  parameters: {
    layout: "centered", // "centered" | "padded" | "fullscreen"
    docs: {
      description: {
        component:
          "A detailed description of the component, its use cases, and best practices.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost"],
      description: "Visual style variant",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg"],
      description: "Size of the component",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "default" },
      },
    },
    disabled: {
      control: "boolean",
      description: "Whether the component is disabled",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComponentName>;

/**
 * The default variant of ComponentName with standard styling.
 */
export const Default: Story = {
  args: {
    children: "Default Component",
  },
};

/**
 * All available variants displayed together for comparison.
 */
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <ComponentName variant="default">Default Variant</ComponentName>
      <ComponentName variant="outline">Outline Variant</ComponentName>
      <ComponentName variant="ghost">Ghost Variant</ComponentName>
    </div>
  ),
};

/**
 * Different sizes of the component.
 */
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <ComponentName size="sm">Small</ComponentName>
      <ComponentName size="default">Default</ComponentName>
      <ComponentName size="lg">Large</ComponentName>
    </div>
  ),
};

/**
 * Interactive example with state management.
 */
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("initial");
    return (
      <div className="space-y-4">
        <ComponentName onClick={() => setValue("clicked")}>
          Click me
        </ComponentName>
        <p className="text-sm text-muted-foreground">Value: {value}</p>
      </div>
    );
  },
};

/**
 * Disabled state of the component.
 */
export const Disabled: Story = {
  args: {
    disabled: true,
    children: "Disabled Component",
  },
};

/**
 * Component with composition pattern (if applicable).
 */
export const Composition: Story = {
  render: () => (
    <ComponentName>
      <ComponentNameHeader>
        <ComponentNameTitle>Card Title</ComponentNameTitle>
        <ComponentNameDescription>
          Card description goes here
        </ComponentNameDescription>
      </ComponentNameHeader>
      <ComponentNameContent>
        <p className="text-sm">
          This is the main content area of the component.
        </p>
      </ComponentNameContent>
      <ComponentNameFooter className="justify-end">
        <Button variant="outline">Cancel</Button>
        <Button>Submit</Button>
      </ComponentNameFooter>
    </ComponentName>
  ),
};

/**
 * Component in dark mode.
 */
export const DarkMode: Story = {
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div className="p-8 bg-background">
      <ComponentName>Dark Mode Example</ComponentName>
    </div>
  ),
};

/**
 * Component with custom styling.
 */
export const CustomStyling: Story = {
  args: {
    className: "border-2 border-dashed border-primary bg-primary/10",
    children: "Custom Styled",
  },
};

/**
 * Real-world usage example.
 */
export const RealWorldExample: Story = {
  render: () => (
    <div className="w-full max-w-md space-y-4">
      <ComponentName>
        <ComponentNameHeader>
          <ComponentNameTitle>Welcome Back</ComponentNameTitle>
          <ComponentNameDescription>
            Sign in to your account to continue
          </ComponentNameDescription>
        </ComponentNameHeader>
        <ComponentNameContent>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Password</label>
              <input
                type="password"
                className="w-full mt-1 px-3 py-2 border rounded-md"
                placeholder="••••••••"
              />
            </div>
          </div>
        </ComponentNameContent>
        <ComponentNameFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Sign In</Button>
        </ComponentNameFooter>
      </ComponentName>
    </div>
  ),
};

/**
 * Multiple instances to test layout and spacing.
 */
export const Multiple: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4">
      {Array.from({ length: 4 }, (_, i) => (
        <ComponentName key={i}>
          <ComponentNameHeader>
            <ComponentNameTitle>Item {i + 1}</ComponentNameTitle>
            <ComponentNameDescription>
              Description for item {i + 1}
            </ComponentNameDescription>
          </ComponentNameHeader>
          <ComponentNameContent>Content {i + 1}</ComponentNameContent>
        </ComponentName>
      ))}
    </div>
  ),
};

/**
 * Responsive behavior demonstration.
 */
export const Responsive: Story = {
  parameters: {
    layout: "fullscreen",
  },
  render: () => (
    <div className="p-4">
      <ComponentName className="w-full sm:w-auto">
        <ComponentNameContent>
          This component adapts to different screen sizes.
        </ComponentNameContent>
      </ComponentName>
    </div>
  ),
};
