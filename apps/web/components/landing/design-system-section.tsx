'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ScrollReveal,
  Button,
  Input,
  Switch,
  Badge,
  Skeleton,
} from '@devlaunch/ui';
import { useState } from 'react';
import { Palette, Sun } from 'lucide-react';
import { ThemeToggleWrapper } from '../theme-toggle-wrapper';
import { motion } from 'framer-motion';

/**
 * Design System Section - Live component library showcase
 *
 * Interactive previews of the shared component library
 */
export function DesignSystemSection() {
  const [isLoading, setIsLoading] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);

  const handleLoadingDemo = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <section className="py-20 sm:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <ScrollReveal
          variant="fadeInUp"
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="mb-4 flex items-center justify-center gap-2">
            <Palette className="h-8 w-8 text-purple-400" />
          </div>
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Design{' '}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              System
            </span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Every pixel matters. The DevLaunch component library is built with
            ShadCN, Radix Primitives, and Tailwind CSS, then exported as a
            shared workspace.
          </p>
          <p className="mt-2 text-base text-muted-foreground/80">
            Styled for consistency, optimized for speed, documented with
            Storybook.
          </p>
        </ScrollReveal>

        {/* Component Previews Grid */}
        <div className="grid auto-rows-fr gap-6 lg:grid-cols-2">
          {/* Interactive Cards */}
          <ScrollReveal variant="fadeInUp" delay={0.1} className="flex">
            <Card className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>Interactive Cards</CardTitle>
                <CardDescription>
                  Hover effects, loading states, and smooth transitions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="cursor-pointer bg-secondary">
                    <CardHeader>
                      <CardTitle className="text-base">Hover Me</CardTitle>
                      <CardDescription>
                        Smooth scale animation on hover
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>

                <Button onClick={handleLoadingDemo} className="w-full">
                  Toggle Loading State
                </Button>

                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                ) : (
                  <Card className="bg-secondary">
                    <CardContent className="pt-6">
                      <p className="text-sm text-muted-foreground">
                        Content loaded successfully!
                      </p>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Form Components */}
          <ScrollReveal variant="fadeInUp" delay={0.2} className="flex">
            <Card className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>Form Components</CardTitle>
                <CardDescription>
                  Inputs, buttons, and toggles with validation states
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Input</label>
                  <Input type="email" placeholder="your@email.com" />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <label className="text-sm font-medium">
                      Enable Notifications
                    </label>
                    <p className="text-xs text-muted-foreground">
                      Smooth toggle transition
                    </p>
                  </div>
                  <Switch checked={switchOn} onCheckedChange={setSwitchOn} />
                </div>

                <div className="flex gap-2">
                  <Button variant="default" size="sm">
                    Primary
                  </Button>
                  <Button variant="outline" size="sm">
                    Outline
                  </Button>
                  <Button variant="ghost" size="sm">
                    Ghost
                  </Button>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Data Visualization */}
          <ScrollReveal variant="fadeInUp" delay={0.3} className="flex">
            <Card className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>Data Visualization</CardTitle>
                <CardDescription>
                  Charts, stats, and dashboard components
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-4">
                {/* Mini stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-purple-500/10 to-transparent dark:from-purple-500/20">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                          45.2K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Total Users
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="bg-gradient-to-br from-cyan-500/10 to-transparent dark:from-cyan-500/20">
                      <CardContent className="pt-6">
                        <div className="text-2xl font-bold text-cyan-600 dark:text-cyan-400">
                          $89K
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Revenue
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Badge variants */}
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">Secondary</Badge>
                  <Badge variant="outline">Outline</Badge>
                  <Badge variant="destructive">Error</Badge>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Theme System */}
          <ScrollReveal variant="fadeInUp" delay={0.4} className="flex">
            <Card className="flex flex-1 flex-col">
              <CardHeader>
                <CardTitle>Theme System</CardTitle>
                <CardDescription>
                  Seamless dark/light mode with smooth transitions
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="flex items-center justify-between rounded-lg border bg-secondary p-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-muted p-2">
                      <Sun className="h-5 w-5 text-amber-500 dark:text-amber-400" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Theme Toggle</div>
                      <div className="text-xs text-muted-foreground">
                        Try switching modes
                      </div>
                    </div>
                  </div>
                  <ThemeToggleWrapper />
                </div>

                {/* Color palette */}
                <div>
                  <div className="mb-3 text-sm font-medium">Color Palette</div>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      'bg-purple-500',
                      'bg-cyan-500',
                      'bg-green-500',
                      'bg-orange-500',
                      'bg-pink-500',
                    ].map((color) => (
                      <motion.div
                        key={color}
                        whileHover={{ scale: 1.1 }}
                        className={`h-12 rounded-lg ${color}`}
                      />
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
