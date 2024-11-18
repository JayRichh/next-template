'use client';

import { motion, HTMLMotionProps, Variants } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';
import { cn } from '@/utils/cn';

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.3,
      ease: 'easeOut'
    }
  },
  hover: {
    y: -5,
    transition: {
      duration: 0.2
    }
  }
};

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  variant?: 'elevated' | 'outlined' | 'filled';
  interactive?: boolean;
  fullHeight?: boolean;
  noPadding?: boolean;
  children?: ReactNode;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ 
    variant = 'elevated', 
    interactive = true, 
    fullHeight = false,
    noPadding = false,
    className = '', 
    children, 
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        whileHover={interactive ? "hover" : undefined}
        className={cn(
          'rounded-lg',
          'flex flex-col',
          {
            'h-full': fullHeight,
            'p-6': !noPadding,
            'bg-white dark:bg-gray-800 shadow-lg': variant === 'elevated',
            'border-2 border-gray-200 dark:border-gray-700': variant === 'outlined',
            'bg-gray-50 dark:bg-gray-900': variant === 'filled',
            'cursor-pointer': interactive,
          },
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

interface CardHeaderProps {
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ title, subtitle, action, className = '' }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex justify-between items-start gap-4',
          className
        )}
      >
        <div className="flex-1 min-w-0">
          <div className="text-xl font-semibold text-gray-900 dark:text-white leading-tight truncate">
            {title}
          </div>
          {subtitle && (
            <div className="mt-1 text-base text-gray-600 dark:text-gray-300">
              {subtitle}
            </div>
          )}
        </div>
        {action && <div className="flex-shrink-0">{action}</div>}
      </div>
    );
  }
);

CardHeader.displayName = 'CardHeader';

interface CardContentProps {
  children?: ReactNode;
  className?: string;
}

const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className = '', children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex-1 min-h-0',
          'mt-4 text-gray-600 dark:text-gray-300',
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardContent.displayName = 'CardContent';

interface CardFooterProps {
  children?: ReactNode;
  className?: string;
  noBorder?: boolean;
}

const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className = '', noBorder = false, children }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'mt-6',
          {
            'pt-4 border-t border-gray-200 dark:border-gray-700': !noBorder
          },
          className
        )}
      >
        {children}
      </div>
    );
  }
);

CardFooter.displayName = 'CardFooter';

export { Card, CardHeader, CardContent, CardFooter };
