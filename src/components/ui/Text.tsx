'use client';

import { motion } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

type TextVariant = 
  | 'h1' 
  | 'h2' 
  | 'h3' 
  | 'h4' 
  | 'body-lg' 
  | 'body' 
  | 'body-sm' 
  | 'caption';

type TextGradient = 
  | 'none'
  | 'blue'
  | 'purple'
  | 'orange'
  | 'primary';

interface TextProps {
  variant?: TextVariant;
  children?: ReactNode;
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'error';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  gradient?: TextGradient;
  glass?: boolean;
  balance?: boolean;
  animate?: boolean;
  mono?: boolean;
  className?: string;
}

const variantClasses: Record<TextVariant, string> = {
  h1: 'text-4xl md:text-5xl xl:text-6xl font-bold leading-tight tracking-tight',
  h2: 'text-3xl md:text-4xl xl:text-5xl font-bold leading-tight tracking-tight',
  h3: 'text-2xl md:text-3xl xl:text-4xl font-semibold leading-snug',
  h4: 'text-xl md:text-2xl xl:text-3xl font-semibold leading-snug',
  'body-lg': 'text-lg md:text-xl leading-relaxed',
  body: 'text-base leading-relaxed',
  'body-sm': 'text-sm leading-relaxed',
  caption: 'text-xs leading-normal'
};

const colorClasses = {
  default: 'text-foreground',
  primary: 'text-primary',
  secondary: 'text-muted-foreground',
  success: 'text-success',
  error: 'text-error'
};

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold'
};

const alignClasses = {
  left: 'text-left',
  center: 'text-center',
  right: 'text-right'
};

const gradientClasses: Record<TextGradient, string> = {
  none: '',
  blue: 'bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent',
  purple: 'bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent',
  orange: 'bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent',
  primary: 'bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent',
};

export const Text = forwardRef<HTMLDivElement, TextProps>(
  ({
    variant = 'body',
    color = 'default',
    weight,
    align = 'left',
    gradient = 'none',
    glass = false,
    balance = false,
    animate = false,
    mono = false,
    className = '',
    children,
    ...props
  }, ref) => {
    // Get default weight from variant if not explicitly set
    const defaultWeight = variant.startsWith('h') ? 'bold' : 'normal';
    const finalWeight = weight || defaultWeight;

    // Animation variants
    const textAnimation = {
      initial: { opacity: 0, y: 10 },
      animate: { 
        opacity: 1, 
        y: 0,
        transition: {
          duration: 0.4,
          ease: 'easeOut'
        }
      }
    };

    // Determine the HTML element based on variant
    const Component = variant.startsWith('h') 
      ? motion[variant as 'h1' | 'h2' | 'h3' | 'h4']
      : motion.p;

    return (
      <Component
        ref={ref}
        variants={animate ? textAnimation : undefined}
        initial={animate ? 'initial' : undefined}
        animate={animate ? 'animate' : undefined}
        className={`
          ${variantClasses[variant]}
          ${colorClasses[color]}
          ${weightClasses[finalWeight]}
          ${alignClasses[align]}
          ${gradientClasses[gradient]}
          ${glass ? 'glass' : ''}
          ${balance ? 'text-balance' : ''}
          ${mono ? 'font-mono' : 'font-sans'}
          ${className}
        `}
        {...props}
      >
        {/* Glass effect overlay */}
        {glass && (
          <span className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-25 blur-sm" />
        )}
        
        {/* Main content */}
        <span className="relative">
          {children}
        </span>
      </Component>
    );
  }
);

Text.displayName = 'Text';
