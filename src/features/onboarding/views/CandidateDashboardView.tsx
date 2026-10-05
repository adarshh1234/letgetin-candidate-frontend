'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calendar,
  Building,
  User,
  Users,
  Clock,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { isStepLocked } from '../store/useOnboardingStore';
import { useOnboardingProgress } from '../hooks/useOnboardingProgress';
import { mockInitialTasks } from '../mocks/tasks';
import { mockUpcomingEvents } from '../mocks/events';
import { ProgressRing } from '../components/common/ProgressRing';
import { StatCard } from '../components/common/StatCard';
import { TaskCard } from '../components/common/TaskCard';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatDate } from '../lib/utils';
import { Task } from '../types';

export const CandidateDashboardView: React.FC = () => {
  const {
    candidate,
    stepStatus,
    overallProgress,
    completedCount,
    inProgressCount,
    pendingCount,
    daysLeft,
    isSubmitted,
  } = useOnboardingProgress();

  // Combine mockInitialTasks with current store status
  const currentTasks: Task[] = mockInitialTasks.map((task) => ({
    ...task,
    status: stepStatus[task.stepId],
  }));

  // Determine next actionable task
  const nextTask = currentTasks.find(
    (t) => t.status !== 'completed' && !isStepLocked(t.stepId, stepStatus),
  );

  return (
    <div className="space-y-6">
      {/* 1. LetGetIn Navy & Blue Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-navy-950 via-navy-900 to-brand-700 p-6 sm:p-8 text-white shadow-elegant border border-primary/20">
        {/* Decorative background glow */}
        <div className="absolute -top-12 -right-12 w-72 h-72 rounded-full bg-primary-glow/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-72 h-72 rounded-full bg-brand-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md border border-white/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Welcome to {candidate.company}!</span>
            </div>

            <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Hello, {candidate.name}! 👋
            </h1>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed max-w-xl">
              We are ecstatic to have you join our {candidate.team} as a{' '}
              <span className="font-bold text-white">{candidate.role}</span>. Complete your onboarding
              tasks before your first day on{' '}
              <span className="underline decoration-brand-300 font-semibold text-white">
                {formatDate(candidate.startDate)}
              </span>.
            </p>

            {/* Quick Metadata Chips */}
            <div className="flex flex-wrap items-center gap-2.5 pt-2 text-xs text-slate-200">
              <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-xl border border-white/10">
                <Building className="w-3.5 h-3.5 text-brand-200" />
                {candidate.department}
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-xl border border-white/10">
                <User className="w-3.5 h-3.5 text-brand-200" />
                Manager: {candidate.manager.name}
              </span>
              <span className="flex items-center gap-1.5 bg-black/25 px-3 py-1 rounded-xl border border-white/10">
                <Calendar className="w-3.5 h-3.5 text-brand-200" />
                Start: {formatDate(candidate.startDate)}
              </span>
            </div>
          </div>

          {/* Quick CTA or completion status */}
          <div className="flex flex-col items-center sm:items-end w-full md:w-auto shrink-0">
            {isSubmitted ? (
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 px-4 py-2.5 rounded-2xl backdrop-blur-md text-xs font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Onboarding Submitted!
              </div>
            ) : nextTask ? (
              <Link href={nextTask.path}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-navy-900 hover:bg-brand-50 hover:text-brand-700 font-bold shadow-lg shadow-black/20 border-0"
                >
                  Continue: Document Verification
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            ) : (
              <Link href="/onboarding/checklist">
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-navy-900 hover:bg-brand-50 hover:text-brand-700 font-bold shadow-lg shadow-black/20 border-0"
                >
                  Review Day-1 Checklist
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* 2. Top Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Completed Steps"
          value={`${completedCount} / 8`}
          subtitle={`${Math.round((completedCount / 8) * 100)}% of total requirements`}
          icon={<CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
          iconBgColor="bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800"
        />
        <StatCard
          title="In Progress"
          value={inProgressCount}
          subtitle="Active steps being completed"
          icon={<Clock className="w-5 h-5 text-primary-glow" />}
          iconBgColor="bg-primary/10 text-primary-glow border border-primary/20"
        />
        <StatCard
          title="Pending Steps"
          value={pendingCount}
          subtitle="Remaining onboarding steps"
          icon={<AlertCircle className="w-5 h-5 text-ink-soft" />}
          iconBgColor="bg-secondary text-ink-soft border border-border"
        />
        <StatCard
          title="Days Left"
          value={`${daysLeft} Days`}
          subtitle={`Target joining: ${formatDate(candidate.startDate)}`}
          icon={<Calendar className="w-5 h-5 text-primary-glow" />}
          iconBgColor="bg-primary/10 text-primary-glow border border-primary/20"
        />
      </div>

      {/* 3. Main Dashboard Layout: Task Grid (Left 2 cols) + Progress & Events (Right col) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Task Cards Grid */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between text-left">
            <div>
              <h2 className="font-heading text-lg font-bold text-ink">
                Your Onboarding Checklist
              </h2>
              <p className="text-xs text-ink-soft">
                Follow each step in sequence to complete your mandatory onboarding procedures.
              </p>
            </div>
            <span className="text-xs font-bold text-primary-glow">
              {completedCount} of 8 Done
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {currentTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isLocked={isStepLocked(task.stepId, stepStatus)}
              />
            ))}
          </div>
        </div>

        {/* Right 1 Column: Animated Progress Ring Card & Upcoming Events */}
        <div className="space-y-6">
          {/* Progress Ring Card */}
          <Card className="p-6 text-center space-y-4">
            <h3 className="font-heading text-base font-bold text-ink">
              Overall Completion
            </h3>
            <div className="flex justify-center py-2">
              <ProgressRing progress={overallProgress} size={150} strokeWidth={12} />
            </div>
            <p className="text-xs text-ink-soft px-2 leading-relaxed">
              {overallProgress === 100
                ? 'All mandatory requirements are satisfied! You are ready for your Day 1 induction.'
                : 'All fields and uploaded files are autosaved. You can leave and resume anytime.'}
            </p>
          </Card>

          {/* Upcoming Events List */}
          <Card className="p-5 text-left space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-heading text-base font-bold text-ink flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary-glow" />
                Day-1 Schedule & Events
              </h3>
              <span className="text-[11px] font-semibold text-ink-soft">
                {mockUpcomingEvents.length} events
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {mockUpcomingEvents.map((evt) => (
                <div key={evt.id} className="py-3 first:pt-0 last:pb-0 space-y-1">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="text-xs font-bold text-ink">
                      {evt.title}
                    </h4>
                    <span className="text-[10px] font-bold text-primary-glow shrink-0">
                      {evt.time.split('-')[0]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-soft">
                    <span>{evt.organizer}</span>
                    <span>•</span>
                    <span className="truncate">{evt.locationOrUrl.split(':')[0]}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/onboarding/team">
                <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                  <Users className="w-3.5 h-3.5 mr-1.5 text-primary-glow" />
                  View Team Members & Calendar
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
