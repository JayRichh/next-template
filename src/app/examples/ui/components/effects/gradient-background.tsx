'use client';

import { GradientBackground } from '@/components/ui/GradientBackground';
import { ComponentExample } from '../types';

export const gradientBackgroundCode = `import { GradientBackground } from '@/components/ui/GradientBackground';

export function GradientBackgroundExample() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg">
      <GradientBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-2xl font-bold">Content</h3>
      </div>
    </div>
  );
}`;

export function GradientBackgroundExample() {
  return (
    <div className="relative h-64 w-full overflow-hidden rounded-lg">
      <GradientBackground />
      <div className="relative z-10 flex items-center justify-center h-full">
        <h3 className="text-2xl font-bold">Content</h3>
      </div>
    </div>
  );
}

export const gradientBackgroundMeta: ComponentExample = {
  id: 'gradient-background',
  title: 'Gradient Background',
  description: 'Animated gradient background effect',
  code: gradientBackgroundCode,
  component: <GradientBackgroundExample />,
};
