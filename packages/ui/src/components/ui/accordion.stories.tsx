import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './accordion';

const meta = {
  title: 'Components/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['single', 'multiple'],
      description: 'Controls whether one or multiple items can be open at once',
    },
    collapsible: {
      control: 'boolean',
      description: 'When type is "single", allow closing all items',
    },
  },
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>
          Yes. It adheres to the WAI-ARIA design pattern with full keyboard
          navigation support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>
          Yes. It comes with default styles that you can customize to match
          your design system.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it animated?</AccordionTrigger>
        <AccordionContent>
          Yes. It uses smooth animations powered by Tailwind CSS and Radix UI
          primitives.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const MultipleOpen: Story = {
  render: () => (
    <Accordion type="multiple" className="w-full max-w-md">
      <AccordionItem value="item-1">
        <AccordionTrigger>Can I open multiple items?</AccordionTrigger>
        <AccordionContent>
          Yes! When type is set to "multiple", you can have multiple accordion
          items open at the same time.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I enable this?</AccordionTrigger>
        <AccordionContent>
          Simply set the type prop to "multiple" on the Accordion component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Is it useful?</AccordionTrigger>
        <AccordionContent>
          Absolutely! This is great for FAQs or sections where users might want
          to compare information across multiple items.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const FAQ: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is DevLaunch?</AccordionTrigger>
        <AccordionContent>
          DevLaunch is a comprehensive platform for managing development
          projects, tracking progress, and collaborating with team members. It
          provides tools for issue tracking, documentation, and deployment
          management.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>How do I get started?</AccordionTrigger>
        <AccordionContent>
          Getting started is easy! Simply create an account, set up your first
          project, and invite your team members. Our onboarding wizard will
          guide you through the essential setup steps.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>What are the pricing plans?</AccordionTrigger>
        <AccordionContent>
          We offer flexible pricing plans to suit teams of all sizes. Our Free
          tier includes up to 5 team members and basic features. Pro and
          Enterprise plans offer advanced features, unlimited team members, and
          priority support.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>Is my data secure?</AccordionTrigger>
        <AccordionContent>
          Yes! We take security seriously. All data is encrypted in transit and
          at rest. We comply with industry standards including SOC 2 Type II,
          GDPR, and regularly undergo third-party security audits.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Can I integrate with other tools?</AccordionTrigger>
        <AccordionContent>
          Absolutely! DevLaunch integrates with popular tools like GitHub,
          GitLab, Slack, Jira, and many more. We also provide a comprehensive
          REST API for custom integrations.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const WithDefaultOpen: Story = {
  render: () => (
    <Accordion
      type="single"
      defaultValue="item-2"
      collapsible
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>First Item</AccordionTrigger>
        <AccordionContent>
          This item is initially closed. Click to open it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Second Item (Default Open)</AccordionTrigger>
        <AccordionContent>
          This item is open by default because we set defaultValue="item-2" on
          the Accordion component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Third Item</AccordionTrigger>
        <AccordionContent>
          This item is also initially closed. Try clicking between items to see
          the animation.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const NonCollapsible: Story = {
  render: () => (
    <Accordion
      type="single"
      defaultValue="item-1"
      collapsible={false}
      className="w-full max-w-md"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Always One Open</AccordionTrigger>
        <AccordionContent>
          When collapsible is set to false, at least one item must always be
          open. Try clicking on other items - you'll see this ensures always
          having content visible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Navigation Pattern</AccordionTrigger>
        <AccordionContent>
          This is useful for navigation patterns where you want to ensure users
          always see some content, like a settings panel or documentation
          sidebar.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>User Experience</AccordionTrigger>
        <AccordionContent>
          This prevents the jarring experience of all items being collapsed and
          maintains context for the user.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const Styled: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-md">
      <AccordionItem value="item-1" className="border-b-2 border-primary/20">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-primary">
          Custom Styling
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground">
          You can easily customize the appearance of accordion items by passing
          className props to any component.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className="border-b-2 border-primary/20">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-primary">
          Flexible Design
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground">
          The component system is built with flexibility in mind, allowing you
          to match your brand's design system perfectly.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className="border-b-2 border-primary/20">
        <AccordionTrigger className="text-lg font-semibold hover:no-underline hover:text-primary">
          Dark Mode Ready
        </AccordionTrigger>
        <AccordionContent className="text-base text-muted-foreground">
          All components support dark mode out of the box with CSS variables
          for theming.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const LongContent: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-full max-w-2xl">
      <AccordionItem value="item-1">
        <AccordionTrigger>Short Content</AccordionTrigger>
        <AccordionContent>
          This is a brief message that fits in one line.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Medium Content</AccordionTrigger>
        <AccordionContent>
          This content is a bit longer and demonstrates how the accordion
          handles multiple lines of text. The animation smoothly expands to
          accommodate the full height of the content.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Long Content</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-4">
            <p>
              This accordion item contains significantly more content to
              demonstrate how well the component handles larger amounts of text
              and multiple paragraphs.
            </p>
            <p>
              The animation system uses CSS variables to calculate the exact
              height needed, ensuring smooth transitions regardless of content
              length. This is powered by Radix UI's accordion primitive which
              handles all the complex state management and accessibility
              features.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li>Supports keyboard navigation with arrow keys</li>
              <li>Fully accessible with proper ARIA attributes</li>
              <li>Smooth animations for opening and closing</li>
              <li>Responsive design that works on all devices</li>
              <li>Dark mode support built-in</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};
