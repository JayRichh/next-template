import { motion } from 'framer-motion';
import { cn } from '@/utils/cn';

type BadgeVariant = 'default' | 'outline' | 'solid';
type BadgeColor = 'primary' | 'success' | 'warning' | 'error' | 'info';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  color?: BadgeColor;
  size?: BadgeSize;
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
  pulse?: boolean;
  className?: string;
}

const variants: Record<BadgeVariant, string> = {
  default: 'bg-opacity-15 border-transparent',
  outline: 'bg-transparent border-2',
  solid: 'text-white border-transparent',
};

const colors: Record<BadgeColor, { base: string, solid: string }> = {
  primary: {
    base: 'text-primary border-primary',
    solid: 'bg-primary',
  },
  success: {
    base: 'text-green-600 border-green-600',
    solid: 'bg-green-600',
  },
  warning: {
    base: 'text-amber-600 border-amber-600',
    solid: 'bg-amber-600',
  },
  error: {
    base: 'text-red-600 border-red-600',
    solid: 'bg-red-600',
  },
  info: {
    base: 'text-blue-600 border-blue-600',
    solid: 'bg-blue-600',
  },
};

const sizes: Record<BadgeSize, string> = {
  sm: 'text-xs px-2 py-0.5 gap-1',
  md: 'text-sm px-2.5 py-1 gap-1.5',
  lg: 'text-base px-3 py-1.5 gap-2',
};

export function Badge({
  children,
  variant = 'default',
  color = 'primary',
  size = 'md',
  icon,
  removable = false,
  onRemove,
  pulse = false,
  className,
}: BadgeProps) {
  const colorStyle = colors[color];
  const baseStyles = cn(
    'inline-flex items-center justify-center',
    'font-medium rounded-full',
    'transition-colors duration-200',
    sizes[size],
    variant === 'solid' 
      ? colorStyle.solid
      : cn(
          colorStyle.base,
          variant === 'default' && `bg-${color}-100 dark:bg-${color}-900/20`
        ),
    className
  );

  return (
    <motion.span
      initial={{ scale: 0.95 }}
      animate={{ scale: 1 }}
      className={baseStyles}
    >
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className={cn(
            "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
            variant === 'solid' ? 'bg-white' : colorStyle.base
          )} />
          <span className={cn(
            "relative inline-flex rounded-full h-2 w-2",
            variant === 'solid' ? 'bg-white' : colorStyle.base
          )} />
        </span>
      )}
      
      {icon && <span className="flex-shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
      
      {removable && (
        <button
          onClick={onRemove}
          className={cn(
            "flex-shrink-0 ml-1 -mr-1 p-0.5",
            "hover:bg-black/10 dark:hover:bg-white/10",
            "rounded-full transition-colors",
            "focus:outline-none focus:ring-2 focus:ring-current/25"
          )}
        >
          <svg 
            className="w-3 h-3" 
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M1 1L11 11M1 11L11 1" />
          </svg>
        </button>
      )}
    </motion.span>
  );
}

// Example usage:
export function BadgeDemo() {
  return (
    <div className="space-y-8">
      {/* Variants */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Badge Variants</div>
        <div className="flex flex-wrap gap-4">
          <Badge>Default</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="solid">Solid</Badge>
        </div>
      </div>

      {/* Colors */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Badge Colors</div>
        <div className="flex flex-wrap gap-4">
          <Badge color="primary" variant="solid">Primary</Badge>
          <Badge color="success" variant="solid">Success</Badge>
          <Badge color="warning" variant="solid">Warning</Badge>
          <Badge color="error" variant="solid">Error</Badge>
          <Badge color="info" variant="solid">Info</Badge>
        </div>
        <div className="flex flex-wrap gap-4">
          <Badge color="primary">Primary</Badge>
          <Badge color="success">Success</Badge>
          <Badge color="warning">Warning</Badge>
          <Badge color="error">Error</Badge>
          <Badge color="info">Info</Badge>
        </div>
      </div>

      {/* Sizes */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">Badge Sizes</div>
        <div className="flex flex-wrap gap-4 items-center">
          <Badge size="sm" variant="solid">Small</Badge>
          <Badge size="md" variant="solid">Medium</Badge>
          <Badge size="lg" variant="solid">Large</Badge>
        </div>
      </div>

      {/* With Icons */}
      <div className="space-y-4">
        <div className="text-sm font-medium text-foreground/70">With Icons & Pulse</div>
        <div className="flex flex-wrap gap-4">
          <Badge icon="🚀" variant="solid">Launching</Badge>
          <Badge icon="✨" variant="outline">New</Badge>
          <Badge pulse variant="solid">Live</Badge>
          <Badge 
            removable 
            onRemove={() => console.log('removed')}
            variant="solid"
          >
            Removable
          </Badge>
        </div>
      </div>
    </div>
  );
}

// Code preview
export const badgeCode = `// Badge Component Usage
// Basic usage
<Badge>Default Badge</Badge>

// Variants
<Badge variant="outline">Outline</Badge>
<Badge variant="solid">Solid</Badge>

// Colors
<Badge color="success" variant="solid">
  Success
</Badge>
<Badge color="error">Error</Badge>

// Sizes
<Badge size="sm">Small</Badge>
<Badge size="lg">Large</Badge>

// With icons and pulse
<Badge icon="🚀">Launching</Badge>
<Badge pulse>Live</Badge>

// Removable badge
<Badge 
  removable 
  onRemove={() => console.log('removed')}
>
  Click × to remove
</Badge>`;
