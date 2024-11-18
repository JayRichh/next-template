import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';

type TooltipPosition = 'top' | 'right' | 'bottom' | 'left';

interface TooltipProps {
  content: React.ReactNode;
  position?: TooltipPosition;
  delay?: number;
  children: React.ReactNode;
  className?: string;
}

const positionStyles: Record<TooltipPosition, string> = {
  top: '-translate-x-1/2 -translate-y-full',
  right: '-translate-y-1/2',
  bottom: '-translate-x-1/2 translate-y-full',
  left: '-translate-y-1/2 -translate-x-full',
};

const arrowStyles: Record<TooltipPosition, string> = {
  top: 'bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-t-foreground/10',
  right: 'left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 border-r-foreground/10',
  bottom: 'top-0 left-1/2 -translate-x-1/2 -translate-y-full border-b-foreground/10',
  left: 'right-0 top-1/2 -translate-y-1/2 translate-x-1/2 border-l-foreground/10',
};

export function Tooltip({
  content,
  position = 'right',
  delay = 200,
  children,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const triggerRef = useRef<HTMLDivElement>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      updateTooltipPosition();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const updateTooltipPosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      let top = 0;
      let left = 0;

      switch (position) {
        case 'top':
          top = rect.top + window.scrollY;
          left = rect.left + rect.width / 2 + window.scrollX;
          break;
        case 'right':
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.right + window.scrollX;
          break;
        case 'bottom':
          top = rect.bottom + window.scrollY;
          left = rect.left + rect.width / 2 + window.scrollX;
          break;
        case 'left':
          top = rect.top + rect.height / 2 + window.scrollY;
          left = rect.left + window.scrollX;
          break;
      }

      setTooltipPosition({ top, left });
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        ref={triggerRef}
      className="relative inline-flex"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
            </div>
      {isVisible &&
        createPortal(
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className={cn(
                "fixed z-[9999] whitespace-nowrap",
                positionStyles[position],
                className
              )}
              style={{
                top: `${tooltipPosition.top}px`,
                left: `${tooltipPosition.left}px`,
              }}
            >
              <div className={cn(
                "relative",
                "bg-background/95 backdrop-blur-md",
                "border border-border/50 rounded-lg shadow-lg",
                "px-3 py-2 text-sm"
              )}>
                {content}
                <div className={cn(
                  "absolute w-2 h-2 rotate-45",
                  "border border-border/50 bg-background/95",
                  arrowStyles[position]
                )} />
    </div>
            </motion.div>
          </AnimatePresence>,
          document.body
        )}
    </>
  );
}
