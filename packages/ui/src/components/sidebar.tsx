'use client';

import { useState, type ReactNode } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/button';

export interface SidebarLink {
  label: string;
  href: string;
  icon?: ReactNode;
  active?: boolean;
}

export interface SidebarSection {
  title?: string;
  links: SidebarLink[];
}

export interface SidebarProps {
  /**
   * Sidebar sections with links
   */
  sections: SidebarSection[];
  /**
   * Header content (e.g., logo, brand)
   */
  header?: ReactNode;
  /**
   * Footer content (e.g., user profile)
   */
  footer?: ReactNode;
  /**
   * Callback when link is clicked
   */
  onLinkClick?: (href: string) => void;
  /**
   * Collapsible sidebar
   */
  collapsible?: boolean;
  /**
   * Default collapsed state
   */
  defaultCollapsed?: boolean;
  /**
   * Additional class name
   */
  className?: string;
}

/**
 * Sidebar - Collapsible navigation sidebar
 *
 * Features:
 * - Sections with links
 * - Icons support
 * - Collapsible with animation
 * - Header and footer slots
 */
export function Sidebar({
  sections,
  header,
  footer,
  onLinkClick,
  collapsible = true,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  const handleLinkClick = (href: string) => {
    onLinkClick?.(href);
  };

  return (
    <aside
      className={cn(
        'flex flex-col border-r bg-background transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Header */}
      {header && (
        <div
          className={cn(
            'h-16 border-b flex items-center px-4',
            collapsed && 'justify-center px-2'
          )}
        >
          {header}
        </div>
      )}

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-4">
        {sections.map((section, sectionIdx) => (
          <div key={sectionIdx} className="mb-4">
            {section.title && !collapsed && (
              <h3 className="px-4 mb-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                {section.title}
              </h3>
            )}
            <nav className="space-y-1 px-2">
              {section.links.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link.href)}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                    link.active
                      ? 'bg-accent text-accent-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    collapsed && 'justify-center px-2'
                  )}
                  title={collapsed ? link.label : undefined}
                >
                  {link.icon && (
                    <span className="h-5 w-5 flex-shrink-0">
                      {link.icon}
                    </span>
                  )}
                  {!collapsed && <span>{link.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        ))}
      </div>

      {/* Footer */}
      {footer && (
        <div
          className={cn(
            'border-t p-4',
            collapsed && 'px-2 flex justify-center'
          )}
        >
          {footer}
        </div>
      )}

      {/* Collapse Toggle */}
      {collapsible && (
        <div className="border-t p-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="w-full"
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      )}
    </aside>
  );
}

Sidebar.displayName = 'Sidebar';
