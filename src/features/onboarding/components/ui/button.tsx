import React, { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'gradient';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled,
      children,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none cursor-pointer';

    const variants = {
      primary:
        'bg-primary text-primary-foreground hover:bg-primary-deep shadow-xs hover:shadow-elegant focus-visible:ring-primary',
      gradient:
        'bg-gradient-brand text-white shadow-elegant hover:brightness-105 focus-visible:ring-primary border border-white/10',
      secondary:
        'bg-secondary text-ink hover:bg-secondary/80 border border-border focus-visible:ring-primary',
      outline:
        'border border-border bg-surface text-ink hover:bg-secondary/60 hover:text-primary-glow focus-visible:ring-primary shadow-2xs',
      ghost:
        'text-ink-soft hover:text-ink hover:bg-secondary/60 focus-visible:ring-primary',
      danger:
        'bg-destructive text-destructive-foreground hover:opacity-90 shadow-xs focus-visible:ring-destructive',
    };

    const sizes = {
      sm: 'h-8 px-3 text-xs gap-1.5',
      md: 'h-10 px-4 text-sm gap-2',
      lg: 'h-12 px-6 text-base gap-2.5 font-semibold',
      icon: 'h-9 w-9 p-0',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
