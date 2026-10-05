import { useMemo, useEffect } from 'react';
import {
  useOnboardingStore,
  selectOverallProgress,
  selectCompletedStepsCount,
  selectInProgressStepsCount,
  selectPendingStepsCount,
} from '../store/useOnboardingStore';
import { calculateDaysLeft } from '../lib/utils';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

export function useOnboardingProgress() {
  const { user } = useAuthStore();
  const syncWithAuthUser = useOnboardingStore((state) => state.syncWithAuthUser);
  const candidate = useOnboardingStore((state) => state.candidate);
  const stepStatus = useOnboardingStore((state) => state.stepStatus);
  const isSubmitted = useOnboardingStore((state) => state.isSubmitted);

  // Sync with LetGetIn logged-in user if available
  useEffect(() => {
    if (user) {
      syncWithAuthUser(user);
    }
  }, [user, syncWithAuthUser]);

  const overallProgress = useOnboardingStore(selectOverallProgress);
  const completedCount = useOnboardingStore(selectCompletedStepsCount);
  const inProgressCount = useOnboardingStore(selectInProgressStepsCount);
  const pendingCount = useOnboardingStore(selectPendingStepsCount);

  const daysLeft = useMemo(() => {
    return calculateDaysLeft(candidate.startDate);
  }, [candidate.startDate]);

  return {
    candidate,
    stepStatus,
    overallProgress,
    completedCount,
    inProgressCount,
    pendingCount,
    daysLeft,
    isSubmitted,
  };
}
