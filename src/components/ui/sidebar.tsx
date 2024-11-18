'use client';

import * as React from 'react';
import { cn } from '@/utils/cn';
import { cva } from 'class-variance-authority';
import { motion, HTMLMotionProps, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { usePersistentState } from '@/hooks/usePersistentState';
import { Tooltip } from './Tooltip';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

const SidebarLevelContext = React.createContext(0);

function useSidebarLevel() {
  return React.useContext(SidebarLevelContext);
}

interface SidebarContextValue {
  expanded: boolean;
  setExpanded: (expanded: boolean) => void;
  isMobile: boolean;
}

const SidebarContext = React.createContext<SidebarContextValue | undefined>(undefined);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}

interface SidebarProviderProps {
  children: React.ReactNode;
  defaultExpanded?: boolean;
}

export function SidebarProvider({
  children,
  defaultExpanded = true,
}: SidebarProviderProps) {
  const [expanded, setExpanded] = usePersistentState<boolean>({
    key: 'sidebar-expanded',
    defaultValue: defaultExpanded,
  });
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setExpanded(false);
      }
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [setExpanded]);

  return (
    <SidebarContext.Provider value={{ expanded, setExpanded, isMobile }}>
      <SidebarLevelContext.Provider value={0}>
        {children}
      </SidebarLevelContext.Provider>
    </SidebarContext.Provider>
  );
}

const sidebarVariants = cva(
  'fixed left-0 top-0 h-screen bg-background border-r shadow-sm transition-[width,transform] duration-300 ease-in-out z-20',
  {
    variants: {
      expanded: {
        true: 'w-80',
        false: 'w-16',
      },
      mobile: {
        true: 'translate-x-0',
        false: '-translate-x-full md:translate-x-0',
      },
    },
    defaultVariants: {
      expanded: false,
      mobile: false,
    },
  }
);

interface SidebarProps extends Omit<HTMLMotionProps<'aside'>, 'children'> {
  children?: React.ReactNode;
}

