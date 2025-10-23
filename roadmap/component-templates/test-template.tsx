import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe, toHaveNoViolations } from "jest-axe";
import userEvent from "@testing-library/user-event";
import {
  ComponentName,
  ComponentNameHeader,
  ComponentNameTitle,
  ComponentNameContent,
} from "../component-name";

// Extend expect with jest-axe matchers
expect.extend(toHaveNoViolations);

describe("ComponentName", () => {
  // ==================== Accessibility Tests ====================

  describe("Accessibility", () => {
    it("should not have accessibility violations", async () => {
      const { container } = render(
        <ComponentName>Test Content</ComponentName>
      );
      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });

    it("should have correct ARIA role", () => {
      render(<ComponentName>Content</ComponentName>);
      // Update role based on component type
      expect(screen.getByRole("region")).toBeInTheDocument();
    });

    it("should support aria-label", () => {
      render(<ComponentName aria-label="Custom label">Content</ComponentName>);
      expect(screen.getByLabelText("Custom label")).toBeInTheDocument();
    });

    it("should support aria-labelledby", () => {
      render(
        <div>
          <h2 id="label-id">Label</h2>
          <ComponentName aria-labelledby="label-id">Content</ComponentName>
        </div>
      );
      expect(screen.getByRole("region")).toHaveAccessibleName("Label");
    });

    it("should handle disabled state correctly", () => {
      render(<ComponentName disabled>Content</ComponentName>);
      expect(screen.getByText("Content")).toHaveAttribute("aria-disabled", "true");
    });
  });

  // ==================== Rendering Tests ====================

  describe("Rendering", () => {
    it("should render successfully", () => {
      render(<ComponentName>Test Content</ComponentName>);
      expect(screen.getByText("Test Content")).toBeInTheDocument();
    });

    it("should accept and render children", () => {
      render(
        <ComponentName>
          <span>Child 1</span>
          <span>Child 2</span>
        </ComponentName>
      );
      expect(screen.getByText("Child 1")).toBeInTheDocument();
      expect(screen.getByText("Child 2")).toBeInTheDocument();
    });

    it("should apply custom className", () => {
      render(<ComponentName className="custom-class">Content</ComponentName>);
      expect(screen.getByText("Content")).toHaveClass("custom-class");
    });

    it("should forward ref correctly", () => {
      const ref = vi.fn();
      render(<ComponentName ref={ref}>Content</ComponentName>);
      expect(ref).toHaveBeenCalled();
    });
  });

  // ==================== Variant Tests ====================

  describe("Variants", () => {
    it("should render default variant", () => {
      render(<ComponentName variant="default">Content</ComponentName>);
      const element = screen.getByText("Content");
      // Check for variant-specific classes
      expect(element).toHaveClass("bg-primary");
    });

    it("should render outline variant", () => {
      render(<ComponentName variant="outline">Content</ComponentName>);
      const element = screen.getByText("Content");
      expect(element).toHaveClass("border");
    });

    it("should render ghost variant", () => {
      render(<ComponentName variant="ghost">Content</ComponentName>);
      const element = screen.getByText("Content");
      expect(element).toHaveClass("hover:bg-accent");
    });
  });

  // ==================== Size Tests ====================

  describe("Sizes", () => {
    it("should render default size", () => {
      render(<ComponentName size="default">Content</ComponentName>);
      const element = screen.getByText("Content");
      expect(element).toHaveClass("h-10");
    });

    it("should render small size", () => {
      render(<ComponentName size="sm">Content</ComponentName>);
      const element = screen.getByText("Content");
      expect(element).toHaveClass("h-9");
    });

    it("should render large size", () => {
      render(<ComponentName size="lg">Content</ComponentName>);
      const element = screen.getByText("Content");
      expect(element).toHaveClass("h-11");
    });
  });

  // ==================== Interaction Tests ====================

  describe("Interactions", () => {
    it("should handle click events", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(<ComponentName onClick={handleClick}>Click me</ComponentName>);

      await user.click(screen.getByText("Click me"));
      expect(handleClick).toHaveBeenCalledOnce();
    });

    it("should not trigger click when disabled", async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();

      render(
        <ComponentName onClick={handleClick} disabled>
          Click me
        </ComponentName>
      );

      // Should not be clickable due to pointer-events-none
      const element = screen.getByText("Click me");
      expect(element).toHaveClass("pointer-events-none");
    });

    it("should handle keyboard events", async () => {
      const handleKeyDown = vi.fn();
      const user = userEvent.setup();

      render(
        <ComponentName onKeyDown={handleKeyDown} tabIndex={0}>
          Press key
        </ComponentName>
      );

      const element = screen.getByText("Press key");
      element.focus();
      await user.keyboard("{Enter}");
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  // ==================== Composition Tests ====================

  describe("Composition", () => {
    it("should render with all sub-components", () => {
      render(
        <ComponentName>
          <ComponentNameHeader>
            <ComponentNameTitle>Title</ComponentNameTitle>
          </ComponentNameHeader>
          <ComponentNameContent>Content</ComponentNameContent>
        </ComponentName>
      );

      expect(screen.getByText("Title")).toBeInTheDocument();
      expect(screen.getByText("Content")).toBeInTheDocument();
    });

    it("should maintain accessibility with composition", async () => {
      const { container } = render(
        <ComponentName>
          <ComponentNameHeader>
            <ComponentNameTitle>Title</ComponentNameTitle>
          </ComponentNameHeader>
          <ComponentNameContent>Content</ComponentNameContent>
        </ComponentName>
      );

      const results = await axe(container);
      expect(results).toHaveNoViolations();
    });
  });

  // ==================== Edge Cases ====================

  describe("Edge Cases", () => {
    it("should handle empty children", () => {
      render(<ComponentName />);
      // Should render without errors
      expect(screen.queryByRole("region")).toBeInTheDocument();
    });

    it("should handle null children", () => {
      render(<ComponentName>{null}</ComponentName>);
      expect(screen.queryByRole("region")).toBeInTheDocument();
    });

    it("should handle very long content", () => {
      const longContent = "A".repeat(1000);
      render(<ComponentName>{longContent}</ComponentName>);
      expect(screen.getByText(longContent)).toBeInTheDocument();
    });

    it("should handle special characters", () => {
      const specialChars = '<script>alert("xss")</script>';
      render(<ComponentName>{specialChars}</ComponentName>);
      // Should render as text, not execute
      expect(screen.getByText(specialChars)).toBeInTheDocument();
    });
  });

  // ==================== Snapshot Tests (Optional) ====================

  describe("Snapshots", () => {
    it("should match snapshot for default variant", () => {
      const { container } = render(
        <ComponentName>Snapshot Content</ComponentName>
      );
      expect(container.firstChild).toMatchSnapshot();
    });

    it("should match snapshot for all variants", () => {
      const { container } = render(
        <div>
          <ComponentName variant="default">Default</ComponentName>
          <ComponentName variant="outline">Outline</ComponentName>
          <ComponentName variant="ghost">Ghost</ComponentName>
        </div>
      );
      expect(container).toMatchSnapshot();
    });
  });
});
