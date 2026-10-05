import React from 'react';
import { Card } from '../ui/card';
import { cn } from '../../lib/utils';

export interface StatCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  icon: React.ReactNode;
  iconBgColor?: string;
  trend?: string;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  iconBgColor = 'bg-primary/10 text-primary-glow border border-primary/20',
  trend,
  className,
}) => {
  return (
    <Card
      className={cn(
        'p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-elegant text-left bg-surface border border-border rounded-2xl',
        className,
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-wider text-ink-soft">
          {title}
        </span>
        <div className={cn('p-2.5 rounded-xl flex items-center justify-center shrink-0 shadow-2xs', iconBgColor)}>
          {icon}
        </div>
      </div>
      <div className="mt-3 flex items-baseline gap-2">
        <span className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
          {value}
        </span>
        {trend && (
          <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {trend}
          </span>
        )}
      </div>
      <p className="mt-1 text-xs text-ink-soft">{subtitle}</p>
    </Card>
  );
};
