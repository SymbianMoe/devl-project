import type { Meta, StoryObj } from "@storybook/react";
import { ThemeSwitcher } from "./theme-switcher";
import { ThemeProvider } from "./theme-provider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { Button } from "./button";

const meta: Meta<typeof ThemeSwitcher> = {
  title: "Theming/ThemeSwitcher",
  component: ThemeSwitcher,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

export const Default: Story = {
  render: () => (
    <ThemeProvider>
      <div className="flex items-center gap-4">
        <ThemeSwitcher />
        <p className="text-sm text-muted-foreground">
          Click to change theme
        </p>
      </div>
    </ThemeProvider>
  ),
};

export const WithPreview: Story = {
  render: () => (
    <ThemeProvider>
      <div className="space-y-4">
        <div className="flex justify-end">
          <ThemeSwitcher />
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card Title</CardTitle>
              <CardDescription>Card description text</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card demonstrates the current theme colors.
              </p>
              <div className="mt-4 space-x-2">
                <Button variant="default">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="destructive">Destructive</Button>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Color Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-2">
                <div className="h-12 rounded bg-primary" title="Primary" />
                <div className="h-12 rounded bg-secondary" title="Secondary" />
                <div className="h-12 rounded bg-accent" title="Accent" />
                <div className="h-12 rounded bg-muted" title="Muted" />
                <div className="h-12 rounded bg-destructive" title="Destructive" />
                <div className="h-12 rounded border bg-card" title="Card" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </ThemeProvider>
  ),
};
