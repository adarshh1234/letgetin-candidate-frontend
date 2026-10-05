import React from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';

export interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon,
  title,
  description,
  actionText,
  onAction,
  className,
}) => {
  return (
    <Card
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center border-dashed border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30',
        className,
      )}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-glow border border-primary/20 flex items-center justify-center mb-3">
        {icon}
      </div>
      <h3 className="font-heading text-sm font-bold text-ink mb-1">
        {title}
      </h3>
      <p className="text-xs text-ink-soft max-w-sm mb-4 leading-relaxed">
        {description}
      </p>
      {actionText && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </Card>
  );
};
