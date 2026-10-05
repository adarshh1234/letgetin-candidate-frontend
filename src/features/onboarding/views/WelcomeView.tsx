'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  FileText,
  UserCheck,
  DollarSign,
  Calendar,
  Building2,
  Award,
  Sparkles,
  CheckCircle2,
  Eye,
  Download,
} from 'lucide-react';
import { useOnboardingStore } from '../store/useOnboardingStore';
import { OFFER_DETAILS } from '../lib/constants';
import { PageHeader } from '../components/layout/PageHeader';
import { StepFooter } from '../components/layout/StepFooter';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Checkbox } from '../components/ui/checkbox';
import { Dialog } from '../components/ui/dialog';
import { toast } from '../components/ui/toast';
import { StatusBadge } from '../components/common/StatusBadge';

export const WelcomeView: React.FC = () => {
  const router = useRouter();
  const candidate = useOnboardingStore((state) => state.candidate);
  const stepStatus = useOnboardingStore((state) => state.stepStatus);
  const offerAccepted = useOnboardingStore((state) => state.offerAccepted);
  const acceptOffer = useOnboardingStore((state) => state.acceptOffer);

  const [isChecked, setIsChecked] = useState<boolean>(offerAccepted);
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false);

  const handleAcceptAndContinue = () => {
    if (!isChecked) {
      toast.error('Offer Acceptance Required', 'Please check the box to confirm acceptance.');
      return;
    }
    acceptOffer();
    toast.success('Offer Accepted!', 'Your acceptance has been officially recorded.');
    router.push('/onboarding/personal');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Page Header */}
      <PageHeader
        stepId="welcome"
        title="Welcome & Offer Letter Acceptance"
        description="Please review your compensation structure, reporting relationship, and formally accept your employment contract."
        badge={<StatusBadge status={stepStatus.welcome} size="md" />}
      />

      {/* Offer Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-left">
        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-primary-glow text-xs font-bold">
            <UserCheck className="w-4 h-4" />
            <span>Position & Role</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {candidate.role}
          </p>
          <p className="text-xs text-ink-soft">{OFFER_DETAILS.band}</p>
        </Card>

        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-primary-glow text-xs font-bold">
            <DollarSign className="w-4 h-4" />
            <span>Total Annual CTC</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {OFFER_DETAILS.annualCTC}
          </p>
          <p className="text-xs text-ink-soft">Fixed + Variable Component</p>
        </Card>

        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-primary-glow text-xs font-bold">
            <Award className="w-4 h-4" />
            <span>Equity Grant (ESOPs)</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {OFFER_DETAILS.equityGrant.split('(')[0]}
          </p>
          <p className="text-xs text-ink-soft">4-year vesting schedule</p>
        </Card>

        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-primary-glow text-xs font-bold">
            <Sparkles className="w-4 h-4" />
            <span>Joining Bonus</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {OFFER_DETAILS.joiningBonus.split('(')[0]}
          </p>
          <p className="text-xs text-ink-soft">Payable in 1st payroll cycle</p>
        </Card>

        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-primary-glow text-xs font-bold">
            <Calendar className="w-4 h-4" />
            <span>Start Date</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {OFFER_DETAILS.joiningDate}
          </p>
          <p className="text-xs text-ink-soft">Bengaluru Office & Remote</p>
        </Card>

        <Card className="p-4 space-y-1 bg-surface border border-border">
          <div className="flex items-center gap-2 text-ink-soft text-xs font-bold">
            <Building2 className="w-4 h-4" />
            <span>Reporting Manager</span>
          </div>
          <p className="font-heading text-base font-bold text-ink">
            {candidate.manager.name}
          </p>
          <p className="text-xs text-ink-soft">{candidate.manager.role}</p>
        </Card>
      </div>

      {/* Offer Letter Document Preview Row */}
      <Card className="p-6 text-left bg-surface border border-border">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary-glow border border-primary/20 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-sm font-bold text-ink">
                Official Employment Offer Letter (Signed PDF)
              </h3>
              <p className="text-xs text-ink-soft mt-0.5">
                {candidate.company}_Offer_{candidate.name.replace(/\s+/g, '_')}_2026.pdf • 2.4 MB • Issued Oct 01, 2026
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsPreviewOpen(true)}
              className="gap-1.5 font-semibold"
            >
              <Eye className="w-4 h-4" />
              View Document
            </Button>
          </div>
        </div>

        {/* Acceptance Box */}
        <div className="mt-6 pt-6 border-t border-border/60">
          <Checkbox
            id="offer-acceptance"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            label={`I accept the employment offer and agree to the terms and policies of ${candidate.company}.`}
            description="By checking this box, you confirm that you have reviewed the offer specifications, confidentiality clauses, and tentative joining schedule."
          />
        </div>
      </Card>

      {/* Step Footer */}
      <StepFooter
        backTo="/onboarding"
        backText="Dashboard"
        canContinue={isChecked}
        onContinue={handleAcceptAndContinue}
        continueText={offerAccepted ? 'Proceed to Personal Info' : 'Accept & Continue'}
      />

      {/* PDF Document Preview Dialog */}
      <Dialog
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        title="Official Employment Offer Letter Preview"
        description="Ref: LETGETIN/HR/2026/L5-7281"
        maxWidth="2xl"
      >
        <div className="space-y-4 text-left">
          {/* Mock PDF Document Layout */}
          <div className="rounded-xl border border-border bg-secondary/20 p-6 space-y-4 max-h-[60vh] overflow-y-auto font-sans text-xs leading-relaxed text-ink">
            <div className="flex items-center justify-between pb-4 border-b border-border/60">
              <div>
                <h4 className="font-heading text-base font-extrabold text-ink">
                  {candidate.company.toUpperCase()} PVT. LTD.
                </h4>
                <p className="text-[11px] text-ink-soft">Embassy TechVillage, Bellandur, Bengaluru</p>
              </div>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800">
                Digitally Signed
              </span>
            </div>

            <div className="space-y-1">
              <p><strong>Date:</strong> October 01, 2026</p>
              <p><strong>To:</strong> {candidate.name}</p>
              <p><strong>Email:</strong> {candidate.email}</p>
            </div>

            <div className="space-y-2">
              <p className="font-semibold text-ink">
                Dear {candidate.name.split(' ')[0]},
              </p>
              <p className="text-ink-soft">
                We are delighted to offer you the full-time role of{' '}
                <strong className="text-ink">{candidate.role}</strong> with {candidate.company}. This letter formalizes the
                terms and conditions of your engagement.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-ink">1. Compensation & Incentives</h5>
              <p className="text-ink-soft">
                Your Cost to Company (CTC) will be <strong className="text-ink">{OFFER_DETAILS.annualCTC}</strong> per annum.
                In addition, you are entitled to a one-time signing bonus of{' '}
                <strong className="text-ink">{OFFER_DETAILS.joiningBonus}</strong> and an equity grant of{' '}
                <strong className="text-ink">{OFFER_DETAILS.equityGrant}</strong>.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-ink">2. Commencement Date & Location</h5>
              <p className="text-ink-soft">
                Your appointment will take effect on <strong className="text-ink">{OFFER_DETAILS.joiningDate}</strong>.
                You will report to <strong className="text-ink">{OFFER_DETAILS.reportingManager}</strong> in Bengaluru, India.
              </p>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-ink">3. Confidentiality & IP Rights</h5>
              <p className="text-ink-soft">
                You agree not to disclose proprietary algorithms, commercial secrets, or candidate/customer
                data during or subsequent to your employment tenure.
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 flex items-center justify-between">
              <span className="text-[11px] text-ink-soft">Page 1 of 3</span>
              <span className="text-[11px] text-ink-soft">Authorized Signatory: Sarah Jenkins</span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                toast.success('Download Initialized', 'Mock offer letter downloaded.');
              }}
              className="gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download Copy
            </Button>
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => {
                setIsChecked(true);
                setIsPreviewOpen(false);
              }}
            >
              <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
              Confirm & Agree
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
