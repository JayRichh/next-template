import { ComponentExample } from '../types';
import { progressMeta } from './progress';
import { spinnerMeta } from './spinner';
import { skeletonMeta } from './skeleton';
import { toastMeta } from './toast';

export * from './progress';
export * from './spinner';
export * from './skeleton';
export * from './toast';

export const feedbackComponents: ComponentExample[] = [
  spinnerMeta,
  progressMeta,
  skeletonMeta,
  toastMeta,
];
