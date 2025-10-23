'use client';

import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { useState } from 'react';

export interface CodeSnippetProps {
  /**
   * Code to display
   */
  code: string;
  /**
   * Programming language for syntax highlighting
   */
  language?: string;
  /**
   * Show line numbers
   */
  showLineNumbers?: boolean;
  /**
   * Enable copy button
   */
  showCopyButton?: boolean;
  /**
   * Animate code reveal line by line
   */
  animateReveal?: boolean;
  /**
   * Additional className
   */
  className?: string;
}

/**
 * CodeSnippet - Syntax highlighted code display with animations
 *
 * Displays code with optional line numbers, copy button,
 * and line-by-line reveal animation
 */
export function CodeSnippet({
  code,
  language = 'typescript',
  showLineNumbers = false,
  showCopyButton = true,
  animateReveal = false,
  className = '',
}: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);

  const lines = code.split('\n');

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Language badge and copy button */}
      <div className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900/50 px-4 py-2">
        <span className="text-xs font-medium uppercase text-zinc-400">
          {language}
        </span>
        {showCopyButton && (
          <motion.button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-300"
            whileTap={{ scale: 0.95 }}
          >
            {copied ? (
              <>
                <Check className="h-3 w-3" />
                Copied!
              </>
            ) : (
              <>
                <Copy className="h-3 w-3" />
                Copy
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Code content */}
      <div className="overflow-x-auto bg-zinc-950/50 p-4">
        <pre className="text-sm">
          <code className="font-mono">
            {lines.map((line, index) => (
              <motion.div
                key={index}
                initial={animateReveal ? { opacity: 0, x: -10 } : false}
                animate={animateReveal ? { opacity: 1, x: 0 } : undefined}
                transition={
                  animateReveal
                    ? {
                        delay: index * 0.05,
                        duration: 0.3,
                      }
                    : undefined
                }
                className="leading-relaxed"
              >
                {showLineNumbers && (
                  <span className="mr-4 inline-block w-8 select-none text-right text-zinc-600">
                    {index + 1}
                  </span>
                )}
                <span className="text-zinc-300">{line || ' '}</span>
              </motion.div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
