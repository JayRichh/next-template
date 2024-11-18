import { ComponentExample, ComponentCategory } from './types';

export * from './inputs';
export * from './feedback';
export * from './layout';
export * from './data-display';
export * from './overlay';
export * from './effects';

import { inputComponents } from './inputs';
import { feedbackComponents } from './feedback';
import { layoutComponents } from './layout';
import { dataDisplayComponents } from './data-display';
import { overlayComponents } from './overlay';
import { effectsComponents } from './effects';

export const allExamples: ComponentExample[] = [
  ...inputComponents,
  ...feedbackComponents,
  ...layoutComponents,
  ...dataDisplayComponents,
  ...overlayComponents,
  ...effectsComponents,
];

export const componentCategories: ComponentCategory[] = [
  {
    id: 'inputs',
    title: 'Inputs',
    description: 'Form controls and input components',
    components: inputComponents,
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description: 'Components for user feedback and loading states',
    components: feedbackComponents,
  },
  {
    id: 'layout',
    title: 'Layout',
    description: 'Components for page layout and content organization',
    components: layoutComponents,
  },
  {
    id: 'data-display',
    title: 'Data Display',
    description: 'Components for displaying data and information',
    components: dataDisplayComponents,
  },
  {
    id: 'overlay',
    title: 'Overlay',
    description: 'Components that overlay the main content',
    components: overlayComponents,
  },
  {
    id: 'effects',
    title: 'Effects',
    description: 'Visual effects and animations',
    components: effectsComponents,
  },
];
