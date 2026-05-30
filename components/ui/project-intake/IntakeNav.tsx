type IntakeNavProps = {
  step: number;
  totalSteps: number;
  onBack: () => void;
  onNext: () => void;
  pending?: boolean;
  isLastStep?: boolean;
};

export default function IntakeNav({
  step,
  totalSteps,
  onBack,
  onNext,
  pending = false,
  isLastStep = false,
}: IntakeNavProps) {
  return (
    <div className="intake-nav">
      {step > 1 ? (
        <button
          type="button"
          className="intake-nav__back"
          onClick={onBack}
          disabled={pending}
        >
          Back
        </button>
      ) : (
        <span className="intake-nav__spacer" aria-hidden="true" />
      )}
      <span className="intake-nav__counter">
        Step {step} of {totalSteps}
      </span>
      <button
        type={isLastStep ? "submit" : "button"}
        className="intake-nav__next"
        onClick={isLastStep ? undefined : onNext}
        disabled={pending}
      >
        {pending ? "Please wait..." : isLastStep ? "Submit" : "Next"}
      </button>
    </div>
  );
}
