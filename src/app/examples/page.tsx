'use client';

import { Text } from '@/components/ui/Text';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';

const categories = [
  {
    id: 'ui',
    label: 'UI Components',
    description: 'Core UI components and interactive elements including buttons, tooltips, progress indicators, and more.',
    examples: ['Button', 'Tooltip', 'Progress']
  },
  {
    id: '3d',
    label: '3D Graphics',
    description: 'Three.js powered 3D scenes and interactions with customizable properties and controls.',
    examples: ['Basic Scene', 'Interactive Colors', 'Wireframe Mode']
  },
  {
    id: 'nextjs',
    label: 'Next.js Features',
    description: 'Examples showcasing Next.js capabilities including API routes, dynamic routing, and server components.',
    examples: ['API Routes', 'Dynamic Routing', 'Data Fetching']
  },
  {
    id: 'data',
    label: 'Data & Forms',
    description: 'Form handling, data management, and state persistence examples with validation and local storage.',
    examples: ['Form Validation', 'Data Selection', 'Local Storage']
  }
];

export default function ExamplesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <Text variant="h2">Examples Overview</Text>
        <Text variant="body" className="text-foreground-secondary">
          Browse through our collection of examples showcasing various features and components.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categories.map((category) => (
          <Link key={category.id} href={`/examples/${category.id}`}>
            <Card className="h-full hover:border-primary/50 transition-colors duration-200">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-2">
                  <Text variant="h3">{category.label}</Text>
                  <Text variant="body" className="text-foreground-secondary">
                    {category.description}
                  </Text>
                </div>

                <div className="space-y-1">
                  <Text variant="body-sm" className="font-medium text-foreground-secondary">
                    Includes examples of:
                  </Text>
                  <ul className="list-disc list-inside text-sm text-foreground-secondary">
                    {category.examples.map((example) => (
                      <li key={example}>{example}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
