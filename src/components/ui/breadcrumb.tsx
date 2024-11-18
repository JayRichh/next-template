'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  href: string;
  label: string;
  active?: boolean;
}

function getBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const parts = pathname.split('/').filter(Boolean);
  const breadcrumbs = parts.map((part, index) => {
    const href = `/${parts.slice(0, index + 1).join('/')}`;
    const label = part.charAt(0).toUpperCase() + part.slice(1).replace(/-/g, ' ');
    return { 
      href, 
      label,
      active: index === parts.length - 1
    };
  });
  return [{ href: '/', label: 'Home' }, ...breadcrumbs];
}

export function Breadcrumb() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      {breadcrumbs.map((crumb, index) => (
        <div key={crumb.href} className="flex items-center">
          {index > 0 && (
            <ChevronRight className="h-4 w-4 mx-1" />
          )}
          <Link 
            href={crumb.href}
            className={`hover:text-foreground transition-colors ${
              crumb.active 
                ? 'font-medium text-foreground' 
                : 'text-muted-foreground'
            }`}
            aria-current={crumb.active ? 'page' : undefined}
          >
            {crumb.label}
          </Link>
        </div>
      ))}
    </nav>
  );
}
