'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Calendar,
  MessageSquare,
  UserCheck,
  CheckCircle2,
} from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { mockTeamMembers } from '../mocks/team';
import { PageHeader } from '../components/layout/PageHeader';
import { StepFooter } from '../components/layout/StepFooter';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Dialog } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Select } from '../components/ui/select';
import { toast } from '../components/ui/toast';
import { StatusBadge } from '../components/common/StatusBadge';
import { TeamMember } from '../types';

const LinkedinIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    className={className}
    fill="currentColor"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
  </svg>
);

export const TeamView: React.FC = () => {
  const router = useRouter();
  const stepStatus = useOnboardingStore((state) => state.stepStatus);
  const setStepStatus = useOnboardingStore((state) => state.setStepStatus);

  const [teamList, setTeamList] = useState<TeamMember[]>(mockTeamMembers);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [meetingDate, setMeetingDate] = useState('2026-10-16');
  const [meetingTime, setMeetingTime] = useState('03:00 PM');
  const [meetingTopic, setMeetingTopic] = useState('Introductory Sync & Onboarding Questions');

  const manager = teamList.find((m) => m.isManager) || teamList[0]!;
  const peers = teamList.filter((m) => !m.isManager);

  const handleMessage = (member: TeamMember) => {
    toast.info('Message Sent', `Direct message opened with ${member.name} (${member.email})`);
  };

  const handleLinkedIn = (member: TeamMember) => {
    if (typeof window !== 'undefined') {
      window.open(member.linkedinUrl, '_blank', 'noopener,noreferrer');
    }
    toast.info('LinkedIn Profile', `Opening ${member.name}'s profile in a new tab.`);
  };

  const handleOpenScheduleModal = (member: TeamMember) => {
    setSelectedMember(member);
    setMeetingTopic(`Introductory 1:1 with ${member.name}`);
  };

  const handleConfirmSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    setTeamList((prev) =>
      prev.map((m) =>
        m.id === selectedMember.id
          ? {
              ...m,
              scheduledMeeting: {
                date: meetingDate,
                time: meetingTime,
                topic: meetingTopic,
              },
            }
          : m,
      ),
    );

    toast.success(
      'Meeting Scheduled!',
      `Invitation sent to ${selectedMember.name} for ${meetingDate} at ${meetingTime}.`,
    );
    setSelectedMember(null);
  };

  const handleContinue = () => {
    setStepStatus('team', 'completed');
    toast.success('Team Section Complete', 'Moving to Day-1 Checklist.');
    router.push('/onboarding/checklist');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <PageHeader
        stepId="team"
        title="Meet Your Engineering Team"
        description="Connect with your leadership, buddy, and cross-functional partners. Schedule 1:1 check-ins ahead of your first week."
        badge={<StatusBadge status={stepStatus.team} size="md" />}
      />

      {/* 1. Manager Highlight Card */}
      <Card className="relative overflow-hidden p-6 sm:p-8 bg-surface border border-border text-left shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-primary text-white font-heading font-extrabold text-xl flex items-center justify-center shadow-elegant">
                {manager.avatarInitials}
              </div>
              <span className="absolute -bottom-1 -right-1 p-1 rounded-full bg-emerald-500 text-white ring-2 ring-surface">
                <UserCheck className="w-3.5 h-3.5" />
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary-glow border border-primary/20">
                  Reporting Manager
                </span>
                <span className="text-xs text-ink-soft">{manager.department}</span>
              </div>
              <h3 className="font-heading text-xl font-bold text-ink">
                {manager.name}
              </h3>
              <p className="text-xs font-bold text-primary-glow">
                {manager.role}
              </p>
              <p className="text-xs text-ink-soft max-w-xl leading-relaxed pt-1">
                {manager.bio}
              </p>
            </div>
          </div>

          {/* Manager Action & Meeting Info */}
          <div className="flex flex-col sm:items-end gap-3 w-full md:w-auto shrink-0 border-t md:border-t-0 pt-4 md:pt-0 border-border/60">
            {manager.scheduledMeeting ? (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold">
                <Calendar className="w-4 h-4 text-emerald-600" />
                <span>
                  Confirmed: {manager.scheduledMeeting.date} ({manager.scheduledMeeting.time})
                </span>
              </div>
            ) : (
              <Button
                type="button"
                variant="primary"
                size="sm"
                onClick={() => handleOpenScheduleModal(manager)}
                className="gap-2"
              >
                <Calendar className="w-4 h-4" />
                Schedule 1:1 with Manager
              </Button>
            )}

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleMessage(manager)}
                className="text-xs gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Slack Ping
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleLinkedIn(manager)}
                className="text-xs gap-1.5"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                LinkedIn
              </Button>
            </div>
          </div>
        </div>
      </Card>

      {/* 2. Team Grid */}
      <div className="space-y-3 text-left">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-heading text-lg font-bold text-slate-900 dark:text-slate-100">
              Teammates & Collaboration Partners
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Engineers, product designers, and QA leads you will be working closely with.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-400">
            {peers.length} Colleagues
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {peers.map((member) => (
            <Card
              key={member.id}
              className="flex flex-col justify-between p-5 hover:-translate-y-1 transition-all duration-200 text-left"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-11 h-11 rounded-xl flex items-center justify-center text-white font-heading font-bold text-sm ${member.avatarColor} shadow-xs`}
                    >
                      {member.avatarInitials}
                    </div>
                    <div>
                      <h4 className="font-heading text-sm font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                        {member.name}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1">
                        {member.department}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-xs font-bold text-primary-glow">
                  {member.role}
                </div>

                <p className="text-xs text-ink-soft line-clamp-3 leading-relaxed">
                  {member.bio}
                </p>

                {/* Scheduled meeting chip if exists */}
                {member.scheduledMeeting && (
                  <div className="flex items-center gap-1.5 p-2 rounded-lg bg-primary/10 text-primary-glow text-[11px] font-semibold border border-primary/20">
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">
                      Sync: {member.scheduledMeeting.date} ({member.scheduledMeeting.time})
                    </span>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleOpenScheduleModal(member)}
                  className="text-xs font-bold text-primary-glow hover:text-primary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  {member.scheduledMeeting ? 'Reschedule' : 'Book 1:1'}
                </button>

                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => handleMessage(member)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label={`Ping ${member.name}`}
                    title="Slack direct message"
                  >
                    <MessageSquare className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLinkedIn(member)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    aria-label={`LinkedIn for ${member.name}`}
                    title="LinkedIn profile"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Step Footer */}
      <StepFooter
        backTo="/onboarding/training"
        nextTo="/onboarding/checklist"
        canContinue={true}
        onContinue={handleContinue}
        continueText="Continue to Day-1 Checklist"
      />

      {/* Schedule 1:1 Dialog */}
      {selectedMember && (
        <Dialog
          isOpen={!!selectedMember}
          onClose={() => setSelectedMember(null)}
          title={`Schedule 1:1 with ${selectedMember.name}`}
          description={`Role: ${selectedMember.role} • ${selectedMember.email}`}
          maxWidth="md"
        >
          <form onSubmit={handleConfirmSchedule} className="space-y-4 text-left">
            <Input
              label="Meeting Topic / Agenda"
              required
              value={meetingTopic}
              onChange={(e) => setMeetingTopic(e.target.value)}
              placeholder="e.g. Welcome Coffee Chat & Architecture Overview"
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Date"
                required
                type="date"
                value={meetingDate}
                onChange={(e) => setMeetingDate(e.target.value)}
              />

              <Select
                label="Time Slot"
                value={meetingTime}
                onChange={(e) => setMeetingTime(e.target.value)}
              >
                <option value="10:00 AM">10:00 AM - 10:30 AM</option>
                <option value="11:30 AM">11:30 AM - 12:00 PM</option>
                <option value="02:00 PM">02:00 PM - 02:30 PM</option>
                <option value="03:00 PM">03:00 PM - 03:30 PM</option>
                <option value="04:30 PM">04:30 PM - 05:00 PM</option>
              </Select>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-500 space-y-1">
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                Platform: Google Meet
              </span>
              <p>Calendar invitation and video link will be synced automatically.</p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setSelectedMember(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="primary" size="sm" className="gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Confirm Invitation
              </Button>
            </div>
          </form>
        </Dialog>
      )}
    </div>
  );
};
