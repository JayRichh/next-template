'use client';

import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';
import { ComponentExample } from '../types';

export const tooltipCode = `import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

export function TooltipExample() {
  return (
    <Tooltip content="Helpful information">
      <Button>Hover me</Button>
    </Tooltip>
  );
}`;

export function TooltipExample() {
  return (
    <Tooltip content="Helpful information">
      <Button>Hover me</Button>
    </Tooltip>
  );
}

export const tooltipMeta: ComponentExample = {
  id: 'tooltip',
  title: 'Tooltip',
  description: 'Hover information tooltips',
  code: tooltipCode,
  component: <TooltipExample />,
};
