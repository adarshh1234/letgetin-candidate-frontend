'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  Bell,
  FileText,
  LucideIcon,
} from 'lucide-react';

export interface TopNavTabItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
}

export const TOP_NAV_TABS: TopNavTabItem[] = [
  { id: 'overview', label: 'Overview', href: '/jobs?tab=overview', icon: LayoutDashboard },
  { id: 'myJobs', label: 'My Jobs', href: '/jobs?tab=myJobs', icon: Briefcase },
  { id: 'calendar', label: 'Calendar', href: '/jobs?tab=calendar', icon: Calendar },
  { id: 'notifications', label: 'Notifications', href: '/jobs?tab=notifications', icon: Bell },
  { id: 'onboarding', label: 'Onboarding', href: '/onboarding', icon: FileText },
];

interface OnboardingTopNavProps {
  activeTab?: string;
  onTabChange?: (tabId: string) => void;
}

export const OnboardingTopNav: React.FC<OnboardingTopNavProps> = ({
  activeTab = 'onboarding',
  onTabChange,
}) => {
  return (
    <div className="w-full bg-surface border border-border rounded-2xl p-2 shadow-xs flex items-center gap-1.5 overflow-x-auto no-scrollbar select-none">
      {TOP_NAV_TABS.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;

        if (onTabChange) {
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-brand text-white shadow-elegant'
                  : 'text-ink-soft hover:text-ink hover:bg-secondary/60'
              }`}
            >
              <Icon
                className={`w-4 h-4 ${
                  isActive ? 'text-white' : 'text-primary-glow'
                }`}
              />
              <span>{tab.label}</span>
            </button>
          );
        }

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              isActive
                ? 'bg-gradient-brand text-white shadow-elegant'
                : 'text-ink-soft hover:text-ink hover:bg-secondary/60'
            }`}
          >
            <Icon
              className={`w-4 h-4 ${
                isActive ? 'text-white' : 'text-primary-glow'
              }`}
            />
            <span>{tab.label}</span>
          </Link>
        );
      })}
    </div>
  );
};
