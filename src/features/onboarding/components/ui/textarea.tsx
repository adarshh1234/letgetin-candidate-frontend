import React, { forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full space-y-1.5 text-left">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-700 dark:text-slate-200 tracking-wide"
          >
            {label}
            {props.required && <span className="text-rose-500 ml-1">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            'w-full rounded-xl border bg-surface px-3.5 py-2.5 text-sm text-ink shadow-xs transition-all duration-150',
            'placeholder:text-ink-soft',
            'focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary',
            'disabled:cursor-not-allowed disabled:bg-secondary/40 disabled:opacity-60',
            error
              ? 'border-destructive focus:border-destructive focus:ring-destructive/20'
              : 'border-border hover:border-primary/40',
            className,
          )}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${textareaId}-error` : helperText ? `${textareaId}-helper` : undefined
          }
          {...props}
        />
        {error ? (
          <p id={`${textareaId}-error`} className="text-xs text-rose-500 font-medium tracking-tight">
            {error}
          </p>
        ) : helperText ? (
          <p id={`${textareaId}-helper`} className="text-xs text-slate-500 dark:text-slate-400">
            {helperText}
          </p>
        ) : null}
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';
