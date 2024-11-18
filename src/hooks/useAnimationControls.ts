'use client';

import { useState, useCallback } from 'react';
import { AnimationControls, useAnimationControls as useFramerControls } from 'framer-motion';

interface AnimationState {
  isAnimating: boolean;
  controls: AnimationControls;
}

export const useAnimationControls = () => {
  const controls = useFramerControls();
  const [state, setState] = useState<AnimationState>({
    isAnimating: false,
    controls,
  });

  const startAnimation = useCallback(async (animation: Record<string, any>) => {
    setState(prev => ({ ...prev, isAnimating: true }));
    await controls.start(animation);
    setState(prev => ({ ...prev, isAnimating: false }));
  }, [controls]);

  const resetAnimation = useCallback(async () => {
    setState(prev => ({ ...prev, isAnimating: true }));
    await controls.set({ opacity: 0 });
    setState(prev => ({ ...prev, isAnimating: false }));
  }, [controls]);

  return {
    ...state,
    startAnimation,
    resetAnimation,
  };
};
