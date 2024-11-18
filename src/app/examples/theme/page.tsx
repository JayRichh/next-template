'use client';

import { useState } from 'react';
import { Text } from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { CodePreview } from '@/components/ui/CodePreview';
import { Moon, Sun } from 'lucide-react';

const examples = [
  {
    id: 'darkmode',
    title: 'Dark Mode Toggle',
    description: 'Toggle between light and dark mode',
    code: `import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}`,
    component: <ThemeToggle />
  },
  {
    id: 'colors',
    title: 'Color System',
    description: 'Examples of the color system in action',
    code: `export function ColorSystem() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-primary text-primary-foreground rounded-lg">
        Primary
      </div>
      <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
        Secondary
      </div>
      <div className="p-4 bg-accent text-accent-foreground rounded-lg">
        Accent
      </div>
      <div className="p-4 bg-muted text-muted-foreground rounded-lg">
        Muted
      </div>
    </div>
  );
}`,
    component: <ColorSystem />
  },
  {
    id: 'gradients',
    title: 'Gradient Examples',
    description: 'Various gradient styles and animations',
    code: `export function GradientExamples() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-24 bg-gradient-to-r from-primary to-accent rounded-lg" />
      <div className="h-24 bg-gradient-to-br from-secondary to-primary rounded-lg" />
      <div className="h-24 bg-gradient-to-tr from-accent to-secondary rounded-lg" />
      <div className="h-24 animate-gradient bg-gradient-to-r from-primary via-accent to-secondary rounded-lg" />
    </div>
  );
}`,
    component: <GradientExamples />
  }
];

// Example Components
function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <Button 
      variant="outline" 
      size="sm"
      onClick={toggleTheme}
      className="w-10 h-10 p-0"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
}

function ColorSystem() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="p-4 bg-primary text-primary-foreground rounded-lg">
        Primary
      </div>
      <div className="p-4 bg-secondary text-secondary-foreground rounded-lg">
        Secondary
      </div>
      <div className="p-4 bg-accent text-accent-foreground rounded-lg">
        Accent
      </div>
      <div className="p-4 bg-muted text-muted-foreground rounded-lg">
        Muted
      </div>
    </div>
  );
}

function GradientExamples() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="h-24 bg-gradient-to-r from-primary to-accent rounded-lg" />
      <div className="h-24 bg-gradient-to-br from-secondary to-primary rounded-lg" />
      <div className="h-24 bg-gradient-to-tr from-accent to-secondary rounded-lg" />
      <div className="h-24 animate-gradient bg-gradient-to-r from-primary via-accent to-secondary rounded-lg" />
    </div>
  );
}

export default function ThemePage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text variant="h2">Theming</Text>
        <Text variant="body" className="text-foreground-secondary">
          Examples of theme customization, dark mode, and color system.
        </Text>
      </div>

      <div className="space-y-16">
        {examples.map((example) => (
          <div key={example.id} className="space-y-6">
            <div className="space-y-2">
              <Text variant="h3">{example.title}</Text>
              <Text variant="body" className="text-foreground-secondary">
                {example.description}
              </Text>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardContent className="p-6">
                  <CodePreview code={example.code} />
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 flex items-center justify-center min-h-[200px]">
                  {example.component}
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
