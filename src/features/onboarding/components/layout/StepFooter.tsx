import React from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';

export interface StepFooterProps {
  backTo?: string;
  nextTo?: string;
  canContinue?: boolean;
  onContinue?: () => void | Promise<void>;
  continueText?: string;
  backText?: string;
  isSubmitting?: boolean;
}

export const StepFooter: React.FC<StepFooterProps> = ({
  backTo,
  nextTo,
  canContinue = true,
  onContinue,
  continueText = 'Save & Continue',
  backText = 'Back',
  isSubmitting = false,
}) => {
  const router = useRouter();

  const handleBack = () => {
    if (backTo) {
      router.push(backTo);
    } else {
      router.back();
    }
  };

  const handleContinue = async () => {
    if (onContinue) {
      await onContinue();
    }
    if (nextTo) {
      router.push(nextTo);
    }
  };

  return (
    <div className="mt-8 pt-6 border-t border-border/60 flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
      {backTo !== undefined ? (
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={isSubmitting}
          className="w-full sm:w-auto"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          {backText}
        </Button>
      ) : (
        <div />
      )}

      <Button
        type={onContinue ? 'button' : 'submit'}
        variant="primary"
        onClick={onContinue ? handleContinue : undefined}
        disabled={!canContinue || isSubmitting}
        className="w-full sm:w-auto min-w-[150px] shadow-elegant font-bold"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            {continueText}
            <ChevronRight className="w-4 h-4 ml-1" />
          </>
        )}
      </Button>
    </div>
  );
};
