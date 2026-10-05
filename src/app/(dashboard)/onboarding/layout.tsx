'use client';

import React from 'react';
import { OnboardingTopNav } from '@/features/onboarding/components/layout/OnboardingTopNav';
import { OnboardingSubNav } from '@/features/onboarding/components/layout/OnboardingSubNav';
import { ToastProvider } from '@/features/onboarding/components/ui/toast';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
          {/* 1. Primary Top Navigation (Overview | My Jobs | Calendar | Notifications | Onboarding) */}
          <OnboardingTopNav activeTab="onboarding" />

          {/* 2. New Horizontal Onboarding Sub-Navigation */}
          <OnboardingSubNav />

          {/* 3. Onboarding Page Content */}
          <div className="pt-1">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  );
}
