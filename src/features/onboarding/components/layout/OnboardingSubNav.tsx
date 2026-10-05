'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileCheck,
  UserCheck,
  UploadCloud,
  CreditCard,
  ShieldCheck,
  GraduationCap,
  Users,
  ListChecks,
  Lock,
  CheckCircle2,
  LucideIcon,
} from 'lucide-react';
import { useOnboardingStore, isStepLocked } from '../../store/useOnboardingStore';
import { StepId } from '../../types';
import { toast } from '../ui/toast';

export interface OnboardingSubTabItem {
  id: string;
  stepId?: StepId;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const ONBOARDING_SUB_TABS: OnboardingSubTabItem[] = [
  {
    id: 'overview',
    label: 'Dashboard Overview',
    href: '/onboarding',
    icon: LayoutDashboard,
  },
  {
    id: 'welcome',
    stepId: 'welcome',
    label: 'Offer Letter',
    href: '/onboarding/welcome',
    icon: FileCheck,
  },
  {
    id: 'personal',
    stepId: 'personal',
    label: 'Personal Info',
    href: '/onboarding/personal',
    icon: UserCheck,
  },
  {
    id: 'documents',
    stepId: 'documents',
    label: 'Documents',
    href: '/onboarding/documents',
    icon: UploadCloud,
  },
  {
    id: 'bank',
    stepId: 'bank',
    label: 'Bank & Tax',
    href: '/onboarding/bank',
    icon: CreditCard,
  },
  {
    id: 'policies',
    stepId: 'policies',
    label: 'Policies',
    href: '/onboarding/policies',
    icon: ShieldCheck,
  },
  {
    id: 'training',
    stepId: 'training',
    label: 'Training',
    href: '/onboarding/training',
    icon: GraduationCap,
  },
  {
    id: 'team',
    stepId: 'team',
    label: 'Team',
    href: '/onboarding/team',
    icon: Users,
  },
  {
    id: 'checklist',
    stepId: 'checklist',
    label: 'Day-1 Checklist',
    href: '/onboarding/checklist',
    icon: ListChecks,
  },
];

interface OnboardingSubNavProps {
  activeTabId?: string;
  onSelectTab?: (tabId: string) => void;
}

export const OnboardingSubNav: React.FC<OnboardingSubNavProps> = ({
  activeTabId,
  onSelectTab,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const stepStatus = useOnboardingStore((state) => state.stepStatus);

  // Determine which tab is active based on props or current pathname
  const currentActiveId =
    activeTabId ||
    (() => {
      if (!pathname || pathname === '/onboarding' || pathname === '/jobs') {
        return 'overview';
      }
      const match = ONBOARDING_SUB_TABS.find(
        (t) => t.href !== '/onboarding' && pathname.startsWith(t.href),
      );
      return match ? match.id : 'overview';
    })();

  const handleTabClick = (e: React.MouseEvent, tab: OnboardingSubTabItem) => {
    if (tab.stepId && isStepLocked(tab.stepId, stepStatus)) {
      e.preventDefault();
      toast.warning(
        'Step Locked',
        'Please complete the preceding steps in sequence to unlock this section.',
      );
      return;
    }

    if (onSelectTab) {
      e.preventDefault();
      onSelectTab(tab.id);
      if (tab.href) {
        router.push(tab.href);
      }
    }
  };

  return (
    <div className="w-full bg-surface border border-border/80 rounded-2xl p-1.5 shadow-xs">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 px-0.5">
        {ONBOARDING_SUB_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = currentActiveId === tab.id;
          const isLocked = tab.stepId ? isStepLocked(tab.stepId, stepStatus) : false;
          const isCompleted = tab.stepId ? stepStatus[tab.stepId] === 'completed' : false;

          return (
            <Link
              key={tab.id}
              href={isLocked ? '#' : tab.href}
              onClick={(e) => handleTabClick(e, tab)}
              className={`group flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 select-none ${
                isLocked
                  ? 'opacity-40 cursor-not-allowed text-slate-400 dark:text-slate-500 hover:bg-transparent'
                  : isActive
                  ? 'bg-primary/10 text-primary-glow border border-primary/25 shadow-xs font-bold'
                  : 'text-ink-soft hover:text-ink hover:bg-secondary/60 cursor-pointer'
              }`}
            >
              {isLocked ? (
                <Lock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 shrink-0" />
              ) : isCompleted ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400 shrink-0" />
              ) : (
                <Icon
                  className={`w-3.5 h-3.5 shrink-0 transition-colors ${
                    isActive ? 'text-primary-glow' : 'text-slate-400 group-hover:text-ink'
                  }`}
                />
              )}
              <span>{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
