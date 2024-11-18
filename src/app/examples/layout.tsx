'use client';

import { cn } from '@/utils/cn';
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarHeader, 
  SidebarItem, 
  SidebarProvider,
  useSidebar
} from '@/components/ui/sidebar';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { usePathname, useSearchParams } from 'next/navigation';
import { 
  Home,
  Component,
  Box,
  FileCode,
  FormInput,
  Palette,
} from 'lucide-react';

const categories = [
  {
    id: 'overview',
    label: 'Overview',
    icon: Home,
    href: '/examples'
  },
  {
    id: 'ui',
    label: 'UI Components',
    icon: Component,
    href: '/examples/ui',
    items: [
      { id: 'inputs', label: 'Inputs' },
      { id: 'feedback', label: 'Feedback' },
      { id: 'layout', label: 'Layout' },
      { id: 'data-display', label: 'Data Display' },
      { id: 'overlay', label: 'Overlay' },
      { id: 'effects', label: 'Effects' },
    ]
  },
  {
    id: '3d',
    label: '3D Graphics',
    icon: Box,
    href: '/examples/3d',
    items: [
      { id: 'basic', label: 'Basic Scene' },
      { id: 'interactive', label: 'Interactive Controls' },
      { id: 'advanced', label: 'Advanced Effects' },
    ]
  },
  {
    id: 'nextjs',
    label: 'Next.js Features',
    icon: FileCode,
    href: '/examples/nextjs',
    items: [
      { id: 'api', label: 'API Routes' },
      { id: 'routing', label: 'Dynamic Routing' },
      { id: 'server', label: 'Server Components' },
    ]
  },
  {
    id: 'data',
    label: 'Data & Forms',
    icon: FormInput,
    href: '/examples/data',
    items: [
      { id: 'forms', label: 'Form Validation' },
      { id: 'state', label: 'State Management' },
      { id: 'storage', label: 'Local Storage' },
    ]
  },
  {
    id: 'theme',
    label: 'Theming',
    icon: Palette,
    href: '/examples/theme',
    items: [
      { id: 'darkmode', label: 'Dark Mode' },
      { id: 'colors', label: 'Color System' },
      { id: 'gradients', label: 'Gradients' },
    ]
  }
];

function MainContent({ children }: { children: React.ReactNode }) {
  const { expanded } = useSidebar();
  
  return (
    <div className={cn(
      "w-full min-h-screen transition-[padding] duration-300 ease-in-out",
      expanded ? "md:pl-64" : "md:pl-12"
    )}>
      <div className="border-b py-2">
        <div className="max-w-7xl mx-auto px-2 py-3">
          <Breadcrumb />
        </div>
      </div>
      <main className="overflow-y-auto">
        <div className="max-w-7xl mx-auto px-2 py-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default function ExamplesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const section = searchParams.get('section');

  // Find current category based on pathname
  const currentCategory = categories.find(cat => pathname.startsWith(cat.href));

  // Handle navigation with proper focus
  const handleNavigation = (href: string, itemId?: string) => {
    const url = itemId ? `${href}?section=${itemId}` : href;
    router.push(url);

    // Allow time for navigation and DOM update
    setTimeout(() => {
      if (itemId) {
        const element = document.getElementById(itemId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <SidebarProvider defaultExpanded={false}>
      <div className="relative z-20">
        <Sidebar>
          <SidebarHeader
            icon={<Component className="h-4 w-4" />}
            title="Examples"
            href="/examples"
          >
            <Link href="/examples" className="flex items-center space-x-2 px-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-background">
                <Component className="h-4 w-4" />
              </div>
              <span className="font-bold">Examples</span>
            </Link>
          </SidebarHeader>
          <SidebarContent>
            {categories.map((category) => {
              const Icon = category.icon;
              const isCategoryActive = pathname.startsWith(category.href);
              const isExactPath = pathname === category.href;
              
              return (
                <SidebarGroup 
                  key={category.id} 
                  title={category.label}
                  defaultOpen={isCategoryActive}
                  href={category.href}
                  onAction={() => handleNavigation(category.href)}
                  icon={<Icon className="h-4 w-4" />}
                  isRoot={category.id === 'overview'}
                  section={isExactPath ? category.id : undefined}
                >
                  {category.items?.map((item) => (
                    <SidebarItem 
                      key={item.id}
                      className="pl-8"
                      section={item.id}
                      href={category.href}
                    >
                      {item.label}
                    </SidebarItem>
                  ))}
                </SidebarGroup>
              );
            })}
          </SidebarContent>
        </Sidebar>

        <MainContent>{children}</MainContent>
      </div>
    </SidebarProvider>
  );
}
