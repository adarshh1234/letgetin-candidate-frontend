import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { StepId } from '../../types';
import { STEP_CONFIG } from '../../lib/constants';
import { useOnboardingStore, selectOverallProgress } from '../../store/useOnboardingStore';

export interface PageHeaderProps {
  stepId?: StepId;
  title: string;
  description: string;
  badge?: React.ReactNode;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  stepId,
  title,
  description,
  badge,
}) => {
  const overallProgress = useOnboardingStore(selectOverallProgress);
  const step = stepId ? STEP_CONFIG[stepId] : undefined;

  return (
    <div className="mb-6 space-y-3 text-left">
      {/* Breadcrumb & Step indicator */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-ink-soft">
          <Link
            href="/onboarding"
            className="flex items-center gap-1 hover:text-ink transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Onboarding</span>
          </Link>
          {step && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-border" />
              <span className="font-semibold text-ink">
                {step.shortTitle}
              </span>
            </>
          )}
        </nav>

        {step && (
          <div className="flex items-center gap-2 text-xs font-bold">
            <span className="text-primary-glow">
              Step {step.stepNumber} of 8
            </span>
            <span className="text-border">•</span>
            <span className="text-ink-soft font-medium">{step.estimatedMinutes} mins est.</span>
          </div>
        )}
      </div>

      {/* Thin Progress Bar for Wizard */}
      {step && (
        <div className="w-full h-1 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-brand transition-all duration-300 rounded-full"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      )}

      {/* Main Title Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-1">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
            {title}
          </h1>
          <p className="text-xs sm:text-sm text-ink-soft mt-1 max-w-2xl leading-relaxed">
            {description}
          </p>
        </div>
        {badge && <div className="shrink-0">{badge}</div>}
      </div>
    </div>
  );
};
