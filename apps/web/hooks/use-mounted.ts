'use client';

import { useEffect, useState } from 'react';

/**
 * Returns true when component is mounted on client
 * Useful for preventing hydration mismatches
 */
export function useMounted() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted;
}
