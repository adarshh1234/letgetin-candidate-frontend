'use client';

import React, { useState } from 'react';
import { OnboardingSubNav } from '@/features/onboarding/components/layout/OnboardingSubNav';
import { CandidateDashboardView } from '@/features/onboarding/views/CandidateDashboardView';
import { WelcomeView } from '@/features/onboarding/views/WelcomeView';
import { PersonalInfoView } from '@/features/onboarding/views/PersonalInfoView';
import { DocumentsView } from '@/features/onboarding/views/DocumentsView';
import { BankTaxView } from '@/features/onboarding/views/BankTaxView';
import { PoliciesView } from '@/features/onboarding/views/PoliciesView';
import { TrainingView } from '@/features/onboarding/views/TrainingView';
import { TeamView } from '@/features/onboarding/views/TeamView';
import { ChecklistView } from '@/features/onboarding/views/ChecklistView';
import { ToastProvider } from '@/features/onboarding/components/ui/toast';

interface JobOnboardingViewProps {
  onSwitchTab?: (tab: string, stage?: string) => void;
}

export function JobOnboardingView({ onSwitchTab: _onSwitchTab }: JobOnboardingViewProps) {
  const [activeSubTab, setActiveSubTab] = useState<string>('overview');

  return (
    <ToastProvider>
      <div className="space-y-4 sm:space-y-6">
        {/* Onboarding Horizontal Sub-Navigation Bar */}
        <OnboardingSubNav
          activeTabId={activeSubTab}
          onSelectTab={(tabId) => setActiveSubTab(tabId)}
        />

        {/* Onboarding Active Content */}
        <div className="pt-1">
          {activeSubTab === 'overview' && <CandidateDashboardView />}
          {activeSubTab === 'welcome' && <WelcomeView />}
          {activeSubTab === 'personal' && <PersonalInfoView />}
          {activeSubTab === 'documents' && <DocumentsView />}
          {activeSubTab === 'bank' && <BankTaxView />}
          {activeSubTab === 'policies' && <PoliciesView />}
          {activeSubTab === 'training' && <TrainingView />}
          {activeSubTab === 'team' && <TeamView />}
          {activeSubTab === 'checklist' && <ChecklistView />}
        </div>
      </div>
    </ToastProvider>
  );
}
