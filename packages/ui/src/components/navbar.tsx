'use client';

import { useState, type ReactNode } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface NavbarProps {
  /**
   * Brand/logo content (text or component)
   */
  brand?: ReactNode;
  /**
   * Navigation links
   */
  links?: NavLink[];
  /**
   * Right-side actions (e.g., theme toggle, user menu)
   */
  actions?: ReactNode;
  /**
   * Callback when link is clicked
   */
  onLinkClick?: (href: string) => void;
  /**
   * Additional class name
   */
  className?: string;
  /**
   * Sticky navbar
   */
  sticky?: boolean;
}

/**
 * Navbar - Responsive navigation bar with mobile menu
 *
 * Features:
 * - Responsive design (mobile hamburger menu)
 * - Support for brand/logo
 * - Configurable links and actions
 * - Optional sticky positioning
 */
export function Navbar({
  brand,
  links = [],
  actions,
  onLinkClick,
  className,
  sticky = false,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    onLinkClick?.(href);
  };

  return (
    <nav
      className={cn(
        'w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        sticky && 'sticky top-0 z-50',
        className
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Brand/Logo */}
          {brand && <div className="flex items-center">{brand}</div>}

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-6 flex-1 justify-center">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  link.active
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <div className="hidden md:flex md:items-center md:gap-2">
              {actions}
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t">
            {links.map((link) => (
              <button
                key={link.href}
                onClick={() => handleLinkClick(link.href)}
                className={cn(
                  'block w-full text-left px-4 py-2 text-sm font-medium transition-colors hover:bg-accent rounded-md',
                  link.active
                    ? 'text-foreground bg-accent'
                    : 'text-muted-foreground'
                )}
              >
                {link.label}
              </button>
            ))}
            {actions && (
              <div className="px-4 pt-4 border-t flex items-center gap-2">
                {actions}
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}

Navbar.displayName = 'Navbar';
