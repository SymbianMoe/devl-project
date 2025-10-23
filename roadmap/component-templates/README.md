# Component Templates

This folder contains standardized templates for creating new components in @devlaunch/ui.

---

## 📁 Template Files

1. **component-template.tsx** - Base component implementation
2. **story-template.tsx** - Storybook story structure
3. **test-template.tsx** - Accessibility and unit tests
4. **index-export-template.ts** - Export pattern for index.ts

---

## 🚀 Quick Start

### 1. Create New Component

```bash
# Create component file
cp roadmap/component-templates/component-template.tsx packages/ui/src/components/ui/my-component.tsx

# Create story file
cp roadmap/component-templates/story-template.tsx packages/ui/src/components/ui/my-component.stories.tsx

# Create test file (optional)
cp roadmap/component-templates/test-template.tsx packages/ui/src/components/ui/__tests__/my-component.test.tsx
```

### 2. Find and Replace

Replace these placeholders throughout the files:

- `ComponentName` → Your component name (PascalCase, e.g., `MyComponent`)
- `component-name` → Kebab-case name (e.g., `my-component`)
- `Component Description` → Brief description of what the component does

### 3. Implement

- Fill in component logic
- Add variants using CVA
- Create Storybook examples
- Write accessibility tests

### 4. Export

Add to `packages/ui/src/index.ts`:

```typescript
export { ComponentName } from "./components/ui/component-name";
export type { ComponentNameProps } from "./components/ui/component-name";
```

---

## 📋 Component Checklist

Before marking a component complete, ensure:

### Implementation
- [ ] TypeScript with full type safety
- [ ] ForwardRef for composition
- [ ] CVA for variants (if needed)
- [ ] Proper className composition with `cn()`
- [ ] JSDoc comments for props
- [ ] DisplayName set

### Accessibility
- [ ] Keyboard navigation works
- [ ] ARIA attributes correct
- [ ] Focus management proper
- [ ] Screen reader friendly
- [ ] Semantic HTML

### Storybook
- [ ] Default story
- [ ] All variants documented
- [ ] Interactive controls
- [ ] Usage examples
- [ ] API documentation in description

### Testing (Optional but Recommended)
- [ ] Accessibility tests (jest-axe)
- [ ] Rendering tests
- [ ] Interaction tests
- [ ] Edge cases covered

### Quality
- [ ] TypeScript compiles (no errors)
- [ ] Linter passes
- [ ] No console warnings
- [ ] Dark mode works
- [ ] Responsive design

---

## 🎨 Component Patterns

### Pattern 1: Simple Component

**Use for:** Button, Badge, Separator

```tsx
export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn("base-classes", className)}
        {...props}
      />
    );
  }
);
```

### Pattern 2: Component with Variants

**Use for:** Button, Alert, Card

```tsx
const variants = cva("base-classes", {
  variants: {
    variant: {
      default: "default-classes",
      outline: "outline-classes",
    },
    size: {
      sm: "small-classes",
      lg: "large-classes",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "sm",
  },
});

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ variant, size, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(variants({ variant, size }), className)}
        {...props}
      />
    );
  }
);
```

### Pattern 3: Composition Pattern

**Use for:** Card, Dialog, Form

```tsx
// Parent component
export const MyComponent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

// Sub-components
export const MyComponentHeader = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

export const MyComponentContent = ({ children, ...props }) => {
  return <div {...props}>{children}</div>;
};

// Usage
<MyComponent>
  <MyComponentHeader>Header</MyComponentHeader>
  <MyComponentContent>Content</MyComponentContent>
</MyComponent>
```

### Pattern 4: Radix UI Wrapper

**Use for:** Dialog, Dropdown, Tooltip

```tsx
import * as RadixComponent from "@radix-ui/react-component";

export const MyComponent = React.forwardRef<
  React.ElementRef<typeof RadixComponent.Root>,
  React.ComponentPropsWithoutRef<typeof RadixComponent.Root>
>(({ className, ...props }, ref) => (
  <RadixComponent.Root
    ref={ref}
    className={cn("custom-classes", className)}
    {...props}
  />
));
```

---

## 🧪 Testing Patterns

### Accessibility Test

```tsx
describe("MyComponent Accessibility", () => {
  it("should not have accessibility violations", async () => {
    const { container } = render(<MyComponent>Content</MyComponent>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it("should have correct ARIA role", () => {
    render(<MyComponent>Content</MyComponent>);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
```

### Interaction Test

```tsx
it("should handle click events", async () => {
  const handleClick = vi.fn();
  render(<MyComponent onClick={handleClick}>Click</MyComponent>);

  await userEvent.click(screen.getByText("Click"));
  expect(handleClick).toHaveBeenCalledOnce();
});
```

---

## 📚 Resources

- [Radix UI Documentation](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [CVA Documentation](https://cva.style/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Ref Forwarding](https://react.dev/reference/react/forwardRef)
- [ARIA Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## 💡 Tips

1. **Start Simple:** Begin with the simplest version, then add variants
2. **Copy Existing:** Use similar components as reference
3. **Test Early:** Test accessibility from the start
4. **Document Well:** Write clear Storybook stories
5. **Stay Consistent:** Follow existing patterns in the library

---

**Need Help?** Review existing components in `packages/ui/src/components/ui/` for examples.
