"use client";

import { Suspense } from "react";

import { useRouter } from "next/navigation";

import { allExamples, componentCategories } from "./components";
import { ExampleContainer, ExampleSection } from "@/components/ExampleSection";
import { Card, CardContent } from "@/components/ui/Card";
import { CodePreview } from "@/components/ui/CodePreview";
import { TabGroup } from "@/components/ui/TabGroup";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/utils/cn";

function UIExamplesContent() {
  const router = useRouter();
  const { section: activeSection, category: activeCategory } = useActiveSection();

  // Filter examples based on active category
  const examples = activeCategory
    ? componentCategories.find((c) => c.id === activeCategory)?.components || []
    : allExamples;

  // Create tabs configuration
  const tabs = [
    {
      id: "all",
      label: "All",
      content: null,
    },
    ...componentCategories.map((category) => ({
      id: category.id,
      label: category.title,
      content: null,
    })),
  ];

  const handleCategoryChange = (categoryId: string) => {
    const targetCategory = categoryId === "all" ? null : categoryId;

    if (targetCategory) {
      // Get first item in category for default selection
      const category = componentCategories.find((c) => c.id === targetCategory);
      const firstItem = category?.components?.[0];
      if (firstItem) {
        router.push(`/examples/ui?section=${targetCategory}#${firstItem.id}`);
      } else {
        router.push(`/examples/ui?section=${targetCategory}`);
      }
    } else {
      router.push(activeSection ? `/examples/ui#${activeSection}` : "/examples/ui");
    }
  };

  return (
    <>
      {/* Category Filter using TabGroup */}
      <div className="mb-16">
        <div className="max-w-7xl mx-auto px-6">
          <TabGroup
            tabs={tabs}
            value={activeCategory || "all"}
            onChange={handleCategoryChange}
            variant="pills"
            className="sticky top-24 bg-background/80 backdrop-blur-sm z-10 py-6 border-b border-border/10"
          />

          {/* Selected Category Description */}
          {activeCategory && (
            <div className="mt-6 text-sm text-foreground-secondary">
              {componentCategories.find((c) => c.id === activeCategory)?.description}
            </div>
          )}
        </div>
      </div>

      {/* Component Examples */}
      <div className="space-y-24">
        {examples.map((example) => (
          <ExampleSection
            key={example.id}
            id={example.id}
            category={activeCategory || "all"}
            title={example.title}
            description={example.description}
          >
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-12">
              {/* Code Preview Card */}
              <Card className="overflow-hidden xl:sticky xl:top-48 xl:self-start">
                <CardContent className="p-0">
                  <CodePreview code={example.code} />
                </CardContent>
              </Card>

              {/* Component Demo Card */}
              <Card className="min-h-[400px]">
                <CardContent className="p-12 flex items-center justify-center">
                  <div className="w-full">{example.component}</div>
                </CardContent>
              </Card>
            </div>
          </ExampleSection>
        ))}
      </div>
    </>
  );
}

export default function UIExamplesPage() {
  return (
    <ExampleContainer
      category="ui"
      title="UI Components"
      description="Core UI components and interactive elements used throughout the application."
    >
      <Suspense fallback={<div>Loading...</div>}>
        <UIExamplesContent />
      </Suspense>
    </ExampleContainer>
  );
}
