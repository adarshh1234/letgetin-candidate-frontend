import React from 'react';
import Link from 'next/link';
import {
  FileCheck,
  UserCheck,
  UploadCloud,
  CreditCard,
  ShieldAlert,
  GraduationCap,
  Users,
  ListChecks,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { Task } from '../../types';
import { Card } from '../ui/card';
import { StatusBadge } from './StatusBadge';
import { cn } from '../../lib/utils';

export interface TaskCardProps {
  task: Task;
  isLocked: boolean;
}

const iconMap: Record<string, React.ReactNode> = {
  FileCheck: <FileCheck className="w-5 h-5" />,
  UserCheck: <UserCheck className="w-5 h-5" />,
  UploadCloud: <UploadCloud className="w-5 h-5" />,
  CreditCard: <CreditCard className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  GraduationCap: <GraduationCap className="w-5 h-5" />,
  Users: <Users className="w-5 h-5" />,
  ListChecks: <ListChecks className="w-5 h-5" />,
};

export const TaskCard: React.FC<TaskCardProps> = ({ task, isLocked }) => {
  const isCompleted = task.status === 'completed';
  const isInProgress = task.status === 'in_progress';

  return (
    <Card
      className={cn(
        'group flex flex-col justify-between p-5 transition-all duration-200 text-left bg-surface border border-border rounded-2xl shadow-xs',
        isLocked
          ? 'opacity-60 bg-secondary/30 border-dashed cursor-not-allowed'
          : 'hover:-translate-y-1 hover:shadow-elegant hover:border-primary/40',
        isCompleted && 'border-emerald-200/80 dark:border-emerald-900/50 bg-emerald-50/15 dark:bg-emerald-950/10',
      )}
    >
      <div>
        {/* Top row: Icon + Step number + Status */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'w-10 h-10 rounded-xl flex items-center justify-center transition-colors shadow-2xs',
                isCompleted
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                  : isInProgress
                    ? 'bg-primary/15 text-primary-glow border border-primary/25'
                    : isLocked
                      ? 'bg-secondary text-ink-soft opacity-70'
                      : 'bg-secondary text-ink group-hover:bg-primary/10 group-hover:text-primary-glow',
              )}
            >
              {isCompleted ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : isLocked ? (
                <Lock className="w-4 h-4" />
              ) : (
                iconMap[task.iconName] || <FileCheck className="w-5 h-5" />
              )}
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink-soft">
                Step 0{task.stepNumber}
              </span>
              <h4 className="font-heading text-base font-bold text-ink line-clamp-1">
                {task.title}
              </h4>
            </div>
          </div>
          <StatusBadge status={task.status} size="sm" />
        </div>

        {/* Description */}
        <p className="mt-3 text-xs text-ink-soft line-clamp-2 leading-relaxed">
          {task.description}
        </p>
      </div>

      {/* Bottom row: Time + CTA button */}
      <div className="mt-5 pt-3 border-t border-border/60 flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 text-ink-soft">
          <Clock className="w-3.5 h-3.5" />
          ~{task.estimatedMinutes} mins
        </span>

        {isLocked ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-ink-soft">
            <Lock className="w-3 h-3" /> Locked
          </span>
        ) : (
          <Link
            href={task.path}
            className={cn(
              'inline-flex items-center gap-1 font-bold transition-colors focus-visible:outline-none focus-visible:underline cursor-pointer',
              isCompleted
                ? 'text-ink-soft hover:text-primary-glow'
                : 'text-primary-glow hover:text-primary',
            )}
          >
            {isCompleted ? 'Review' : isInProgress ? 'Continue' : 'Start'}
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        )}
      </div>
    </Card>
  );
};
