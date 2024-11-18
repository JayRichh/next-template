'use client';

import { useEffect, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { CodePreview } from '@/components/ui/CodePreview';
import { componentCategories, allExamples } from './components';
import { useSearchParams, useRouter } from 'next/navigation';

function UIExamplesContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const section = searchParams.get('section');
  
  // Use URL parameter directly instead of local state
  const examples = section 
    ? componentCategories.find(c => c.id === section)?.components || []
    : allExamples;

  // Scroll to section on mount or section change
  useEffect(() => {
    if (section) {
      const element = document.getElementById(section);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }, [section]);

  const handleCategoryClick = (categoryId: string | null) => {
    if (categoryId) {
      router.push(`/examples/ui?section=${categoryId}`);
    } else {
      router.push('/examples/ui');
    }
  };

  return (
    <div className="space-y-8">
      <div className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">UI Components</h2>
        <p className="text-sm text-muted-foreground">
          Core UI components and interactive elements used throughout the application.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => handleCategoryClick(null)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            !section ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
          }`}
        >
          All
        </button>
        {componentCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              section === category.id ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
            }`}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* Selected Category Description */}
      {section && (
        <div className="text-sm text-muted-foreground">
          {componentCategories.find(c => c.id === section)?.description}
        </div>
      )}

      {/* Component Examples */}
      <div className="space-y-16">
        {examples.map((example) => (
          <div 
            key={example.id} 
            id={example.id} 
            className="space-y-6 scroll-mt-20"
          >
            <div className="space-y-1">
              <h3 className="text-xl font-semibold tracking-tight">
                {example.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {example.description}
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Code Preview Card */}
              <Card 
                fullHeight 
                interactive={false}
                className="overflow-hidden"
              >
                <CardContent>
                  <CodePreview code={example.code} />
                </CardContent>
              </Card>

              {/* Component Demo Card */}
              <Card 
                fullHeight 
                interactive={false}
                className="overflow-hidden"
              >
                <CardContent className="flex items-center justify-center h-full min-h-[300px]">
                  <div className="w-full">
                    {example.component}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function UIExamplesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UIExamplesContent />
    </Suspense>
  );
}
