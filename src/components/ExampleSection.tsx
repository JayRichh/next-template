"use client";

import { ReactNode, Suspense } from "react";

import { Text } from "@/components/ui/Text";
import { useActiveSection } from "@/hooks/useActiveSection";
import { cn } from "@/utils/cn";

interface ExampleSectionProps {
  id: string;
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}

function ExampleSectionContent({
  id,
  category,
  title,
  description,
  children,
}: ExampleSectionProps) {
  const { section: activeSection, category: activeCategory } = useActiveSection();
  const isActive = activeSection === id || (!activeSection && activeCategory === category);

  return (
    <section
      id={id}
      data-section
      data-category={category}
      className={cn(
        "w-full py-12 transition-all duration-300 ease-in-out border-b border-border/10",
        isActive && "bg-muted/50 shadow-sm"
      )}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <Text variant="h3" className="mb-3">
            {title}
          </Text>
          <Text variant="body" className="text-foreground-secondary">
            {description}
          </Text>
        </div>
        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}

export function ExampleSection(props: ExampleSectionProps) {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ExampleSectionContent {...props} />
    </Suspense>
  );
}

interface ExampleContainerProps {
  category: string;
  title: string;
  description: string;
  children: ReactNode;
}

export function ExampleContainer({
  category,
  title,
  description,
  children,
}: ExampleContainerProps) {
  return (
    <div className="flex flex-col min-h-full">
      <div className="py-8 border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6">
          <Text variant="h2" className="mb-3">
            {title}
          </Text>
          <Text variant="body" className="text-foreground-secondary">
            {description}
          </Text>
        </div>
      </div>

      <div className="flex-1 pb-12">{children}</div>
    </div>
  );
}
