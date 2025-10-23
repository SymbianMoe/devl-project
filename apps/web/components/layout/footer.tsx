'use client';

import { Heart } from 'lucide-react';

/**
 * Footer Component - Attribution footer
 */
export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>Made by</span>
          <span className="font-semibold text-foreground">Mohamed Shawky</span>
          <span>with</span>
          <Heart className="h-4 w-4 fill-red-500 text-red-500" />
        </div>
      </div>
    </footer>
  );
}
