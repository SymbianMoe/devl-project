import type { Meta, StoryObj } from '@storybook/react';
import { TiltCard } from '../src/components/animated/tilt-card';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';
import { Zap, Code2, Rocket } from 'lucide-react';

const meta = {
  title: 'Animated/TiltCard',
  component: TiltCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TiltCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    tiltDegree: 10,
    scaleOnHover: true,
    children: (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Tilt Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Move your mouse over this card to see the 3D tilt effect.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const WithGlow: Story = {
  args: {
    tiltDegree: 10,
    glow: true,
    scaleOnHover: true,
    children: (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Tilt Card with Glow</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Hover to see the glow effect along with the tilt.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const HighTiltDegree: Story = {
  args: {
    tiltDegree: 20,
    glow: true,
    scaleOnHover: true,
    children: (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>High Tilt (20°)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This card tilts with a more dramatic 20 degree angle.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const LowTiltDegree: Story = {
  args: {
    tiltDegree: 5,
    glow: true,
    scaleOnHover: true,
    children: (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Subtle Tilt (5°)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This card has a more subtle 5 degree tilt effect.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const NoScale: Story = {
  args: {
    tiltDegree: 10,
    glow: true,
    scaleOnHover: false,
    children: (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>No Scale Effect</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This card tilts but does not scale on hover.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FeatureCard: Story = {
  args: {
    tiltDegree: 12,
    glow: true,
    scaleOnHover: true,
    children: (
      <Card className="w-[320px]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-purple-500/10 p-2">
              <Zap className="h-6 w-6 text-purple-500" />
            </div>
            <CardTitle>Lightning Fast</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Built with performance in mind. Experience blazing fast load times
            and smooth interactions.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FeatureGrid: Story = {
  render: () => (
    <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
      <TiltCard tiltDegree={10} glow scaleOnHover>
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-purple-500/10 p-2">
                <Code2 className="h-6 w-6 text-purple-500" />
              </div>
              <CardTitle className="text-base">Developer First</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Clean APIs and excellent documentation for the best DX.
            </p>
          </CardContent>
        </Card>
      </TiltCard>

      <TiltCard tiltDegree={10} glow scaleOnHover>
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-cyan-500/10 p-2">
                <Zap className="h-6 w-6 text-cyan-500" />
              </div>
              <CardTitle className="text-base">Lightning Fast</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Optimized performance with zero compromise on features.
            </p>
          </CardContent>
        </Card>
      </TiltCard>

      <TiltCard tiltDegree={10} glow scaleOnHover>
        <Card className="h-full">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-green-500/10 p-2">
                <Rocket className="h-6 w-6 text-green-500" />
              </div>
              <CardTitle className="text-base">Production Ready</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Battle-tested components ready for production use.
            </p>
          </CardContent>
        </Card>
      </TiltCard>
    </div>
  ),
};

export const MinimalCard: Story = {
  args: {
    tiltDegree: 8,
    glow: false,
    scaleOnHover: true,
    children: (
      <div className="w-[280px] rounded-lg border bg-card p-6">
        <h3 className="font-semibold mb-2">Minimal Design</h3>
        <p className="text-sm text-muted-foreground">
          Works with any content, not just Card components.
        </p>
      </div>
    ),
  },
};
