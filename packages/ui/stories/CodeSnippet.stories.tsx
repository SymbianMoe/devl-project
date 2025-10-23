import type { Meta, StoryObj } from '@storybook/react';
import { CodeSnippet } from '../src/components/animated/code-snippet';

const meta = {
  title: 'Animated/CodeSnippet',
  component: CodeSnippet,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof CodeSnippet>;

export default meta;
type Story = StoryObj<typeof meta>;

const typescriptCode = `function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

const message = greet("World");
console.log(message);`;

const reactCode = `import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}`;

const pythonCode = `def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Generate first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))`;

const bashCode = `#!/bin/bash

# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build`;

const jsonCode = `{
  "name": "my-app",
  "version": "1.0.0",
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0"
  }
}`;

export const Default: Story = {
  args: {
    code: typescriptCode,
    language: 'typescript',
    showLineNumbers: false,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const WithLineNumbers: Story = {
  args: {
    code: typescriptCode,
    language: 'typescript',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const WithAnimatedReveal: Story = {
  args: {
    code: typescriptCode,
    language: 'typescript',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: true,
  },
};

export const NoCopyButton: Story = {
  args: {
    code: typescriptCode,
    language: 'typescript',
    showLineNumbers: true,
    showCopyButton: false,
    animateReveal: false,
  },
};

export const ReactComponent: Story = {
  args: {
    code: reactCode,
    language: 'tsx',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const PythonScript: Story = {
  args: {
    code: pythonCode,
    language: 'python',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const BashScript: Story = {
  args: {
    code: bashCode,
    language: 'bash',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const JSONConfig: Story = {
  args: {
    code: jsonCode,
    language: 'json',
    showLineNumbers: true,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const MinimalExample: Story = {
  args: {
    code: 'npm install @devlaunch/ui',
    language: 'bash',
    showLineNumbers: false,
    showCopyButton: true,
    animateReveal: false,
  },
};

export const MultipleSnippets: Story = {
  render: () => (
    <div className="space-y-6">
      <CodeSnippet
        code="npm install @devlaunch/ui"
        language="bash"
        showLineNumbers={false}
        showCopyButton={true}
      />
      <CodeSnippet
        code={`import { Button } from '@devlaunch/ui';

export function App() {
  return <Button>Click me</Button>;
}`}
        language="tsx"
        showLineNumbers={true}
        showCopyButton={true}
      />
    </div>
  ),
};

export const DocumentationExample: Story = {
  render: () => (
    <div className="space-y-4 max-w-3xl">
      <div>
        <h3 className="text-lg font-semibold mb-2">Installation</h3>
        <CodeSnippet
          code="pnpm add @devlaunch/ui"
          language="bash"
          showLineNumbers={false}
          showCopyButton={true}
        />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Usage</h3>
        <CodeSnippet
          code={reactCode}
          language="tsx"
          showLineNumbers={true}
          showCopyButton={true}
        />
      </div>
    </div>
  ),
};
