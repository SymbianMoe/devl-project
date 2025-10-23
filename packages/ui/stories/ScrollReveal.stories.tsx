import type { Meta, StoryObj } from '@storybook/react';
import { ScrollReveal } from '../src/components/animated/scroll-reveal';
import { Card, CardContent, CardHeader, CardTitle } from '../src/components/ui/card';

const meta = {
  title: 'Animated/ScrollReveal',
  component: ScrollReveal,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'fadeIn',
        'fadeInUp',
        'fadeInDown',
        'fadeInLeft',
        'fadeInRight',
        'scaleIn',
      ],
    },
  },
} satisfies Meta<typeof ScrollReveal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FadeIn: Story = {
  args: {
    variant: 'fadeIn',
    duration: 0.8,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fade In Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content fades in when scrolled into view.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FadeInUp: Story = {
  args: {
    variant: 'fadeInUp',
    duration: 0.6,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fade In Up</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content slides up and fades in from below.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FadeInDown: Story = {
  args: {
    variant: 'fadeInDown',
    duration: 0.6,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fade In Down</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content slides down and fades in from above.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FadeInLeft: Story = {
  args: {
    variant: 'fadeInLeft',
    duration: 0.6,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fade In Left</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content slides in and fades from the left.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const FadeInRight: Story = {
  args: {
    variant: 'fadeInRight',
    duration: 0.6,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Fade In Right</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content slides in and fades from the right.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const ScaleIn: Story = {
  args: {
    variant: 'scaleIn',
    duration: 0.6,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Scale In</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content scales up and fades in when scrolled into view.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const WithDelay: Story = {
  args: {
    variant: 'fadeInUp',
    duration: 0.6,
    delay: 0.5,
    children: (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Delayed Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            This content animates with a 0.5 second delay.
          </p>
        </CardContent>
      </Card>
    ),
  },
};

export const StaggeredList: Story = {
  render: () => (
    <div className="space-y-4 w-[400px]">
      {['First Item', 'Second Item', 'Third Item', 'Fourth Item'].map(
        (item, index) => (
          <ScrollReveal key={item} variant="fadeInUp" delay={index * 0.15}>
            <Card>
              <CardContent className="pt-6">
                <p className="text-sm font-medium">{item}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Animates with staggered delay
                </p>
              </CardContent>
            </Card>
          </ScrollReveal>
        )
      )}
    </div>
  ),
};

export const MultipleVariants: Story = {
  render: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <ScrollReveal variant="fadeInUp">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">From Bottom</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fade In Up</p>
          </CardContent>
        </Card>
      </ScrollReveal>
      <ScrollReveal variant="fadeInDown" delay={0.1}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">From Top</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fade In Down</p>
          </CardContent>
        </Card>
      </ScrollReveal>
      <ScrollReveal variant="fadeInLeft" delay={0.2}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">From Left</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fade In Left</p>
          </CardContent>
        </Card>
      </ScrollReveal>
      <ScrollReveal variant="fadeInRight" delay={0.3}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">From Right</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fade In Right</p>
          </CardContent>
        </Card>
      </ScrollReveal>
      <ScrollReveal variant="scaleIn" delay={0.4}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Scale Up</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Scale In</p>
          </CardContent>
        </Card>
      </ScrollReveal>
      <ScrollReveal variant="fadeIn" delay={0.5}>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Simple Fade</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Fade In</p>
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  ),
};
