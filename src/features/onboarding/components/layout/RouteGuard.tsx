'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useOnboardingStore, isStepLocked } from '../../store/useOnboardingStore';
import { StepId } from '../../types';

export interface RouteGuardProps {
  stepId: StepId;
  children: React.ReactNode;
  redirectTo?: string;
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  stepId,
  children,
  redirectTo = '/jobs?tab=onboarding',
}) => {
  const router = useRouter();
  const stepStatus = useOnboardingStore((state) => state.stepStatus);
  const locked = isStepLocked(stepId, stepStatus);

  useEffect(() => {
    if (locked) {
      router.replace(redirectTo);
    }
  }, [locked, router, redirectTo]);

  if (locked) {
    return (
      <div className="py-20 text-center space-y-3">
        <p className="text-xs text-slate-500">This onboarding step is currently locked. Redirecting to workspace...</p>
      </div>
    );
  }

  return <>{children}</>;
};