export function Sidebar({ className, children, ...props }: SidebarProps) {
  const { expanded, setExpanded, isMobile } = useSidebar();

  return (
    <>
      {isMobile && expanded && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10"
          onClick={() => setExpanded(false)}
        />
      )}
      <motion.aside
        className={cn(sidebarVariants({ expanded, mobile: isMobile }), className)}
        {...props}
      >
        <div className="relative h-full pt-12">
          {children}
          <button
            onClick={() => setExpanded(!expanded)}
            className={cn(
              'absolute -right-4 top-8 z-30',
              'flex items-center justify-center w-8 h-8',
              'rounded-full border bg-background shadow-sm',
              'text-muted-foreground hover:text-foreground',
              'transition-colors hover:bg-muted',
              'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
              'md:top-1/2 md:-translate-y-1/2'
            )}
            title={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-label={expanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={expanded}
          >
            {expanded ? (
              <ChevronLeft className="h-5 w-5" />
            ) : (
              <ChevronRight className="h-5 w-5" />
            )}
          </button>
        </div>
      </motion.aside>
    </>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title?: string;
  href?: string;
}

export function SidebarHeader({
  className,
  icon,
  title,
  href,
  children,
  ...props
}: SidebarHeaderProps) {
  const { expanded } = useSidebar();
  const router = useRouter();

  const content = expanded ? (
    <div className="p-6 -mb-2 mt-2">{children}</div>
  ) : (
    <div className="h-full flex items-center justify-center p-4 pb-2">
      <Tooltip content={title}>
        <div 
          className="cursor-pointer"
          onClick={() => href && router.push(href)}
        >
          <div className="w-12 h-12 flex items-center justify-center rounded-lg mt-1 bg-background">
            {icon}
          </div>
        </div>
      </Tooltip>
    </div>
  );

  return (
    <div className={cn('border-b shrink-0', className)} {...props}>
      {content}
    </div>
  );
}

export function SidebarContent({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  return (
    <div
      className={cn(
        'flex-1 overflow-y-auto overflow-x-hidden',
        expanded ? 'p-4' : 'p-2',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function SidebarFooter({ 
  className, 
  children, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  return (
    <div
      className={cn('border-t mt-auto', expanded ? 'p-4' : 'p-2', className)}
      {...props}
    >
      {children}
    </div>
  );
}

interface SidebarItemProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  active?: boolean;
  label?: string;
  href?: string;
  section?: string;
}

export function SidebarItem({
  className,
  children,
  icon,
  active,
  label,
  href,
  section,
  onClick,
  ...props
}: SidebarItemProps) {
  const { expanded } = useSidebar();
  const level = useSidebarLevel();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const currentSection = searchParams.get('section');
    const isCurrentPath = href ? pathname === href : false;
    const isActiveSection = section && currentSection === section;
    setIsActive(active || isActiveSection || isCurrentPath);
  }, [active, section, searchParams, href, pathname]);

  if (!expanded && level > 0) return null;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      onClick(e);
      return;
    }
    
    if (href) {
      e.preventDefault();
      const query = new URLSearchParams(searchParams.toString());
      if (section) {
        query.set('section', section);
      }
      const url = `${href}${query.toString() ? `?${query.toString()}` : ''}`;
      router.push(url);
    }
  };

  const itemContent = (
    <div
      className={cn(
        'group relative flex items-center rounded-md transition-colors cursor-pointer',
        'h-12 w-full',
        isActive
          ? 'bg-primary/5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-primary/40 after:via-primary/60 after:to-primary/40 after:rounded-full after:opacity-100'
          : 'hover:bg-muted text-muted-foreground hover:text-foreground after:opacity-0',
        expanded ? 'px-4' : 'justify-center',
        level > 0 && expanded && 'pl-10',
        className
      )}
      onClick={handleClick}
      {...props}
    >
      {icon && (
        <span className="shrink-0 w-8 h-8 flex items-center justify-center">
          <div className="scale-125">
            {icon}
          </div>
        </span>
      )}
      {expanded && (
        <span className="ml-3 truncate text-base font-medium">{children}</span>
      )}
    </div>
  );

  return !expanded ? (
    <Tooltip content={label || (children as string)}>{itemContent}</Tooltip>
  ) : (
    itemContent
  );
}

interface SidebarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  defaultOpen?: boolean;
  href?: string;
  isRoot?: boolean;
  icon?: React.ReactNode;
  section?: string;
}

export function SidebarGroup({
  className,
  title,
  defaultOpen = false,
  href,
  isRoot = false,
  icon,
  section,
  children,
  ...props
}: SidebarGroupProps) {
  const { expanded } = useSidebar();
  const level = useSidebarLevel();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const groupId = title?.toLowerCase().replace(/\s+/g, '-') || 'group';
  const [isOpen, setIsOpen] = usePersistentState<boolean>({
    key: `sidebar-group-${groupId}`,
    defaultValue: defaultOpen,
  });
  const [isActive, setIsActive] = React.useState(false);

  React.useEffect(() => {
    const currentSection = searchParams.get('section');
    const isCurrentPath = href ? pathname === href : false;
    const shouldBeActive = section && currentSection === section;
    setIsActive(shouldBeActive || isCurrentPath);
    
    if (shouldBeActive && !isOpen) {
      setIsOpen(true);
    }
  }, [section, searchParams, isOpen, setIsOpen, href, pathname]);

  if (!expanded && level > 0) return null;

  const handleClick = () => {
    if (!isRoot) {
      setIsOpen(!isOpen);
      if (section && !isOpen) {
        const query = new URLSearchParams(searchParams.toString());
        query.set('section', section);
        const url = `${pathname}?${query.toString()}`;
        router.push(url);
      }
    }
  };

  const handleNavigate = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (href) {
      const query = new URLSearchParams(searchParams.toString());
      if (section) {
        query.set('section', section);
      }
      const url = `${href}${query.toString() ? `?${query.toString()}` : ''}`;
      router.push(url);
    }
  };

  const groupContent = expanded ? (
    <div
      className={cn(
        'flex items-center h-12 rounded-md cursor-pointer',
        level > 0 && 'pl-10',
        isRoot ? 'text-foreground px-4' : 'text-muted-foreground hover:bg-muted px-4',
        isActive && !isRoot && 'bg-primary/5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-primary/40 after:via-primary/60 after:to-primary/40 after:rounded-full after:opacity-100',
        !isActive && 'after:opacity-0',
        'transition-colors relative'
      )}
      onClick={handleClick}
    >
      {icon && (
        <span className="shrink-0 w-8 h-8 flex items-center justify-center">
          <div className="scale-125">
            {icon}
          </div>
        </span>
      )}
      <span className="ml-3 truncate flex-1 text-base font-semibold">{title}</span>
      {!isRoot && (
        <div className="flex items-center gap-1">
          {href && (
            <Tooltip content="Go to section">
              <button
                onClick={handleNavigate}
                className="p-1 hover:bg-muted rounded-md text-muted-foreground hover:text-foreground"
              >
                <ExternalLink className="h-4 w-4" />
              </button>
            </Tooltip>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(!isOpen);
            }}
            className="p-1 hover:bg-muted rounded-md"
          >
            <ChevronDown
              className={cn(
                'h-5 w-5 shrink-0 transition-transform',
                isOpen ? 'transform rotate-0' : 'transform -rotate-90'
              )}
            />
          </button>
        </div>
      )}
    </div>
  ) : (
    <Tooltip content={title}>
      <button
        onClick={href ? handleNavigate : handleClick}
        className={cn(
          'w-full h-12 ml-2 flex items-center justify-center rounded-md',
          'text-muted-foreground transition-colors',
          !isRoot && 'hover:text-foreground hover:bg-muted cursor-pointer',
          isRoot && 'cursor-default',
          isActive && !isRoot && 'bg-primary/5 text-primary after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-primary/40 after:via-primary/60 after:to-primary/40 after:rounded-full after:opacity-100',
          !isActive && 'after:opacity-0'
        )}
        aria-expanded={isOpen}
      >
        {icon && (
          <span className="w-8 h-8 flex items-center justify-center">
            <div className="scale-125">
              {icon}
            </div>
          </span>
        )}
      </button>
    </Tooltip>
  );

  return (
    <div className={cn('space-y-2', className)} {...props}>
      {title && groupContent}
      <SidebarLevelContext.Provider value={level + 1}>
        <AnimatePresence initial={false}>
          {(isOpen || isRoot) && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </SidebarLevelContext.Provider>
    </div>
  );
}

export function SidebarSeparator({ 
  className, 
  ...props 
}: React.HTMLAttributes<HTMLDivElement>) {
  const { expanded } = useSidebar();
  return (
    <div
      className={cn(
        'h-px bg-border my-4',
        expanded ? 'mx-4' : 'mx-2',
        className
      )}
      {...props}
    />
  );
}
