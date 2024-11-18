import { ReactNode } from 'react';

export interface ComponentExample {
  id: string;
  title: string;
  description: string;
  code: string;
  component: ReactNode;
}

export interface ComponentCategory {
  id: string;
  title: string;
  description: string;
  components: ComponentExample[];
}
