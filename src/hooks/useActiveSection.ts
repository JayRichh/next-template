'use client';

import { useEffect, useState } from 'react';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export interface ActiveState {
  section: string | null;
  category: string | null;
}

export function useActiveSection() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activeState, setActiveState] = useState<ActiveState>({
    section: null,
    category: null,
  });

  useEffect(() => {
    // Get current state from URL
    const section = searchParams.get('section');

    setActiveState({
      section: section || null,
      category: section || null,
    });
  }, [searchParams]);

  return activeState;
}
