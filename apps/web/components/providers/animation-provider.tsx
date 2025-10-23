'use client';

import { AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';

export function AnimationProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <div key={pathname}>
        {children}
      </div>
    </AnimatePresence>
  );
}
