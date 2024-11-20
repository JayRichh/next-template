"use client";

import { ComponentExample } from "../types";
import { Button } from "@/components/ui/Button";
import { Tooltip } from "@/components/ui/Tooltip";

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
  id: "tooltip",
  title: "Tooltip",
  description: "Hover information tooltips",
  code: tooltipCode,
  component: <TooltipExample />,
};
